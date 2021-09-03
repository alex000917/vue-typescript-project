<template>
  <div class="panel-container">
    <el-form label-position="left" label-width="150px" :model="formData">
      <span class="lang-heading">English</span>
      <el-divider class="lang-divider"></el-divider>
      <el-row>
        <el-col :span="16">
          <el-form-item label="Display Name: " prop="displayName">
            <el-input v-model="formData.displayName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="Description: " prop="description">
            <el-input type="textarea" v-model="formData.description"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <span class="lang-heading">Hebrew</span>
      <el-divider class="lang-divider"></el-divider>
      <el-row>
        <el-col :span="16">
          <el-form-item
            label="Display Name: "
            prop="languageTranslations.0.displayName"
          >
            <el-input
              v-model="formData.languageTranslations[0].displayName"
              placeholder="Hebrew description here"
              style="direction: rtl"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item
            v-if="formData.languageTranslations"
            label="Description: "
            prop="languageTranslations.0.description"
          >
            <el-input
              type="textarea"
              v-model="formData.languageTranslations[0].description"
              placeholder="Hebrew description here"
              style="direction: rtl"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Orchestrator } from "@/models/orchestrator/Orchestrator";

@Component({
  name: "Display",
  components: {},
})
export default class extends Vue {
  @Prop({ required: true }) private items!: Orchestrator[];
  @Prop({ required: false, default: null }) private formData!: Orchestrator;

  private form: Orchestrator = {} as any;

  mounted() {
    this.form = JSON.parse(JSON.stringify(this.formData));
  }
}
</script>

