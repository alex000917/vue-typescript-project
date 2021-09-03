<template>
  <div>
    <el-dialog
      title="Add Side Step"
      width="30%"
      :before-close="handleClose"
      :visible.sync="dialogVisible"
      center
    >
      <div class="heading">
        <span>
          Side steps cause the workflow to pause or end. Examples: <br />
          Awaiting Customer Reply, On Hold, Rejected.
        </span>
      </div>

      <el-row style="margin-bottom: 20px">
        <el-col :span="5" :offset="1">
          <span class="title"> Status </span>
        </el-col>
        <el-col :span="16">
          <el-select
            clearable
            filterable
            placeholder="Select"
            v-model="selectedStatusId"
            @change="onStatusChange"
          >
            <el-option value="">
              <span
                @click="showStatusDialog = true"
                style="
                  color: #0000ff;
                  font-size: 13px;
                  text-decoration: underline;
                "
                >New</span
              >
            </el-option>
            <el-option
              v-for="item in Status"
              :id="item.systemName"
              :key="item.systemName"
              :label="item.displayName"
              :value="item.systemName"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row style="margin-bottom: 20px">
        <el-col :span="5" :offset="1">
          <span class="title"> Assignee </span>
        </el-col>
        <el-col :span="16">
          <el-select
            clearable
            filterable
            placeholder="Select"
            v-model="selectedAssigneeId"
          >
            <el-option
              v-for="item in assigneKeyValue"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <div style="padding-bottom: 10px; padding-left: 20px">
        <span>How will the workflow resume from this step ? </span>
      </div>

      <div class="rdoContent">
        <el-row>
          <el-col :span="12">
            <el-radio v-model="resumeStepType" label="1"
              >Display "Resume main flow" button</el-radio
            >
            <el-radio v-model="resumeStepType" label="2"
              >I will manually add transitions to other steps</el-radio
            >
          </el-col>
        </el-row>
      </div>

      <span class="dialog-footer">
        <el-button type="primary" @click="create">Create</el-button>
        <el-button type="text" @click="handleClose">Cancel</el-button>
      </span>
    </el-dialog>

    <new-status
      v-if="showStatusDialog"
      :status-dialog-visible.sync="showStatusDialog"
    >
    </new-status>
  </div>
</template>

<script lang="ts">
import { AuthorizationNode } from "@/models/authorizations/AuthorizationNode";
import { Status } from "@/models/Status";
import { Component, Prop, Vue } from "vue-property-decorator";
import { KeyValue } from "@/models/KeyValue";
import NewStatus from "../components/NewStatus.vue";

@Component({
  name: "SideStep",
  components: { NewStatus },
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) Assignee!: AuthorizationNode[];
  @Prop({ required: true }) Status!: Status[];
  @Prop({ required: true }) isSideStep!: boolean[];

  showStatusDialog: boolean = false;
  resumeStepType: string = "1";

  assigneKeyValue: KeyValue[] = [];
  selectedAssigneeId: String = "";
  selectedStatusId: String = "";

  onStatusChange(value: string) {}

  create() {
    this.$emit("createStep", [
      this.selectedStatusId,
      this.selectedAssigneeId,
      this.isSideStep,
    ]);
    this.$emit("update:dialogVisible", false);
  }

  handleClose() {
    this.$emit("update:dialogVisible", false);
  }

  onNewStatusClick() {
    console.log("new status");
    // this.openDailog = "newstatus";
    // this.dialogVisible = true;
  }

  mounted() {
    this.Assignee.forEach(async (assign: AuthorizationNode) => {
      this.assigneKeyValue.push({
        myspType: "",
        key: assign.systemName,
        value: assign.displayName,
      });
    });
  }
}
</script>
<style lang="scss" scoped>
.heading {
  padding-bottom: 30px;
  padding-left: 20px;
}
.dialog-footer {
  display: block;
  text-align: right;
  padding-top: 20px;
  border-top: 1px solid #dcdfe6;
}

.rdoContent {
  border-top: 1px solid gray;
  padding-top: 10px;
  padding-bottom: 35px;
  padding-left: 20px;
}

.el-select {
  width: 100%;
}
</style>

     