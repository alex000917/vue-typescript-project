<template>
  <el-dialog
    ref="dialog"
    v-loading="loading"
    element-loading-text="Loading..."
    width="70%"
    top="2vh"
    title="New Formula"
    :visible.sync="showModal"
    destroy-on-close
    :close-on-click-modal="false"
    :close-on-press-escape="true"
    append-to-body
  >
    <el-container>
      <el-form
        ref="form"
        :rules="rules"
        style="width: 100%; overflow: auto"
        :model="form"
        label-position="left"
        :inline-message="true"
      >
        <el-header
          class="elheader"
          style="height: 100px"
        >
          <el-form-item
            prop="displayName"
            style="margin-left: 10px; padding: 2px; margin-bottom: 2px"
          >
            <el-input
              v-model="form.displayName"
              placeholder="Type display name here"
              style="width: 50%; font-size:14pt"
            />
          </el-form-item>

          <el-form-item
            style="margin-left:10px; padding: 10px 2px; margin-bottom: 2px"
          >
            <el-input
              v-model="form.description"
              type="textarea"
              :autosize="{maxRows: 2}"
              style="width: 90%"
              class="description"
              placeholder="Type description here"
            />
          </el-form-item>
        </el-header>

        <el-main
          class="elmain"
          style="overflow: auto"
        >
          <el-row>
            <el-col>
              <el-form-item
                prop="sql"
                label="SQL query"
              >
                <el-input
                  v-model="form.sql"
                  type="textarea"
                  :autosize="{minRows: 3, maxRows: 5}"
                  style="width: 50%"
                  placeholder="Enter a SQL select query returning a single value."
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <HebrewInput
                ref="heInput"
                :translation="form.heLang"
              />
            </el-col>
          </el-row>
          <el-row>
            <el-collapse :accordion="true">
              <el-collapse-item title="Data Type">
                <el-row>
                  <el-col :span="12">
                    <span> Data Types </span>
                    <el-divider />
                    <el-form-item prop="selectedDataType">
                      <el-radio-group
                        v-model="form.selectedDataType"
                        prop="dataType"
                        style="margin:-150"
                        @change="onDataTypeChanged"
                      >
                        <el-row
                          v-for="p in dataTypes"
                          :key="p.value"
                        >
                          <el-col>
                            <el-radio :label="p.value">
                              {{ p.key }}
                            </el-radio>
                            <br>
                          </el-col>
                        </el-row>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-row>
                      <el-col>
                        <span>Preview </span>
                        <el-divider />
                        <el-image
                          v-if="form.selectedDataType"
                          :max-height="100"
                          :src="getImage(form.selectedDataType)"
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
                    <div v-if="form.selectedDataType">
                      <el-select
                        v-if="form.selectedDataType === '4'"
                        v-model="form.periodPickerType"
                        placeholder="Select a Period Type"
                      >
                        <el-option
                          v-for="item in periodTypes"
                          :key="item.value"
                          :label="item.key"
                          :value="item.value"
                        />
                      </el-select>

                      <div
                        v-if="['6', '7', '8'].includes(form.selectedDataType)"
                        style="display:block"
                      >
                        <el-switch
                          v-model="form.useThousandSeparator"
                          active-text="use thousand separator"
                        />
                        <br>
                        <el-input-number
                          v-if="form.selectedDataType === '8'"
                          v-model="form.numberOfDecimalPlaces"
                          controls-position="right"
                          :min="0"
                          :step="1"
                          label="number of decimal places"
                        />
                      </div>
                      <el-select
                        v-if="form.selectedDataType === '9'"
                        v-model="form.lookupClassName"
                        placeholder="Select an Entity"
                      >
                        <el-option
                          v-for="item in EntitiesList"
                          :key="item.value"
                          :label="item.key"
                          :value="item.value"
                        />
                      </el-select>
                    </div>
                  </el-col>
                </el-row>
              </el-collapse-item>
              <el-collapse-item title="Advance ">
                <el-form-item
                  label="System Name"
                  prop="systemName"
                >
                  <el-input
                    v-model="form.systemName"
                    style="width: 50%; font-size:14pt"
                  />
                </el-form-item>
                <el-form-item label="Notes">
                  <el-input
                    v-model="form.notes"
                    type="textarea"
                    :autosize="{maxRows: 3}"
                    style="width: 90%"
                  />
                </el-form-item>
              </el-collapse-item>
            </el-collapse>
          </el-row>
        </el-main>
      </el-form>
    </el-container>
    <div
      slot="footer"
      class="filter-footer"
    >
      <el-button
        style="margin-right: 20px"
        @click="onOkClick"
      >
        Ok
      </el-button>
      <el-button
        type="text"
        style="text-decoration: underline"
        @click="onCancelClick"
      >
        cancel
      </el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator"
import { AppCacheModule } from "@/store/modules/appCache.ts"
import { Entity } from "@/models/Entity.ts"
import { displayNameRule } from "../util"
import { debug } from "console"
import {
  NewPropertyInputs,
  PropertyFactory
} from "@/models/Utils/PropertyFactory"
import {
  BaseProperty,
  DecimalProperty,
  EntityBaseProperty,
  NumericProperty,
  Property
} from "@/models/Properties.ts"
import {
  BaseDataType,
  ChoiceDataType,
  EntityBasedDataType
} from "@/models/DataTypes"
import { KeyValue } from "@/models/KeyValue"
import { ElForm } from "element-ui/types/form"
import { LanguageTranslation } from "@/models/LanguageTranslation"
import { DataTypeFactory } from "@/models/Utils/DataTypeFactory"
import HebrewInput from "@/components/LangInput/hebrewInput.vue"

