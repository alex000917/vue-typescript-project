<template>
  <el-form
    :model="currentProperty"
    :rules="validationRules"
    label-position="left"
  >
    <el-row
      type="flex"
      justify="space-between"
      style="margin-bottom: 0px"
    >
      <el-col :span="1">
        <el-button
          size="mini"
          icon="el-icon-back"
          type="info"
          plain
          @click="hiddenHandler()"
        />
      </el-col>
      <el-col :span="11">
        <el-form-item prop="displayName">
          <el-input
            v-model="currentProperty.displayName"
            placeholder="Type property name here"
            style="margin-left: 0px; font-weight: 700; width: 90%"
          >
            <template slot="prepend">
              <el-image
                style="height: 16px; width: 16px"
                :src="getIcon(currentProperty.dataType.value)"
                fit="fill"
              />
            </template>
          </el-input>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <span
          style="font-weight: 400; float: right; margin-right: 10px"
        >Data type: <b>{{ currentProperty.dataType.key }}</b>
        </span>
      </el-col>
    </el-row>
    <el-row style="margin:2px;padding;2px;padding-bottom:10px">
      <input
        v-model="currentProperty.description"
        class="transparent-input"
        placeholder="Type description here"
        style="width: 70%"
      >
    </el-row>
  </el-form>
</template>
<script lang="ts">
import { BaseProperty } from "@/models/Properties"
import { DataTypeFactory } from "@/models/Utils/DataTypeFactory"
import { Component, Prop, Vue } from "vue-property-decorator"

@Component({
  name: "PropHeaderInput",
  components: {}
})
export default class extends Vue {
  @Prop({ required: true }) private property!: BaseProperty;

  private validationRules = {
    displayName: [
      { required: true, message: "display name required", trigger: "blur" }
    ]
  };

  getIcon(dataTypeValue: string) {
    return DataTypeFactory.getDataTypeIcon(dataTypeValue)
  }

  get currentProperty() {
    return this.property
  }

  hiddenHandler() {
    this.$emit("cancel")
  }
}
</script>

<style lang='scss' scoped>
.transparent-input {
  margin-left: 45px;
  border: 1px solid #d3d3d3;
  background: transparent;
  &:focus {
    outline: none;
    background-color: white;
  }
}
</style>
