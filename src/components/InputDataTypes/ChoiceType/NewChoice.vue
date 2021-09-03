<template>
  <div>
    <el-form
      v-if="form"
      ref="elform"
      label-position="right"
      status-icon
      :model="form"
      :rules="rules"
      inline-message
      hide-required-asterisk
    >
      <el-form-item label="Engilsh">
        <el-divider />
      </el-form-item>
      <el-form-item prop="displayName">
        <el-input
          v-model="form.displayName"
          autocomplete="off"
          placeholder="Type display name here."
          style="min-width: 245px; font-size: 16px"
          type="text"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="form.descripttion"
          type="textarea"
          :autosize="{maxRows: 2}"
          style="min-width: 245px; font-size: 10px"
          placeholder="Type descripttion here"
        />
      </el-form-item>

      <el-form-item label="Hebrew">
        <el-divider />
      </el-form-item>
      <el-form-item prop="he.displayName">
        <el-input
          v-model="form.he.displayName"
          autocomplete="off"
          placeholder="Type display name here."
          style="min-width: 245px; font-size: 16px"
          type="text"
        />
      </el-form-item>

      <el-form-item>
        <el-input
          v-model="form.he.descripttion"
          type="textarea"
          :autosize="{maxRows: 2}"
          style="min-width: 245px; font-size: 10px"
          placeholder="Type descripttion here"
        />
      </el-form-item>

      <el-form-item>
        <span>Advance Settings</span>
        <el-divider />
      </el-form-item>
      <el-form-item
        prop="systemName"
        label="System Name"
      >
        <el-input
          v-model="form.systemName"
          type="text"
          autocomplete="off"
        />
        <small>Cannot contain spaces, Capitalize first word letters, Example
          MyChoice
        </small>
      </el-form-item>
    </el-form>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        type="primary"
        @click="submitForm('elform')"
      >Add</el-button>
      <el-button @click="onNewDialogClose">Cancel</el-button>
    </span>
    <!-- </el-dialog> -->
  </div>
</template>

<script lang="ts">
// import { RSA_PKCS1_PADDING } from "constants"
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import LangInput from "@/components/LangInput/LangInput.vue"
import { AppCacheModule } from "@/store/modules/appCache"
import { ApplicationPreference } from "@/models/ApplicationPreference"
import LookupDataType from "@/components/InputDataTypes/LookupDataType.vue"
import SingleLineDataType from "@/components/InputDataTypes/SingleLineDataType.vue"
import { ElForm } from "element-ui/types/form"

import JsonEditor from "@/components/JsonEditor/index.vue"
import { on } from "events"
@Component({
  name: "NewChoice",
  components: { }
})
export default class extends Vue {
  // @Prop({ required: true, default: false })
  // private openDialog!: boolean

  mounted() {
    this.resetForm("elform")
  }

  private form ={
    displayName: "",
    descripttion: "",

    he: {
      displayName: "",
      descripttion: ""
    },
    systemName: ""
  };

  rules = {

    displayName: [
      { required: true, message: "English display name required", trigger: "blur" }
    ],
    he: {
      displayName: [
        { required: true, message: "display name required", trigger: "blur" }
      ]
    },
    systemName: [
      { required: true, message: "System name required.", trigger: "blur" }
    ]
  };

 @Watch("form.en.displayName")
  onEnDisplayNameChanged() {
    this.form.systemName = "Cse" + this.form.displayName.split(" ").join("")
  }

 submitForm(refForm: string) {
   (this.$refs[refForm]  as ElForm).validate((valid) => {
     if (valid) {
       this.$emit("onNewChoiceAdded", this.form)
       return true
     } else {
       console.log("error submit!!")
       return false
     }
   })
 }

 resetForm(refForm: string) {
   (this.$refs[refForm] as ElForm).resetFields()
 }

 onNewDialogClose() {
   console.log("on close called.")
   this.resetForm("elform")
 }
}
</script>

<style >
.el-row {
  margin-bottom: 0px;
  width: 100%;
}
.el-form-item--min.el-form-item .el-form-item--mini .el-form-item {
  margin-bottom: 8px;
}
.el-form-item__content {
  line-height: 30px;
  width: 100%;
}
.el-form--inline .el-form-item {
  display: contents;
  margin-right: 10px;
  vertical-align: top;
}
.el-divider--horizontal {
  margin: 0 0 10px 0;
}
.el-dialog__header {
  padding: 0px;
  padding-bottom: 0px;
  background-color: beige;
}

</style>
