<template>
  <div>
    <el-switch
      v-if="showInputs"
      v-model="selectedValue"
      active-color="#13ce66"
      inactive-color="#ff4949"
      @change="onChanged"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
@Component({
  name: "YesNoDataType"
})
export default class extends Vue {
    @Prop({ required: true }) private showConfig =false
  @Prop({ required: true }) private showInputs =true
 selectedValue=""
 onChanged() {
   console.log("emiting onDataTypeValueChanged " + this.selectedValue)
   this.$emit("onDataTypeValueChanged", this.selectedValue)
 }
}
</script>
