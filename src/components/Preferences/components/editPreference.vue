<template>
  <el-dialog
    ref="editPrefForm"
    :visible.sync="showMe"
    destroy-on-close
    :close-on-click-modal="false"
    append-to-body
    title="Application Preference"
    :before-close="handleClose"
  >
    <div>
      <el-form
        v-if="form"
        ref="prefForm"
        label-position="left"
        status-icon
        :model="form"
        :rules="rules"
        inline-message
        hide-required-asterisk
        class="demo-ruleForm"
      >
        <el-form-item
          prop="displayName"
          label="Display Name"
        >
          <el-input
            v-model="form.displayName"
            autocomplete="off"
            placeholder="Type display name here."
            type="text"
          />
        </el-form-item>

        <el-form-item label="description">
          <el-input
            v-model="form.description"
            type="textarea"
            :autosize="{maxRows: 2}"
            placeholder="Type description here"
          />
        </el-form-item>
        <el-divider />
        <el-form-item label="">
          <el-row>
            <el-col :span="4">
              Data Type
            </el-col>
            <el-col :span="20">
              <span style="text-transform: uppercase; font-weight: bold">
                {{ getDataTypeName(form.dataType) }}
              </span>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item label="">
          <el-row>
            <el-col :span="4">
              Value
            </el-col>
            <el-col :span="20">
              <el-input
                v-if="
                  form.dataType === '9' ||
                    form.dataType === '10' ||
                    form.dataType === '11'
                "
                v-model="form.lookupValueName"
                placeholder="lookup value"
              />
              <el-input
                v-else
                v-model="form.value"
                placeholder="value "
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-collapse>
          <el-collapse-item
            title="Advance Settings"
            name="1"
          >
            <el-form-item label="">
              <el-row>
                <el-col :span="4">
                  System Name
                </el-col>
                <el-col :span="20">
                  <span>
                    {{ form.systemName }}
                  </span>
                </el-col>
              </el-row>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </el-form>
      <el-divider />
      <span slot="footer">
        <el-button
          :loading="validating"
          type="primary"
          @click="submitForm('prefForm')"
        >Update</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </span>
      <!-- </el-dialog> -->
    </div>
  </el-dialog>
</template>

<script lang="ts">
// import { RSA_PKCS1_PADDING } from "constants"
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import LangInput from "@/components/LangInput/LangInput.vue"
import { AppCacheModule } from "@/store/modules/appCache"
import LookupDataType from "@/components/InputDataTypes/LookupDataType.vue"
import SingleLineDataType from "@/components/InputDataTypes/SingleLineDataType.vue"
import { on } from "events"
import { debug } from "console"
import { ElForm } from "element-ui/types/form"
import { DataTypeFactory } from "@/models/Utils/DataTypeFactory"
import { PropertyFactory } from "@/models/Utils/PropertyFactory"
import { ApplicationPreference } from "@/models/ApplicationPreference"
import { AppPreferencesModule } from "@/store/modules/AppPreferencesMod"

@Component({
  name: "editPreference",
  components: { LookupDataType, SingleLineDataType }
})
export default class extends Vue {
  @Prop({ required: true, default: false }) isOpen!: boolean;
  @Prop({ required: true }) record!: ApplicationPreference;
  @Prop({ required: true }) updateHandler!: any;

  // private openDialog!: boolean
  get form() {
    return this.record
  }

  get showMe() {
    return this.isOpen
  }

  set showMe(value: boolean) {
    this.$emit("update:isOpen", value)
  }

  checkDisplayName = (rule:any, value:any, callback:any) => {
    if (!value) {
      return callback(new Error("Please input the displayName"))
    }
    setTimeout(() => {
      const existingName = AppPreferencesModule.Preferences.find(
        x => x.displayName.toLowerCase() === value.toLowerCase()
      )
      if (
        existingName &&
        this.origRecord &&
        existingName.displayName.toLowerCase() !==
          this.origRecord.displayName.toLowerCase()
      ) {
        callback(new Error("[" + value + "]  already taken."))
      } else {
        callback()
      }
    }, 1000)
  };

  rules = {
    displayName: [
      { required: true, validator: this.checkDisplayName, trigger: "blur" }
    ]
  };

  validating = false;
  submitForm(refForm: string) {
    this.validating = true;

    (this.$refs[refForm] as ElForm).validate(valid => {
      if (valid) {
        this.showMe = false
        this.updateHandler()
        this.$emit("update:isOpen", false)
        // this.form = new ApplicationPreference()
        this.validating = false
        return true
      } else {
        console.log("error submit!!")
        this.validating = false
        return false
      }
      // console.log(AppPreferencesModule.Data)
    })
  }

  getDataTypeName(value: string) {
    // const dataType = AppCacheModule.FlexSettings.propertyDataTypes.find(x => x.value === key)
    // return dataType.key
    const datatype = AppCacheModule.FlexSettings.propertyDataTypes.find(
      x => x.value.toString() === value
    )
    return datatype ? datatype.key : "unknown Type"
  }

  onCancel() {
    this.showMe = false
    this.$emit("update:isOpen", false)
    this.$emit("cancel")
  }

  handleClose(done: any) {
    done()
    this.$emit("cancel")
  }

  lookupObject: {
    lookupEntityId?: string
    lookupValueName?: string
  } = {} as any;

  private onLookupChanged(obj: any) {
    // alert('on lookup changed received' + JSON.stringify(obj))
    this.form.lookupEntityId = obj.lookupEntityId
    this.form.lookupValueName = obj.lookupValueName
    this.form.value = obj.lookupValueName
  }

  origRecord: ApplicationPreference | null = null;
  mounted() {
    this.origRecord = JSON.parse(
      JSON.stringify(this.record)
    ) as ApplicationPreference
  }
}
</script>

<style>
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
