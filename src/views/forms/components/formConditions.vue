<template>
  <el-container>
    <el-form
      :model="form"
      label-position="left"
    >
        <el-row>
          <el-col :span="6.5" class="conditionButton">
              <el-button type="info" plain><i class="el-icon-user" @click="openAddNewRoleGroup = true"></i> New Role Group</el-button>
          </el-col>
          <el-col :span="6.5" class="conditionButton">
              <el-button type="info" plain><i class="el-icon-circle-plus-outline"></i> New Condition</el-button>
          </el-col>
          <el-col :span="4.5" class="conditionButton">
              <el-button type="info" plain><i class="el-icon-edit"></i> Edit</el-button>
          </el-col>
          <el-col :span="3" class="conditionButton">
              <el-button type="info" plain><i class="el-icon-delete"></i> Delete</el-button>
          </el-col>
        </el-row>

        <div :class= "conditionsDivHeight ? 'presentationDiv' : 'presentationDivSmall'">
          <el-row>
            <el-form-item>
              <el-dropdown>
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--right"></i> Test List
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                      v-for="authTree in authorizationTree.children"
                      :key="authTree.id"
                      :label="authTree.name"
                      :value="authTree.name">
                  </el-dropdown-item>
                  
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
          </el-row>
        </div>

    </el-form>

    <newRoleGroupModal
            :visible.sync="openAddNewRoleGroup"
            :entity="currentEntity"
    />

  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator"
import { AppCacheModule } from "@/store/modules/appCache"
import { Entity } from "@/models/Entity"
//import { displayNameRule } from "../util"
import { debug, table } from "console"
import {
  NewPropertyInputs,
  PropertyFactory
} from "@/models/Utils/PropertyFactory"
import {
  BaseProperty
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
import EnglishInput from "@/components/LangInput/englishInput.vue"
import { EntitiesModule } from "@/store/modules/entitiesMod"
import { DataUtils } from "@/models/Utils/DataUtils"
import { ChoiceOption } from "@/models/ChoiceOption"
import ChoiceDataTypeConfig from "@/components/InputDataTypes/ChoiceType/ChoiceDataTypeConfig.vue"
import { Node } from "@/models/Node"
import HebrewInput from "./propertyEditor/hebrewInput.vue"
import { Property } from "@/models/Properties"
import newRoleGroupModal from "@/components/Conditions/newRoleGroupModal.vue"
import { AuthorizationModule } from "@/store/modules/AuthorizationMod"

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
  name: "formConditions",
  components: { HebrewInput, EnglishInput, ChoiceDataTypeConfig, newRoleGroupModal }
})
export default class extends Vue {
  @Prop({ required: false }) show!: boolean;
  @Prop({ required: false }) entity!: Entity;
  @Prop({ required: false }) conditionsDivHeight!: boolean;

 // form = new PropertyForm();

  private form = {
    entity: {} as any,
    authTree: "",
    task: "",
    taskTimeReport: ""
  };

  get currentEntity() {
    return this.entity
  }

  get authorizationTree() {
    const result = AuthorizationModule.AuthTree?.children.find(
      (item) => item.id === this.form.entity.id
    )
    if (result) {
      this.form.authTree = result.children[0].id as string
      return result
    }
    return []
  }

  private openAddNewRoleGroup = false;
  // Add New Role Group Window
  private showAddNewRoleGroupWindow = false;
  onAddNewRoleGroup() {
        this.showAddNewRoleGroupWindow = true
  }
  private onRoleGroupOk(property: Property) {
        this.showAddNewRoleGroupWindow = false
        this.openAddNewRoleGroup = false;
        // this.currentEntity.properties.push(property)
  }
  private onRoleGroupCancel() {
      this.showAddNewRoleGroupWindow = false
      this.openAddNewRoleGroup = false;
  }

  private convertName(displayName: string) {
      var suffix = 'section' //suffix = SystemNameConstants.SECTION;
      var doNotAddCsePrefix = false;
      return DataUtils.convertToSystemName(displayName, suffix, doNotAddCsePrefix)
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
          "Reference Table name required, must start with Cse and contain [a-z] [0-9]"
        )
      )
    } else if (!value.startsWith("Cse")) {
      callback(new Error("Must start With Cse and contain [a-z] [0-9]"))
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
    this.showAddNewRoleGroupWindow = false
  //  (this.$refs.heInput as HebrewInput).validate()
    let heInput: any = this.$refs.heInput as HebrewInput
    heInput.validate

    if (this.form.selectedDataType === "10") {

//   (this.$refs.revHe as HebrewInput).validate();
      let revHe: any = this.$refs.revHe as HebrewInput
      revHe.validate
   
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
      } else {
        return false
      }
    })
  }

  private handleClose(done: any) {
    this.showAddNewRoleGroupWindow = false
    done()
    this.onCancelClick()
  }

  private onCancelClick() {
    this.resetForm()
    this.$emit("update:showModel", false)
  }

  resetForm() {
    (this.$refs.form as ElForm).resetFields()
  }
}
</script>

<style>
  .elmain {
    padding-top: 0px;
  }
  .elRow {
    margin-top: 20px;
  }
  .elColDisplayName {
    line-height: 25px;
  }
  .elDisplayNameInput {
    padding: 2px; 
    margin-bottom: 2px;
  }
  .conditionButton {
    padding-right: 5px;
  }
  .presentationDiv {
    border: 1px solid lightgrey;
    height: 210px;
    margin-top: 10px;
    width: 155%;
  }
  .presentationDivSmall {
    border: 1px solid lightgrey;
    height: 50px;
    margin-top: 10px;
    width: 155%;
  }
</style>
