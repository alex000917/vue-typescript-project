<template>
  <el-dialog
    title="New Ribbon Group"
    :before-close="handleClose"
    :visible.sync="dialogVisible"
    center
    append-to-body
  >
    <div class="body">
      <span class="title">Enter the display name of the ribbon group : </span>
      <el-form
        ref="form"
        label-position="left"
        :model="form"
        label-width="100px"
        hide-required-asterisk
      >
        <el-row>
          <el-col>
            <span class="title"> English </span>
            <el-divider class="divider" />
            <el-form-item prop="displayName" label="DisplayName">
              <el-input v-model="form.displayName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <span class="title"> Hebrew </span>
            <el-divider class="divider" />
            <el-form-item prop="hebrewName" label="DisplayName">
              <el-input v-model="form.hebrewName" dir="rtl" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-collapse style="padding-bottom: 0px">
              <el-collapse-item
                title="Advance Setting"
                name="1"
                style="padding-bottom: 0px"
              >
                <el-form-item
                  prop="systemName"
                  label="System name"
                  style="margin-top: 15px; margin-bottom: 0px"
                >
                  <el-input v-model="form.systemName" />
                </el-form-item>
              </el-collapse-item>
            </el-collapse>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="default"> Save </el-button>
      <el-button
        type="text"
        style="text-decoration: underline"
        @click="handleClose"
      >
        Close
      </el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Workflow } from "@/models/Workflows/workflow";
import { Button } from "@/models/Workflows/Button";
import { WorkflowModule } from "@/store/modules/WorkflowMod";

@Component({
  name: "NewRibbonGroup",
  components: {},
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) workflowSysName!: string;

  private form = Object.assign(new Button(), { hebrewName: "" });

  get currentWorkflow() {
    return WorkflowModule.ActiveWorkflow;
  }

  handleClose() {
    this.$emit("update:dialogVisible", false);
  }

  mounted() {

  }

}
</script>
<style lang="scss" scoped>
.body {
  // height: 55vh;
  .title {
    font-weight: 600;
    word-break: break-word;
  }
  .divider {
    margin-top: 3px;
  }
}
.el-row {
  margin-bottom: 15px;
  padding-left: 15px;
  &:first-child {
    margin-top: 15px;
  }
  &:last-child {
    margin-bottom: 0;
  }
}
.dialog-footer {
  display: block;
  text-align: right;
}
</style>
