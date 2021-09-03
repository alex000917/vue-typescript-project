<template>
  <el-container direction="vertical">
    <el-row type="flex" align="middle">
      <el-image src="/assets/img/notes32x32.png" fit="fill" />
      <span style="font-size: 18px; margin-left: 5px">Notes</span>
    </el-row>
    <el-row style="margin-top: 20px; height: calc(100% - 62px)">
      <p>Notes</p>
      <el-row>
        <el-input type="textarea" :rows="10" />
      </el-row>
    </el-row>
  </el-container>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "",
  components: {},
})
export default class extends Vue {
}
</script>

<style lang="scss" scoped>
</style>
