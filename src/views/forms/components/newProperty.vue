<template>
  <el-dialog
    ref="dialog"
    width="60%"
    top="2vh"
    title="Insert New Property"
    :visible.sync="showModal"
    destroy-on-close
    :close-on-click-modal="false"
    :close-on-press-escape="true"
    append-to-body
    :before-close="handleClose"
    :label-position="'top'"
  >
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
            style="width: 50%; font-size: 14pt"
          />
        </el-form-item>

        <el-form-item
          style="margin-left: 10px; padding: 10px 2px; margin-bottom: 2px"
        >
          <el-input
            v-model="form.description"
            type="textarea"
            :autosize="{maxRows: 2}"
            style="width: 50%"
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
                      style="margin: -150"
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
                    <ChoiceDataTypeConfig
                      v-if="form.selectedDataType === '3'"
                    />
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
                      style="display: block"
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
                      v-if="['9', '10', '11'].includes(form.selectedDataType)"
                      v-model="selectedNodeId"
                      placeholder="Select an Entity"
                      clearable
                      filterable
                      default-first-option
                      @change="onLookupEntityChanged"
                    >
                      <el-option
                        v-for="item in EntitiesList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      />
                    </el-select>
                    <br>
                    <el-select
                      v-if="form.selectedDataType === '10'"
                      v-model="form.LookupProperty"
                      placeholder="Lookup Property"
                      clearable
                      filterable
                      default-first-option
                    >
                      <el-option
                        v-for="item in lookupProperties"
                        :key="item.value"
                        :label="item.key"
                        :value="item"
                      />
                    </el-select>
                  </div>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item
              v-if="form.selectedDataType === '10'"
              title="Reverse lookup "
            >
              <el-row>
                <el-col>
                  <EnglishInput
                    ref="revEn"
                    :translation="form.reverse.eng"
                  />
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <HebrewInput
                    ref="revHe"
                    :translation="form.reverse.he"
                  />
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="Advance ">
              <el-form-item label="Notes">
                <el-input
                  v-model="form.notes"
                  type="textarea"
                  :autosize="{maxRows: 3}"
                />
              </el-form-item>
              <el-form-item
                :label="
                  form.selectedDataType === '10'
                    ? 'Table System Name'
                    : 'System Name'
                "
                prop="systemName"
              >
                <el-input v-model="form.systemName" />
                <div class="sub-title">
                  <small> Cannot contain spaces. Example: myProperty </small>
                </div>
              </el-form-item>
              <el-form-item
                v-if="form.selectedDataType === '10'"
                label="Reverse lookup system Name'"
                prop="systemName"
              >
                <el-input v-model="form.reverseLookupSystemName" />
                <div class="sub-title">
                  <small> Cannot contain spaces. Example: myProperty </small>
                </div>
              </el-form-item>

              <el-form-item
                :label="
                  ['10', '11'].includes(form.selectedDataType)
                    ? 'Database key column name'
                    : 'Database Column Name'
                "
                prop="databaseColumnName"
              >
                <el-input v-model="form.databaseColumnName" />
                <div class="sub-title">
                  <small>
                    Cannot contain spaces. Capital first letter. Example: MyEntity
                  </small>
                </div>
              </el-form-item>

              <el-form-item
                v-if="['10', '11'].includes(form.selectedDataType)"
                label="Row Filter"
              >
                <el-input
                  v-model="form.rowFilter"
                  type="textarea"
                  :autosize="{maxRows: 5}"
                />
              </el-form-item>
              <el-form-item
                v-if="form.selectedDataType === '10'"
                label="Order by"
              >
                <el-input v-model="form.orderBy" />
              </el-form-item>

              <el-form-item
                v-if="form.selectedDataType === '11'"
                label="Reference Table"
                prop="referenceTable"
              >
                <el-input v-model="form.referenceTable" />
                <div class="sub-title">
                  <small>
                    Must begin with Cse. Cannot contain spaces. Example: CseMyEntity
                  </small>
                </div>
              </el-form-item>
              <el-form-item
                v-if="form.selectedDataType === '11'"
                label="Reference Column"
              >
                <el-input v-model="form.referenceColumn" />
              </el-form-item>
            </el-collapse-item>
          </el-collapse>
        </el-row>
      </el-main>
    </el-form>

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
import { AppCacheModule } from "@/store/modules/appCache"
import { Entity } from "@/models/Entity"
import { displayNameRule } from "@/views/entities/util"
import { debug, table } from "console"
import {
  NewPropertyInputs,
  PropertyFactory
} from "@/models/Utils/PropertyFactory"
import {
  BaseProperty,
  DecimalProperty,
  EntityBaseProperty,
  LookupProperty,
  NumericProperty,
  Property
} from "@/models/Properties"
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
import EnglishInput from "@/components/LangInput/englishInput.vue"
import { EntitiesModule } from "@/store/modules/entitiesMod"
import { DataUtils } from "@/models/Utils/DataUtils"
import { ElDialog } from "element-ui/types/dialog"
import { ChoiceOption } from "@/models/ChoiceOption"
import ChoiceDataTypeConfig from "@/components/InputDataTypes/ChoiceType/ChoiceDataTypeConfig.vue"
import { getEntityById } from "@/api/mainApi"
import { Node } from "@/models/Node"
export class PropertyForm {
  displayName: null | string = null;
  description: null | string = null;
  heLang = new LanguageTranslation("he", "", "");
  dataType:
    | BaseDataType
    | EntityBasedDataType
    | ChoiceDataType = new BaseDataType();

