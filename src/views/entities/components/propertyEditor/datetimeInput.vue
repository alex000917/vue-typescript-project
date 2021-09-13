<template>
  <div style="padding-left: 20px">
    <el-row style="padding:5px">
      <el-col :span="3">
        {{ title }}
      </el-col>
      <el-col :span="21">
        <el-input
          ref="elInput"
          v-model="displayValue"
          type="text"
          style="max-width: 500px"
          :readonly="!defaultValueInputEnabled"
          @blur="onTextChanged"
        >
          <el-dropdown
            slot="append"
            trigger="click"
            @command="selectInputMethod"
          >
            <el-button
              type="text"
              icon="el-icon-caret-bottom"
              style="width: 16px; height: 16px"
            />
            <el-dropdown-menu
              slot="dropdown"
              style="margin-top: 0"
            >
              <el-dropdown-item command="today">
                Today
              </el-dropdown-item>
              <el-dropdown-item
                v-if="isDefault"
                command="blank"
              >
                Blank
              </el-dropdown-item>

              <el-dropdown-item command="selectProperty">
                Select propery...
              </el-dropdown-item>
              <el-dropdown-item command="selectPreference">
                Select application Preference...
              </el-dropdown-item>
              <el-dropdown-item
                v-if="!isDefault"
                command="noLimit"
              >
                No limit
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-input>
      </el-col>
    </el-row>
    <PropertySelectModel
      v-if="showProeprtyModel"
      :dialog-visible.sync="showProeprtyModel"
      :result-handler="selectProperyHandler"
      :entity-id="CurrentEntity.id"
      :allowed-properties="['4']"
    />
    <prefModel
      v-if="showPreferenceModel"
      :is-open.sync="showPreferenceModel"
      :result-handler="onPrefSelected"
      :allowed-properties="['4']"
    />
  </div>
</template>
<script lang="ts">
import { BaseProperty, DateProperty, DateValueObject, NumericProperty } from "@/models/Properties"
import { Component, Vue, Watch, Prop } from "vue-property-decorator"
import PropertySelectModel from "@/components/PropertySelector/index.vue"
import prefModel from "@/components/Preferences/prefModel.vue"
import { ElInput } from "element-ui/types/input"
import { EntitiesModule } from "@/store/modules/entitiesMod"
import { KeyValue } from "@/models/KeyValue"
import { ApplicationPreferenceFactory } from "@/models/Utils/ApplicationPreferenceFactory"
import { ApplicationPreference } from "@/models/ApplicationPreference"
import { PropertyFactory } from "@/models/Utils/PropertyFactory"
@Component({
  name: "DateTimeInput",
  components: { PropertySelectModel, prefModel }
})
export default class extends Vue {
  @Prop({ required: true, default: "Default Value" }) private title!: string;
  @Prop({ required: false, default: false }) private isDefault!: boolean;
  @Prop({ required: true }) private property!: DateProperty;
  @Prop({ required: true }) private propertyKey!: string;

  displayValue:string |null=null;
  defaultValueInputEnabled = false;
  showProeprtyModel = false;
  showPreferenceModel = false;
  commandType = "blank";
  selectInputMethod(command: any) {
    console.log("command " + command)

    this.defaultValueInputEnabled = false
    if (command === "today") {
      const newValue = new DateValueObject()
      newValue.today = true
      this.displayValue = "Today"
      this.currentProperty[this.propertyKey] = newValue
    }
    if (command === "blank") {
      this.displayValue = ""
      const newValue = new DateValueObject()
      newValue.today = false
      newValue.blank = true
      this.currentProperty[this.propertyKey] = newValue
    } else if (command === "selectProperty") {
      this.showProeprtyModel = true
    } else if (command === "selectPreference") {
      this.showPreferenceModel = true
    } else if (command === "noLimit") {

    }
  }

  onIncludeBlankChanged(value: any) {
    console.log("include Blank changed.....")
    if (!value) {
      this.currentProperty.defaultValue = ""
    }
  }

  onTextChanged(value:any) {

  }

  async selectProperyHandler(value: KeyValue[]) {
    console.log("property selected.....")
    const newValue = new DateValueObject()
    newValue.today = false
    newValue.blank = false
    newValue.property = value
    this.displayValue = "[" + await PropertyFactory.getPropertyNameFromPropertyPath(value) + "]"
    this.currentProperty[this.propertyKey] = newValue
  }

  onPrefSelected(value: ApplicationPreference) {
    console.log("Preference selected.....")
    const newValue = new DateValueObject()
    newValue.today = false
    newValue.blank = false
    const kv = ApplicationPreferenceFactory.createKeyValueArrayFromApplicationPreference(value)
    newValue.property = kv
    this.displayValue = "[" + value.displayName + "]"
    this.currentProperty[this.propertyKey] = newValue
  }

  get CurrentEntity() {
    return EntitiesModule.getCurrentEntity
  }

  private currentProperty!: BaseProperty | any;

  @Watch("currentProperty", { immediate: true, deep: true })
  private updateCurrentProperty(prop: Object) {
    this.$emit("update:property", this.currentProperty)
  }

  created() {
    this.currentProperty = this.property
  }
}
</script>
