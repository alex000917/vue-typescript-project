<template>
  <el-dialog
    :title="buttonTitle + ' Settings'"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    center
    append-to-body
    class="workflow-edit-button"
  >
    <el-tabs tab-position="left" stretch>
      <el-tab-pane label="Display">
        <display ref="display" />
      </el-tab-pane>
      <el-tab-pane label="Icon">
        <icons ref="Icon" />
      </el-tab-pane>
      <el-tab-pane label="Confirmation">
        <confirmation ref="Confirmation" />
      </el-tab-pane>
      <el-tab-pane label="Mandatory">
        <SettingItemWrapper icon-name="mandatory-32x32" title="Mandatory">
          <el-row style="margin-top: 30px; height: calc(100% - 62px)">
            <el-checkbox
              v-model="mandatory"
            >
              Check that all mandatory controls have a value before moving the workflow
            </el-checkbox>
          </el-row>
        </SettingItemWrapper>
      </el-tab-pane>
      <el-tab-pane label="Viewed By">
        <SettingItemWrapper icon-name="viewed-by32x32" title="Viewed By" />
        <!-- <conditions :data="[]" ref="ViewedBy" /> -->
      </el-tab-pane>
      <el-tab-pane label="Note">
        <SettingItemWrapper icon-name="notes32x32" title="Notes">
          <el-row class="workflow-edit-button__note">
            Notes
            <el-input type="textarea" :rows="10" />
          </el-row>
        </SettingItemWrapper>
      </el-tab-pane>
      <el-tab-pane label="Advanced">
        <SettingItemWrapper icon-name="Advanced-32x32" title="Advanced">
          <el-row class="workflow-edit-button__advanced">
            <span>System name: </span>
            <span></span>
          </el-row>
        </SettingItemWrapper>
      </el-tab-pane>
      <el-tab-pane label="XML">
        <xml-extensions ref="XML" />
      </el-tab-pane>
    </el-tabs>

    <span slot="footer" class="workflow-edit-button__footer">
      <el-button type="default" style="margin-right: 20px"> Ok </el-button>
      <el-button
        type="text"
        style="text-decoration: underline"
        @click="handleClose"
      >
        Cancel
      </el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import Confirmation from "./Confirmation.vue"
import Display from "./Display.vue"
import Icons from "./Icons.vue"
import Conditions from "@/components/Conditions/index.vue"
import XmlExtensions from "../SettingsModal/xmlExtensions.vue"
import { WorkflowModule } from "@/store/modules/WorkflowMod"
import SettingItemWrapper from "@/components/SettingItemWrapper/index.vue"

@Component({
  name: "EditButton",
  components: { Confirmation, Display, Icons, Conditions, XmlExtensions, SettingItemWrapper }
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) buttonTitle!: string;
  @Prop({ required: true }) buttonSysName!: string;
  @Prop({ required: true }) ribbonSysName!: string;
  @Prop({ required: true }) workflowSysName!: string;

  mandatory = true;

  handleClose() {
    this.$emit("update:dialogVisible", false)
  }
}
</script>

<style lang="scss">
.workflow-edit-button {
  &__note {
    margin-top: 30px;
    height: calc(100% - 62px);

    .el-input {
      margin-top: 5px;
    }
  }

  &__advanced {
    margin-top: 10px;
  }

  &__footer {
    
  }
}
</style>
