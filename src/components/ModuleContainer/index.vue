<template>
  <el-container>
    <el-row>
      <el-col
        :span="6"
        :xs="24"
      >
        <div class="left-side-panel">
          <slot name="left-side" />
        </div>
      </el-col>
      <el-col
        :span="18"
        :xs="24"
      >
        <div class="right-side-panel">
          <slot name="right-side" />
        </div>
      </el-col>
    </el-row>
  </el-container>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"

@Component({
  name: "",
  components: {}
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
$gaps: 20px;

.el-container {
  margin: 0;
  padding: $gaps;
  height: calc(100vh - 50px);
  .el-col {
    height: 100%;
    & > div {
      box-shadow: 1px 1px 8px #525050;
      height: 100%;
    }
    .left-side-panel {
      margin-right: $gaps;
    }
    @media (max-width: 768px) {
      .left-side-panel {
        margin-right: 0;
      }
      .right-side-panel {
        margin-top: $gaps;
      }
    }
  }
}
</style>
