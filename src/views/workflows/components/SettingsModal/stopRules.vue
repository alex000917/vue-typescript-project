<template>
  <el-container direction="vertical">
    <el-row
      type="flex"
      align="middle"
    >
      <el-image
        src="/assets/img/stop-rule-32x32.png"
        fit="fill"
      />
      <span style="font-size: 18px; margin-left: 5px">Action Rules</span>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-row>
        Action rules modify or move item's workflow. <br>
        For example: when item cancelled, cancel all child items as well.
      </el-row>
    </el-row>
    <el-row
      type="flex"
      justify="start"
      align="middle"
      style="margin-top: 5px"
    >
      <el-dropdown
        trigger="click"
        size="small"
        placement="bottom-start"
        style="margin-right: 8px;"
        @command="onNewStopRule"
      >
        <el-button type="text">
          <el-row
            type="flex"
            justify="center"
            align="middle"
          >
            <el-image
              src="/assets/img/stop-rule-16x16.png"
              style="padding-right: 5px"
            />
            New stop rule
          </el-row>
        </el-button>
        <el-dropdown-menu
          slot="dropdown"
          style="margin-top: 0"
        >
          <el-dropdown-item
            v-for="dropdown in newStopRuleDropDowns"
            :key="dropdown.id"
            :command="dropdown.id"
          >
            {{ dropdown.value }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="text" @click="onEdit()">
        <el-row
          type="flex"
          justify="center"
          align="middle"
        >
          <el-image
            src="/assets/img/edit16x16.png"
            style="padding-right: 5px"
          />
          Edit
        </el-row>
      </el-button>
      <el-button type="text" @click="onDelete()">
        <el-row
          type="flex"
          justify="center"
          align="middle"
        >
          <el-image
            src="/assets/img/delete-16x16.png"
            style="padding-right: 5px"
          />
          Delete
        </el-row>
      </el-button>
    </el-row>
    <el-row>
      <draggable
        v-model="myArray"
        class="draggable-list"
      >
        <transition-group>
          <el-row
            v-for="element in myArray"
            :key="element.order"
          >
            <el-button style="width: 100%; text-align: left;" 
             @click="selectNode(element.order)">
              {{ element.name }}
            </el-button>
          </el-row>
        </transition-group>
      </draggable>
    </el-row>
    <p class="require-content">
      Drag items to re-order
    </p>
    <el-row
      type="flex"
      align="middle"
      style="margin-top: 20px;"
    >
      <el-image src="/assets/img/information-32x32.png" />
      <span style="padding-left: 5px; font-weight: 600;">Stop rules are triggered after action rules.</span>
    </el-row>
    <attach-stop-rule
      :dialogVisible.sync="stopRuleVisible['AttachmentStopWorkflowRule']"
      @onSave="onSave"
      :action.sync="currentAction"
    />
    <xml-stop-rule
      :dialogVisible.sync="stopRuleVisible['XmlWorkflowRule']"
      @onSave="onSave"
      :action.sync="currentAction"
    />
    <stop-rule-wizard
      :visible-wizard.sync="stopRuleVisible['StopWorkflowRule']"
      :action.sync="currentAction"
      @onSave="onSave"
    />
  </el-container>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Draggable from "vuedraggable";
import AttachStopRule from "./StopRules/attachmentStopRule.vue";
import XmlStopRule from "./StopRules/XmlRule.vue";
import StopRuleWizard from "./StopRules/StopRuleWizard.vue";
import { WorkflowModule } from "@/store/modules/WorkflowMod";
import { StopWorkflowRule, XmlWorkflowRule, AttachmentStopWorkflowRule } from "@/models/Workflows/StopWorkflowRule"
import { BaseContent } from "@/models/BaseContent";

@Component({
  name: "",
  components: { Draggable, AttachStopRule, XmlStopRule, StopRuleWizard },
})
export default class extends Vue {
  newStopRuleDropDowns = [
    { id: "AttachmentStopWorkflowRule", value: "Attachment Stop Rule" },
    { id: "StopWorkflowRule", value: "Stop Rule Wizard" },
    { id: "XmlWorkflowRule", value: "Xml Rule" },
  ];

  ruleTree: StopWorkflowRule[] | any = [];
  disableEdit = true;
  selectedRule: string | null = null;

  private stopRuleVisible: any = {
    AttachmentStopWorkflowRule: false,
    StopWorkflowRule: false,
    XmlWorkflowRule: false,
  };

  private actions: BaseContent[] = [];
  private currentAction: BaseContent | any = new BaseContent();

  private selectedActionIndex = -1;

  myArray: any[] = [];

  private xmlAcion = new XmlWorkflowRule();

  get CurrentWorkflow() {
    return WorkflowModule.ActiveWorkflow;
  }

  mounted() {
    this.ruleTree = this.CurrentWorkflow?.stopWorkflowRules;

    if (this.ruleTree) {
      this.ruleTree.forEach((rule: any, key: number) => {
        this.myArray.push({
          name: rule.displayName,
          order: key,
          fixed: false
        });
      });
    }
    console.log('myarray',this.myArray)
    console.log(this.disableEdit);
  }

  @Watch("currentAction", { deep: true, immediate: true })
  refreshTree(val: BaseContent) {
    this.myArray = []
    if (this.ruleTree.length > 0) {      
      this.ruleTree.forEach((action: any, key: number) => {
        this.myArray.push({
          name: action.displayName,
          order: key,
          fixed: false,
        });
      });
    }
  }

  onSave(action: any) {
    console.log('ss',action);
    if (this.selectedActionIndex === -1) {
      this.ruleTree.push(action);
    } else {
      this.ruleTree[this.selectedActionIndex] = action;
    }
    this.currentAction = action;
  }

  onNewStopRule(command: string) {
    this.selectedActionIndex = -1;
    switch(command) {
      case "AttachmentStopWorkflowRule":
        this.currentAction = new AttachmentStopWorkflowRule();
        break;
      case "StopWorkflowRule":
        this.currentAction = new StopWorkflowRule();
        break;
      case "XmlWorkflowRule":
        this.currentAction = new XmlWorkflowRule();
        break;
    }
    this.onEdit();
  }

  onEdit() {
    if (this.currentAction.myspType === "StopWorkflowRule") {
      this.selectedRule = this.currentAction.systemName;
    }
    this.stopRuleVisible[this.currentAction.myspType] = true;
    console.log(this.currentAction.myspType,this.stopRuleVisible[this.currentAction.myspType])
  }

  onDelete() {
    if (this.selectedActionIndex !== -1) {
      this.ruleTree.splice(this.selectedActionIndex, 1);
    } else {
      this.ruleTree.splice(this.ruleTree.length - 1, 1);
    }
    this.currentAction = new BaseContent();
  }

  selectNode(index: number) {
    this.selectedActionIndex = index;
    this.currentAction = this.ruleTree[index];console.log(this.currentAction);
  }
}
</script>

<style lang="scss" scoped>
.draggable-list {
  border: 1px solid rgb(142 145 152);
  padding: 5px;
  min-height: 130px;
}
</style>
