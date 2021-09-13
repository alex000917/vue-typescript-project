<template>
  <el-form
    v-if="currentProperty"
    :model="currentProperty"
    :rules="validationRules"
    style="padding: 10px"
    label-position="left"
  >
    <div style="padding-left:40px">
      <el-row
        v-if="currentProperty.dataType.value === '2' ||currentProperty.dataType.value === '1'"
        class="type-container"
      >
        <el-form-item label="Maximum test size">
          <el-input
            v-model="currentProperty.maximumTextLength"
            size="mini"
            style="width: 80px"
          />
          <span style="font-size:8pt">  Leave empty for maximum system limit</span>
        </el-form-item>
      </el-row>
      <el-row
        v-if="currentProperty.dataType.value === '3'"
        class="type-container"
        style="margin: 0"
      >
        <el-form-item>
          <choose-options
            style="width:200px"
            :data.sync="currentProperty.dataType.options"
            :disabled="true"
          />
        </el-form-item>
      </el-row>
      <el-row
        v-if="currentProperty.dataType.value === '4'"
        class="type-container"
        type="flex"
      >
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

        v-if="['6','7','8'].includes(currentProperty.dataType.value)"
        class="type-container"
      >
        <el-form-item>
          <el-switch
            v-model="currentProperty.useThousandSeparator"
            active-color="#13ce66"
            inactive-color="gray"
          />
          <span style="font-weight: 500">Use 1,000 separator(,)</span>
        </el-form-item>
      </el-row>
      <el-row v-if="currentProperty.dataType.value==='8'">
        <el-form-item>
          <el-input-number
            v-model="currentProperty.numberOfDecimalPlaces"
            size="mini"
            controls-position="right"
          />
          <span style="font-weight: 500">Decimal places</span>
        </el-form-item>
      </el-row>
    </div>
  </el-form>
</template>
<script lang="ts">
import { BaseProperty } from "@/models/Properties"
import { AppCacheModule } from "@/store/modules/appCache"
import { Component, Vue, Watch, Prop } from "vue-property-decorator"
import chooseOptions from "../chooseOptions.vue"
@Component({
  name: "data-type-input",
  components: { chooseOptions }
})
export default class extends Vue {
  @Prop({ required: true }) private property!: BaseProperty;

  private validationRules = {
    displayName: [
      { required: true, message: "display name required", trigger: "blur" }
    ]
  };

  get periodPickerTypes() {
    return AppCacheModule.FlexSettings.periodPickerTypes
  }

  get currentProperty() {
    return this.property
  }

  set currentProperty(prop: Object) {
    this.$emit("update:property", prop)
  }
}
</script>
