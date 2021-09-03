<template>
  <div class="container">
    <el-header>
      <el-row
        type="flex"
        justify="space-between"
        align="middle"
        class="header-content"
      >
        <slot name="header">
          <el-col :span="8">
            <b>{{ headerData.title }}</b>
          </el-col>
          <el-col
            :span="18"
            class="button-group"
          >
            <span
              v-for="({handler, title}, index) in headerData.commands"
              :key="title"
            >
              <el-button
                size="mini"
                type="text"
                :title="title"
                @click="handler"
              >{{ title }}</el-button>
              <el-divider
                v-if="index !== headerData.commands.length - 1"
                direction="vertical"
              />
            </span>
          </el-col>
        </slot>
      </el-row>
    </el-header>
    <div class="filter-container">
      <slot name="filter" />
    </div>
    <el-main>
      <slot>
        <mini-tree
          ref="tree"
          v-bind="treeData"
        />
      </slot>
    </el-main>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator"
import MiniTree from "../miniTree.vue"
import { Node } from "@/models/Node"

@Component({
  name: "",
  components: { MiniTree }
})
export default class extends Vue {
  @Prop({ required: true, default: "" }) headerData!: string;
  @Prop({ required: false }) treeData!: Node;
}
</script>

<style lang='scss' scoped>
.container {
  height: 100%;
  color: $textGray;
  display: flex;
  flex-direction: column;
  .el-header {
    background: $panelBg;
    display: flex;
    align-items: center;
    min-height: 80px;
    height: auto !important;
    .button-group {
      text-align: right;
    }
    .el-divider {
      background: transparent;
    }
  }
  .filter-container {
    background: $panelBg;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0;
  }
  .el-main {
    padding: 10px 0;
    height: 100%;
    overflow: auto;
    background: white;
  }
}
</style>
