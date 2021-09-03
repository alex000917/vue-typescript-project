<template>
  <div>
    <el-select
      v-model="selectedValue"
      clearable
      placeholder="Select"
      @change="onChoiceChanged"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.key"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script lang="ts">
import { KeyValue } from "@/models/KeyValue"
import { AppCacheModule } from "@/store/modules/appCache"
import { Component, Prop, Vue } from "vue-property-decorator"

@Component({
  name: "DateTimeDataTypeConfig"
})
export default class extends Vue {
    options:KeyValue[] =AppCacheModule.FlexSettings.periodPickerTypes
    selectedValue=""

    onChoiceChanged(value) {
      this.$emit("onSelectedValueChanged", this.selectedValue)
    }
}
</script>
