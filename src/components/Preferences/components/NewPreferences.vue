<template>
  <!-- <el-dialog
    ref="newFormModel"
    :visible.sync="openDialog"
    center
    title="New Form"
    :before-close="onNewDialogClose"
  > -->
  <div>
    <small>Create a new applicaton Preference and set its value.</small>
    <el-form
      v-if="form"
      ref="prefForm"
      label-position="left"
      status-icon
      :model="form"
      :rules="rules"
      inline-message
      hide-required-asterisk
    >
      <el-row>
        <el-col>
          <el-form-item prop="displayName">
            <el-input
              v-model="form.displayName"
              autocomplete="off"
              placeholder="Type display name here."
              style="min-width: 245px; font-size: 16px"
              type="text"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item>
            <el-input
              v-model="form.description"
              type="textarea"
              :autosize="{maxRows: 2}"
              style="min-width: 245px; font-size: 10px"
              placeholder="Type description here"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider />

      <el-row>
        <el-col :span="12">
          <span> Data Types </span>
          <el-divider />
          <el-form-item prop="dataType">
            <el-radio-group
              v-model="form.dataType"
              prop="dataType"
              @change="onSelectionChanged"
            >
              <el-row
                v-for="p in propertytypes"
                :key="p.value"
              >
                <el-col>
                  <el-radio :label="p.value">
                    {{ p.key }}
                  </el-radio>
                </el-col>
              </el-row>
              <br>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-row>
            <el-col>
              <span>Preview </span>
              <el-divider />
              <el-image
                v-if="form.dataType"
                :max-height="100"
                :src="getImage(form.dataType)"
              >
                <div
                  slot="placeholder"
                  class="image-slot"
                >
                  Select one from Choice to See Preview<span
                    class="dot"
                  >...</span>
                </div>
              </el-image>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <div v-if="form.dataType">
            <el-input
              v-if="form.dataType === '1'"
              v-model="form.value"
            />
            <el-date-picker
              v-else-if="form.dataType === '4'"
              v-model="valDate"
              type="datetime"
              placeholder="Select date"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
            <el-switch
              v-else-if="form.dataType === '5'"
              v-model="valBool"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
            <el-input-number
              v-else-if="form.dataType === '6'"
              v-model="valNum"
              :step="1"
              step-strictly
            />
            <el-input-number
              v-else-if="form.dataType === '8'"
              v-model="valDbl"
              :precision="2"
              :step="0.01"
              :max="10000000"
            />
            <LookupDataType
              v-else-if="form.dataType === '9'"
              v-model="lookupObject"
              :show-config="true"
              :show-inputs="true"
              @lookupchanged="onLookupChanged"
            />
          </div>
        </el-col>
      </el-row>
      <el-divider />
      <el-row>
        <el-col>
          <el-collapse>
            <el-collapse-item
              title="Advance Settings"
              name="1"
            >
              <el-form-item label="System Name">
                <el-input
                  v-model="systemName"
                  type="text"
                  autocomplete="off"
                  :disabled="dialogAction === 1"
                />
                <small>
                  Cannot contain spaces, Capitalize first word letters, Example
                  MyApplicationPreference
                </small>
              </el-form-item>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer">
      <el-button
        type="primary"
        @click="submitForm('prefForm')"
      >{{
        dialogAction ? "Update" : "Add"
      }}</el-button>
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
import { AppPreferencesModule } from "@/store/modules/AppPreferencesMod"

import { on } from "events"
import { debug } from "console"
import { ElForm } from "element-ui/types/form"
import { DataTypeFactory } from "@/models/Utils/DataTypeFactory"
@Component({
  name: "NewPerfrences",
  components: { LookupDataType, SingleLineDataType }
})
export default class extends Vue {
  @Prop({ required: true, default: false }) visible!: boolean;
  @Prop({ required: false }) selectedRowIndex!: number;
  // dialogAction 0 : Add new Preference, 1: Edit
  @Prop({ required: true, default: 0 }) dialogAction!: number;
  // private openDialog!: boolean
  private form = new ApplicationPreference();
  private valDate = new Date();
  private valBool = true;
  private valNum = 0;
  private valDbl = 0.0;

  @Watch("selectedRowIndex", { immediate: true })
  @Watch("dialogAction", { immediate: true })
  private editActionHandler(val: number) {
    this.form =
      val > -1 && this.dialogAction
        ? this.appPreferences[this.selectedRowIndex] //  Object.assign({}, )
        : new ApplicationPreference()

    this.form.dateModified = new Number(new Date())
    if (this.dialogAction === 0) this.form = new ApplicationPreference()
    if (this.form.dataType === "4" && !this.form.value) {
      this.form.value = new Date(this.form.value)
    } else if (this.form.dataType === "5") {
      this.valBool = true
      if (this.form.value === "false") this.valBool = false
    } else if (this.form.dataType === "6" && this.form.value) {
      this.valNum = parseInt(this.form.value.replace(/,/g, ""))
    } else if (this.form.dataType === "8" && this.form.value) {
      this.valDbl = parseFloat(this.form.value.replace(/,/g, ""))
    } else if (this.form.dataType === "9") {
      if (this.form.lookupEntityId) {
        this.lookupObject.lookupEntityId = this.form.lookupEntityId
      }
      if (this.form.lookupValueName) {
        this.lookupObject.lookupEntityId = this.form.lookupValueName
      }
    }
  }

