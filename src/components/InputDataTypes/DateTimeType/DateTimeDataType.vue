<template>
  <div>
    <el-date-picker
      v-if="showInputs"
      v-model="selectedValue"
      type="datetime"
      placeholder="Select date and time"
      @change="onChanged"
    />
    <DateTimeDataTypeConfig
      v-if="showConfig"
      @onSelectedValueChanged="onSelectedValueChanged"
    />
  </div>
</template>

<script lang="ts">
import { KeyValue } from "@/models/KeyValue"
import { AppCacheModule } from "@/store/modules/appCache"
import { Component, Prop, Vue } from "vue-property-decorator"
import DateTimeDataTypeConfig from "./DateTimeDataTypeConfig.vue"
@Component({
  name: "DateTimeDataType", components: { DateTimeDataTypeConfig }
})
export default class extends Vue {
  @Prop({ required: true }) private showConfig =false
  @Prop({ required: true }) private showInputs =true

 selectedValue=""
 onChanged() {
   this.$emit("onDataTypeConfigChanged", this.selectedValue)
 }

 onSelectedValueChanged(value: any) {
   console.log("Selected datetime type changed to " + value)
 }
}
</script>
