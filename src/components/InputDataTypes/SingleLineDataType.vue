<template>
  <div>
    <el-input
      v-if="showInputs"
      v-model="selectedValue"
      type="text"
      placeholder="input your text here."
      @blur="changed"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
@Component({
  name: "SingleLineDataType"
})
export default class extends Vue {
    @Prop({ required: true }) private showConfig! : boolean;
  @Prop({ required: true }) private showInputs! : boolean;
  selectedValue = ""
  changed() {
    this.$emit("onDataTypeValueChanged", this.selectedValue)
  }
}
</script>
