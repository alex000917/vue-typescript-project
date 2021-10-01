<template>
  <el-dialog
    :visible.sync="visibleWizard"
    :before-close="handleClose"
    title="New Stop Rule Wizard"
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
            <h3 v-else-if="currentStep === 1">Step 2/3 - Message</h3>
            <h3 v-else-if="currentStep === 2">Step 3/3 - Name</h3>
          </el-col>
        </el-row>
        <div v-if="currentStep === 0" class="action-rule__body">
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
          </el-row>
          <el-row class="action-rule__row">
            <el-col :span="6">
              <el-button type="text" @click="onAddEveryone()">
                <i class="el-icon-user-solid"></i>
                Add Everyone
              </el-button>
            </el-col>
            <el-col :span="6">
              <el-button type="text"> </el-button>

              <el-dropdown
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
                  <el-dropdown-item command="propertyChangeVisible"
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
          <el-row class="action-rule__row action-rule__row--last">
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
        </div>

        <div v-if="currentStep === 1" class="action-rule__body">
          <el-row class="action-rule__row">
            <el-col>
              <span>
                Specify the message to display if the rule has failed.</span
              >
            </el-col>
          </el-row>
          <div class="message">
            <div class="message__detail">
              <div class="message__detail--language">English</div>
              <div class="message__detail--tags">
                <el-tag
                  type="info"
                  v-show="items.propertyFirst.value.length > 0"
                  closable
                  @close="closeFirstTag"
                  >{{ items.propertyFirst.displayName }}</el-tag
                >
              </div>
              <div class="message__detail--button">
                <el-button @click.prevent="insertPropertyFirst"
                  >Insert Property...</el-button
                >
                <el-button @click.prevent="insertPreferenceFirst"
                  >Insert Application Preference...</el-button
                >
              </div>
              <!-- <el-form-item>
                <Tags
                  :data="CurrentEntity.lookupDefaultNameFormat"
                  :base-entity-id="entityId"
                />
              </el-form-item> -->
            </div>
            <div class="message__detail">
              <div class="message__detail--language">Hebrew</div>
              <div class="message__detail--tags">
                <el-tag
                  type="info"
                  v-show="items.propertySecond.value.length > 0"
                  closable
                  @close="closeSecondTag"
                  >{{ items.propertySecond.displayName }}</el-tag
                >
              </div>
              <div class="message__detail--button">
                <el-button @click.prevent="insertPropertySecond"
                  >Insert Property...</el-button
                >
                <el-button @click.prevent="insertPreferenceSecond"
                  >Insert Application Preference...</el-button
                >
              </div>
            </div>
          </div>
          <div class="explain">
            It is recommended to add the item's id in the message. Also consider
            explaining the case of the stop, and the steps the user should take
            to continue.
          </div>
        </div>

        <div v-if="currentStep === 2" class="action-rule__body">
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
            <el-collapse accordion value="workWeekDays">
              <el-collapse-item title="Advanced settings" name="workWeekDays">
                {{ `System name ${ruleName}` }}
              </el-collapse-item></el-collapse
            >
          </el-row>
        </div>

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
        <set-property-action
          :dialogVisible.sync="newActionListVisible['property']"
        />
        <move-workflow-action
          :dialogVisible.sync="newActionListVisible['moveWorkflow']"
        />
        <itemset-condition
          :dialogVisible.sync="newActionListVisible['itemset']"
        />
        <new-integraion-action
          :dialogVisible.sync="newActionListVisible['integration']"
        />

        <prefModel
          :is-open.sync="showPreference.show"
          :result-handler="onPrefSelected"
        />
        <select-property-model
          :dialog-visible.sync="showProperty.show"
          :result-handler="resultHandler"
          :entity-id="CurrentWorkflow.entityId"
        />
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
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { KeyValue } from "@/models/KeyValue";
import Tags from "@/components/Tags/index.vue";
import { Entity } from "@/models/Entity"
import { EntitiesModule } from "@/store/modules/entitiesMod"

