<template>
  <div class="miniTree-container">
    <el-row>
      <el-col>
        <slot name="header" />
      </el-col>
    </el-row>
    <el-row
      v-if="showSearch"
      type="flex"
      :gutter="10"
      justify="space-around"
      class="treeview-header"
    >
      <el-col>
        <el-input
          v-model="query.text"
          size="mini"
          placeholder="Search for"
          style="width: 200px"
          class="filter-item"
        />

        <el-select
          v-model="query.type"
          size="mini"
          placeholder="Select Type"
          clearable
          class="filter-item"
          style="width: 130px"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.key"
            :label="item.key"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <div :class="['tree-container', { 'tree-border-container': inlineModal }]">
      <el-tree
        ref="elTree"
        class="tree-content"
        :data="treeData"
        node-key="id"
        default-expand-all
        highlight-current
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
      >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>
            <b v-if="!node.isLeaf">{{ data[treeNodeKey] }}</b>
            <div v-else class="node-content">
              <el-image v-if="data.icons.length" :src="data.icons[0].source" />
              <i v-else class="el-icon-document" />
              <span style="padding-left: 3px">{{ data[treeNodeKey] }}</span>
            </div>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script lang="ts">
import { ElTree } from "element-ui/types/tree";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
  name: "miniTree",
  components: {},
})
export default class extends Vue {
  @Prop({ required: true }) private treeData!: any[];
  @Prop({ required: false }) private typeOptions!: {
    key: string;
    value: string;
  }[];

  @Prop({ default: true, required: false }) private showSearch:
    | boolean
    | undefined;

  @Prop({ default: "Available List", required: false }) private title!: string;

  @Prop({ default: false, required: false }) private dragable:
    | boolean
    | undefined;

  @Prop({ default: "displayName", required: false }) treeNodeKey!: string;
  @Prop({ default: false, required: false }) inlineModal!: boolean;

  private query = {
    text: undefined,
    type: undefined,
  };

  @Watch("query.text")
  filterText(val: any) {
    (this.$refs.elTree as ElTree<any, any>).filter(val);
  }

  @Watch("query.type")
  filtertype(val: any) {
    (this.$refs.elTree as ElTree<any, any>).filter(val);
  }

  filterNode(value: string, data: any) {
    if (!value) return true;
    return (
      data.name.toLowerCase().includes(value.toLowerCase()) ||
      data.id.toLowerCase().includes(value.toLowerCase())
    );
  }

  selectedNode = null;
  handleNodeClick(data: any) {
    console.log(data);
    this.selectedNode = data;
  }
  // getchilds(node) {
  //   if (node) {
  //     let types = [];
  //     try {
  //       types.push({ key: node.name, value: node.id });

  //       if (node.children && node.children.length > 0) {
  //         node.children.forEach((child) => {
  //           let rs = this.getchilds(child);
  //           rs.forEach((element) => {
  //             types.push(element);
  //           });
  //         });
  //       }
  //     } catch (err) {}
  //     return types;
  //   }
  // }

  // get typeOptions() {
  //   let types = [
  //     { name: "Release", value: "com.msp.dao.entities.Release" },
  //     { name: "Team", value: "com.msp.dao.entities.Team" },
  //   ];

  //   return types;
  // }

  private handleFilter() {
    // this.getList();
  }
}
</script>

<style lang="scss" scoped>
.miniTree-container {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px;
  .el-row {
    margin: 0px !important;
  }
  .filter-container {
    padding: 15px 0;
    display: flex;
    justify-content: space-around;
  }
  .filter-color-container {
    background: #e2e3e6;
    padding: 10px 10px;
  }
  .filter-item {
    width: 100%;
  }
  .tree-container {
    padding: 0px 10px;
    padding-top: 5px;
    position: relative;
    overflow: auto;
    height: calc(100% - 38px);
    .tree-content {
      position: relative;
    }
    .node-content {
      display: flex;
      align-items: center;
      align-self: center;
    }
  }
  .filter-input {
    padding: 0 !important;
    margin-right: 5px;
    text-align: left;
  }
  .filter-select {
    padding: 0 !important;
    margin-left: 5px;
    text-align: right;
  }
  .tree-border-container {
    border: 1px solid #a1a5ad;
    height: 250px;
  }
  .custom-tree-node {
    width: 100%;
  }
}
</style>
