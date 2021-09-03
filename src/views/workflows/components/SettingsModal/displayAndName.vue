<template>
  <el-container direction="vertical">
    <el-row type="flex" align="middle">
      <el-image src="/assets/img/display-name-2-32x32.png" fit="fill" />
      <span style="font-size: 18px; margin-left: 5px">Display And Name</span>
    </el-row>
    <el-row style="margin-top: 30px; height: calc(100% - 62px)">
      <el-row> Set this workflow display name and discription </el-row>
      <el-row style="margin-top: 10px">
        <el-row>
          <el-row> English </el-row>
          <el-divider />
          <el-row style="padding-left: 20px">
            <el-col :span="15">
              <span class="lbl"> DisplayName</span>
              <el-input
                v-model="englishDisplayName"
                @change="onEnglishChange"
              />
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-row> Hebrew </el-row>
          <el-divider />

          <el-row style="padding-left: 20px">
            <el-col :span="15">
              <span class="lbl"> DisplayName</span>
              <el-input
                v-model="hebrewDisplayName"
                dir="rtl"
                @change="onHebrewChange"
              />
            </el-col>
          </el-row>
        </el-row>
      </el-row>
    </el-row>
  </el-container>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { ElForm } from "element-ui/types/form";
import { WorkflowModule } from "@/store/modules/WorkflowMod";
import { LanguageTranslation } from "@/models/LanguageTranslation";
import { Workflow } from "@/models/Workflows/workflow";

@Component({
  name: "",
  components: {},
})
export default class extends Vue {
  @Prop({ required: true }) currentWorkflow!: Workflow | undefined;

  $refs!: {
    form: ElForm;
  };

  englishDisplayName: any = "";

  hebrewDisplayName: any = "";

  mounted() {
    this.englishDisplayName = this.currentWorkflow?.languageTranslations.find(
      (c) => c.language == "en"
    )?.displayName;

    this.hebrewDisplayName = this.currentWorkflow?.languageTranslations.find(
      (c) => c.language == "he"
    )?.displayName;
  }

  onEnglishChange() {
    this.currentWorkflow?.languageTranslations.forEach((translation) => {
      if (translation.language == "en")
        translation.displayName = this.englishDisplayName;
    });
  }

  onHebrewChange() {
    this.currentWorkflow?.languageTranslations.forEach((translation) => {
      if (translation.language == "he")
        translation.displayName = this.hebrewDisplayName;
    });
  }
}
</script>

<style type="text/css" lang="scss" scoped>
.form-item-language {
  font-size: 14px;
  font-weight: 500;
  border-bottom: 1px solid rgb(142 145 152);
  padding: 0 0 5px 10px;
}
::v-deep .el-form-item__label {
  font-weight: 500;
  margin-left: 20px;
}
::v-deep .el-divider--horizontal {
  margin: 7px 0;
}

.el-input {
  width: 60% !important;
}
.lbl {
  display: inline-block;
  width: 100px;
}
</style>
