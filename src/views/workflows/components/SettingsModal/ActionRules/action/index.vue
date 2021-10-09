<template>
  <div class="action">
    <el-row class="action__row">
      <el-col :span="6">
        <el-button type="text"> </el-button>

        <el-dropdown
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
            >{{ newAction.value }}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="6">
        <el-button
          type="text"
          @click="onEdit()"
          :disabled="selectedAction === -1"
        >
          <i class="el-icon-edit"></i>
          Edit
        </el-button>
      </el-col>
      <el-col :span="6">
        <el-button
          type="text"
          @click="onDelete"
        >
          <i class="el-icon-delete-solid"></i>
          Delete
        </el-button>
      </el-col>
    </el-row>
    <el-row class="action__row">
      <el-col
        class="action__row--detail"
        :class="conditionsDivHeight ? 'action__row--detail-small' : ''"
      >
        <el-tree
          ref="elTree"
          class="tree-content"
          :data="actionsTree"
          node-key="systemName"
          default-expand-all
          highlight-current
          :expand-on-click-node="false"
          @node-click="onNodeClick"
        >
          <span
            slot-scope="{ node, data }"
            class="custom-tree-node"
          >
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
      </el-col>
    </el-row>
    <div class="action__row--text">Drag items to re-order</div>
    <xml-action-modal
      :dialogVisible.sync="newActionListVisible['XMLAction']"
      :action="currentAction"
      @onSave="onSave"
    />
    <set-property-action-modal
      :dialogVisible.sync="newActionListVisible['PropertyCondition']"
      :condition="currentAction"
      @onSave="onSave"
    />
    <move-workflow-action-modal
      :dialogVisible.sync="newActionListVisible['MoveWorkflowAction']"
      :action="currentAction"
      @onSave="onSave"
    />
    <itemset-action-modal
      :dialogVisible.sync="newActionListVisible['ItemsetAction']"
      :condition.sync="currentAction"
      @onSave="onSave"
    />
    <new-integraion-action-modal
      :dialogVisible.sync="newActionListVisible['IntegrationAction']"
      :action="currentAction"
      @onSave="onSave"
    />
  </div>
</template>

<script lang="ts">
import { ActionWorkflowRule } from "@/models/Workflows/ActionWorkflowRule";
import { WorkflowModule } from "@/store/modules/WorkflowMod";
import { EntitiesModule } from "@/store/modules/entitiesMod";
import { forEach } from "lodash";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import XmlActionModal from "./XmlRule.vue";
import SetPropertyActionModal from "./setProperty.vue";
import MoveWorkflowActionModal from "./moveToWorkflow.vue";
import NewIntegraionActionModal from "./newIntegraion.vue";
import ItemsetActionModal from "./newItemSet.vue";

import {
  BaseAction,
  XMLAction,
  MoveWorkflowAction,
  IntegrationAction,
  ItemsetAction,
} from "@/models/Workflows/Actions";
import { PropertyCondition, BaseCondition } from "@/models/Conditions";

@Component({
  name: "action-tree",
  components: {
    XmlActionModal,
    SetPropertyActionModal,
    MoveWorkflowActionModal,
    NewIntegraionActionModal,
    ItemsetActionModal,
  },
})
export default class extends Vue {
  @Prop({ required: true }) data!: any[];
  @Prop({ required: false }) conditionsDivHeight!: boolean;

  private newActionList = [
    { id: "PropertyCondition", value: "Set property value" },
    { id: "MoveWorkflowAction", value: "Move workflow" },
    { id: "XMLAction", value: "XML action" },
    { id: "ItemsetAction", value: "Item set action" },
    { id: "IntegrationAction", value: "Integration Operation" },
  ];

  private newActionListVisible: any = {
    PropertyCondition: false,
    MoveWorkflowAction: false,
    XMLAction: false,
    ItemsetAction: false,
    IntegrationAction: false,
  };

  private currentAction = new BaseCondition();

  private selectedAction = -1;

  private actionsTree: any[] = [];

  // @Watch("data", { deep: true, immediate: true })
  // setUp() {
  //   this.refresh();
  // }

