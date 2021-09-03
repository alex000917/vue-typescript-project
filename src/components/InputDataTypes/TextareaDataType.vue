<template>
  <div>
    <el-input
      v-if="showInputs"
      v-model="selectedValue"
      type="textarea"
      autosize
      placeholder="Multiline text here."
      @blur="changed"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
@Component({
  name: "TextareaDataType"
})
export default class extends Vue {
  @Prop({ required: true }) private showConfig =false
  @Prop({ required: true }) private showInputs =true

  selectedValue = ""

  changed() {
    this.$emit("onDataTypeValueChanged", this.selectedValue)
  }
}
</script>
