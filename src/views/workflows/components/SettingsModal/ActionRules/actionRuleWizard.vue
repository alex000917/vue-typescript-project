<template>
  <el-dialog
    :visible.sync="visibleWizard"
    :before-close="handleClose"
    title="New Action Rule Wizard"
    width="45%"
    center
    class="action-rule"
    append-to-body
  >
    <el-container direction="vertical">
      <el-form
        label-position="left"
        label-width="100px"
      >
        <div v-if="currentStep === 0">
          <el-row class="action-rule__row">
            <el-col>
              <h3>Step 1/3 - Triggering conditions</h3>
            </el-col>
          </el-row>
          <el-row class="action-rule__row">
            <el-col>
              <span>
                The rule will be applied only if these condition are met.</span><br />
              <span>
                For Example, the rule will be applied when the item is
                cancelled.</span>
            </el-col>
          </el-row>
          <el-row class="action-rule__row">
            <condition-tree
              :isAction="'true'"
              :data.sync="roleGroups"
            />
          </el-row>
        </div>
        <div v-if="currentStep === 1">
          <el-row class="action-rule__row">
            <el-col>
              <h3>Step 2/3 - Actions</h3>
            </el-col>
          </el-row>
          <el-row class="action-rule__row">
            <el-col>
              <span>
                Specify which actions to perform when rule is triggered.</span><br />
              <span> For Example, cancel all child items.</span>
            </el-col>
          </el-row>
          <el-row class="action-rule__row action-rule__row--last">
            <action-tree :data.sync="actionGroups" />
          </el-row>
        </div>
        <div v-if="currentStep === 2">
          <el-row class="action-rule__row">
            <el-col>
              <h3>Step 3/3 - Name</h3>
            </el-col>
          </el-row>
          <el-row class="action-rule__row">
            <el-col>
              <el-form-item label="Rule name">
                <el-input
                  v-model="ruleName"
                  class="action-rule__row--input"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="action-rule__row action-rule__row--last">
            <el-collapse
              accordion
              value="workWeekDays"
            >
              <el-collapse-item
                title="Advanced settings"
                name="workWeekDays"
              >
                {{ `System name ${ruleName}` }}
              </el-collapse-item>
            </el-collapse>
          </el-row>
        </div>
      </el-form>
    </el-container>
    <div
      slot="footer"
      class="footer"
    >
      <el-button
        v-if="currentStep > 0"
        type="primary"
        @click="onPrev()"
      >Back</el-button>
      <el-button
        v-if="currentStep < 2"
        type="primary"
        @click="onNext()"
      >Next</el-button>
      <el-button
        v-if="currentStep === 2"
        type="primary"
        @click="onOk()"
      >Ok</el-button>
      <el-button
        @click="handleClose"
        type="text"
      >Cancel</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { TransitionCondition } from "@/models/Conditions";
import { ActionWorkflowRule } from "@/models/Workflows/ActionWorkflowRule";
import { RoleGroup } from "@/models/RoleGroup";

import { WorkflowModule } from "@/store/modules/WorkflowMod";
import { forEach } from "lodash";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { ItemSetCondition } from "@/models/Conditions";

import ConditionTree from "@/components/Conditions/index.vue";
import ActionTree from "./action/index.vue";

@Component({
  name: "",
  components: {
    ConditionTree,
    ActionTree,
  },
})
export default class extends Vue {
  @Prop({ required: true }) visibleWizard!: string;
  @Prop({ required: true }) ruleSysname!: string;

  conditionsTree: any[] = [];

  private actionGroups: any[] = [];

  private currentStep: number = 0;

  private ruleName: string = "";

  private roleGroups: RoleGroup[] | any= [];

  private items = {
    transition: {},
    propertyCondition: {},
  };

  get CurrentWorkflow() {
    return WorkflowModule.ActiveWorkflow;
  }

  mounted() {
    this.onSysNameChange();
  }

  rule: ActionWorkflowRule | undefined;

  @Watch("ruleSysname", { immediate: true })
  onSysNameChange() {
    if (this.ruleSysname) {
      this.conditionsTree = [];
      this.rule = this.CurrentWorkflow?.actionWorkflowRules?.find(
        (c) => c.systemName == this.ruleSysname
      );
      if (this.rule) {
        let idx = 0;
        this.rule.conditions?.roleGroups.forEach((grp) => {
          let subIdx = 0;
          let childRen: any[] = [];
          grp.conditions.forEach((c) => {
            childRen.push({
              label: `Workflow is about to ${this.getMessage(c)}`,
              children: [],
              data: c,
              uniqueIdx: idx,
            });
            grp.conditions[subIdx]["uniqueIdx"] = idx;
            subIdx++;
            idx++;
          });

          this.conditionsTree.push({
            label: grp.title,
            children: childRen,
            uniqueIdx: idx,
          });
          (grp as any)["uniqueIdx"] = idx;

          idx++;
        });

        // this.roleGroups = this.rule.conditions?.roleGroups;

        console.log(this.conditionsTree);
      }
    } else {
      this.onAddEveryone();
    }
  }

  getMessage(step: any) {
    switch (step.type) {
      case 0:
        switch (step.stepsToIncludeType) {
          case 0:
            return "Progress";
          case 2:
            return `Progress to step ${step.stepSystemName} or beyound it.`;
          case 3:
            return `Progress to step ${step.stepSystemName} or before it.`;
        }
        break;
      case 1:
        switch (step.stepsToIncludeType) {
          case 0:
            return "Regress";
          case 2:
            return `Regress to step ${step.stepSystemName} or beyound it.`;
          case 3:
            return `Regress to step ${step.stepSystemName} or before it.`;
        }
        break;
      case 2:
        switch (step.stepsToIncludeType) {
          case 0:
            return "Move to side step.";
          case 1:
            return `Move to side step ${step.stepSystemName}.`;
        }
        break;
      case 3:
        switch (step.stepsToIncludeType) {
          case 0:
            return "Return to main flow";
          case 2:
            return `Return to step ${step.stepSystemName} or beyound it.`;
          case 3:
            return `Return to step ${step.stepSystemName} or before it.`;
        }
        break;
    }
  }

  handleClose() {
    this.$emit("update:visibleWizard", false);
    this.currentStep == 0;
  }

  onAddEveryone() {
    this.conditionsTree.push({
      label: "Everyone",
      children: [],
    });
  }

  onNewConditionSelect(command: string) {
    console.log(command);
    (this as any)[command] = true;
  }

  onNext() {
    this.currentStep++;
  }

  onPrev() {
    this.currentStep--;
  }

  onOk() {}
}
</script>

<style lang="scss">
$border-color: #cacaca;

.action-rule {
  .el-dialog {
    &__body {
      padding: 0 15px;
      border-bottom: 1px soild $border-color;

      .el-container {
        height: 100%;
      }
    }

    &__footer {
      padding: 0 15px;
      align-items: center;

      .footer {
        height: 70px;
        border-top: 1px solid $border-color;
        align-items: center;

        .el-button {
          width: 120px;
          margin: 20px 10px;

          &--text {
            text-decoration: underline;
          }
        }
      }
    }
  }

  &__row {
    margin-top: 10px;

    &--detail {
      border: 1px solid $border-color;
      height: 30vh;
      overflow-y: auto;
    }

    &--text {
      height: 20px;
      color: #e4e4e4;
      position: absolute;
      bottom: 0;
      font-style: italic;
    }

    &--last {
      height: calc(30vh + 20px);
      padding-bottom: 20px;
    }

    &--input {
      width: 50%;
    }
  }
}
</style>