import { EntitiesModule } from "@/store/modules/entitiesMod"
import { Choice } from "vue-i18n"
import { title } from "process"
import { Message } from "element-ui"
import { type } from "os"
import { DataUtils } from "@/models/Utils/DataUtils"
import { ElDialog } from "element-ui/types/dialog"

export class FormulaForm {
  displayName: null | string = null;
  description: null | string = null;
  heLang = new LanguageTranslation("he", "", "");
  dataType:
    | BaseDataType
    | EntityBasedDataType
    | ChoiceDataType = new BaseDataType();

  sql: string | undefined = undefined;
  selectedDataType = "2";
  periodPickerType = "2";
  useThousandSeparator = false;
  numberOfDecimalPlaces = 2;
  lookupClassName: undefined | string = undefined;
  systemName: string | null = null;
  notes: string | null = null;
}

@Component({
  name: "newFormula",
  components: { HebrewInput }
})
export default class extends Vue {
  @Prop({ required: true }) show!: boolean;
  @Prop({ required: true }) entity!: Entity;
  @Prop({ required: true }) okHandler!: any;

  form = new FormulaForm();
  get showModal() {
    return this.show
  }

  set showModal(val: boolean) {
    this.$emit("update:show", val)
  }

  get currentEntity() {
    return this.entity
  }

  onDataTypeChanged(data: any) {
    this.getImage(data)
    const dt = this.dataTypes.find(x => x.value === data)
    if (dt) {
      if (["5"].includes(data)) {
        this.form.dataType = new ChoiceDataType()
      } else if (["9"].includes(data)) {
        this.form.dataType = new EntityBasedDataType()
      } else {
        this.form.dataType = new BaseDataType()
      }
      this.form.dataType.key = dt?.key
      this.form.dataType.value = dt?.value
    }
  }

  getImage(type: any) {
    // const property = this.dataTypes.find((x) => x.value === type);
    // return `/img/typPrv/${property?.key}.png`;
    return DataTypeFactory.getPreviewImage(type)
  }

  private loading = false;

  private formulaNameRule = (rule: any, value: string, callback: any) => {
    if (!value) {
      return callback(new Error("Please input the displayName."))
    }
    if (!DataUtils.validateDisplayName(value)) {
      return callback(
        new Error(
          "DisplayName must have only English letters, numbers, and space."
        )
      )
    }
    setTimeout(() => {
      if (
        this.currentEntity.properties.findIndex(
          x => x.displayName.toLowerCase() === value.toLowerCase()
        ) > -1
      ) {
        callback(new Error("This name was already registered."))
      } else {
        callback()
      }
    }, 500)
  };

  private rules = {
    displayName: [{ validator: this.formulaNameRule, trigger: "blur" }],
    languageTranslations: [
      {
        displayName: [
          { required: true, message: "Hebrew name required", trigger: "blur" }
        ]
      }
    ],
    selectedDataType: [
      { required: true, message: "Data Type must be selected." }
    ],
    sql: [
      {
        required: true,
        message: "Please input sql query.",
        trigger: "blur"
      }
    ],
    systemName: [
      {
        required: true,
        message: "System Name Required.",
        trigger: "blur"
      }
    ]
  };

  @Watch("form.displayName", { immediate: true })
  updateSystemName() {
    if (!this.form?.displayName) return

    this.form.systemName =
      "Cse_" +
      (
        this.form.displayName.charAt(0).toUpperCase() +
        this.form.displayName.slice(1)
      ).replace(/\s/g, "")
  }

  get dataTypes() {
    return AppCacheModule.FlexSettings.virtualEntityDataTypes
  }

  get periodTypes() {
    return AppCacheModule.FlexSettings.periodPickerTypes
  }

  get EntitiesList() {
    return EntitiesModule.EntitiesTree.children.reduce(
      (total: any, entity: any) => {
        return total.concat(
          entity.children.map(
            (child: any) => new KeyValue(child.name, child.id)
          )
        )
      },
      []
    )
  }

  private onOkClick() {
    (this.$refs.form as ElForm).validate((valid: boolean) => {
      if (valid) {
        const newProperty = PropertyFactory.getPropertyByDataType(
          this.form.selectedDataType
        )
        if (!newProperty) {
          this.$confirm("unable to create Formula property.")
          return
        }

        if (!this.form.heLang.displayName) {
          this.$notify.error({
            title: "Error",
            message: "Hebrew display Name required."
          })
          valid = false
          return
        }
        const np = new NewPropertyInputs()
        np.isFormula = true
        np.formulaSqlQuery = this.form.sql as string
        np.dataTypeTranslations = this.dataTypes
        np.dataTypeValue = this.form.selectedDataType
        np.useThousandSeparator = this.form.useThousandSeparator
        np.numberOfDecimalPlaces = this.form.numberOfDecimalPlaces
        np.lookupClassName = this.form.lookupClassName as string
        np.displayName = this.form.displayName as string
        np.description = this.form.description as string
        np.systemName = this.form.systemName
        np.notes = this.form.notes

        np.languageTranslations = []
        np.languageTranslations.push(this.form.heLang)

        const newPropertyx = PropertyFactory.createPropertyNew(np)

        this.okHandler(newPropertyx)
      } else {
        return false
      }
    })
  }

  private onCancelClick() {
    console.log("cancel clicked")
    this.resetForm()
    this.$emit("update:showModel", false)
    this.$emit("onCancel")
  }

  resetForm() {
    (this.$refs.form as ElForm).resetFields()
  }

  created() {}
}
</script>

<style lang="scss" scoped>
.el-container {
  position: relative;
  height: 100%;
  margin: 0;
}
</style>
