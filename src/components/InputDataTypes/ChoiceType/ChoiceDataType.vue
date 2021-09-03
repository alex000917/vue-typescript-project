<template>
  <div>
    <el-select
      v-if="showInputs"
      v-model="selectedValue"
      filterable
      placeholder="Select an item"
      @change="onChanged"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.key"
        :value="item.value"
      />
    </el-select>

    <ChoiceDataTypeConfig
      v-if="showConfig"
      style="width:250px"
      @onChoiceListchanged="onChoiceListchanged"
    />
  </div>
</template>

<script lang="ts">
import { KeyValue } from "@/models/KeyValue"
import { AppCacheModule } from "@/store/modules/appCache"
import { Component, Prop, Vue } from "vue-property-decorator"
import ChoiceDataTypeConfig from "./ChoiceDataTypeConfig.vue"
@Component({
  name: "ChoiceDataType", components: { ChoiceDataTypeConfig }
})
export default class extends Vue {
  @Prop({ required: true }) private showConfig =false
  @Prop({ required: true }) private showInputs =true

 options=AppCacheModule.FlexSettings.propertyDataTypes

 selectedValue=""
 onChanged() {
   console.log("emiting onDataTypeValueChanged " + this.selectedValue)
   this.$emit("onDataTypeValueChanged", this.selectedValue)
 }

 onChoiceListchanged(value: any) {
   console.log("now list is " + JSON.stringify(value))
 }
}
</script>
