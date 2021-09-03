<template>
  <el-form
    v-if="heInput"
    ref="form"
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
      <el-col :span="4">
        Display name
      </el-col>
      <el-col :span="16">
        <el-form-item

          prop="displayName"
        >
          <el-input
            v-model="heInput.displayName"
            placeholder="Type Hebrew name here"
            style="width: 75%; max-width: 500px; direction: rtl"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        Description
      </el-col>
      <el-col :span="18">
        <el-form-item>
          <el-input
            v-model="heInput.description"
            type="textarea"
            placeholder="Type Hebrew display name here"
            :autosize="{maxRows: 2}"
            style="width: 67%; max-width: 500px; direction: rtl"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script lang="ts">

import { LanguageTranslation } from "@/models/LanguageTranslation"
import { ElForm } from "element-ui/types/form"
import { Component, Prop, Vue } from "vue-property-decorator"

@Component({
  name: "HebrewInput",
  components: {

  }
})
export default class extends Vue {
 @Prop({ required: true }) private translation!:LanguageTranslation

  private validationRules = {
    displayName: [
      { required: true, message: "Hebrew display name required", trigger: "blur" }
    ]
  };

  get heInput() {
    return this.translation
  }

  set heInput(val:any) {
    this.$emit("update:translation", val)
  }

  validate() {
    console.log("calling validaton.....");

    (this.$refs.form as ElForm).validate((valid:boolean) => {
      return !!valid
    })
  }

  created() {
    if (!this.translation) {
      this.heInput = new LanguageTranslation("he", "", "")
    }
  }
}
</script>
