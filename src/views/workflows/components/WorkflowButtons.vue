<template>
  <el-dialog
    top="10vh"
    title="Workflow Buttons"
    :before-close="handleClose"
    :visible.sync="dialogVisible"
    center
  >
    <span style="margin-bottom: 10px">
      Set the grouping and order of workflow buttons using the list below.
    </span>
    <el-row :gutter="20" style="margin-top: 10px">
      <el-col :span="10">
        <el-input
          v-model="findText"
          autocomplete="off"
          placeholder="Find Button"
          type="text"
        />
      </el-col>
      <el-col :span="14">
        <el-row type="flex" justify="end">
          <el-button
            variant="outline-primary"
            icon="el-icon-menu"
            @click="(openButtonDailog = 'newribbon'), (showButtonDialog = true)"
          >
            New Group
          </el-button>
          <el-dropdown
            style="padding: 0 10px 0 10px"
            @command="onNewButtonClick"
          >
            <el-button variant="outline-primary" icon="el-icon-plus">
              New Button
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-printer" command="a">
                Print
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-star-on" command="b">
                Follow this
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-star-off" command="c">
                Unfollow this
              </el-dropdown-item>
              <!-- <el-dropdown-item icon="el-icon-s-flag" command="d"
                >Action button</el-dropdown-item
              > -->
            </el-dropdown-menu>
          </el-dropdown>
          <el-button
            :disabled="!currentRow"
            variant="outline-primary"
            icon="el-icon-edit"
            @click="onEdit()"
          >
            Edit
          </el-button>
          <el-button
            variant="outline-primary"
            icon="el-icon-delete"
            @click="onDelete"
          >
            Delete
          </el-button>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table
          :data="tableData"
          max-height="450"
          :header-cell-style="{ textAlign: 'center' }"
          height="100%"
          row-key="id"
          border
          fit
          default-expand-all
          highlight-current-row
          show-overflow-tooltip
          stripe
          @row-click="onRowClick"
          @row-dblclick="onRowDbClick"
        >
          <el-table-column
            v-for="column in columns"
            :key="column.id"
            :prop="column.prop"
            :label="column.label"
            :width="column.width"
          >
            <template v-if="column.label === 'Name'" v-slot="scope">
              <el-image
                style="transform: translate(0px, 7px)"
                :src="scope.row.icon"
              />
              <span style="margin-left: 10px">{{ scope.row.displayName }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <span>Recorder group and buttons by dragging them.</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose"> Close </el-button>
    </span>
    <edit-button
      v-if="openButtonDailog == 'editbutton'"
      :dialog-visible.sync="showButtonDialog"
      :button-title="buttonTitle"
      :button-sys-name="buttonSysName"
      :ribbon-sys-name="ribbonSysName"
      :workflow-sys-name="currentWorkflow.systemName"
    />
    <new-action-button
      v-if="openButtonDailog == 'newaction'"
      :dialog-visible.sync="showButtonDialog"
    />
    <new-ribbon-group
      v-if="openButtonDailog == 'newribbon'"
      :dialog-visible.sync="showButtonDialog"
      :workflow-sys-name="currentWorkflow.systemName"
    />
  </el-dialog>
</template>

<script lang="ts">
import { AuthorizationNode } from "@/models/authorizations/AuthorizationNode";
import { Status } from "@/models/Status";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { KeyValue } from "@/models/KeyValue";
import { Workflow } from "@/models/Workflows/workflow";
import { set } from "vue/types/umd";
import { Ribbon } from "@/models/Workflows/Ribbon";
import { Button } from "@/models/Workflows/Button";
import { Transition } from "@/models/Workflows/Transition";
import EditButton from "./ButtonSettings/EditButton.vue";
import NewRibbonGroup from "./NewRibbonGroup.vue";
import NewActionButton from "./NewActionButton.vue";
import { raw } from "express";

@Component({
  name: "WorkflowButtons",
  components: { EditButton, NewRibbonGroup, NewActionButton }
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) currentWorkflow!: Workflow;

  findText = "";
  showButtonDialog = false;
  openButtonDailog = "";

  currentRow: any = null;

  buttonTitle = "";
  buttonSysName = "";
  ribbonSysName = "";

  private transitions: Transition[] = [];

  list: any = [];

  columns = [
    {
      prop: "displayName",
      label: "Name",
      width: "350"
      // icon: "/assets/img/approve.png",
    },
    {
      prop: "from",
      label: "From"
    },
    {
      prop: "to",
      label: "To"
    }
  ];

  get ribbons() {
    return this.currentWorkflow?.ribbons;
  }

  get flowSteps() {
    return this.currentWorkflow?.flowSteps;
  }

  get sideSteps() {
    return this.currentWorkflow?.sideSteps;
  }

  fromText(type: number, desinationStep: string, sourceStep: string) {
    if (desinationStep) {
      const trans = this.transitions.filter(
        trans => trans.type == type && trans.destinationStep == desinationStep
      );
      if (trans.length > 0) {
        return this.getStepName(trans.length, trans[0].sourceStep);
      }
    } else if (sourceStep) return this.getSideStepButton(sourceStep);

    return null;
  }

  toText(type: number, desinationStep: string, sourceStep: string) {
    if (desinationStep) {
      if (type == 7) return this.getSideStepButton(desinationStep);
      var step = this.flowSteps?.find(x => x.systemName == desinationStep);
      return step?.displayName;
    } else if (sourceStep) {
      const trans = this.transitions.filter(
        trans => trans.destinationStep == sourceStep
      );
      if (trans.length > 0) {
        return this.getStepName(trans.length, trans[0].sourceStep);
      }
    }

    return null;
  }

  getSideStepButton(systemName: string) {
    var _sideStep = this.sideSteps?.find(x => x.systemName == systemName);
    return _sideStep?.displayName;
  }

  getStepName(transLenght: number, systemName: string) {
    if (transLenght == 1) {
      const step = this.flowSteps?.find(x => x.systemName == systemName);
      return step?.displayName;
    } else if (transLenght > 1) return "many";
    else return null;
  }

  get tableData() {
    const rs: any = [];
    this.ribbons?.forEach((ribbon: Ribbon) => {
      const ribbonButton: IRibbonButtons = {
        id: ribbon.systemName,
        icon: "/assets/img/button-group-16x16.png",
        displayName: ribbon.displayName,
        children: [] = []
      };
      ribbon.buttons.forEach((btn: Button) => {
        // if (btn.displayName == "Resume main flow") {
        //   console.log(btn);
        // }
        const childValue: any = {
          ribbonId: ribbon.systemName,
          transitionType: btn.transitionType,
          id: btn.systemName,
          icon:
            "/MSP/resources/images/karambit/workflow_ribbon/half/" + btn.icon,
          displayName: btn.displayName,
          from: this.fromText(
            btn.transitionType as number,
            btn.destinationStep as string,
            btn.sourceStep as string
          ),
          to: this.toText(
            btn.transitionType as number,
            btn.destinationStep as string,
            btn.sourceStep as string
          )
        };

        ribbonButton.children.push(childValue);
      });
      rs.push(ribbonButton);
    });
    return rs;
  }

  private onRowClick(row: any, col: any, ev: any) {
    this.currentRow = row;
    this.buttonTitle = row.displayName;
    this.buttonSysName = row.id;
    this.ribbonSysName = row.ribbonId;
  }

  private onRowDbClick(row: any) {
    console.log("hey");
    this.currentRow = row;
    this.buttonTitle = row.displayName;
    this.buttonSysName = row.id;
    this.ribbonSysName = row.ribbonId;

    this.onEdit();
  }

  get isDelete() {
    if (this.currentRow) {
    }

    return true;
  }

  onNewButtonClick(command: string) {
    this.$message("click on item " + command);
  }

  onEdit() {
    if (this.currentRow) {
      this.openButtonDailog = "editbutton";
      this.showButtonDialog = true;
    }
  }

  onDelete() {}

  handleClose() {
    this.$emit("update:dialogVisible", false);
  }

  mounted() {
    this.flowSteps?.forEach(step => {
      this.transitions.push(...step.transitions);
    });
  }
}

interface IRibbonButtons {
  id: string;
  displayName: string;
  icon: string;
  children: [] | any;
}
</script>

<style lang="scss" scoped>
.body {
  height: 55vh;
}
.dialog-footer {
  display: block;
  text-align: right;
}
.el-row {
  margin-bottom: 10px;
  // &:last-child {
  //   margin-bottom: 0;
  // }
}
.el-dialog__body {
  padding: 15px 15px 10px;
}
</style>