  options: ChoiceOption[] = [];
  selectedDataType = "2";
  periodPickerType = "2";
  useThousandSeparator = false;
  numberOfDecimalPlaces = 2;
  selectedNode: Node | null = null;
  selectedNodeId: string | null = null;
  lookupClassName: undefined | string = undefined;
  LookupProperty: BaseProperty | null = null;
  systemName: string | null = null;
  databaseColumnName: string | null = null;
  databaseKeyColumnName: string | null = null;
  rowFilter: string | null = null;
  orderBy: string | null = null;
  notes: string | null = null;
  reverse: {
    eng: LanguageTranslation
    he: LanguageTranslation
  } = {} as any;

  referenceColumn: string | null = null;
  referenceTable: string | null = null;
  reverseLookupSystemName: string | null = null;
}

@Component({
  name: "newPropertyForms",
  components: { HebrewInput, EnglishInput, ChoiceDataTypeConfig }
})
export default class extends Vue {
  @Prop({ required: true }) show!: boolean;
  @Prop({ required: true }) entity!: Entity;
  @Prop({ required: true }) onOk!: any;
  @Prop({ required: true }) onCancel!: any;

  form = new PropertyForm();

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
    const dt = this.dataTypes.find((x) => x.value === data)
    if (dt) {
      if (["5"].includes(data)) {
        this.form.dataType = new ChoiceDataType()
      } else if (["9"].includes(data)) {
        this.form.dataType = new EntityBasedDataType()
      } else if (["10", "11"].includes(data)) {
        this.form.dataType = new EntityBasedDataType()
      } else {
        this.form.dataType = new BaseDataType()
      }
      this.updateAdvanceSettings()
      this.form.dataType.key = dt?.key
      this.form.dataType.value = dt?.value
    }
  }

  private updateAdvanceSettings() {
    if (this.form.selectedDataType === "10") {
      const entityEnName = this.entity.displayName
      const entityHeName = this.entity.languageTranslations[0].displayName
      this.form.reverse = {
        eng: new LanguageTranslation(
          "en",
          entityEnName + " (" + this.form.displayName + ")",
          ""
        ),
        he: new LanguageTranslation(
          "he",
          entityHeName + " (" + this.form.heLang.displayName + ") ",
          ""
        )
      }

      this.form.reverseLookupSystemName = DataUtils.convertToSystemName(
        this.form.displayName as string
      )
    } else if (this.form.selectedDataType === "11") {
    }
    this.updateDataBaseColumnName(this.form.dataType.value)
    // this.setRowFilter();
  }

  private updateDataBaseColumnName(dataTypeValue: string): void {
    var source = ""

    if (dataTypeValue == DataTypeFactory.TABLE) {
      source =
        this.currentEntity.displayName +
        DataUtils.convertToSystemName(this.form.displayName as string)
    } else if (dataTypeValue == DataTypeFactory.MULTI_LOOKUP) {
      source = this.currentEntity.displayName
    } else {
      source = this.form.displayName as string
    }

    this.form.databaseColumnName = DataUtils.convertToColumnName(
      source,
      dataTypeValue,
      this.currentEntity.outOfTheBox
    )
  }

  private getImage(type: any) {
    return DataTypeFactory.getPreviewImage(type)
  }

  private loading = false;

  private refTableRule = (rule: any, value: string, callback: any) => {
    if (value === "") {
      callback(
        new Error(
          "Refrence Table name required, must start with Cse and contains [a-z] [0-9]"
        )
      )
    } else if (!value.startsWith("Cse")) {
      callback(new Error("Must start With Cse and contains [a-z] [0-9]"))
    } else {
      callback()
    }
  };

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
          (x) => x.displayName.toLowerCase() === value.toLowerCase()
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
    ],
    databaseKeyColumnName: [
      {
        required: true,
        message: "Type a value.",
        trigger: "blur"
      }
    ],
    databaseColumnName: [
      {
        required: true,
        message: "Database column name required.",
        trigger: "blur"
      }
    ],
    referenceTable: [
      {
        required: true,
        message: "Reference table name required or invalid values.",
        pattern: /^[a-zA-Z0-9_]+$/,
        trigger: "blur"
      },
      {
        validator: this.refTableRule,
        trigger: "blur"
      }
    ]
  };

  @Watch("form.displayName", { immediate: true })
  updateSystemName() {
    if (!this.form?.displayName) return

    this.form.systemName = "cse_" + this.form.displayName.replace(/\s/g, "")
    this.updateAdvanceSettings()
  }

  get dataTypes() {
    return AppCacheModule.FlexSettings.propertyDataTypes
  }

  get periodTypes() {
    return AppCacheModule.FlexSettings.periodPickerTypes
  }

  get EntitiesList(): Node[] {
    return EntitiesModule.EntitiesTree.children.reduce(
      (total: any, entity: any) => {
        return total.concat(
          entity.children.map(
            // (child: any) => new KeyValue(child.name, child.id)
            (child: any) => child
          )
        )
      },
      []
    )
  }

  public NEW_REVERSED_PROPERTY_DISPLAY_NAME = "(New Property)";
  private newLookupProperty = new KeyValue("(New Property)", "New_Property");
  private lookupProperties = [...[this.newLookupProperty]];

  private async onLookupEntityChanged(selectedNodeId: string) {
    debugger

    console.log("selected entity lookup " + selectedNodeId)

    const node = this.EntitiesList.find((x) => x.id === selectedNodeId)
    if (node) this.form.selectedNode = node

    if (this.form.selectedDataType) {
      const selectedNode: Node = this.form.selectedNode as Node
      const isSelectedOutOfTheBox = selectedNode
        ? selectedNode?.id?.indexOf("cse.custom") == -1
        : false

      if (this.form.selectedDataType === DataTypeFactory.MULTI_LOOKUP) {
        debugger
        if (selectedNode && selectedNode.name) {
          this.form.referenceColumn = DataUtils.convertToRefColumnManyToMany(
            selectedNode.name as string,
            DataTypeFactory.MULTI_LOOKUP,
            this.currentEntity,
            this.form.displayName as string,
            isSelectedOutOfTheBox
          )

          this.form.referenceTable = DataUtils.convertToRefTable(
            this.currentEntity.displayName,
            selectedNode.name as string,
            this.form.displayName as string
          )
        } else {
          this.form.referenceColumn = ""
          this.form.referenceTable = ""
        }
      } else if (this.form.selectedDataType == DataTypeFactory.TABLE) {
        var isOutOfTheBox: Boolean = selectedNodeId.indexOf("cse.custom") == -1

        var shouldUseOriginalTable: boolean = this.useOriginalTableName(
          this.form.LookupProperty as BaseProperty
        )

        if (!isOutOfTheBox || shouldUseOriginalTable) {
          this.form.rowFilter = DataUtils.getRowFilter(null, false)
        } else {
          this.setRowFilter()
        }
      }
    }
    this.updateAdvanceSettings()
  }

  private setRowFilter() {
    let tableName: string | null = null
    if (this.form.selectedNode) {
      for (const attr of (this.form.selectedNode as Node).attributes) {
        if (attr.key == "TABLE") {
          tableName = attr.value as string
        }
      }
    }
    this.form.rowFilter = DataUtils.getRowFilter(tableName, true)
  }

  public useOriginalTableName(baseProperty: BaseProperty): boolean {
    var outOfTheBox: Boolean = baseProperty != null && baseProperty.outOfTheBox

    return outOfTheBox && !this.isNewReversePropertySelected(baseProperty)
  }

  public isNewReversePropertySelected(baseProperty: BaseProperty): Boolean {
    var showReversePropertySection: Boolean =
      baseProperty != null &&
      baseProperty.displayName == this.NEW_REVERSED_PROPERTY_DISPLAY_NAME

    return showReversePropertySection
  }

  private onOkClick() {
    (this.$refs.heInput as HebrewInput).validate()
    if (this.form.selectedDataType === "10") {
      (this.$refs.revHe as HebrewInput).validate();
      (this.$refs.revEn as EnglishInput).validate()
    }
    (this.$refs.form as ElForm).validate((valid: boolean) => {
      if (valid) {
        const newProperty = PropertyFactory.getPropertyByDataType(
          this.form.selectedDataType
        )
        if (!newProperty) {
          this.$confirm("unable to create new property.")
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
        np.entityId = this.entity.id
        np.dataTypeTranslations = this.dataTypes
        np.dataTypeValue = this.form.selectedDataType
        np.choiceOptions = this.form.options
        np.useThousandSeparator = this.form.useThousandSeparator
        np.numberOfDecimalPlaces = this.form.numberOfDecimalPlaces
        np.lookupClassName = this.form.lookupClassName as string
        np.displayName = this.form.displayName as string
        np.description = this.form.description as string
        np.systemName = this.form.systemName
        np.notes = this.form.notes
        np.isFormula = false
        np.languageTranslations = []
        np.languageTranslations.push(this.form.heLang)

        np.dataBaseColumnName = this.form.databaseColumnName
        
        const newPropertyx = PropertyFactory.createPropertyNew(np)
        this.onOk(newPropertyx)
      } else {
        return false
      }
    })
  }

  private handleClose(done: any) {
    done()
    this.onCancelClick()
  }

  private onCancelClick() {
    this.resetForm()
    this.$emit("update:showModel", false)
    this.onCancel()
  }

  resetForm() {
    (this.$refs.form as ElForm).resetFields()
  }
}
</script>

<style >
.elmain {
  padding-top: 0px;
}
</style>
