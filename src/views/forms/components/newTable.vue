<template>
  <el-dialog
    ref="dialog"
    width="60%"
    top="2vh"
    title="New Table"
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

    <el-main
        class="elmain"
        style="overflow: auto"
    >
        <el-row>
            <el-col>
                <el-divider class="titleDivider" content-position="left">
                    Create a new table property: 
                </el-divider>
            </el-col>
        </el-row>

        <!--  Table Entity -->
        <el-row>
            
            <el-row>
                <el-col :span="12">
                    <span> Table Entity: </span>
                    <el-form-item prop="selectedDataType">
                        <el-row>
                            <el-col>
                                <el-radio v-model="selected" label="1">
                                    Existing Entity.
                                </el-radio>   
                                <label class="radioButtonDescription" >
                                    For example: Creating a table of tasks, risks and other existing entities.
                                </label>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col>
                                <el-radio v-model="selected" label="2">
                                    New Entity.
                                </el-radio>
                                <label class="radioButtonDescription">
                                    Create a new entity for the table.
                                </label>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
            </el-row>

            <div v-show="selected == 1">
              <el-row>
                <el-form-item label="Choose table's entity">
                    <el-select
                        v-model="form.lookupClassName"
                        size="mini"
                        placeholder="Find entity"
                        clearable
                        filterable 
                        class="filter-item"
                        style="width: 25%"
                        @change="changeLookupProperties(false)"
                        >
                        <el-option
                            v-for="item in EntitiesList"
                            :key="item.key"
                            :label="item.key"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item label="Lookup property">
                    <el-select
                        v-model="form.selectedLookupProperty"
                        size="mini"
                        placeholder="(New property)"
                        clearable
                        filterable
                        class="filter-item"
                        style="width: 25%"
                        >
                        <el-option
                            v-for="item in lookupProperties"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key"
                        />
                    </el-select>
                </el-form-item>
              </el-row>

              <el-row>
                  <el-form-item
                    label="Table display name"
                    prop="systemName"
                  >   
                    <el-input v-model="form.displayName" style="width: 25%;" />
                    <div class="sub-title">
                        <small> A new table property will be created with this name. Example: MyEntities </small>
                    </div>
                  </el-form-item>
              </el-row>
            </div>

            <div v-show="selected == 2">
                <el-row>
                    <el-form-item
                        label="Display name - singular"
                        prop="systemName"
                    >   
                    <el-input v-model="form.displayName" style="width: 25%;" @change="changeLookupProperties(true)"/>
                    <div class="sub-title">
                        <small> A new entity will be created with this name. Example: MyEntity </small>
                    </div>
                    </el-form-item>
                </el-row>

                <el-row>
                    <el-form-item
                        label="Display name - plural"
                        prop="systemName"
                    >   
                    <el-input v-model="form.propertySystemName" style="width: 25%;" />
                    <div class="sub-title">
                        <small> A new table property will be created with this name. Example: MyEntities </small>
                    </div>
                    </el-form-item>
                </el-row>
            </div>

            <el-row>
                <el-form-item
                label="Reverse lookup display name"
                prop="systemName"
                >   
                <el-input :value="convertNameForExistingEntity(form.displayName, true)" style="width: 25%;" />
                <div class="sub-title">
                    <small> This property will be created on the table entity as a lookup to the form entity. </small>
                </div>
                </el-form-item>
            </el-row>

            <el-row>
                <el-form-item label="Table description">
                    <el-input
                    v-model="form.description"
                    type="textarea"
                    :autosize="{maxRows: 3}"
                    style="width: 50%"
                    />
                    <div class="sub-title" style="margin-left: 15%">
                            <small> (Optional) </small>
                        </div>
                </el-form-item>
            </el-row>

            <el-row v-if="selected == 1">
                <el-col>
                <HebrewInputExistingEntity
                    ref="heInput"
                    :translation="form.heLang"
                />
                </el-col>
            </el-row>
              
            <el-row v-if="selected == 2">
                <el-col>
                <HebrewInputNewEntity
                    :entityName="form.displayName"
                    ref="heInput"
                    :translation="form.heLang"
                />
                </el-col>
            </el-row>
       
         <el-collapse :accordion="true">
            <el-collapse-item title="Advanced ">
              
             <!-- Display only if "New Entity" is checked -->
              <div v-if="selected == 2">

                <el-form-item label="Discipline">
                    <el-select
                        v-model="form.discipline"
                        size="mini"
                        placeholder="(General)"
                        clearable
                        filterable
                        class="filter-item"
                        style="width: 25%"
                        >
                        <el-option
                            v-for="item in allDisciplines"
                            :key="item.key"
                            :label="item.key"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item label="SQL Connection">
                    <el-select
                        v-model="form.sqlconnection"
                        size="mini"
                        placeholder="(MSP_DB)"
                        clearable
                        filterable
                        class="filter-item"
                        style="width: 25%"
                        >
                        <el-option
                            v-for="item in sqlConnections"
                            :key="item.key"
                            :label="item.key"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-checkbox
                        class="filter-item"
                        label="active"
                        style="margin-left: 14.2%"
                    >
                        Users can change items order inside tables
                    </el-checkbox>
                </el-form-item>

                <el-form-item
                    label="Entity system name"
                    prop="systemName"
                >
                    <el-input :value="convertNameForNewEntity(form.displayName, true)" style="width: 25%;"/>
                    <div class="sub-title">
                        <small> Cannot contain spaces. Capitalize first letters. Example: MyEntity </small>
                    </div>
                </el-form-item>

                <el-form-item
                    label="Database table name"
                    prop="systemName"
                >
                    <el-input :value="convertNameForNewEntity(form.displayName, false, true)" style="width: 25%;"/>
                    <div class="sub-title">
                        <small> Must begin with Cse. Cannot contain spaces. Example: CseMyEntity </small>
                    </div>
                </el-form-item>

              </div>


              <el-form-item
                label="Table property system name"
                prop="systemName"
              >
                <el-input :value="form.propertySystemName ? convertNameForNewEntity(form.displayName, false, false, true) : 
                            convertNameForExistingEntity(form.displayName, false, true)" 
                          style="width: 25%;"/>
                <div class="sub-title">
                  <small> Cannot contain spaces. Example: myProperty </small>
                </div>
              </el-form-item>

              <el-form-item
                v-if="selected == 1 || selected == 2"
                label="Reverse lookup system Name"
                prop="systemName"
              >
                <el-input :value="convertNameForExistingEntity(form.displayName, false, false, true)" style="width: 25%;"/>
                <div class="sub-title">
                  <small> Cannot contain spaces. Example: myProperty </small>
                </div>
              </el-form-item>

              <el-form-item
                :label="
                  selected == 1 || selected == 2
                    ? 'Database key column name'
                    : ''
                "
                prop="databaseColumnName"
              >
                <el-input :value="convertNameForExistingEntity(form.displayName, false, false, false, true)" style="width: 25%;"/>
                <div class="sub-title">
                  <small>
                    Cannot contain spaces. Capital first letter. Example: MyEntity
                  </small>
                </div>
              </el-form-item>

              <el-form-item label="Row filter">
                <el-input :value="form.rowFilter" style="width: 25%;" />
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
import HebrewInputExistingEntity from "./propertyEditor/hebrewInputNewTableExistingEntity.vue"
import HebrewInputNewEntity from "./propertyEditor/hebrewInputNewTableNewEntity.vue"
import EnglishInput from "@/components/LangInput/englishInput.vue"
import { EntitiesModule } from "@/store/modules/entitiesMod"
import { DataUtils } from "@/models/Utils/DataUtils"
import { StringUtils } from "@/models/Utils/StringUtils";
import { ElDialog } from "element-ui/types/dialog"
import { ChoiceOption } from "@/models/ChoiceOption"
import ChoiceDataTypeConfig from "@/components/InputDataTypes/ChoiceType/ChoiceDataTypeConfig.vue"
import { getEntityById } from "@/api/mainApi"
import { Node } from "@/models/Node"
import { ElTree, TreeNode } from "element-ui/types/tree"

