<template>
  <el-tree
    ref="elTree"
    :data="data.children"
    node-key="name"
    class="custom-tree"
    :default-expand-all="true"
    @node-click="onNodeClick"
  >
    <span
      slot-scope="{data}"
      class="custom-tree-node"
    >
      <el-tooltip
        :content="data.tooltip"
        placement="top-end"
        effect="light"
      >
        <span>
          <div v-if="data.branch">
            <b>{{ data.name }}
              {{ data.children.length ? `(${data.children.length})` : "" }}
            </b>
          </div>
          <el-row
            v-else
            type="flex"
            align="middle"
          >
            <el-image
              v-if="data.icons.length"
              :src="data.icons[0].source"
            />
            <i
              v-else
              class="el-icon-document"
            />
            <span class="node-title">{{ data.name }}</span>
          </el-row>
        </span>
      </el-tooltip>
    </span>
  </el-tree>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator"
import { Node } from "@/models/Node"

@Component({
  name: "",
  components: {}
})
export default class extends Vue {
  @Prop({ required: true, default: {} }) data!: any;
  @Prop({ required: true, default: {} }) handler!: (data: Node) => void;

  /** tree node double click variables */
  private nodeClicks = 0;
  private dbClickTimer: any = null;
  private dbClickDelay = 500;
  private selectedNodeId?: string | null = null;

  private onNodeClick(data: Node) {
    if (!data.branch) {
      this.selectedNodeId = data.id
      this.handler(data)
    }
  }

  // @Watch("query.text")
  // filterText(val: string) {
  //   this.$refs.elTree.filter(`${val}_name`);
  // }

  // @Watch("query.type")
  // filtertype(val: any) {
  //   this.$refs.elTree.filter(`${val}_type`);
  // }

  // filterNode(value: any, data: any) {
  //   if (!value) return true;
  //   const filterData = value.split("_");
  //   if (filterData[1] === "name" && !this.query.type.length) {
  //     return data[this.treeNodeKey]
  //       .toLowerCase()
  //       .includes(filterData[0].toLowerCase());
  //   }
  //   if (filterData[1] === "type" && !this.query.text.length) {
  //     return data.id.toLowerCase().includes(filterData[0].toLowerCase());
  //   }
  //   return (
  //     data.name.toLowerCase().includes(filterData[0].toLowerCase()) ||
  //     data.id.toLowerCase().includes(filterData[0].toLowerCase())
  //   );
  // }
}
</script>

<style lang='scss' scoped>
.custom-tree-node {
  width: 80%;
  .node-title {
    padding-left: 3px;
  }
}
</style>
