<template>
  <el-dialog
    :title="buttonTitle + ' Settings'"
    :visible.sync="dialogVisible"
    center
    append-to-body
    class="workflow-edit-button"
  >
    <el-tabs tab-position="left" stretch>
      <el-tab-pane label="Display">
        <display
          ref="display"
          :info.sync="dialogInfo.languageTranslations"
          :showed="dialogVisible"
        />
      </el-tab-pane>
      <el-tab-pane label="Icon">
        <icons ref="Icon"
          :icon.sync="dialogInfo.icon"
          :full-size.sync="dialogInfo.fullSize"
        />
      </el-tab-pane>
      <el-tab-pane label="Confirmation">
        <confirmation ref="Confirmation"
          :info.sync="dialogInfo.confirmationProperty"
          :showed="dialogVisible"
        />
      </el-tab-pane>
      <el-tab-pane label="Mandatory">
        <SettingItemWrapper icon-name="mandatory-32x32" title="Mandatory">
          <el-row style="margin-top: 30px; height: calc(100% - 62px)">
            <el-checkbox
              v-model="dialogInfo.enforceMandatory"
            >
              Check that all mandatory controls have a value before moving the workflow
            </el-checkbox>
          </el-row>
        </SettingItemWrapper>
      </el-tab-pane>
      <el-tab-pane label="Viewed By">
        <SettingItemWrapper icon-name="viewed-by32x32" title="Viewed By">
          <Conditions :data.sync="conditionData" :visible-conditions="[]"></Conditions>
        </SettingItemWrapper>
      </el-tab-pane>
      <el-tab-pane label="Note">
        <SettingItemWrapper icon-name="notes32x32" title="Notes">
          <el-row class="workflow-edit-button__note">
            Notes
            <el-input type="textarea" :rows="10" v-model="dialogInfo.notes" />
          </el-row>
        </SettingItemWrapper>
      </el-tab-pane>
      <el-tab-pane label="Advanced">
        <SettingItemWrapper icon-name="Advanced-32x32" title="Advanced">
          <el-row class="workflow-edit-button__advanced">
            <span>System name: </span>
            <span>{{ dialogInfo.systemName }}</span>
          </el-row>
        </SettingItemWrapper>
      </el-tab-pane>
      <el-tab-pane label="XML">
        <SettingItemWrapper icon-name="xml32x32" title="XML Extensions">
          <xml-extensions
            ref="XML"
            :attributes.sync="dialogInfo.attributes"
            :childrenXml.sync="dialogInfo.childrenXml"
          />
        </SettingItemWrapper>
      </el-tab-pane>
    </el-tabs>

    <span slot="footer" class="workflow-edit-button__footer">
      <el-button type="default" style="margin-right: 20px" @click="handleOk"> Ok </el-button>
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
import { cloneDeep } from "lodash"
import { Workflow } from "@/models/Workflows/workflow"

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
  dialogInfo: any = {};

  private conditionData: any[] | any = [];

  get showModal() {
    return this.dialogVisible;
  }

  set showModal(val: boolean) {
    this.$emit("update:dialogVisible", val);
  }

  get originButonInfo() {
    const ribbon = WorkflowModule.ActiveWorkflow?.ribbons?.find(ribbon =>
      ribbon.systemName === this.ribbonSysName
    )

    return ribbon?.buttons?.find(button =>
      button.systemName === this.buttonSysName
    )
  }

  handleOk() {
    const originActiveWorkflow = cloneDeep(WorkflowModule.ActiveWorkflow)
    const ribbonIndex = WorkflowModule.ActiveWorkflow?.ribbons?.findIndex(ribbon =>
      ribbon.systemName === this.ribbonSysName
    )

    // eslint-disable-next-line
    const buttonIndex = WorkflowModule.ActiveWorkflow?.ribbons[ribbonIndex]["buttons"].findIndex((button: any) =>
      button?.systemName === this.buttonSysName
    )

    this.dialogInfo.displayName = this.dialogInfo.languageTranslations[0].displayName
    originActiveWorkflow["ribbons"][ribbonIndex]["buttons"][buttonIndex] = this.dialogInfo
    if (this.conditionData?.length > 0) {
      if (!originActiveWorkflow["ribbons"][ribbonIndex]["buttons"][buttonIndex]['viewByRestriction']) {
        originActiveWorkflow["ribbons"][ribbonIndex]["buttons"][buttonIndex]['viewByRestriction'] = {
          roleGroups : []
        }
      }
      originActiveWorkflow["ribbons"][ribbonIndex]["buttons"][buttonIndex]['viewByRestriction']['roleGroups'] = this.conditionData;
    }
    
    

    this.$store.commit("SET_ACTIVE_WORKFLOW", originActiveWorkflow)
    this.showModal = false;
  }

  handleClose() {
    this.showModal = false;
  }

  @Watch("dialogVisible", { deep: true, immediate: true })
  setUp(value: Boolean) {
    if (value) {
      this.dialogInfo = cloneDeep(this.originButonInfo)
      this.conditionData = this.originButonInfo?.viewByRestriction?.roleGroups?.length ? this.originButonInfo?.viewByRestriction?.roleGroups : [];
    }
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
    margin-top: 20px;
  }

  &__footer {

  }
}
</style>
