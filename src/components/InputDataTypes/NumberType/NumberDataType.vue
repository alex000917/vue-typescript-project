<template>
  <div>
    <el-input-number
      v-if="showInputs"

      v-model="selectedValue"
      @change="onChanged"
    />
    <NumberDataTypeConfig v-if="showConfig" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import NumberDataTypeConfig from "./NumberDataTypeConfig.vue"
@Component({
  name: "NumberDataType", components: { NumberDataTypeConfig }
})
export default class extends Vue {
  @Prop({ required: true }) private showConfig = false;
  @Prop({ required: true }) private showInputs = true;

  selectedValue = "";
  onChanged() {
    console.log("emiting onDataTypeValueChanged " + this.selectedValue)
    this.$emit("onDataTypeValueChanged", this.selectedValue)
  }
}
</script>
