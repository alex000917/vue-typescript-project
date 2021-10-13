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
        Action rules modify or move item's workflow. <br />
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
        @command="newActionRule"
        style="margin-right: 8px"
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
            New action rule
          </el-row>
        </el-button>
        <el-dropdown-menu
          slot="dropdown"
          style="margin-top: 0"
        >
          <el-dropdown-item command="ActionWorkflowRule">
            Action Rule Wizard
          </el-dropdown-item>
          <el-dropdown-item command="XmlRule"> Xml Rule </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button
        type="text"
        @click="onEdit"
        :disabled="disableEdit"
      >
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
      <el-button type="text" @click="onDelete">
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
        v-model="rulesTree"
        class="draggable-list"
      >
        <transition-group>
          <el-row
            v-for="(element, index) in rulesTree"
            :key="index"
          >
            <el-button
              style="width: 100%; text-align: left"
              @click="onItemClick(index)"
            >
              {{ element.myspType === "ActionWorkflowRule" ? element.displayName : element.name }}
            </el-button>
          </el-row>
        </transition-group>
      </draggable>
    </el-row>
    <p class="require-content">Drag items to re-order</p>

    <ActionRuleWizard
      :visible-wizard.sync="actionRuleWizard"
      :ruleSysname.sync="selectedRule"
      @onSave="onSave"
    >
    </ActionRuleWizard>
    <xml-action-modal
      :dialogVisible.sync="showXmlActionModal"
      :action="xmlAction"
      @onSave="onSave"
    />
  </el-container>
</template>

<script lang="ts">
import { XMLAction } from "@/models/Workflows/Actions";
import { ActionWorkflowRule } from "@/models/Workflows/ActionWorkflowRule";
import { WorkflowModule } from "@/store/modules/WorkflowMod";
import { Component, Vue } from "vue-property-decorator";
import Draggable from "vuedraggable";
import ActionRuleWizard from "./ActionRules/actionRuleWizard.vue";
import XmlActionModal from "./ActionRules/action/XmlRule.vue";

@Component({
  name: "",
  components: { Draggable, ActionRuleWizard, XmlActionModal },
})
export default class extends Vue {
  rulesTree: ActionWorkflowRule[] = [];
  actionRuleWizard = false;
  disableEdit = true;

  ruleActions: any = ["ActionWorkflowRule", "XmlRule"];

  get CurrentWorkflow() {
    return WorkflowModule.ActiveWorkflow;
  }

  selectedRule: string | null = null;
  xmlAction: XMLAction | any = new XMLAction();
  showXmlActionModal: boolean = false;

  selectedIndex = -1;

  mounted() {
    var rules = this.CurrentWorkflow?.actionWorkflowRules;

    if (rules) {
      rules.forEach((rule) => {
        this.rulesTree.push(rule);
      });
    }

    console.log(this.disableEdit);
  }

  onEdit() {
    if (this.rulesTree[this.selectedIndex].myspType === "ActionWorkflowRule") {
      this.selectedRule = this.rulesTree[this.selectedIndex].systemName;
      this.actionRuleWizard = true;
    } else {
      this.xmlAction = this.rulesTree[this.selectedIndex];
      this.showXmlActionModal = true;
    }
  }

  newActionRule(command: string) {
    switch (command) {
      case "ActionWorkflowRule":
        this.selectedRule = '';
        this.selectedRule = null;
        this.actionRuleWizard = true;
        break;
      case "XmlRule":
        this.xmlAction = new XMLAction();
        this.showXmlActionModal = true;
        break;
    }
  }

  onItemClick(index: number) {
    this.selectedIndex = index;    
      this.disableEdit = false;
  }

  onSave(rule: any) {
    if (this.selectedIndex === -1) {
      this.rulesTree.push(rule);
    } else {
      this.rulesTree[this.selectedIndex] = rule;
    }
    if (WorkflowModule.ActiveWorkflow) WorkflowModule.ActiveWorkflow.actionWorkflowRules = this.rulesTree;
  }

  onDelete() {
    if (this.selectedIndex === -1) {
      this.rulesTree.splice(this.rulesTree.length - 1, 1);
    } else {
      this.rulesTree.splice(this.selectedIndex, 1)
      this.selectedIndex = -1;
    }
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
