<template>
  <el-form
    v-if="enInput"
    ref="form"
    :model="translation"
    :rules="validationRules"
    style="padding:10px"
    label-position="left"
  >
    <el-row>
      <el-col>
        <el-divider content-position="left">
          English
        </el-divider>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="3">
        Display name
      </el-col>
      <el-col :span="16">
        <el-form-item prop="displayName">
          <el-input
            v-model="enInput.displayName"
            placeholder="Enter English name here"
            style="max-width: 500px"
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
            v-model="enInput.description"
            type="textarea"
            :autosize="{maxRows: 2}"
            style="max-width: 500px"
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
  name: "EnglishInput",
  components: {

  }
})
export default class extends Vue {
 @Prop({ required: true }) private translation!:LanguageTranslation

  private validationRules = {
    displayName: [
      { required: true, message: "Display name required", trigger: "blur" }
    ]
  };

  get enInput() {
    return this.translation
  }

  set enInput(val:any) {
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
      this.enInput = new LanguageTranslation("en", "", "")
    }
  }
}
</script>
