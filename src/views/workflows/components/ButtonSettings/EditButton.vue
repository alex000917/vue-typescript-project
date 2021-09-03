<template>
  <el-dialog
    :title="buttonTitle + ' Settings'"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    center
    append-to-body
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
      <el-tab-pane label="Mandatory"> </el-tab-pane>
      <el-tab-pane label="Viewed By">
        <!-- <conditions :data="[]" ref="ViewedBy" /> -->
      </el-tab-pane>
      <el-tab-pane label="Note">
        <el-row type="flex" align="middle">
          <el-image src="/assets/img/notes32x32.png" fit="fill" />
          <span style="font-size: 18px; margin-left: 5px">Notes</span>
        </el-row>
        <el-row style="margin-top: 30px; height: calc(100% - 62px)">
          Notes
          <div style="margin-top: 5px">
            <el-input type="textarea" :rows="10" />
          </div>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Advanced">
        <el-row type="flex" align="middle">
          <el-image src="/assets/img/Advanced-32x32.png" fit="fill" />
          <span style="font-size: 18px; margin-left: 5px">Advanced</span>
        </el-row>
 
      </el-tab-pane>
      <el-tab-pane label="XML">
        <xml-extensions ref="XML" />
      </el-tab-pane>
    </el-tabs>

    <span slot="footer" class="dialog-footer">
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
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Confirmation from "./Confirmation.vue";
import Display from "./Display.vue";
import Icons from "./Icons.vue";
import Conditions from "@/components/Conditions/index.vue";
import XmlExtensions from "../SettingsModal/xmlExtensions.vue";
import { WorkflowModule } from "@/store/modules/WorkflowMod";

@Component({
  name: "EditButton",
  components: { Confirmation, Display, Icons, Conditions, XmlExtensions },
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) buttonTitle!: string;
  @Prop({ required: true }) buttonSysName!: string;
  @Prop({ required: true }) ribbonSysName!: string;
  @Prop({ required: true }) workflowSysName!: string;

  handleClose() {
    this.$emit("update:dialogVisible", false);
  }

  mounted() {}
}
</script>
