<template>
  <el-dialog
    title="Status"
    :before-close="handleClose"
    :visible.sync="statusDialogVisible"
    center
  >
    <div class="body">
      <h3 class="heading">Create a new status for use in workflows:</h3>
      <el-form
        ref="statusFrom"
        label-position="left"
        status-icon
        :model="statusForm"
        :rules="rules"
        inline-message
        hide-required-asterisk
      >
        <span>English</span>
        <el-divider></el-divider>
        <el-form-item label="Display Name" prop="displayName">
          <el-input v-model="statusForm.displayName"></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input type="textarea" v-model="statusForm.description"></el-input>
        </el-form-item>

        <span>Hebrew</span>
        <el-divider></el-divider>
        <el-form-item
          label="Display name"
          prop="languageTranslations.0.displayName"
        >
          <el-input
            v-model="statusForm.languageTranslations[0].displayName"
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
            v-model="statusForm.languageTranslations[0].description"
            placeholder="Hebrew description here"
            style="direction: rtl"
          ></el-input>
        </el-form-item>

        <el-collapse>
          <el-collapse-item title="Advanced Settings">
            <el-form-item label="System Name" prop="systemName">
              <el-input
                v-model="statusForm.systemName"
                :disabled="true"
                type="text"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="default" @click="submitForm('statusFrom')">
          Ok
        </el-button>
        <el-button
          type="text"
          style="text-decoration: underline"
          @click="handleClose"
        >
          Cancel
        </el-button>
      </span>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Status } from "@/models/Status";
import { ElForm } from "node_modules/element-ui/types/form";
import { DataUtils } from "@/models/Utils/DataUtils";

@Component({
  name: "NewStatus",
  components: {},
})
export default class extends Vue {
  @Prop({ required: true }) statusDialogVisible!: boolean;

  private statusForm: Status = new Status();

  submitForm(formName: string) {
    (this.$refs[formName] as ElForm).validate((valid) => {
      if (valid) {
      }
    });
  }

  rules = {
    //   displayName: [
    //       { required: true, message: "Please input the displayName.", trigger: "blur" }
    //     ],
    displayName: [{ validator: this.displayNameRule, trigger: "blur" }],
    languageTranslations: [
      {
        displayName: [
          { required: true, message: "Hebrew name required", trigger: "blur" },
        ],
      },
    ],
    systemName: [
      { required: true, message: "System name required.", trigger: "blur" },
    ],
  };

  private displayNameRule(rule: any, value: string, callback: any) {
    if (!value) {
      return callback(new Error("Please input the displayName."));
    }
    if (!DataUtils.validateDisplayName(value)) {
      return callback(
        new Error(
          "DisplayName must have only English letters, numbers, and space."
        )
      );
    }
  }

  @Watch("statusForm.displayName", { immediate: true })
  private updateSystemName(value: string) {
    this.statusForm.systemName = "Cse_" + this.statusForm.displayName.split(" ").join("");
  }

  handleClose() {
    (this.$refs["statusFrom"] as ElForm).resetFields();
    this.$emit("update:statusDialogVisible", false);
  }

  mounted() {
    // this.statusForm = JSON.parse(JSON.stringify(this.statusForm));
  }
}
</script>
<style lang="scss" scoped>
.body {
  height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
}
.heading {
  margin-top: 0;
}
</style>