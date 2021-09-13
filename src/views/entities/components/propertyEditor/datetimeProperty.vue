<template>
  <el-form
    :model="currentProperty"
    :rules="validationRules"
    style="padding: 10px;min-width:500px;overflow:auto"
    label-position="left"
  >
    <el-row>
      <PropHeaderInput
        :property="currentProperty"
        @cancel="hiddenHandler"
      />
    </el-row>
    <el-row style="padding-left: 40px">
      <el-form-item label="Period picker type">
        <el-select
          v-model="currentProperty.periodPickerType"
          placeholder="Choose property data type"
          value-key="key"
          size="mini"
        >
          <el-option
            v-for="item in periodPickerTypes"
            :key="item.value"
            :label="item.key"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-row>
    <el-row
      v-if="currentProperty.formula"
      style="padding: 5px"
    >
      <el-form-item style="padding-left: 40px">
        <el-input
          v-model="currentProperty.sql"
          placeholder="Enter a Sql select query returning a single value"
          type="textarea"
          :autosize="{minRows: 2, maxRows: 10}"
        />
      </el-form-item>
    </el-row>
    <el-row>
      <el-collapse
        style="padding: 10px"
        accordion
      >
        <el-collapse-item
          title="Languages"
          name="1"
        >
          <hebrewInput :translation="heInput" />
        </el-collapse-item>
        <el-collapse-item
          v-if="!currentProperty.formula"
          title="Data Entry"
          name="2"
        >
          <div style="padding-left:20px">
            <DateTimeInput
              :title="'Default Value'"
              :property="currentProperty"
              :property-key="'defaultValue'"
              :is-default="true"
            />

            <DateTimeInput
              :title="'Must be After'"
              :property-key="'defaultMaxValue'"
              :property="currentProperty"
            />

            <DateTimeInput
              :title="'Must be Before'"
              :property-key="'defaultMinValue'"
              :property="currentProperty"
            />
          </div>
        </el-collapse-item>
        <el-collapse-item
          title="Link"
          name="3"
        >
          <PropLinks :property="currentProperty" />
        </el-collapse-item>
        <el-collapse-item
          title="Reports"
          name="4"
        >
          <PropReports :property="currentProperty" />
        </el-collapse-item>
        <el-collapse-item
          title="Notifications"
          name="5"
        >
          <PropNotification :property="currentProperty" />
        </el-collapse-item>
        <el-collapse-item
          title="Advanced Settings"
          name="6"
        >
          <PropAdvanceSettings :property="currentProperty" />
        </el-collapse-item>
      </el-collapse>
    </el-row>
    <el-row>
      <el-button
        type="text"
        title="Delete this property"
        style="margin-left: auto; display: block"
        icon="el-icon-delete"
        @click="deleteHandler()"
      />
    </el-row>
  </el-form>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { mixins } from "vue-class-component"
import { AppCacheModule } from "@/store/modules/appCache.ts"
import SelectPropertyModal from "@/components/PropertySelector/index.vue"
import prefModel from "@/components/Preferences/prefModel.vue"
import PropLinks from "./propLinks.vue"
import PropReports from "./propReports.vue"
import PropNotification from "./propNotification.vue"
import PropHeaderInput from "./propHeaderInput.vue"
import EntitiesMixin from "../../mixin"
import {
  ChoiceProperty,
  DateProperty,
  DateValueObject
} from "@/models/Properties"
import { EntitiesModule } from "@/store/modules/entitiesMod"

import { ApplicationPreference } from "@/models/ApplicationPreference"
import hebrewInput from "./hebrewInput.vue"
import dataEditor from "./dataEditor.vue"
import PropAdvanceSettings from "./propAdvanceSettings.vue"
import { LanguageTranslation } from "@/models/LanguageTranslation"
import { PropertyFactory } from "@/models/Utils/PropertyFactory"
import { DataTypeFactory } from "@/models/Utils/DataTypeFactory"
import dataTypeInput from "./dataTypeInput.vue"
import NumericInput from "./numericInput.vue"
import DateTimeInput from "./datetimeInput.vue"
import ChooseOptions from "./chooseOptions.vue"
@Component({
  name: "DateTimeProperty",
  components: {
    PropLinks,
    PropReports,
    PropHeaderInput,
    PropNotification,
    SelectPropertyModal,
    ChooseOptions,
    prefModel,
    hebrewInput,
    dataEditor,
    PropAdvanceSettings,
    dataTypeInput,
    NumericInput,
    DateTimeInput
  }
})
export default class extends mixins(EntitiesMixin) {
  @Prop({ required: true }) private property!: DateProperty;

