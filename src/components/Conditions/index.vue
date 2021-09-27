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
          <el-button type="text" icon="el-icon-edit-outline">
            <span class="button-text">Edit</span>
          </el-button>
        </el-col>
        <el-col :span="2" class="command-button">
          <el-button type="text" icon="el-icon-delete" @click="deleteHandler">
            <span class="button-text">Delete</span>
          </el-button>
        </el-col>
      </el-row>
      <div
        class="table-container"
        :class="conditionsDivHeight ? 'table-container-small' : ''"
      >
        <el-tree
          :data="treeItems"
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
      :dialogVisible.sync="showFilterModal['property']"
      @onPropertyFilterComplete="resultPropertyFilter"
      :propertyFilterData="propertyFilterData"
    />
    <itemset-condition
      :dialogVisible.sync="showFilterModal['itemset']"
      @onItemsetComplete="resultItemset"
    />
    <workflow-condition
      :dialogVisible.sync="showFilterModal['workflow']"
      @onWorkflowComplete="resultWorkflow"
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
import ItemsetCondition from "./components/itemSet.vue";
import WorkflowCondition from "./components/workflow.vue";

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
    ItemsetCondition,
    WorkflowCondition,
  },
})
export default class extends Vue {
  @Prop({ required: true }) private data!: any;
  @Prop({ required: false, default: () => [] })
  private visibleFilters!: string[];
  @Prop({ required: false, default: () => [] })
  private visibleConditions!: string[];
  @Prop({ required: false }) conditionsDivHeight!: boolean;

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
        value: null,
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
    { id: "property", label: "Property" },
    { id: "itemset", label: "Item Set" },
    { id: "workflow", label: "Workflow" },
    { id: "status", label: "Status" },
    { id: "entityCategory", label: "Entity category" },
    { id: "javascript", label: "Javscript" },
    { id: "attachement", label: "Attachment" },
  ];

  private filtersList = [
    { id: "state", label: "State" },
    { id: "entityCategory", label: "Entity category" },
    { id: "userRole", label: "Logged in user role" },
    { id: "property", label: "Property" },
    { id: "sql", label: "SQL" },
  ];

  private treeItems: any[] = [];
  private defaultTreeProps = {
    children: "children",
    label: "label",
  };

  private authorizationTree: AuthorizationTree = new AuthorizationTree();
  private currentRoleGroup: RoleGroup | null = new RoleGroup();
  private allowedNodeTypes = [];

  private propertyFilterData = {
    propertyFirst: {
      displayName: "",
      value: null,
    },
    propertySecond: {
      displayName: "",
      value: null,
    },
    condition: "",
    skipCheckList: [],
  };

  private showFilterModal: any = {
    state: false,
    entityCategory: false,
    userRole: false,
    property: false,
    sql: false,
    itemset: false,
    workflow: false,
  };

  private filterData = this.defaultFilterData;
  private selectedFilterKey = "";

  private newRoleGroupModalData = {
    state: "new",
    shouldShowEveryoneButton: true,
    authNodesSystemNames: [],
    visible: false,
  };

  get showFiltersButton() {
    return !!this.visibleFilters.length;
  }

  get showConditionsButton() {
    return !!this.visibleConditions.length;
  }

  get languagesPresentationModel() {
    return LanguagesPresentationModel;
  }

  private lpmInstance = LanguagesPresentationModel.getInstance();

  @Watch("getFilterData", { deep: true, immediate: true })
  private changeTreeData(data: any, oldData: any) {
    const stateLabel = "State is ";
    this.updateTreeChildren("state", data, stateLabel);

    const userRoleLabel = "Logged in user is assigned to role ";
    this.updateTreeChildren("userRole", data, userRoleLabel);

    const newData = Object.assign({}, data);
    newData.sql = data.sql.displayName ? [data.sql.displayName] : [];
    this.updateTreeChildren("sql", newData, "");

    if (oldData && data) {
      if (this.treeItems?.length === 0) {
        this.treeItems.push({ label: "everyone", children: [] });
      }

      if (data.property !== oldData.property) {
        this.treeItems[0].children.push({
          label: data.property.label,
          key: "property",
          children: data.property.children,
        });
      }

      if (data.workflow !== oldData.workflow) { console.log('watch workflow', data.workflow)
        let str: string = "";
        if (data.workflow.property.displayName) str += data.workflow.property.displayName;
        if (data.workflow.condition) str += " " + data.workflow.condition;
        if (data.workflow.step) str += " " + data.step;
        this.treeItems[0].children.push({
          label: str,
          key: "workflow"
        });
      }
    }
  }

  get getFilterData() {
    return Object.assign({}, this.filterData);
  }

  resultPropertyFilter(items: any) {
    if (items) {
      this.propertyFilterData = { ...items };
      this.filterData.property.label = "";
      if (items.propertyFirst)
        this.filterData.property.label +=
          this.propertyFilterData.propertyFirst.displayName;
      if (items.conditio)
        this.filterData.property.label +=
          " " + this.propertyFilterData.condition;
      if (items.propertySecond)
        this.filterData.property.label +=
          " " + this.propertyFilterData.propertySecond.displayName;
      if (items?.skipCheckList?.length > 0) {
        for (let value of items.skipCheckList) {
          this.filterData.property.children.push({
            label: `Skip if ${items[value].displayName} is empty`,
          });
        }
      }
      console.log("this.filterData", this.filterData);
    }
  }

  resultItemset(items: any) {}

  resultWorkflow(items: any) {
    if (items) {
      this.filterData.workflow = { ...items };
      console.log('workflow',this.filterData)
    }
  }

  handleNodeClick(data: any) {
    this.selectedFilterKey = data.key;
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
      this.currentRoleGroup = null;
    }

    this.newRoleGroupModalData.visible = true;
    this.newRoleGroupModalData.state = state;
    this.newRoleGroupModalData.shouldShowEveryoneButton =
      shouldShowEveryoneButton;
    this.newRoleGroupModalData.authNodesSystemNames = authNodesSystemNames;
  }

  addNewRoleGroup(roleGroupName: string | null, nodeSystemNames: any[]): void {
    if (this.currentRoleGroup) {
      this.currentRoleGroup.authorizationNodeNames = nodeSystemNames;
      this.currentRoleGroup.title = roleGroupName;
    } else if (this.checkIfNewRoleGroup(roleGroupName)) {
      const newRoleGroup: RoleGroup = new RoleGroup();

      if (roleGroupName === "Everyone" && !nodeSystemNames) {
        newRoleGroup.everyone = true;
      } else {
        newRoleGroup.authorizationNodeNames = nodeSystemNames;
      }

      newRoleGroup.conditions = [];
      newRoleGroup.title = roleGroupName;
      this.treeItems.push({ label: roleGroupName, children: [] });
      console.log(this.treeItems);
    }
  }

  newFilterHandler(command: string) {
    console.log("command", command);
    this.showFilterModal[command] = true;
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

  created() {
    this.filterData = this.defaultFilterData;
  }
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