export class PropertyForm {
  displayName: null | string = null;
  description: null | string = null;
  propertySystemName: null | string = null;
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
  selectedLookupProperty: string | null = null;
  lookupClassName: undefined | string = undefined;
  LookupProperty: BaseProperty | null = null;
  systemName: string | null = null;
  databaseColumnName: string | null = null;
  databaseKeyColumnName: string | null = null;
  rowFilter: string | null = null;
  orderBy: string | null = null;
  notes: string | null = null;
  discipline: string | null = null;
  reverse: {
    eng: LanguageTranslation
    he: LanguageTranslation
  } = {} as any;

  referenceColumn: string | null = null;
  referenceTable: string | null = null;
  reverseLookupSystemName: string | null = null;
  sqlconnection: string | null = null;
}

@Component({
  name: "newTableForms",
  components: { HebrewInputExistingEntity, HebrewInputNewEntity, EnglishInput, ChoiceDataTypeConfig }
})
export default class extends Vue {
  @Prop({ required: true }) show!: boolean;
  @Prop({ required: true }) entity!: Entity;
  @Prop({ required: true }) onOk!: any;
  @Prop({ required: true }) onCancel!: any;

  data () {
      return {
        selected: '1',
        entityName: 'ALEX '
      };
  }

  private query = {
    text: "",
    type: ""
  };

