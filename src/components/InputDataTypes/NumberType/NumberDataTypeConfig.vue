<template>
  <el-form v-model="selectedValue">
    <el-row v-model="selectedValue">
      <el-col>
        <el-checkbox
          v-model="useSeparator"
          @change="onChanged"
        >
          Use 1,000 separator (,)
        </el-checkbox>
        <br>
        <el-input-number
          v-model="decimals"
          controls-position="right"
          :min="0"
          :max="20"
          @change="handleChange"
        />
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
@Component({
  name: "NumberDataTypeConfig"
})
export default class extends Vue {
  @Prop({ required: true }) private showConfig = false;
  @Prop({ required: true }) private showInputs = true;

  selectedValue ={
    useSeparator: false,
    decimals: 0
  };

  onChanged() {
    console.log("emiting onDataTypeValueChanged " + this.selectedValue)
    this.$emit("onDataTypeValueChanged", this.selectedValue)
  }

  handleChange(value:any) {
    console.log("")
  }
}
</script>
