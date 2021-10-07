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
      :dialogVisible.sync="stopRuleVisible['AttachmentAction']"
      @onSave="onSave"
      :action.sync="currentAction"
    />
    <xml-stop-rule
      :dialogVisible.sync="stopRuleVisible['XMLAction']"
      @onSave="onSave"
      :action.sync="currentAction"
    />
    <stop-rule-wizard
      :visible-wizard.sync="stopRuleVisible['StopRuleAction']"
      :ruleSysname.sync="selectedRule"
    />
  </el-container>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Draggable from "vuedraggable";
import AttachStopRule from "./StopRules/attachmentStopRule.vue";
import XmlStopRule from "./StopRules/XmlRule.vue";
import StopRuleWizard from "./StopRules/StopRuleWizard.vue";
import {
  BaseAction,
  XMLAction,
  AttachmentAction,
  StopRuleAction,
} from "@/models/Workflows/Actions";

@Component({
  name: "",
  components: { Draggable, AttachStopRule, XmlStopRule, StopRuleWizard },
})
export default class extends Vue {
  newStopRuleDropDowns = [
    { id: "AttachmentAction", value: "Attachment Stop Rule" },
    { id: "StopRuleAction", value: "Stop Rule Wizard" },
    { id: "XMLAction", value: "Xml Rule" },
  ];

  selectedRule: string | null = null;

  private stopRuleVisible: any = {
    AttachmentAction: false,
    StopRuleAction: false,
    XMLAction: false,
  };

  private actions: BaseAction[] = [];
  private currentAction: BaseAction = new BaseAction();

  private selectedActionIndex = -1;

  myArray: any[] = [];

  private xmlAcion = new XMLAction();

  @Watch("currentAction", { deep: true, immediate: true })
  refreshTree(val: BaseAction) {
    this.myArray = [];
    if (this.actions.length > 0) {      
      this.actions.forEach((action: any) => {
        this.myArray.push({
          name: action.getDisplayName(),
          order: this.myArray.length,
          fixed: false,
        });
      });
    }
  }

  onSave(action: any) {
    if (this.selectedActionIndex === -1) {
      this.actions.push(action);
    } else {
      this.actions[this.selectedActionIndex] = action;
    }
  }

  onNewStopRule(command: string) {
    this.selectedActionIndex = -1;
    switch(command) {
      case "AttachmentAction":
        this.currentAction = new AttachmentAction();
        break;
      case "StopRuleAction":
        this.currentAction = new StopRuleAction();
        break;
      case "XMLAction":
        this.currentAction = new XMLAction();
        break;
    }
    this.stopRuleVisible[command] = true;
  }

  onEdit() {
    this.stopRuleVisible[this.currentAction.myspType] = true;
  }

  onDelete() {
    if (this.selectedActionIndex !== -1) {
      this.actions.splice(this.selectedActionIndex, 1);
    } else {
      this.actions.splice(this.actions.length - 1, 1);
    }
    this.currentAction = new BaseAction();
  }

  selectNode(index: number) {
    console.log(index)
    this.selectedActionIndex = index;
    this.currentAction = this.actions[index];
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