  @Watch("visible", { immediate: true })
  private visibleHandler(show: boolean) {
    if (show && this.dialogAction === 0) {
      this.form = new ApplicationPreference()
    }
  }

  get systemName() {
    const nameInstance = this.form.displayName
    const systemNameInstance = this.form.systemName
    const data =
      systemNameInstance.length === 0
        ? "Cse_" +
          (nameInstance.length === 0
            ? ""
            : this.form.displayName.charAt(0).toUpperCase() +
              this.form.displayName.slice(1)
          ).replace(/\s/g, "")
        : this.form.systemName
    return data
  }

  set systemName(val: string) {
    this.form.systemName = val
  }

  propertytypes = [
    {
      key: "Single Line of Text",
      value: "1"
    },
    {
      key: "Date and Time",
      value: "4"
    },
    {
      key: "Yes No",
      value: "5"
    },
    {
      key: "Number",
      value: "6"
    },
    {
      key: "Number with Decimal Point",
      value: "8"
    },
    {
      key: "Lookup",
      value: "9"
    }
  ];

  get appPreferences() {
    // return this.$store.getters.ApplicationPreferences
    const pref = AppPreferencesModule.Preferences
    return pref
  }

  checkDisplayName = (rule:any, value:any, callback:any) => {
    if (!value) {
      return callback(new Error("Please input the displayName"))
    }
    setTimeout(() => {
      const existingName = AppPreferencesModule.Preferences.find(
        (x) => x.displayName.toLowerCase() === value.toLowerCase()
      )
      if (this.dialogAction) callback()
      else {
        if (existingName) {
          callback(
            new Error("this " + value + " already exists. choose another name.")
          )
        } else {
          callback()
        }
      }
    }, 1000)
  };

  formatDate() {
    // return [month, day, year].join('/') + ' ' + [h, m, s].join(':')
  }

  rules = {
    displayName: [
      { required: true, validator: this.checkDisplayName, trigger: "blur" }
    ],
    dataType: [
      {
        required: true,
        message: "A property must be selected",
        trigger: "change"
      }
    ],
    systemName: [
      { required: true, message: "System name required.", trigger: "blur" }
    ]
  };

  submitForm(refForm: string) {
    (this.$refs[refForm] as ElForm).validate((valid) => {
      if (valid) {
        // console.log('saving Preferences ' + JSON.stringify(this.form))
        this.form.systemName = this.systemName
        if (this.form.dataType === "5") {
          if (this.valBool) this.form.value = "true"
          else this.form.value = "false"
        } else if (this.form.dataType === "4") {
          this.form.value = this.valDate
          if (typeof this.valDate === "object") {
            var today = new Date()
            var dd:any = today.getDate()
            let mm:any = today.getMonth() + 1
            var yyyy = today.getFullYear()
            var h:any = today.getUTCHours()
            var m:any = today.getUTCMinutes()
            var s:any = today.getUTCSeconds()
            if (mm < 10) {
              mm = "0" + mm
            }
            if (dd < 10) {
              dd = "0" + dd
            }
            if (h < 10) {
              h = "0" + h
            }
            if (m < 10) {
              m = "0" + m
            }
            if (s < 10) {
              s = "0" + s
            }
            this.form.value =
              yyyy + "-" + mm + "-" + dd + " " + h + ":" + m + ":" + s
          }
        } else if (this.form.dataType === "6") {
          var val = this.valNum.toLocaleString()
          this.form.value = val
        } else if (this.form.dataType === "8") {
          var vald = this.valDbl.toLocaleString()
          this.form.value = vald
        }

        AppPreferencesModule.upSert(this.form)
        if (this.dialogAction) {
          AppPreferencesModule.Preferences.forEach(
            (Preference: any, index: number) => {
              if (index === this.selectedRowIndex) {
                Preference = this.form
                this.$message({
                  message: "current Preference Changed.",
                  type: "success"
                })
                return true
              }
            }
          )
        } else {
          // AppPreferencesModule.Preferences.push(this.form)
          this.$message({
            message: "new Preference Added.",
            type: "success"
          })
        }
        this.$emit("update:visible", false)
        // this.form = new ApplicationPreference()
      } else {
        console.log("error submit!!")
        return false
      }
      // console.log(AppPreferencesModule.Data)
    })
  }

  onNewDialogClose() {
    this.$emit("update:visible", false)
  }

  onSelectionChanged(value: any) {
    this.getImage(value)
  }

  getImage(type: any) {
    // const property = this.propertytypes.find((x) => x.value === type)
    // return `/img/typPrv/${property.key}.png`
    return DataTypeFactory.getPreviewImage(type)
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

  mounted() {
    // has only valid types.
  }

  // get systemName() {
  //   if (!this.systemName) {
  //     this.form.systemName = this.form.displayName
  //   }
  //   return this.form.displayName.toString().replace(' ', '')
  // }
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