import transition from "@/views/workflows/components/SettingsModal/ActionRules/Conditions/transition.vue";
import NewPropertyChange from "@/views/workflows/components/SettingsModal/ActionRules/Conditions/newPropertyChange.vue";
import PropertyCondition from "@/components/Conditions/components/propertyFilter.vue";
import ItemsetCondition from "@/components/Conditions/components/itemSet.vue";
import WorkflowCondition from "@/components/Conditions/components/workflow.vue";
import EntityCondition from "@/components/Conditions/components/entityFilter.vue";
import AttachmentCondition from "@/components/Conditions/components/attachmentFilter.vue";

import XmlAction from "@/views/workflows/components/SettingsModal/ActionRules/action/XmlRule.vue";
import SetPropertyAction from "@/views/workflows/components/SettingsModal/ActionRules/action/setProperty.vue";
import MoveWorkflowAction from "@/views/workflows/components/SettingsModal/ActionRules/action/moveToWorkflow.vue";
import NewIntegraionAction from "@/views/workflows/components/SettingsModal/ActionRules/action/newIntegraion.vue";

import prefModel from "@/components/Preferences/prefModel.vue";
import SelectPropertyModel from "@/components/PropertySelector/index.vue";

@Component({
  name: "stoprule-wizard",
  components: {
    transition,
    NewPropertyChange,
    EntityCondition,
    AttachmentCondition,
    ItemsetCondition,

    XmlAction,
    SetPropertyAction,
    MoveWorkflowAction,
    NewIntegraionAction,

    prefModel,
    SelectPropertyModel,
    Tags,
  },
})
export default class extends Vue {
  @Prop({ required: true }) visibleWizard!: string;
  @Prop({ required: true }) ruleSysname!: string;

  transitionConditionVisible = false;
  propertyChangeVisible = false;
  entityConditionVisible = false;
  attachConditionVisible = false;
  allowedProperties=["1", "2"]
  allowedLookupName="user"

  conditionsTree: any[] = [];
  selectedCondition: any = null;

  private items: any = {
    propertyFirst: {
      displayName: "",
      value: [],
    },
    propertySecond: {
      displayName: "",
      value: [],
    },
  };

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

  get CurrentEntity() {
    return this.entity
  }

  // entityId = "com.msp.dao.entities.cse.custom.Cse_AxEntity"
  // private entity:Entity |null=null;
  // async getEntity() {
  //   this.entity = await EntitiesModule.getEntity(this.entityId)
  // }

  // async created() {
  //   await this.getEntity()
  // }

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
  private showProperty: any = {
    show: false,
    id: 0,
  };

  private showPreference: any = {
    show: false,
    id: 0,
  };

  insertPropertyFirst() {
    this.showProperty.show = true;
    this.showProperty.id = 0;
  }

  insertPreferenceFirst() {
    this.showPreference.show = true;
    this.showPreference.id = 0;
  }

  insertPropertySecond() {
    this.showProperty.show = true;
    this.showProperty.id = 1;
  }

  insertPreferenceSecond() {
    this.showPreference.show = true;
    this.showPreference.id = 1;
  }

  onPrefSelected(value: KeyValue[]) {
    console.log("preference", value);
  }

  closeFirstTag() {
    this.items.propertyFirst.value = [];
  }

  closeSecondTag() {
    this.items.propertySecond.value = [];
    console.log("second", this.items.propertySecond.value);
  }

  resultHandler(value: KeyValue[]) {
    console.log("property", value);
    console.log(this.showProperty.id);
    let str = "";
    if (value.length > 0) {
      str = `[${value[0].key} : ${value[1].key}]`;
    }
    if (this.showProperty.id) {
      this.items.propertySecond.value = value;
      this.items.propertySecond.displayName = str;
    } else {
      this.items.propertyFirst.value = value;
      this.items.propertyFirst.displayName = str;
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
    (this as any)[command] = true;
  }

  onNewActionSelect(command: string) {
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
      height: 50vh;

      .el-container {
        height: 100%;
      }

      .message {
        position: relative;
        margin-top: 15px;
        padding: 10px;
        border: 1px solid $border-color;
        height: 34vh;

        &__detail {
          div {
            margin-top: 20px;
          }
          &--language {
            font-size: 17px;
            font-weight: 500;
            border-bottom: 2px solid $border-color;
          }
          &--tags {
            border: 1px solid $border-color;
            height: 3.5vh;
            align-items: center;
          }
        }
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
      height: 31vh;
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
