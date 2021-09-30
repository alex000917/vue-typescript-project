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
      <el-form label-position="left" label-width="100px">
        <el-row class="action-rule__row">
          <el-col>
            <h3 v-if="currentStep === 0">Step 1/3 - Triggering conditions</h3>
            <h3 v-else-if="currentStep === 1">Step 2/3 - Actions</h3>
            <h3 v-else-if="currentStep === 2">Step 3/3 - Name</h3>
          </el-col>
        </el-row>
        <el-row class="action-rule__row">
          <el-col v-if="currentStep === 0">
            <span>
              The rule will be applied only if these condition are met.</span
            ><br />
            <span>
              For Example, the rule will be applied when the item is
              cancelled.</span
            >
          </el-col>
          <el-col v-if="currentStep === 1">
            <span>
              Specify which actions to perform when rule is triggered.</span
            ><br />
            <span> For Example, cancel all child items.</span>
          </el-col>
          <el-col v-if="currentStep === 2">
            <el-form-item label="Rule name">
              <el-input v-model="ruleName" class="action-rule__row--input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="currentStep !== 2" class="action-rule__row">
          <el-col :span="6" v-if="currentStep === 0">
            <el-button type="text" @click="onAddEveryone()">
              <i class="el-icon-user-solid"></i>
              Add Everyone
            </el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="text"> </el-button>

            <el-dropdown
              v-if="currentStep === 0"
              trigger="click"
              @command="onNewConditionSelect"
              placement="bottom-start"
            >
              <span class="el-dropdown-link">
                <el-button type="text"> New Condition </el-button>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="transitionConditionVisible"
                  >Transition Condition...</el-dropdown-item
                >
                <el-dropdown-item command="propertyChange"
                  >Property Change Condition...</el-dropdown-item
                >
                <el-dropdown-item disabled
                  >--------------------------------------</el-dropdown-item
                >
                <el-dropdown-item>Property Condition...</el-dropdown-item>
                <el-dropdown-item>Item Set Condition...</el-dropdown-item>
                <el-dropdown-item command="workflowConditionVisible"
                  >Workflow Condition...</el-dropdown-item
                >
                <el-dropdown-item command="entityConditionVisible"
                  >Entity category Condition...</el-dropdown-item
                >
                <el-dropdown-item>Javascript Condition...</el-dropdown-item>
                <el-dropdown-item command="attachConditionVisible"
                  >Attachment Condition...</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>

            <el-dropdown
              v-else
              trigger="click"
              @command="onNewActionSelect"
              placement="bottom-start"
            >
              <span class="el-dropdown-link">
                <el-button type="text"> New Action </el-button>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="newAction in newActionList"
                  :key="newAction.id"
                  :command="newAction.id"
                  >{{ newAction.value }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="6">
            <el-button
              type="text"
              @click="onEdit()"
              :disabled="!selectedCondition"
            >
              <i class="el-icon-edit"></i>
              Edit
            </el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="text">
              <i class="el-icon-delete-solid"></i>
              Delete
            </el-button>
          </el-col>
        </el-row>
        <el-row
          v-if="currentStep === 0"
          class="action-rule__row action-rule__row--last"
        >
          <el-col class="action-rule__row--detail">
            <el-tree
              ref="elTree"
              class="tree-content"
              :data="conditionsTree"
              node-key="systemName"
              default-expand-all
              highlight-current
              :expand-on-click-node="false"
              @node-click="onNodeClick"
            ></el-tree>
          </el-col>
        </el-row>

        <el-row
          v-if="currentStep === 1"
          class="action-rule__row action-rule__row--last"
        >
          <el-col class="action-rule__row--detail">
            <el-tree
              ref="elTree"
              class="tree-content"
              :data="conditionsTree"
              node-key="systemName"
              default-expand-all
              highlight-current
              :expand-on-click-node="false"
              @node-click="onNodeClick"
            ></el-tree>
            <div class="action-rule__row--text">Drag items to re-order</div>
          </el-col>
        </el-row>

        <el-row
          v-if="currentStep === 2"
          class="action-rule__row action-rule__row--last"
        >
          <el-collapse accordion value="workWeekDays">
            <el-collapse-item title="Advanced settings" name="workWeekDays"
              >
                {{`System name ${ruleName}`}}
              </el-collapse-item
            ></el-collapse
          >
        </el-row>

        <transition
          :visible-transition.sync="transitionConditionVisible"
          :condition.sync="selectedCondition"
        ></transition>
        <new-property-change
          :dialogVisible.sync="propertyChangeVisible"
        ></new-property-change>
        <entity-condition :dialogVisible.sync="entityConditionVisible" />
        <attachment-condition :dialogVisible.sync="attachConditionVisible" />

        <xml-action :dialogVisible.sync="newActionListVisible['xml']" />
        <set-property-action :dialogVisible.sync="newActionListVisible['property']" />
        <move-workflow-action :dialogVisible.sync="newActionListVisible['moveWorkflow']" />
      </el-form>
    </el-container>
    <div slot="footer" class="footer">
      <el-button v-if="currentStep > 0" type="primary" @click="onPrev()"
        >Back</el-button
      >
      <el-button v-if="currentStep < 2" type="primary" @click="onNext()"
        >Next</el-button
      >
      <el-button v-if="currentStep === 2" type="primary" @click="onOk()"
        >Ok</el-button
      >
      <el-button @click="handleClose" type="text">Cancel</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { TransitionCondition } from "@/models/Conditions";
import { ActionWorkflowRule } from "@/models/Workflows/ActionWorkflowRule";
import { WorkflowModule } from "@/store/modules/WorkflowMod";
import { forEach } from "lodash";
import { debug } from "node:console";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import transition from "./Conditions/transition.vue";
import NewPropertyChange from "./Conditions/newPropertyChange.vue";
import PropertyCondition from "@/components/Conditions/components/propertyFilter.vue";
import ItemsetCondition from "@/components/Conditions/components/itemSet.vue";
import WorkflowCondition from "@/components/Conditions/components/workflow.vue";
import EntityCondition from "@/components/Conditions/components/entityFilter.vue";
import AttachmentCondition from "@/components/Conditions/components/attachmentFilter.vue";

import XmlAction from './action/XmlRule.vue';
import SetPropertyAction from './action/setProperty.vue'
import MoveWorkflowAction from './action/moveToWorkflow.vue'

@Component({
  name: "",
  components: {
    transition,
    NewPropertyChange,
    EntityCondition,
    AttachmentCondition,

    XmlAction,
    SetPropertyAction,
    MoveWorkflowAction
  },
})
export default class extends Vue {
  @Prop({ required: true }) visibleWizard!: string;
  @Prop({ required: true }) ruleSysname!: string;

  transitionConditionVisible = false;
  propertyChangeVisible = false;
  entityConditionVisible = false;
  attachConditionVisible = false;

  conditionsTree: any[] = [];
  selectedCondition: any = null;

  private newActionList = [
    { id: "property", value: "Set property value" },
    { id: "moveWorkflow", value: "Move workflow" },
    { id: "xml", value: "XML action" },
    { id: "itemset", value: "Item set action" },
    { id: "integration", value: "Integration Operation" },
  ];

  private newActionListVisible: any = {
    property: false,
    moveWorkflow: false,
    xml: false,
    itemset: false,
    integration: false,
  };

  private currentStep: number = 0;

  private ruleName: string = "";

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

  onNewActionSelect(command: string) {
    console.log(command);
    this.newActionListVisible[command] = true;
  }

  onEdit() {
    if (!this.selectedCondition) return;
    switch (this.selectedCondition.myspType) {
      case "TransitionCondition":
        this.transitionConditionVisible = true;
        break;
    }
  }

  onNext() {
    this.currentStep++;
  }

  onPrev() {
    this.currentStep--;
  }

  onOk() {}

  onNodeClick(node: any, props: any, tree: any) {
    if (node && node.label != "Everyone") {
      this.selectedCondition = node.data;
    } else {
      this.selectedCondition = null;
    }
  }

  @Watch("selectedCondition", { immediate: true })
  onSelectedConditionChange() {
    console.log("=======================>", this.selectedCondition);
    console.log("=======================>", this.rule);
    if (!this.selectedCondition) return;

    this.rule?.conditions?.roleGroups.forEach((group) => {
      if (group) {
        group.conditions.forEach((condition) => {
          if (condition["uniqueIdx"] == this.selectedCondition["uniqueIdx"]) {
            condition = this.selectedCondition;
          }
        });
      }
    });

    this.CurrentWorkflow?.actionWorkflowRules?.forEach((rule) => {
      if (rule && rule.systemName == this.ruleSysname) {
        rule = this.rule as ActionWorkflowRule;
        this.onSysNameChange();
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
