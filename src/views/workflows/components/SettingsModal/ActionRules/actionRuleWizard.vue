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
        :model="items"
        :rules="formRules"
        ref="form"
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
              <el-form-item
                label="Rule name"
                prop="ruleName"
              >
                <el-input
                  v-model="items.ruleName"
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
                {{ `System name ${advancedRuleName}` }}
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
import { ElForm } from "element-ui/types/form";

import ConditionTree from "@/components/Conditions/index.vue";
import ActionTree from "./action/index.vue";
import { Restriction } from "@/models/Restriction";
import { ActionGroup } from "@/models/Workflows/ActionGroup";

@Component({
  name: "",
  components: {
    ConditionTree,
    ActionTree,
  },
})
export default class extends Vue {
  @Prop({ required: true }) visibleWizard!: boolean;
  @Prop({ required: true }) actionRule!: ActionWorkflowRule;

  conditionsTree: any[] = [];

  private actionGroups: any[] | any = [];

  private currentStep: number = 0;

  private ruleName: string = "";

  private roleGroups: RoleGroup[] | any = [];

  private items = {
    ruleName: "",
  };

  private formRules = {
    ruleName: [
      {
        required: true,
        message: "Please type the rule name.",
        trigger: "blur",
      },
      {
        min: 3,
        message: "The rule name must be at least 3 characters.",
        trigger: "blur",
      },
    ],
  };

  get showModal() {
    return this.visibleWizard;
  }

  set showModal(val: boolean) {
    this.$emit("update:visibleWizard", val);
  }

  get advancedRuleName() {
    let name = this.items.ruleName;
    let out = "";
    let data = name.split(" ");
    if (data.length > 1) {
      data.forEach(function (el, idx) {
        var add = el.toLowerCase();
        if (add[0])
          out += idx === 0 ? add : add[0].toUpperCase() + add.slice(1);
      });
    } else {
      out = name;
    }

    return out ? "cse_" + out : "";
  }

  get CurrentWorkflow() {
    return WorkflowModule.ActiveWorkflow;
  }

  mounted() {
    this.onSysNameChange();
  }

  rule: ActionWorkflowRule | undefined;

  @Watch("visibleWizard", { immediate: true })
  setUp(val: boolean) {
    if (val) {
      this.currentStep = 0;

      if (this.actionRule.displayName) {
        this.rule = this.actionRule;
        this.items.ruleName = this.rule.displayName;
        this.roleGroups = this.rule.conditions?.roleGroups;
        this.actionGroups = this.rule.actionGroup?.actions;
      } else {
        this.onAddEveryone();
        this.roleGroups = [];
        this.actionGroups = [];
        this.items.ruleName = "";
        this.rule = null;
      }
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

  onOk() {
    (this.$refs.form as ElForm).validate((valid: boolean) => {
      if (valid) {
        let rule = null;
        if (!this.rule) rule = new ActionWorkflowRule();
        else rule = this.rule;
        if (rule && !rule.conditions) rule.conditions = new Restriction();
        rule.conditions.roleGroups = this.roleGroups;
        if (rule && !rule.actionGroup) rule.actionGroup = new ActionGroup();
        rule.actionGroup.actions = this.actionGroups;
        rule.systemName = this.advancedRuleName;
        rule.displayName = this.items.ruleName;
        this.$emit("onSave", rule);
        this.showModal = false;
      }
    });
  }
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
