<template>
  <el-form
    :model="translation"
    :rules="validationRules"
    style="padding:10px"
    label-position="left"
  >
    <el-row>
      <el-col>
        <el-divider content-position="left">
          Hebrew
        </el-divider>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="3">
        Display name
      </el-col>
      <el-col :span="16">
        <el-form-item

          prop="displayName"
        >
          <el-input
            v-model="heInput.displayName"
            placeholder="Enter Hebrew name here"

            style="max-width: 500px; direction: rtl"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        Description
      </el-col>
      <el-col :span="18">
        <el-form-item>
          <el-input
            v-model="heInput.description"
            type="textarea"
            :autosize="{maxRows: 2}"
            style="max-width: 500px; direction: rtl"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts">

import { LanguageTranslation } from "@/models/LanguageTranslation"
import { Component, Prop, Vue } from "vue-property-decorator"

@Component({
  name: "hebrew-input",
  components: {

  }
})
export default class extends Vue {
 @Prop({ required: true }) private translation!:LanguageTranslation

  private validationRules = {
    displayName: [
      { required: true, message: "display name required", trigger: "blur" }
    ]
  };

  get heInput() {
    return this.translation
  }

  set heInput(val:any) {
    this.$emit("update:translation", val)
  }

  created() {
    if (!this.translation) {
      this.heInput = new LanguageTranslation("he", "", "")
    }
  }
}
</script>
