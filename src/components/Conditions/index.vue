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
            <el-dropdown-menu slot="dropdown" style="margin-top: 0">
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
            <el-dropdown-menu slot="dropdown" style="margin-top: 0">
              <el-dropdown-item
                v-for="condition in conditionsList"
                :key="condition.id"
                :command="condition.id"
              >
                {{ condition.label }} Conditions...
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="2" class="command-button">
          <el-button type="text" icon="el-icon-edit-outline" @click="editCondition">
            <span class="button-text">Edit</span>
          </el-button>
        </el-col>
        <el-col :span="2" class="command-button">
          <el-button type="text" icon="el-icon-delete">
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
            <div style="display: flex; align-items: center">
              <el-image
                style="width: 20px; height: 20px"
                :src="
                  data.key === `everyone`
                    ? `/assets/img/approved-by-32x32.png`
                    : `/assets/img/User-set-in-an-application-preference16x16.png`
                "
              />
              <span style="margin-left: 5px">
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
    <entity-condition-modal key="status"
      :dialogVisible.sync="showFilterModal['StatusCondition']"
      :condition.sync="currentCondition"
      @onSave="onSave"
    />
    <entity-condition-modal key="entityCategory"
      :dialogVisible.sync="showFilterModal['EntityCategoryCondition']"
      :condition.sync="currentCondition"
      @onSave="onSave"
    />
    <attachment-condition-modal
      :dialogVisible.sync="showFilterModal['AttachmentCondition']"
      :condition.sync="currentCondition"
      @onSave="onSave"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import NewRoleGroupModal from "./newRoleGroupModal.vue";
import { RoleGroup } from "@/models/RoleGroup";
import { Restriction } from "@/models/Restriction";
import { AuthorizationTree } from "@/models/authorizations/AuthorizationTree";
import { LanguagesPresentationModel } from "@/models/Utils/LanguagesPresentationModel";
import PropertyFilter from "./components/propertyFilter.vue";
import ItemsetConditionModal from "./components/itemSet.vue";
import WorkflowConditionModal from "./components/workflow.vue";
import EntityConditionModal from "./components/entityFilter.vue";
import AttachmentConditionModal from "./components/attachmentFilter.vue";

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
  JavascriptCondition
} from "@/models/Conditions";

interface ITreeRole {
  label: String;
  key: String;
  children: ITreeRole[];
}

@Component({
  name: "",
  components: {
    NewRoleGroupModal,
    PropertyFilter,
    ItemsetConditionModal,
    WorkflowConditionModal,
    EntityConditionModal,
    AttachmentConditionModal,
  },
})
export default class extends Vue {
  @Prop({ required: true }) private data!: any;
  @Prop({ required: false, default: () => [] })
  private visibleFilters!: string[];
  @Prop({ required: false, default: () => [] })
  private visibleConditions!: string[];
  @Prop({ required: false }) conditionsDivHeight!: boolean;

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
  private currentRoleGroup: RoleGroup | null = new RoleGroup();
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

    let children: any = [];

    if (this.selectedConditionIndex === -1) {
      this.selectedConditionIndex = this.currentRoleGroup.conditions.length;
      this.currentRoleGroup.conditions.push(condition);
      this.roleGroups[this.selectedRoleGroupIndex] = this.currentRoleGroup;
      let index: string =
        "" +
        this.selectedRoleGroupIndex +
        "-" +
        this.selectedConditionIndex;
      this.treeItems[this.selectedRoleGroupIndex].children.push({
        key: "",
        label: condition.getDisplayName(),
        index: index,
        children: children ? children : [],
      });
      if (condition.myspType === "PropertyCondition") {
        if (condition.skipConditionIfMainOperandIsEmpty)
          children.push({
            label: condition.getSkipMailOperandAlert(),
            key: "",
            index: index,
          });
        if (condition.skipConditionIfSecondaryOperandIsEmpty)
          children.push({
            label: condition.getSkipSecondOperandAlert(),
            key: "",
            index: index,
          });
      }
    } else {
      let index: string =
        "" +
        this.selectedRoleGroupIndex +
        "-" +
        this.currentRoleGroup.conditions.length;
      this.currentRoleGroup.conditions[this.selectedConditionIndex] = condition;
      this.treeItems[this.selectedRoleGroupIndex].children[
        this.selectedConditionIndex
      ].label = condition.getDisplayName();
      this.treeItems[this.selectedRoleGroupIndex].children[
        this.selectedConditionIndex
      ].children = children ? children : [];
      if (condition.myspType === "PropertyCondition") {
        if (condition.skipConditionIfMainOperandIsEmpty)
          children.push({
            label: condition.getSkipMailOperandAlert(),
            key: "",
            index: index,
          });
        if (condition.skipConditionIfSecondaryOperandIsEmpty)
          children.push({
            label: condition.getSkipSecondOperandAlert(),
            key: "",
            index: index,
          });
      }
    }