  @Watch("this.currentEntity.displayName", { immediate: true })
  @Watch("form.displayName", { immediate: true })
/*   @Watch("query", { deep: true })
  filterText(val: any) {
    (this.$refs.elTree as ElTree<any, any>).filter(`${val.text}||${val.type}`)
  } */

  private selectedLookupProperty: any = null;
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

  get displayProperties() {
    let properties = this.currentEntity.properties
    if (this.query?.text) {
      properties = properties.filter(x =>
        x.displayName.toLowerCase().includes(this.query?.text.toLowerCase())
      )
    }
    if (this.query?.type) {
      properties = properties.filter(
        x =>
          x?.dataType?.value?.toLowerCase() === this.query?.type.toLowerCase()
      )
    }
    return properties
  }

  private async changeLookupProperties(displayNameSingularInput: boolean) {

    let entityId;

    if(displayNameSingularInput) {
      entityId = this.entity.id;
    } else {
      entityId = this.form.lookupClassName ? this.form.lookupClassName : "";
    }

    if(entityId) {
      const entity = await EntitiesModule.getEntity(entityId);
      this.getRowFilterProp(entityId);

      if (entity.properties.length > 0 && !displayNameSingularInput) {
        this.lookupProperties = entity.properties
          .filter(
            (elem) =>
              (elem.dataType as EntityBasedDataType).lookupClassName ==
                this.currentEntity.id && elem.myspType === "LookupProperty"
          )
          .map((prop) => {
            return new KeyValue(prop.systemName, prop.displayName);
          });
      }
    }  
  }

  private getRowFilterProp(entityId: string) {
      this.form.rowFilter = DataUtils.getRowFilter(entityId, false)
  }

  private convertNameForExistingEntity(name: string, 
          isReverseLookupDisplayName: boolean, 
          isPropertySystemName: boolean,
          isReverseLookupSystemName: boolean,
          isDatabaseKeyColumnName: boolean,
          isRowFilter: boolean) {
     
    if(StringUtils.isNullOrEmpty(name)) {
      return '';
    }

    if (isReverseLookupDisplayName) {
      name = this.entity.displayName + " (" + name + ")";
    }

    if (isPropertySystemName) {
      name = "cse" + "_" + name.toLowerCase();
    }

    if (isReverseLookupSystemName) {
      let front_part = (this.entity.systemName.substring(0, 5)).toLowerCase();
      let back_part = this.entity.systemName.substring(5, this.entity.systemName.length);
      name = front_part + back_part + name
    }

    if (isDatabaseKeyColumnName) {
        let back_part = this.entity.systemName.substring(4, this.entity.systemName.length);
        name = "ref" + back_part + "id"
    }

    if (isRowFilter) {
        /* dataProvider.filter */
    }
    

    return name;
 }

 private convertNameForNewEntity (name: string, 
          isEntitySystemName: boolean, 
          isDatabaseTableName: boolean,
          isTablePropertySystemName: boolean) {

    if(StringUtils.isNullOrEmpty(name)) {
      return '';
    }

    if (isEntitySystemName) {
      name = "Cse_" + name.charAt(0).toUpperCase() + name.slice(1);
    }

    if (isDatabaseTableName) {
      name = "Cse" + name.charAt(0).toUpperCase() + name.slice(1) + "s";
    }

    if (isTablePropertySystemName) {
        name = "cse_" + name;
    }

    return name;
}

get allDisciplines() {
    return AppCacheModule.FlexSettings.disciplines
}

get sqlConnections() {
    return AppCacheModule.FlexSettings.sqlConnections;
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

public NEW_REVERSED_PROPERTY_DISPLAY_NAME = "(New Property)";
private newLookupProperty = new KeyValue("", "");
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
//    (this.$refs.heInput as HebrewInputExistingEntity).validate()
  let heInputEE: any = this.$refs.heInput as HebrewInputExistingEntity
  heInputEE.validate
//    (this.$refs.heInput as HebrewInputNewEntity).validate()
  let heInputNE: any = this.$refs.heInput as HebrewInputNewEntity
  heInputNE.validate
  if (this.form.selectedDataType === "10") {
  //  (this.$refs.revHe as HebrewInputExistingEntity).validate();
    let revHeEE: any = this.$refs.revHe as HebrewInputExistingEntity
    revHeEE.validate
  //  (this.$refs.revHe as HebrewInputNewEntity).validate();
    let revHeNE: any = this.$refs.revHe as HebrewInputNewEntity
    revHeNE.validate
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

.radioButtonDescription {
    display: block;
    font-size: 12px;
    font-weight: 400;
    margin: -7px 0 5px 0;
}

.titleDivider {
    margin: 10px 0 30px 0 !important;
}
</style>