  // @Prop({ required: true }) private visible!: boolean;

  get validPropertyTypes() {
    var types = []
    types.push(DataTypeFactory.DATE_AND_TIME)
    types.push(DataTypeFactory.LOOKUP)
    types.push(DataTypeFactory.MULTI_LOOKUP)
    return types
  }

  private defaultValueInputEnabled = false;
  private validationRules = {
    displayName: [
      { required: true, message: "display name required", trigger: "blur" }
    ]
  };

  private form = {
    description: "",
    type: this.property.dataType,
    reports: {
      creatable: false
    },
    notification: {
      enabled: false,
      data: {}
    },
    languages: {}
  };

  private choiceOptions = ["Success", "Warning", "Failed"];
  private radio = "1";
  private num = 1;
  private linkRadio = "noLink";
  get periodPickerTypes() {
    return AppCacheModule.FlexSettings.periodPickerTypes
  }

  get CurrentEntity() {
    return EntitiesModule.currentEntity
  }

  @Watch("linkRadio", { immediate: true })
  private handleLinkRadio(val: string) {
    // Todo
  }

  getIcon(dataTypeValue: string) {
    return DataTypeFactory.getDataTypeIcon(dataTypeValue)
  }

  modalOkHandler(val: any) {
    console.log("Modal Ok Handler")
    if (this.modal.type === "report") {
      // TODO
    } else if (this.modal.type === "reportResult") {
      // TODO
    } else if (this.modal.type === "notification") {
      // this.form.notification.data = val;
    } else if (this.modal.type === "selectProperty") {
    }
  }

  hiddenHandler() {
    this.$emit("cancel")
  }

  deleteHandler() {
    this.$emit("delete")
  }

  heInput: LanguageTranslation | null = null;
  mounted() {
    this.defaultValueInputEnabled = false
  }

  private currentProperty!: DateProperty;

  @Watch("currentProperty", { immediate: true, deep: true })
  private updateCurrentProperty(prop: Object) {
    this.$emit("update:property", this.currentProperty)
  }

  created() {
    this.currentProperty = this.property
    this.heInput = this.currentProperty.languageTranslations[0]
  }
}
</script>

<style lang="scss" scoped>
.edit-property-container {
  font-weight: 500;
  padding: 10px;
  border-radius: 10px;
  background-color: whitesmoke;
  width: 100%;
  .flex-row {
    .el-button {
      color: gray;
    }
    .el-image {
      width: 16px;
      height: 16px;
      margin: 0 5px;
    }
    display: flex;
    align-items: center;
  }

  .type-container {
    align-items: center;
    margin-top: 10px;
    padding-left: 50px;
    span {
      margin-right: 10px;
    }
  }
  .lang-title {
    font-weight: 500;
    font-size: 15px;
    padding-left: 5px;
    border-bottom: solid $borderGray 1px;
  }
  .data-entry-container {
    margin-top: 10px;
    .input-title {
      width: 120px;
    }
    .el-input {
      width: 50%;
    }
  }
  .select-container {
    margin-top: 20px;
  }
  .radio-group-item {
    display: block;
    margin-top: 10px;
  }
  .require-content {
    color: #8e8e8e;
    margin: 0;
    padding: 0;
  }
  .advanced-container {
    margin: 20px 0 0 30px;
    .advanced-item-title {
      width: 210px;
    }
    .advanced-item-input {
      width: 40%;
    }
  }
}
.transparent-input {
  margin-left: 45px;
  border: none;
  background: transparent;
  &:focus {
    outline: none;
    background-color: white;
  }
}
</style>
