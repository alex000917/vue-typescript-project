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
          @blur="onDisplayValueChanged"
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
              <el-dropdown-item command="blank">
                Blank
              </el-dropdown-item>
              <el-dropdown-item command="selectProperty">
                Select propery...
              </el-dropdown-item>
              <el-dropdown-item command="selectPreference">
                Select application Preference...
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
      :allowed-properties="['9','10']"
    />
    <prefModel
      v-if="showPreferenceModel"
      :is-open.sync="showPreferenceModel"
      :result-handler="onPrefSelected"
      :allowed-properties="['9','10']"
    />
  </div>
</template>
<script lang="ts">
import { BaseProperty, BaseValueObject, DateProperty, DateValueObject, LookupProperty, NumericProperty, SimpleValueObject, StringProperty } from "@/models/Properties"
import { Component, Vue, Watch, Prop } from "vue-property-decorator"
import PropertySelectModel from "@/components/PropertySelector/index.vue"
import prefModel from "@/components/Preferences/prefModel.vue"
import { ElInput } from "element-ui/types/input"
import { EntitiesModule } from "@/store/modules/entitiesMod"
import { KeyValue } from "@/models/KeyValue"
import { ApplicationPreferenceFactory } from "@/models/Utils/ApplicationPreferenceFactory"
import { ApplicationPreference } from "@/models/ApplicationPreference"
import NewPropertyVue from "../NewProperty.vue"
import { PropertyFactory } from "@/models/Utils/PropertyFactory"
@Component({
  name: "LookupInput",
  components: { PropertySelectModel, prefModel }
})
export default class extends Vue {
  @Prop({ required: false, default: "Default Value" }) private title!: string;
  @Prop({ required: true }) private property!: LookupProperty;

  displayValue:string |null=null;
  defaultValueInputEnabled = false;
  showProeprtyModel = false;
  showPreferenceModel = false;
  commandType = "blank";
  selectInputMethod(command: any) {
    console.log("command " + command)
    this.commandType = command

    this.defaultValueInputEnabled = false
    if (command === "blank") {
      this.displayValue = ""
      const newValue = new BaseValueObject()
      newValue.blank = true
      newValue.property = []
      this.currentProperty.defaultValue = newValue
    } else if (command === "selectProperty") {
      this.showProeprtyModel = true
    } else if (command === "selectPreference") {
      this.showPreferenceModel = true
    } else if (command === "noLimit") {

    }
  }

  onDisplayValueChanged(value:string) {
    if (this.commandType == "type") {
      const newValue = new BaseValueObject()
      newValue.blank = false
      newValue.property = []
      this.currentProperty.defaultValue = newValue
    }
  }

  onIncludeBlankChanged(value: any) {
    console.log("include Blank changed.....")
    if (!value) {
      this.currentProperty.defaultValue = ""
    }
  }

  async selectProperyHandler(value: KeyValue[]) {
    console.log("property selected.....")
    const newValue = new BaseValueObject()
    newValue.blank = false
    newValue.property = value
    newValue.property = value
    this.currentProperty.defaultValue = newValue
    this.displayValue = "[ " + await PropertyFactory.getPropertyNameFromPropertyPath(value) + " ]"
  }

  onPrefSelected(value: ApplicationPreference) {
    console.log("Preference selected.....")
    const newValue = new BaseValueObject()
    newValue.blank = false
    const kv = ApplicationPreferenceFactory.createKeyValueArrayFromApplicationPreference(value)
    newValue.property = kv
    this.displayValue = "[ " + value.displayName + " ]"
    this.currentProperty.defaultValue = newValue
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
