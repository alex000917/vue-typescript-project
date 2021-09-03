<template>
  <div>
    <el-dialog
      title="New work step"
      width="30%"
      :before-close="handleClose"
      :visible.sync="dialogVisible"
      center
    >
      <div class="body">
        <div style="overflow-y: auto; overflow-x: hidden">
          <h3 class="heading">Add a step to the main flow</h3>

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

          <el-row style="margin-bottom: 20px">
            <el-col :span="5" :offset="1">
              <span class="title"> Place After </span>
            </el-col>
            <el-col :span="16">
              <el-select
                clearable
                filterable
                placeholder="Select"
                v-model="placeAfterStep"
              >
                <el-option
                  v-for="item in StatusUsed"
                  :key="item.systemName"
                  :label="item.displayName"
                  :value="item.systemName"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createFlow"
          >Create</el-button
        >
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
import { KeyValue } from "@/models/KeyValue";
import { Status } from "@/models/Status";
import { PropertyFactory } from "@/models/Utils/PropertyFactory";
import { assign } from "lodash";
import { Component, Prop, Vue } from "vue-property-decorator";
import NewStatus from "../components/NewStatus.vue";

@Component({
  name: "NewWorkStep",
  components: { NewStatus },
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) Assignee!: AuthorizationNode[];
  @Prop({ required: true }) Status!: Status[];
  @Prop({ required: true }) StatusUsed!: Status[];

  public steps = [];

  public placeAfterStep: any = "";
  public selectedAssigneeId: String = "";
  public selectedStatusId: String = "";

  public assigneKeyValue: KeyValue[] = [];

  showStatusDialog: boolean = false;

  mounted() {
    // console.log(this.StatusUsed);
    // console.log(this.Status);
    // console.log(this.Assignee);

    this.Assignee.forEach(async (assign: AuthorizationNode) => {
      this.assigneKeyValue.push({
        myspType: "",
        key: assign.systemName,
        value: assign.displayName,
      });
    });
  }

  onStatusChange(value: string) {}

  private translate(path: any) {
    PropertyFactory.getPropertyNameFromPropertyPath(path).then((result) => {
      // console.log(result);
    });
  }

  createFlow(){	
    this.$emit("createFlow", [this.selectedStatusId,this.selectedAssigneeId,this.placeAfterStep]);	
    this.$emit("update:dialogVisible", false);	
  }

  handleClose() {
    this.$emit("update:dialogVisible", false);
  }
}
</script>


<style lang="scss" scoped>
.body {
  height: 25vh;
}

.heading {
  margin-top: 0;
}
.dialog-footer {
  display: block;
  text-align: right;
}

.el-select {
  width: 100%;
}
</style>
