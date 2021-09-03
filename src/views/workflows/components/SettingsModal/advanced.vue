<template>
  <el-container direction="vertical">
    <el-row
      type="flex"
      align="middle"
    >
      <el-image
        src="/assets/img/Advanced-32x32.png"
        fit="fill"
      />
      <span style="font-size: 18px; margin-left: 5px">Advanced</span>
    </el-row>
    <el-row style="margin: 30px 0 0 10px; height: calc(100% - 62px)">
      <p>This Workflow is based on the entity: <b>Hello</b></p>
      <p>System name: <b>Hello</b></p>
      <p>Authorization Tree: <b>Hello</b></p>
      <p>Authorization Tree: <b>Hello</b></p>
      <p>Created by: <b>Hello</b></p>
      <p>Created: <b>Hello</b></p>
      <p>Modified by: <b>Hello</b></p>
      <p>Modified: <b>Hello</b></p>
    </el-row>
  </el-container>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"

@Component({
  name: "",
  components: {}
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
b {
  font-weight: 600;
}
</style>
