<template>
  <el-dialog
    ref="eldialog"
    :title="title"
    :visible.sync="showMe"
    destroy-on-close
    :close-on-click-modal="false"
    append-to-body
    close-on-press-escape
  >
    <el-form
      ref="elform"
      label-position="left"
      status-icon
      :model="orchestratorForm"
      :rules="rules"
      inline-message
      hide-required-asterisk
    >
      <span>English</span>
      <el-divider></el-divider>
      <el-form-item label="Display Name" prop="displayName">
        <el-input v-model="orchestratorForm.displayName"></el-input>
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input
          type="textarea"
          v-model="orchestratorForm.description"
        ></el-input>
      </el-form-item>

      <span>Hebrew</span>
      <el-divider></el-divider>
      <el-form-item
        label="Display name"
        prop="languageTranslations.0.displayName"
      >
        <el-input
          v-model="orchestratorForm.languageTranslations[0].displayName"
          placeholder="Type hebrew display name here."
          style="direction: rtl"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Description"
        prop="languageTranslations.0.description"
      >
        <el-input
          type="textarea"
          v-model="orchestratorForm.languageTranslations[0].description"
          placeholder="Hebrew description here"
          style="direction: rtl"
        ></el-input>
      </el-form-item>

      <el-collapse>
        <el-collapse-item title="Advanced Settings">
          <el-form-item label="System Name" prop="systemName">
            <el-input v-model="orchestratorForm.systemName" :disabled="isEditing"></el-input>
          </el-form-item>
        </el-collapse-item>
    </el-collapse>
    </el-form>
      <!-- <span
      slot="footer"
      class="dialog-footer">
      <el-button
        type="primary"
        @click="onOk()"
      >Save</el-button>
      <el-button @click="onCancel">Cancel</el-button>
    </span> -->
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Orchestrator } from "@/models/orchestrator/Orchestrator";
import { ElForm } from "element-ui/types/form";
import { AppCacheModule } from "@/store/modules/appCache";
import { DataUtils } from "@/models/Utils/DataUtils";

@Component({
  name: "AddOrchestrator",
  components: {},
})
export default class extends Vue {
  @Prop({ required: true, default: "New Record" }) private title!: string;
  @Prop({ required: true }) private items!: Orchestrator[];
  @Prop({ required: true, default: false }) private isOpen!: boolean;
  @Prop({ required: false, default: null }) private record!: Orchestrator;

  get showMe() {
    return this.isOpen;
  }

  set showMe(value: boolean) {
    this.$emit("update:isOpen", value);
  }

  private orchestratorForm: Orchestrator = {} as any;
  isEditing = false;

  mounted() {
    if (this.isOpen) {
      this.orchestratorForm = JSON.parse(JSON.stringify(this.record));
      this.isEditing = !!this.record.displayName;
    }
  }
}
</script>
