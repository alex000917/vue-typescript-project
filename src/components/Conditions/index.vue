<template>
  <div>
    <div class="outer-modal-container">
      <slot name="description" />
      <el-row type="flex" class="command-container">
        <el-col :span="5" class="command-button">
          <el-button
            type="text"
            icon="el-icon-user"
            :title="
              lpmInstance.getLocalizedString(
                languagesPresentationModel.NEW_ROLE_GROUP
              )
            "
          >
            <span class="button-text" @click="showRoleGroupPopup('new')">{{
              lpmInstance.getLocalizedString(
                languagesPresentationModel.NEW_ROLE_GROUP
              )
            }}</span>
          </el-button>
        </el-col>
        <el-col v-if="showFiltersButton" class="command-button">
          <el-dropdown
            trigger="click"
            size="small"
            placement="bottom-start"
            @command="newFilterHandler"
          >
            <el-button type="text" icon="el-icon-brush">
              <span class="button-text">New Filter</span>
            </el-button>
            <el-dropdown-menu slot="dropdown" style="margin-top: 0;">
              <el-dropdown-item
                v-for="filter in filtersList"
                :key="filter.id"
                :command="filter.id"
              >
                {{ filter.label }} filter...
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="5" class="command-button">
          <el-dropdown
            trigger="click"
            size="small"
            placement="bottom-start"
            @command="newFilterHandler"
          >
            <el-button
              type="text"
              icon="el-icon-brush"
              :disabled="!showConditionsButton"
            >
              <span class="button-text">New Condition </span>
            </el-button>
            <el-dropdown-menu
              v-if="!isAction"
              slot="dropdown"
              style="margin-top: 0;"
            >
              <el-dropdown-item
                v-for="condition in conditionsList"
                :key="condition.id"
                :command="condition.id"
              >
                {{ condition.label }} Conditions...
              </el-dropdown-item>
            </el-dropdown-menu>
            <el-dropdown-menu v-else slot="dropdown" style="margin-top: 0;">
              <el-dropdown-item
                v-for="condition in actionsList"
                :key="condition.id"
                :command="condition.id"
                :disabled="condition.disabled"
              >
                {{ condition.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="2" class="command-button">
          <el-button
            type="text"
            icon="el-icon-edit-outline"
            @click="editCondition"
          >
            <span class="button-text">Edit</span>
          </el-button>
        </el-col>
        <el-col :span="2" class="command-button">
          <el-button type="text" icon="el-icon-delete" @click="onDelete">
            <span class="button-text">Delete</span>
          </el-button>
        </el-col>
      </el-row>
      <div
        class="table-container"
        :class="conditionsDivHeight ? 'table-container-small' : ''"
      >
        <el-tree
          :data="getTreeItems"
          accordion
          :props="defaultTreeProps"
          default-expand-all
          class="tree-container"
          @node-click="handleNodeClick"
        >
          <span slot-scope="{ node, data }" class="custom-tree-node">
            <div style="display: flex; align-items: center;">
              <el-image
                style="width: 20px; height: 20px;"
                :src="
                  data.key === `everyone`
                    ? `/assets/img/approved-by-32x32.png`
                    : `/assets/img/User-set-in-an-application-preference16x16.png`
                "
              />
              <span style="margin-left: 5px;">
                {{ node.label }}
              </span>
            </div>
          </span>
        </el-tree>
      </div>
    </div>
    <new-role-group-modal
      :visible.sync="newRoleGroupModalData.visible"
      :current-auth-tree="authorizationTree"
      :allowed-node-types="allowedNodeTypes"
      :state="newRoleGroupModalData.state"
      :should-show-everyone-button="
        newRoleGroupModalData.shouldShowEveryoneButton
      "
      :auth-nodes-system-names="newRoleGroupModalData.authNodesSystemNames"
      @onClickAddEveryOne="addNewRoleGroup"
    />
    <property-filter
      :dialogVisible.sync="showFilterModal['PropertyCondition']"
      :condition.sync="currentCondition"
      @onSave="onSave"
    />
    <itemset-condition-modal
      :dialogVisible.sync="showFilterModal['ItemSetCondition']"
      :condition.sync="currentCondition"
      @onSave="onSave"
    />
    <workflow-condition-modal
      :dialogVisible.sync="showFilterModal['WorkflowCondition']"
      :condition.sync="currentCondition"
      @onSave="onSave"
    />
    <status-condition-modal
      key="status"
      :dialogVisible.sync="showFilterModal['StatusCondition']"
      :condition.sync="currentCondition"
      @onSave="onSave"
    />
    <entity-condition-modal
      key="entityCategory"
      :dialogVisible.sync="showFilterModal['EntityCategoryCondition']"
      :condition.sync="currentCondition"
      @onSave="onSave"
    />
    <attachment-condition-modal
      :dialogVisible.sync="showFilterModal['AttachmentCondition']"
      :condition.sync="currentCondition"
      @onSave="onSave"
    />
    <javascript-condition-modal
      :dialogVisible.sync="showFilterModal['JavascriptCondition']"
      :condition.sync="currentCondition"
      @onSave="onSave"
    />
    <property-change-modal
      :dialogVisible.sync="showFilterModal['PropertyChangeCondition']"
      :condition.sync="currentCondition"
      @onSave="onSave"
    />
    <transition-condition-modal
      :visibleTransition.sync="showFilterModal['TransitionCondition']"
      :condition.sync="currentCondition"
      @onSave="onSave"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { WorkflowModule } from "@/store/modules/WorkflowMod";
import { EntitiesModule } from "@/store/modules/entitiesMod";

import { RoleGroup } from "@/models/RoleGroup";
import { Restriction } from "@/models/Restriction";
import { ApplicationPreference } from "@/models/ApplicationPreference";

import NewRoleGroupModal from "@/components/Conditions/newRoleGroupModal.vue";
import { AuthorizationTree } from "@/models/authorizations/AuthorizationTree";
import { LanguagesPresentationModel } from "@/models/Utils/LanguagesPresentationModel";
import PropertyFilter from "@/components/Conditions/components/propertyFilter.vue";
import ItemsetConditionModal from "@/components/Conditions/components/itemSet.vue";
import WorkflowConditionModal from "@/components/Conditions/components/workflow.vue";
import EntityConditionModal from "@/components/Conditions/components/entityCategoryFilter.vue";
import AttachmentConditionModal from "@/components/Conditions/components/attachmentFilter.vue";
import JavascriptConditionModal from "@/components/Conditions/components/javascriptCondition.vue";
import StatusConditionModal from "@/components/Conditions/components/statusFilter.vue";
import PropertyChangeModal from "@/components/Conditions/components/newPropertyChange.vue";
import TransitionConditionModal from "@/components/Conditions/components/transition.vue";
import { FormsModule } from "@/store/modules/FormsStore";

import lodash from "lodash";

import {
  BaseCondition,
  PropertyCondition,
  EntityCategoryCondition,
  AttachmentCondition,
  PropertyChangeCondition,
  RoleCondition,
  StateCondition,
  WorkflowCondition,
  StatusCondition,
  ItemSetCondition,
  JavascriptCondition,
  TransitionCondition,
} from "@/models/Conditions";
import { emit } from "cluster";

interface ITreeRole {
  label: String;
  key: String;
  children: ITreeRole[];
}

@Component({
  name: "condition-tree",
  components: {
    NewRoleGroupModal,
    PropertyFilter,
    ItemsetConditionModal,
    WorkflowConditionModal,
    EntityConditionModal,
    AttachmentConditionModal,
    JavascriptConditionModal,
    StatusConditionModal,
    PropertyChangeModal,
    TransitionConditionModal,
  },
})
export default class extends Vue {
  @Prop({ required: true }) private data!: RoleGroup[] | any[];
  @Prop({ required: false, default: () => [] })
  private visibleFilters!: any[];
  @Prop({ required: false, default: () => [] })
  private visibleConditions!: any[];
  @Prop({ required: false }) conditionsDivHeight!: boolean;
  @Prop({ required: false, default: false }) isAction!: boolean;

  private currentCondition: BaseCondition | any = null;

  private defaultFilterData: any = {
    state: [],
    userRole: [],
    sql: {
      displayName: null,
      query: null,
    },
    property: {
      propertyFirst: {
        displayName: "",
        value: [],
      },
      propertySecond: {
        displayName: "",
        value: null,
      },
      condition: "",
      children: [],
    },
    workflow: {
      property: {
        displayName: "",
        value: null,
      },
      condition: "",
      workflow: "",
      step: "",
    },
  };

  private conditionsList = [
    { id: "PropertyCondition", label: "Property" },
    { id: "ItemSetCondition", label: "Item Set" },
    { id: "WorkflowCondition", label: "Workflow" },
    { id: "StatusCondition", label: "Status" },
    { id: "EntityCategoryCondition", label: "Entity category" },
    { id: "JavascriptCondition", label: "Javscript" },
    { id: "AttachmentCondition", label: "Attachment" },
  ];

  private actionsList = [
    {
      id: "PropertyChangeCondition",
      label: "Property Change  Conditions...",
      disabled: false,
    },
    { id: "TransitionCondition", label: "Transition  Conditions...", disabled: false },
    { id: "", label: "-----------------------", disabled: true },

    { id: "PropertyCondition", label: "Property  Conditions...", disabled: false },
    { id: "ItemSetCondition", label: "Item Set  Conditions...", disabled: false },
    { id: "WorkflowCondition", label: "Workflow  Conditions...", disabled: false },
    {
      id: "EntityCategoryCondition",
      label: "Entity category  Conditions...",
      disabled: false,
    },
    { id: "JavascriptCondition", label: "Javscript  Conditions...", disabled: false },
    { id: "AttachmentCondition", label: "Attachment  Conditions...", disabled: false },
  ];

  private filtersList = [
    { id: "state", label: "State" },
    { id: "entityCategory", label: "Entity category" },
    { id: "userRole", label: "Logged in user role" },
    { id: "property", label: "Property" },
    { id: "sql", label: "SQL" },
  ];

  //Total Data
  private roleGroups: RoleGroup[] = [];
  //Tree Data
  private treeItems: any[] = [];
  private defaultTreeProps = {
    children: "children",
    label: "label",
  };

  private authorizationTree: AuthorizationTree = new AuthorizationTree();
  private currentRoleGroup: RoleGroup | any = new RoleGroup();
  private selectedRoleGroupIndex = -1;
  private selectedConditionIndex = -1;
  private allowedNodeTypes = [];

  private showFilterModal: any = {
    StateCondition: false,
    EntityCategoryCondition: false,
    userRole: false,
    PropertyCondition: false,
    sql: false,
    ItemSetCondition: false,
    WorkflowCondition: false,
    AttachmentCondition: false,
    JavascriptCondition: false,
    PropertyChangeCondition: false,
    TransitionCondition: false,
  };

  private filterData = this.defaultFilterData;
  private selectedFilterKey = "";

  private newRoleGroupModalData = {
    state: "new",
    shouldShowEveryoneButton: true,
    authNodesSystemNames: [],
    visible: false,
  };

  private itemSelected: boolean = false;

  @Watch("visibleConditions", { deep: true, immediate: true })
  setUp(val: any[], old: any[]) {
    if (val) {
      if (val.length > 0) this.conditionsList = val;
      if (this.data && this.data.length > 0) {
        this.roleGroups = this.data;
      }
    }
  }

  @Watch("data", { deep: true, immediate: true })
  setUpTree() { console.log("conditionData", this.data)
    this.roleGroups = this.data;
    this.currentCondition = new BaseCondition();
  }

  @Watch("currentCondition", { deep: true, immediate: true })
  async setUpTree1() {
    this.treeItems = [];
    if (this.roleGroups && this.roleGroups.length > 0) {
      this.roleGroups.forEach((roleGroup, rIndex) => {
        this.treeItems.push({
          index: "" + rIndex,
          label: roleGroup.title,
          children: [],
        });
        if (roleGroup.conditions && roleGroup.conditions.length > 0) {
          roleGroup.conditions.forEach(
            async (condition: any, cIndex: number) => {
              let index = rIndex + "-" + cIndex;
              let label = await this.getDisplayName(condition);
              let children: any[] = [];
              if (condition.myspType === "PropertyCondition") {
                if (condition.myspType === "PropertyCondition") {
                  if (condition.skipConditionIfMainOperandIsEmpty)
                    children.push({
                      label: this.getSkipMailOperandAlert(condition),
                      key: "",
                      index: index,
                    });
                  if (condition.skipConditionIfSecondaryOperandIsEmpty)
                    children.push({
                      label: this.getSkipSecondOperandAlert(condition),
                      key: "",
                      index: index,
                    });
                }
              }
              this.treeItems[rIndex].children.push({ index, label, children });
            }
          );
        }
      });
      this.$emit("update:data", this.roleGroups);
    }
  }

  get currentWorkflow() {
    return WorkflowModule.ActiveWorkflow;
  }

  get flowSteps() {
    return this.currentWorkflow?.flowSteps;
  }

  async getDisplayName(condition: any) {
    switch (condition.myspType) {
      case "PropertyChangeCondition":
        return await this.getPropertyChangeName(condition);
      case "TransitionCondition":
        return "Workflow is about to " + this.getTransitionName(condition);
      case "PropertyCondition":
        return await this.getPropertyName(condition);
      case "ItemSetCondition":
        return await this.getItemsetName(condition);
      case "WorkflowCondition":
        return await this.getWorkflowName(condition);
      case "StatusCondition":
        return await this.getStatusName(condition);
      case "EntityCategoryCondition":
        return await this.getEntityName(condition);
      case "JavascriptCondition":
        return this.getJavascriptName(condition);
      case "AttachmentCondition":
        return this.getAttachmentName(condition);
      default:
        return "";
    }
  }

  async getAttachmentName(condition: AttachmentCondition | any) {
    let str = "";
    if (condition?.mainOperand && condition.mainOperand.length >= 0) {
      let rs = await EntitiesModule.getEntity(condition.mainOperand[0].value);
      let property = rs.properties.find(
        (prop: any) => prop.systemName === condition.mainOperand[1].key
      );
      str += `[Workflow(${rs.displayName}): ${property?.displayName}]`;
    }
    if (condition.step) {
      str += " " + condition.step;
    }
    str += " " + (!condition.contains ? "does not contain" : "contains");
    if (condition.attachmentType) str += " " + condition.attachmentType;
    return str;
  }

  getJavascriptName(condition: JavascriptCondition | any) {
    let str = "";
    if (condition.displayName) str += condition.displayName;
    return str;
  }
  async getEntityName(condition: EntityCategoryCondition | any) {
    let str: string = "";
    let rs: any = null;
    let property: any = null;
    if (condition?.mainOperand && condition.mainOperand.length >= 0) {
      rs = await EntitiesModule.getEntity(condition.mainOperand[0].value);
      let property = rs.properties.find(
        (prop: any) => prop.systemName === condition.mainOperand[1].key
      );
      str += `[Workflow(${rs.displayName}): Category : ${property.displayName}]`;
    }
    if (condition.operator) {
      str += " " + condition.operator;
    }

    if (
      condition.secondOperandIsProperty &&
      condition.secondaryOperand &&
      condition.secondaryOperand.length > 0
    ) {
      str += ` [Workflow(${condition.secondaryOperand[0].key}): ${condition.secondaryOperand[1].key}]`;
    }
    return str;
  }

  async getWorkflowName(condition: WorkflowCondition | any) {
    let str: string = "";
    if (condition?.mainOperand && condition.mainOperand.length >= 0) {
      let rs = await EntitiesModule.getEntity(condition.mainOperand[0].value);
      let property = rs.properties.find(
        (prop: any) => prop.systemName === condition.mainOperand[1].key
      );
      str += `[Workflow(${rs.displayName}): ${property?.displayName}]`;
    }
    if (condition.step) {
      str += " " + condition.step;
    }
    return str;
  }

  async getStatusName(condition: WorkflowCondition | any) {
    let str: string = "";
    if (condition?.mainOperand && condition.mainOperand.length >= 0) {
      let rs = await EntitiesModule.getEntity(condition.mainOperand[0].value);
      let property = rs.properties.find(
        (prop: any) => prop.systemName === condition.mainOperand[1].key
      );
      str += `[Workflow(${rs.displayName}): Status: ${property?.displayName}]`;
    }
    if (condition.step) {
      str += " " + condition.step;
    }
    return str;
  }

  async getItemsetName(condition: ItemSetCondition | any) {
    let str = "";
    if (condition?.property?.length > 1) {
      let rs = await EntitiesModule.getEntity(condition.property[0].value);
      let property: any = rs.properties.find(
        (prop: any) => prop.systemName === condition.property[1].key
      );
      str += `[Workflow(${rs.displayName}): ${property.displayName}] is about to change`;
    }
    return str;
  }

  async getPropertyChangeName(condition: PropertyChangeCondition | any) {
    let str = "";
    if (condition?.property?.length > 1) {
      let rs = await EntitiesModule.getEntity(condition.property[0].value);
      let property: any = rs.properties.find(
        (prop: any) => prop.systemName === condition.property[1].key
      );
      str += `[Workflow(${rs.displayName}): ${property.displayName}] is about to change`;
    }
    if (condition.newValueCanBeEmpty) {
      str += " a empty value";
    } else {
      str += " a non-empty value";
    }
    return str;
  }

  async getPropertyName(condition: PropertyCondition | any) {
    let str: string = "";
    let rs: any = null;
    let property: any = null;
    if (condition?.mainOperand && condition.mainOperand.length >= 0) {
      rs = await EntitiesModule.getEntity(condition.mainOperand[0].value);
      property = rs.properties.find(
        (prop: any) => prop.systemName === condition.mainOperand[1].key
      );
      str += `[Workflow(${rs.displayName}): ${property.displayName}]`;
    }
    if (condition.operator) {
      let dataType = 1;
      if (property) dataType = property?.dataType?.value;
      let operators = await FormsModule.getOperatorsByDataType(parseInt(dataType));
      let operator = operators.find( x => x.value === condition.operator);
      str += " " + (operator?.key ? operator?.key: "");
    }

    if (
      condition.secondOperandIsProperty &&
      condition.secondaryOperand &&
      condition.secondaryOperand.length > 0
    ) {
      rs = await EntitiesModule.getEntity(condition.mainOperand[0].value);
      property = rs.properties.find(
        (prop: any) => prop.systemName === condition.secondaryOperand[1].key
      );
      str += ` [Workflow(${rs.displayName}): ${property.displayName}]`;
    } else if (
      condition.secondOperandIsApplicationPreference &&
      condition.secondaryOperand
    ) {
      str += ` ${condition.secondaryOperand[0].displayName}`;
    } else if (
      condition.secondaryOperand &&
      condition.secondaryOperand.length === 1
    ) {
      str += ` ${condition.secondaryOperand[0].value}`;
    }
    return str;
  }

  async getSkipMailOperandAlert(condition: PropertyCondition | any) {
    if (
      condition.skipConditionIfMainOperandIsEmpty &&
      condition.mainOperand &&
      condition.mainOperand.length > 0
    ) {
      let rs = await EntitiesModule.getEntity(condition.mainOperand[0].value);
      let property = rs.properties.find(
        (prop: any) => prop.systemName === condition.mainOperand[1].key
      );
      return `Skip if [Form (${condition.mainOperand[0].displayName}): ${condition.mainOperand[1].displayName}] is empty`;
    } else return "";
  }

  getSkipSecondOperandAlert(condition: PropertyCondition | any): string | any {
    if (
      condition.skipConditionIfSecondaryOperandIsEmpty &&
      condition.secondaryOperand &&
      condition.secondaryOperand.length >= 0
    ) {
      if (condition.secondOperandIsProperty)
        return `Skip if [Form (${condition.secondaryOperand[0].displayName}): ${condition.secondaryOperand[1].displayName}] is empty`;
      else if (condition.secondOperandIsApplicationPreference) {
        return `Skip if [Form (${condition.secondaryOperand[0].displayName})] is empty`;
      } else {
        return `Skip if [Form (${condition.secondaryOperand[0]})] is empty`;
      }
    } else return "";
  }

  getTransitionName(step: TransitionCondition) {
    let flowstep = this.flowSteps?.find(
      (flow) => flow.statusSystemName === step.stepSystemName
    );
    let displayName = flowstep?.displayName ? flowstep?.displayName : "";

    switch (step.type) {
      case 0:
        switch (step.stepsToIncludeType) {
          case 0:
            return "Progress";
          case 2:
            return `Progress to step ${displayName} or beyound it.`;
          case 3:
            return `Progress to step ${displayName} or before it.`;
        }
        break;
      case 1:
        switch (step.stepsToIncludeType) {
          case 0:
            return "Regress";
          case 2:
            return `Regress to step ${displayName} or beyound it.`;
          case 3:
            return `Regress to step ${displayName} or before it.`;
        }
        break;
      case 2:
        switch (step.stepsToIncludeType) {
          case 0:
            return "Move to side step.";
          case 1:
            return `Move to side step ${displayName}.`;
        }
        break;
      case 3:
        switch (step.stepsToIncludeType) {
          case 0:
            return "Return to main flow";
          case 2:
            return `Return to step ${displayName} or beyound it.`;
          case 3:
            return `Return to step ${displayName} or before it.`;
        }
        break;
    }
  }

  get showFiltersButton() {
    return !!this.visibleFilters.length;
  }

  get showConditionsButton() {
    return !!this.visibleConditions.length || this.itemSelected;
  }

  get languagesPresentationModel() {
    return LanguagesPresentationModel;
  }

  private lpmInstance = LanguagesPresentationModel.getInstance();

  onSave(condition: any) {
    console.log("condition", condition);
    if (!this.currentRoleGroup) this.currentRoleGroup = new RoleGroup();

    if (this.selectedRoleGroupIndex === -1)
      this.selectedRoleGroupIndex = this.roleGroups.length;

    let children: any = [];

    if (this.selectedConditionIndex === -1) {
      this.selectedConditionIndex = this.currentRoleGroup.conditions.length;
      this.currentRoleGroup.conditions.push(condition);
    } else {
      this.currentRoleGroup.conditions[this.selectedConditionIndex] = condition;
    }
    this.roleGroups[this.selectedRoleGroupIndex] = this.currentRoleGroup;
    this.currentCondition = condition;
    this.$emit("update:data", this.roleGroups);
  }

  handleNodeClick(data: any) {
    console.log("index", data.index);
    this.itemSelected = true;
    let index = "" + data.index;
    // if (data.index) {
    let ids = index.split("-");
    this.selectedRoleGroupIndex = +ids[0];
    this.currentRoleGroup = this.roleGroups[this.selectedRoleGroupIndex];
    if (ids.length > 1) {
      this.selectedConditionIndex = +ids[1];
      this.currentCondition = this.currentRoleGroup.conditions[
        this.selectedConditionIndex
      ];
      this.isEditCondition = true;
    } else {
      this.isEditCondition = false;
      this.selectedConditionIndex = -1;
      this.currentCondition = null;
    }
    this.selectedFilterKey = data.key;
    // }
    console.log("currentCon", this.currentCondition);
  }
  //
  private isEditCondition = false;
  newFilterHandler(command: string) {
    this.isEditCondition = true;

    this.selectedConditionIndex = -1;
    switch (command) {
      case "PropertyCondition":
        this.currentCondition = new PropertyCondition();
        break;
      case "ItemSetCondition":
        this.currentCondition = new ItemSetCondition();
        break;
      case "WorkflowCondition":
        this.currentCondition = new WorkflowCondition();
        break;
      case "StatusCondition":
        this.currentCondition = new StatusCondition();
        break;
      case "EntityCategoryCondition":
        this.currentCondition = new EntityCategoryCondition();
        break;
      case "JavascriptCondition":
        this.currentCondition = new JavascriptCondition();
        break;
      case "AttachmentCondition":
        this.currentCondition = new AttachmentCondition();
        break;
      case "PropertyChangeCondition":
        this.currentCondition = new PropertyChangeCondition();
        break;
      case "TransitionCondition":
        this.currentCondition = new TransitionCondition();
        break;
      default:
        break;
    }
    this.editCondition();
  }

  editCondition() {
    console.log("isCon", this.isEditCondition);
    if (this.isEditCondition) {
      this.showFilterModal[this.currentCondition.myspType] = true;
      console.log(
        this.currentCondition.myspType,
        this.showFilterModal[this.currentCondition.myspType]
      );
    } else {
      console.log("roleIn", this.selectedRoleGroupIndex);
      if (this.selectedRoleGroupIndex !== -1) {
        this.showRoleGroupPopup("new");
      }
    }
  }

  onDelete() {
    let index = -1;
    if (this.isEditCondition) {
      if (this.selectedConditionIndex === -1 && this.currentRoleGroup) {
        this.currentRoleGroup.conditions.splice(
          this.currentRoleGroup.conditions.length - 1,
          1
        );
      } else if (this.selectedConditionIndex !== -1 && this.currentRoleGroup) {
        this.currentRoleGroup.conditions.splice(this.selectedConditionIndex, 1);
      }
      this.roleGroups[this.selectedRoleGroupIndex] = this.currentRoleGroup;
    } else {
      if (this.selectedRoleGroupIndex === -1) {
        this.roleGroups.splice(this.roleGroups.length - 1, 1);
      } else {
        this.roleGroups.splice(this.selectedRoleGroupIndex, 1);
      }
    }
    this.currentCondition = new BaseCondition();
  }

  updateTreeChildren(key: string, childNodeData: any, initialLabel: string) {
    if (this.treeItems?.length === 0) return;
    let label = initialLabel;
    if (childNodeData[key].length) {
      label += childNodeData[key].join(" or ");
    } else {
      this.treeItems[0].children = this.treeItems[0].children.filter(
        (item: ITreeRole) => item.key !== key
      );
    }
    let flag = false;
    this.treeItems[0].children.forEach((item: ITreeRole) => {
      if (item.key === key) {
        item.label = label;
        flag = true;
      }
    });
    if (!flag && childNodeData[key].length) {
      this.treeItems[0].children.push({
        label,
        key,
        children: [],
      });
    }
  }

  showRoleGroupPopup(state: string, authNodesSystemNames: [] = []): void {
    this.isEditCondition = false;
    this.selectedRoleGroupIndex = -1;
    const shouldShowEveryoneButton: boolean = this.checkIfNewRoleGroup(
      this.lpmInstance.getLocalizedString(LanguagesPresentationModel.EVERYONE)
    );

    if (state === "new") {
      this.currentRoleGroup = new RoleGroup();
    }

    this.newRoleGroupModalData.visible = true;
    this.newRoleGroupModalData.state = state;
    this.newRoleGroupModalData.shouldShowEveryoneButton = shouldShowEveryoneButton;
    this.newRoleGroupModalData.authNodesSystemNames = authNodesSystemNames;
  }

  addNewRoleGroup(roleGroupName: string | null, nodeSystemNames: any[]): void {
    if (this.selectedRoleGroupIndex !== -1 && this.currentRoleGroup) {
      this.currentRoleGroup.authorizationNodeNames = nodeSystemNames;
      this.currentRoleGroup.title = roleGroupName;
      this.treeItems[this.selectedRoleGroupIndex].label = roleGroupName;
    } else if (
      this.selectedRoleGroupIndex === -1 &&
      this.checkIfNewRoleGroup(roleGroupName)
    ) {
      const newRoleGroup: RoleGroup = new RoleGroup();

      if (roleGroupName === "Everyone") {
        newRoleGroup.everyone = true;
      } else {
        newRoleGroup.authorizationNodeNames = nodeSystemNames;
      }

      newRoleGroup.conditions = [];
      newRoleGroup.title = roleGroupName;
      this.currentRoleGroup = newRoleGroup;
      this.selectedRoleGroupIndex = this.roleGroups.length;
      this.roleGroups.push(newRoleGroup);
      this.treeItems.push({
        label: roleGroupName,
        children: [],
        index: this.selectedRoleGroupIndex,
      });
    }
    this.isEditCondition = false;
  }

  get getTreeItems() {
    return this.treeItems;
  }

  deleteHandler() {
    if (this.selectedFilterKey === "everyone") {
      this.filterData = this.defaultFilterData;
    } else {
      this.filterData[this.selectedFilterKey] = this.defaultFilterData[
        this.selectedFilterKey
      ];
    }
  }

  newRoleGroupOkHandler() {
    console.log("hello, just clicked Ok Button");
  }

  private checkIfNewRoleGroup(roleGroupName: string | null): boolean {
    const duplicatedTreeItems = this.roleGroups.filter((roleGroup) => {
      return roleGroup.title === roleGroupName && !roleGroup.everyone;
    });

    return !duplicatedTreeItems.length;
  }

  created() {}
}
</script>

<style lang="scss" scoped>
.outer-modal-container {
  .command-container {
    margin: 20px 0;
    .command-button {
      text-align: left;
      .button-text {
        text-decoration: underline;
      }
    }
  }
  .table-container {
    width: 100%;
    height: 260px;
    border: 1px solid lightgrey;
    overflow: auto;
  }
  .table-container-small {
    height: 100px;
  }
}
</style>

<style lang="scss">
.el-dialog__footer {
  border: none !important;
  align-items: center;
}
</style>
