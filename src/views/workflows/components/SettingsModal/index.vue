<template>
  <el-dialog
    :title="currentWorkflow.displayName + ' settings'"
    :visible.sync="showMe"
    width="45%"
    custom-class="settingDialog"
    :before-close="handleClose"
    center
  >
    <el-tabs tab-position="left" stretch style="max-height: 400px">
      <el-tab-pane label="Display">
        <display-and-name ref="display" :currentWorkflow.sync="stageWorkflow" />
      </el-tab-pane>
      <el-tab-pane label="Action Rules">
        <action-rules ref="actionRules" />
      </el-tab-pane>
      <el-tab-pane label="Stop Rules">
        <stop-rules ref="stopRules" />
      </el-tab-pane>
      <el-tab-pane label="Notes">
        <notes ref="notes" />
      </el-tab-pane>
      <el-tab-pane label="Advanced">
        <advanced ref="advanced" />
      </el-tab-pane>
      <el-tab-pane label="XML">
        <xml-extensions ref="xmlExtensions" />
      </el-tab-pane>
    </el-tabs>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="onSaveClick()"
        >Save</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import { MyWorkModule } from "@/store/modules/myWorkMod";
import { mixins } from "vue-class-component";
import ModalMixin from "@/views/mywork/components/modals/mixin";
import MiniTable from "@/views/entities/components/miniTable.vue";
import NewCalendar from "@/views/mywork/components/modals/newCalendar.vue";
import { MyWorkCalendar, MyWorkPolicy } from "@/models/myWork";
import { ArrayUtils } from "@/models/Utils/ArrayUtils";
import DisplayAndName from "./displayAndName.vue";
import ActionRules from "./actionRules.vue";
import StopRules from "./stopRules.vue";
import Notes from "./notes.vue";
import Advanced from "./advanced.vue";
import XmlExtensions from "./xmlExtensions.vue";
import { WorkflowModule } from "@/store/modules/WorkflowMod";
import { Workflow } from "@/models/Workflows/workflow";

@Component({
  name: "CalendarModal",
  components: {
    MiniTable,
    NewCalendar,
    DisplayAndName,
    ActionRules,
    StopRules,
    Notes,
    Advanced,
    XmlExtensions,
  },
})
export default class extends mixins(ModalMixin) {
  private get tableItems() {
    return [
      {
        displayName: "Added Calendars",
        children: [...this.calendars.filter((x) => !x.outOfTheBox)],
      },
      {
        displayName: "Out-of-the-box Calendars",
        children: [...this.calendars.filter((x) => x.outOfTheBox)],
      },
    ];
  }

  private tableData = {
    fields: [
      {
        field: "displayName",
        label: "Name",
        sortable: true,
      },
      {
        field: "description",
        label: "Description",
      },
    ],
    searchBy: "",
  };

  private innerModal: {
    visible: Boolean;
    type: string;
    data: MyWorkCalendar | null;
  } = {
    visible: false,
    type: "ADD",
    data: null,
  };

  get calendars() {
    return MyWorkModule.calendars;
  }

  stageWorkflow: Workflow | any = {};

  get currentWorkflow() {
    return WorkflowModule.ActiveWorkflow;
  }

  $refs!: {
    miniTable: MiniTable;
    display: DisplayAndName;
    actionRules: ActionRules;
  };

  @Watch("tableData.searchBy")
  private onSearchTableData(value: string) {
    if (value) {
      this.calendars!.filter((calendar: MyWorkCalendar) => {
        return calendar.displayName.toLowerCase().includes(value.toLowerCase());
      });
    }
  }

  @Watch("visible")
  private detectModalShow(value: Boolean) {
    this.$refs.miniTable.selectedRow = null;
  }

  onAddClick() {
    this.innerModal = {
      visible: true,
      type: "ADD",
      data: null,
    };
    this.$refs.miniTable.selectedRow = null;
  }

  onEditClick(row: any) {
    this.innerModal.visible = true;
    this.innerModal.type = "UPDATE";
  }

  onDeleteClick(row: any) {
    this.$confirm("Do you want to delete this Calendar?", "Warning", {
      confirmButtonText: "Delete",
      cancelButtonText: "Do not delete",
      type: "warning",
    })
      .then(() => {
        const index = ArrayUtils.getIndex(
          MyWorkModule.calendars as any[],
          this.innerModal.data
        );
        this.$store.commit("UPDATE_CALENDARS", {
          index,
          data: {} as MyWorkCalendar,
          type: "DELETE",
        });
        this.$message({
          type: "success",
          message: "Delete completed",
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "Delete canceled",
        });
      });
  }

  onRowSelected(row: MyWorkCalendar) {
    this.innerModal.data = row;
  }

  // handleClose() {
  //   this.$emit("update:visible", false);
  // }

  get currentWorkFlow(){
    return JSON.parse(JSON.stringify(WorkflowModule.ActiveWorkflow));
  }

  mounted() {
    this.innerModal.data = null;
    this.stageWorkflow = Object.assign({}, this.currentWorkFlow);
  }

  onSaveClick(){
    Object.assign(WorkflowModule.ActiveWorkflow,this.stageWorkflow);
    this.showMe=false;
    console.log(this.currentWorkflow);
  }
}
</script>

<style lang="scss" scoped>
.settingDialog {
  height: 50%;
}
.dialog-footer {
  padding-right: 5px;
  text-align: right;
}
</style>
