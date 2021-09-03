<template>
  <div></div>
  <!-- <div class="body">
      <div style="height: 100%; overflow-y: auto; overflow-x: hidden">
        <el-row>
          <span class="title"> English </span>
          <el-divider class="divider" />
        </el-row>
        <el-row style="margin-bottom: 20px">
          <el-col :span="5" :offset="1">
            <span class="title"> Display name </span>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="displayName">
              <el-input
                v-model="productForm.displayName"
                autocomplete="off"
                style="min-width: 245px; font-size: 16px"
                type="text"
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top: 15px; margin-bottom: 15px">
          <el-col :span="5" :offset="1">
            <span class="title"> Description </span>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="description">
              <el-input
                v-model="productForm.description"
                autocomplete="off"
                style="min-width: 245px; font-size: 16px"
                type="textarea"
                size="small"
                :rows="2"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <span class="title"> Hebrew </span>
          <el-divider class="divider" />
        </el-row>
        <el-row style="margin-bottom: 20px">
          <el-col :span="5" :offset="1">
            <span class="title"> Display name </span>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="languageTranslations.0.displayName">
              <el-input
                dir="rtl"
                v-model="productForm.languageTranslations[0].displayName"
                autocomplete="off"
                style="min-width: 245px; font-size: 16px"
                type="text"
                size="small"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top: 15px; margin-bottom: 20px">
          <el-col :span="5" :offset="1">
            <span class="title"> Description </span>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="languageTranslations.0.description">
              <el-input
                dir="rtl"
                v-model="productForm.languageTranslations[0].description"
                autocomplete="off"
                style="min-width: 245px; font-size: 16px"
                type="textarea"
                size="small"
                :rows="2"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </div> -->
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { WorkflowModule } from "@/store/modules/WorkflowMod";

@Component({
  name: "Display",
  components: {},
})
export default class extends Vue {
  get currentWorkflow() {
    return WorkflowModule.ActiveWorkflow;
  }
}
</script>
<style lang="scss" scoped>
</style>
