<template>
  <el-form
    v-if="currentProperty"

    style="padding: 10px"
    label-position="left"
    label-width="150px"
  >
    <div style="padding-left:20px">
      <el-row>
        <el-col>
          <el-form-item :label="title">
            <el-input
              ref="elInput"
              v-model="displayText"
              type="text"
              style="max-width:500px"
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
                  style="width:32px;height:16px"
                />
                <el-dropdown-menu
                  slot="dropdown"
                  style="margin-top: 0"
                >
                  <el-dropdown-item
                    v-if="isDefault"
                    command="blank"
                  >
                    Blank
                  </el-dropdown-item>
                  <el-dropdown-item
                    command="typeInput"
                  >
                    Type a number
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
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <PropertySelectModel
      v-if="showProeprtyModel"
      :dialog-visible.sync="showProeprtyModel"
      :result-handler="selectProperyHandler"
      :entity-id="CurrentEntity.id"
      :allowed-properties="['6','7','8']"
    />
    <prefModel
      v-if="showPreferenceModel"
      :is-open.sync="showPreferenceModel"
      :result-handler="onPrefSelected"
      :allowed-properties="['6','7','8']"
    />
  </el-form>
</template>
<script lang="ts">
import { BaseProperty, DateValueObject, NumericProperty } from "@/models/Properties"
import { Component, Vue, Watch, Prop } from "vue-property-decorator"
import PropertySelectModel from "@/components/PropertySelector/index.vue"
import prefModel from "@/components/Preferences/prefModel.vue"
import { ElInput } from "element-ui/types/input"
import { EntitiesModule } from "@/store/modules/entitiesMod"
import { PropertyFactory } from "@/models/Utils/PropertyFactory"
import { ApplicationPreference } from "@/models/ApplicationPreference"
import { ApplicationPreferenceFactory } from "@/models/Utils/ApplicationPreferenceFactory"
@Component({
  name: "data-editor",
  components: { PropertySelectModel, prefModel }
})
export default class extends Vue {
  @Prop({ required: true, default: "Default Value" }) private title!:string;
  @Prop({ required: false, default: false }) private isDefault!:boolean;
  @Prop({ required: true }) private property!: NumericProperty;
  @Prop({ required: true }) private propertyKey!: string;
  defaultValueInputEnabled = false;

  showProeprtyModel=false
  showPreferenceModel = false
  commandType="blank"
  displayText =""
  selectInputMethod(command:any) {
    console.log("command " + command)

    if (command === "typeInput") {
      this.defaultValueInputEnabled = true;
      (this.$refs.elInput as ElInput).focus()
    }
    if (command === "blank") {
      this.currentProperty.defaultValue = ""
      this.defaultValueInputEnabled = false
    } else if (command === "selectProperty") {
      this.defaultValueInputEnabled = false
      this.showProeprtyModel = true
    } else if (command === "selectPreference") {
      this.defaultValueInputEnabled = false
      this.showPreferenceModel = true
    } else if (command === "noLimit") {
      this.defaultValueInputEnabled = false
    }
  }

  onTextChanged(value:any) {
    if (this.commandType === "typeInput") {
      // add numeric logic.
      this.displayText = value
    }
  }

  onIncludeBlankChanged(value:any) {
    console.log("include Blank changed.....")
    if (!value) {
      this.currentProperty.defaultValue = ""
    }
  }

  async selectProperyHandler(value:any) {
    console.log("property selected.....")
    const newValue = new DateValueObject()
    newValue.today = false
    newValue.blank = false
    newValue.property = value
    this.displayText = "[" + await PropertyFactory.getPropertyNameFromPropertyPath(value) + "]"
    this.currentProperty[this.propertyKey] = newValue
  }

  onPrefSelected(value:ApplicationPreference) {
    console.log("Preference selected.....")
    this.displayText = value.displayName
    this.currentProperty[this.propertyKey] = ApplicationPreferenceFactory.createKeyValueArrayFromApplicationPreference(value)
  }

  get CurrentEntity() {
    return EntitiesModule.getCurrentEntity
  }

  private currentProperty!:BaseProperty|any

  @Watch("currentProperty", { immediate: true, deep: true })
  private updateCurrentProperty(prop: Object) {
    this.$emit("update:property", this.currentProperty)
  }

  created() {
    this.currentProperty = this.property
  }
}
</script>
