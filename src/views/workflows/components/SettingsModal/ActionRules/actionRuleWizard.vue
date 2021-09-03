<template>
  <el-dialog
    :visible.sync="visibleWizard"
    :before-close="handleClose"
    title="New Action Rule Wizard"
    width="45%"
    center
    custom-class="dialogX"
    append-to-body
  >
    <el-container direction="vertical">
      <el-row>
        <el-col>
          <h3>Step 1/3 - Triggering conditions</h3>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <span> The rule will be applied only if these condition are met.</span
          ><br />
          <span>
            For Example, the rule will be applied when the item is
            cancelled.</span
          >
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-col :span="6">
          <el-button type="text" @click="onAddEveryone()">
            <i class="el-icon-user-solid"></i>
            Add Everyone
          </el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="text"> </el-button>

          <el-dropdown trigger="click" @command="onNewConditionSelect">
            <span class="el-dropdown-link">
              <el-button type="text"> New Condition </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="transitionConditionVisible"
                >Transition Condition...</el-dropdown-item
              >
              <el-dropdown-item>Property Change Condition...</el-dropdown-item>
              <el-dropdown-item disabled
                >--------------------------------------</el-dropdown-item
              >
              <el-dropdown-item>Property Condition...</el-dropdown-item>
              <el-dropdown-item>Item Set Condition...</el-dropdown-item>
              <el-dropdown-item>Workflow Condition...</el-dropdown-item>
              <el-dropdown-item>Entity category Condition...</el-dropdown-item>
              <el-dropdown-item>Javascript Condition...</el-dropdown-item>
              <el-dropdown-item>Attachment Condition...</el-dropdown-item>
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
      <el-row>
        <el-col style="max-height: 200px; border: 1px solid; overflow-x: auto">
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

      <transition
        :visible-transition.sync="transitionConditionVisible"
        :condition.sync="selectedCondition"
      ></transition>
    </el-container>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onNext()">Next</el-button>
      <el-button @click="handleClose">Cancel</el-button>
    </span>
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

@Component({
  name: "",
  components: { transition },
})
export default class extends Vue {
  @Prop({ required: true }) visibleWizard!: string;
  @Prop({ required: true }) ruleSysname!: string;

  transitionConditionVisible = false;
  conditionsTree: any[] = [];
  selectedCondition: any = null;

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

  onEdit() {
    if (!this.selectedCondition) return;
    switch (this.selectedCondition.myspType) {
      case "TransitionCondition":
        this.transitionConditionVisible = true;
        break;
    }
  }

  onNext() {}

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

<style lang="scss" scoped>
.dialogX {
  padding: 0 20px;
}
</style>