    this.currentCondition = condition;
  }

  handleNodeClick(data: any) {
    this.itemSelected = true;
    if (data.index) {
      let ids = data.index.split("-");
      this.selectedRoleGroupIndex = ids[0];
      this.currentRoleGroup = this.roleGroups[this.selectedRoleGroupIndex];
      if (ids.length > 1) {
        this.selectedConditionIndex = ids[1];
        this.currentCondition = this.currentRoleGroup.conditions[this.selectedConditionIndex];
      } else {
        this.selectedConditionIndex = -1;
        this.currentCondition = null;
      }
      this.selectedFilterKey = data.key;
    }
    console.log('currentCon', this.currentCondition)
  }

  newFilterHandler(command: string) {
    console.log("command", command);
    this.selectedConditionIndex = -1;
    switch(command) {
      case 'PropertyCondition':
        this.currentCondition = new PropertyCondition();
        break;
      case 'ItemSetCondition':
        this.currentCondition = new ItemSetCondition();
        break;
      case 'WorkflowCondition':
        this.currentCondition = new WorkflowCondition();
        break;
      case 'StatusCondition':
        this.currentCondition = new StatusCondition();
        break;
      case 'EntityCategoryCondition':
        this.currentCondition = new EntityCategoryCondition();
        break;
      case 'JavascriptCondition':
        this.currentCondition = new JavascriptCondition();
        break;
      case 'AttachmentCondition':
        this.currentCondition = new AttachmentCondition();
        break;
      default: 
        break;
    }
    this.editCondition();
  }

  editCondition() {
    this.showFilterModal[this.currentCondition.myspType] = true;
    console.log(this.currentCondition.myspType,this.showFilterModal[this.currentCondition.myspType]);
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
    const shouldShowEveryoneButton: boolean = this.checkIfNewRoleGroup(
      this.lpmInstance.getLocalizedString(LanguagesPresentationModel.EVERYONE)
    );

    if (state === "new") {
      this.currentRoleGroup = new RoleGroup();
    }

    this.newRoleGroupModalData.visible = true;
    this.newRoleGroupModalData.state = state;
    this.newRoleGroupModalData.shouldShowEveryoneButton =
      shouldShowEveryoneButton;
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

      if (roleGroupName === "Everyone" && !nodeSystemNames) {
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
  }

  get getTreeItems() {
    return this.treeItems;
  }

  deleteHandler() {
    if (this.selectedFilterKey === "everyone") {
      this.filterData = this.defaultFilterData;
    } else {
      this.filterData[this.selectedFilterKey] =
        this.defaultFilterData[this.selectedFilterKey];
    }
  }

  newRoleGroupOkHandler() {
    console.log("hello, just clicked Ok Button");
  }

  private checkIfNewRoleGroup(roleGroupName: string | null): boolean {
    const duplicatedTreeItems = this.treeItems.filter((roleGroup) => {
      return roleGroup.label === roleGroupName && !roleGroup.everyone;
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
    height: 250px;
    border: 1px solid lightgrey;
    overflow: auto;
  }
  .table-container-small {
    height: 50px;
  }
}
</style>



<style lang="scss">
.el-dialog__footer {
  border: none !important;
  align-items: center;
}
</style>
