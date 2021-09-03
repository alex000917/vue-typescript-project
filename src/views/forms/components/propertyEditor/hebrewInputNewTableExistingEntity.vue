<template>
  <el-form
    :model="translation"
    :rules="validationRules"
    style="padding:10px 10px 20px 10px"
    label-position="left"
  >
    <el-row>
      <el-col class="elColDisplayName">
        <el-divider content-position="left">
          Hebrew
        </el-divider>
      </el-col>
    </el-row>

    <el-row>
        <el-form-item
          label="Table display name"
          prop="systemName"
        >   
          <el-input v-model="heInput.displayName" style="width: 25%; direction: rtl" />
          <div class="sub-title">
              <small> (HE) A new table property will be created with this name. Example: MyEntities </small>
          </div>
        </el-form-item>
    </el-row>

    <el-row>
        <el-form-item
          label="Reverse lookup display name"
          prop="systemName"
        >   
          <el-input v-model="heInput.displayName" style="width: 25%; direction: rtl" />
          <div class="sub-title">
              <small> (HE) This property will be created on the table entity as a lookup to the form entity. </small>
          </div>
        </el-form-item>
    </el-row>

    <el-row>
      <el-form-item label="Table description">
          <el-input
          v-model="heInput.description"
          type="textarea"
          :autosize="{maxRows: 3}"
          style="width: 50%; direction: rtl"
          />
          <div class="sub-title" style="margin-left: 15%">
                  <small> (HE) (Optional) </small>
              </div>
      </el-form-item>
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

<style>
  .elColDisplayName {
    margin-bottom: 20px;
  }
</style>