  @Watch("currentAction", { deep: true, immediate: true })
  refresh() {
    this.actionsTree = [];
    if (this.data?.length > 0) {
      this.data.forEach(async (action, index) => {
        let label = await this.getDisplayName(action);
        this.actionsTree.push({
          label: label,
          index: index,
        });
      });
    }
  }

  async getDisplayName(action: any) {
    switch (action.myspType) {
      case "XMLAction":
        return this.getXMLActionName(action);
      case "MoveWorkflowAction":
        return await this.getMoveWorkflowActionName(action);
      case "IntegrationAction":
        return this.getIntegrationActionName(action);
      case "ItemsetAction":
        return this.getItemsetActionName(action);
      case "PropertyCondition":
        return await this.getPropertyName(action);
      default:
        return "";
    }
  }

  async getPropertyName(condition: PropertyCondition | any) {
    let str: string = "";
    let rs: any = null;
    let property: any = null;
    if (condition?.mainOperand && condition.mainOperand.length >= 0) {
      rs = await EntitiesModule.getEntity(condition.mainOperand[0].value);
      let property = rs.properties.find(
        (prop: any) => prop.systemName === condition.mainOperand[1].key
      );
      str += `[Workflow(${rs.displayName}): ${property.displayName}]`;
    }
    if (condition.operator) {
      str += " " + condition.operator;
    }

    if (
      condition.secondOperandIsProperty &&
      condition.secondaryOperand &&
      condition.secondaryOperand.length > 0
    ) {
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
      str += ` ${condition.secondaryOperand[0]}`;
    }
    return str;
  }

  getItemsetActionName(action: ItemsetAction) {
    return action.name ? action.name : "";
  }

  async getMoveWorkflowActionName(action: MoveWorkflowAction) {
    let str: string = "";
    if (action.item.length > 0) {
      let rs = await EntitiesModule.getEntity(action.item[0].value);
      str += "Move workflow of item [Workflow" + rs.displayName + "]";
    }
    if (action.stepSystemName)
      str += "to Step ['" + action.stepSystemName + "']";
    return str;
  }

  getIntegrationActionName(action: IntegrationAction) {
    let str: string = "";
    if (action.name) str += action.name;
    return str;
  }

  getXMLActionName(action: XMLAction) {
    let str: string = "";
    if (action.name) str += action.name;
    return action.name;
  }

  onNodeClick(data: any) {
    this.selectedAction = data.index;
    this.currentAction = this.data[this.selectedAction];
  }

  onSave(action: BaseCondition) {
    this.currentAction = action;
    if (this.selectedAction === -1) {
      this.data.push(action);
    } else {
      this.data[this.selectedAction] = action;
    }
  }

  onDelete() {
    if (this.data.length > 0) {
      if (this.selectedAction === -1) {
        this.data.splice(this.data.length - 1, 1);
      } else {
        this.data.splice(this.selectedAction, 1);
      }
    }
    this.currentAction = new BaseCondition();
  }

  onNewActionSelect(command: string) {
    console.log("ActionCommand", command);
    this.selectedAction = -1;

    switch (command) {
      case "PropertyCondition":
        this.currentAction = new PropertyCondition();
        break;
      case "MoveWorkflowAction":
        this.currentAction = new MoveWorkflowAction();
        break;
      case "XMLAction":
        this.currentAction = new XMLAction();
        break;
      case "ItemsetAction":
        this.currentAction = new ItemsetAction();
        break;
      case "IntegrationAction":
        this.currentAction = new IntegrationAction();
        break;
      default:
        break;
    }

    this.onEdit();
  }

  onEdit() {
    this.newActionListVisible[this.currentAction.myspType] = true;
    console.log(
      this.currentAction.myspType,
      this.newActionListVisible["ItemsetAction"]
    );
  }
}
</script>

<style lang="scss" scoped>
$border-color: #cacaca;

.action {
  &__row {
    margin-top: 10px;

    &--detail {
      border: 1px solid $border-color;
      height: 30vh;
      overflow-y: auto;

      &-small {
        height: 100px;
      }
    }

    &--text {
      height: 20px;
      color: #e4e4e4;
      font-style: italic;
    }

    &--last {
      height: calc(100% + 20px);
      padding-bottom: 20px;
    }
  }
}
</style>