<template>
  <el-container
    v-loading="loading"
    element-loading-text="Loading..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :disabled="loading"
    class="page-edit-policy"
  >
    <el-header>
      <el-input
        v-if="currentPolicy"
        v-model="currentPolicy.displayName"
        :disabled="enableEditName === false"
        placeholder="Please Input"
        class="inpName"
        @blur="enableEditName = false"
      >
        <i
          slot="suffix"
          class="el-icon-edit el-input__icon"
          @click="enableEditName = true"
        />
      </el-input>
      <br />
      <el-input
        v-if="currentPolicy"
        v-model="currentPolicy.description"
        type="textarea"
        :autosize="{ maxRows: 2 }"
        size="mini"
        class="inpDescription"
        placeholder="Type description here"
      />
    </el-header>
    <el-main>
      <el-tabs type="border-card">
        <el-tab-pane label="Entities and Task Groups">
          <el-row type="flex" class="row-bg">
            <el-col :span="10">
              <el-input
                v-model="findTree"
                autocomplete="off"
                placeholder="Find in tree"
                type="text"
                size="small"
              />
            </el-col>
            <el-col :span="14" style="text-align: right">
              <el-button type="text" @click="showModals.addEntity = true">
                <span class="img-button">
                  <el-image src="/assets/img/entity16x16.png" fit="fill" />
                  Add entity...
                </span>
              </el-button>
              <el-button type="text">
                <span class="img-button">
                  <el-image
                    src="/assets/img/my-work-task-16x16.png"
                    fit="fill"
                  />
                  New Task Group...
                </span>
              </el-button>
              <el-button type="text">
                <span class="img-button">
                  <el-image
                    src="/assets/img/my-work-task-style-16x16.png"
                    fit="fill"
                  />
                  New Task Style...
                </span>
              </el-button>
              <el-button type="text" @click="onSettingsClick()">
                <span class="img-button">
                  <el-image src="/assets/img/settings.png" fit="fill" />
                  Settings...
                </span>
              </el-button>
              <el-button type="text">
                <span class="img-button">
                  <el-image src="/assets/img/delete-16x16.png" fit="fill" />
                  Delete
                </span>
              </el-button>
            </el-col>
          </el-row>
          <el-row type="flex" class="row-bg">
            <el-col :span="24">
              <el-tree
                ref="elTree"
                class="tree-content"
                :data="currentTree"
                node-key="systemName"
                default-expand-all
                highlight-current
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
                @node-click="handleNodeClick"
              >
                <span slot-scope="{ node, data }" class="custom-tree-node">
                  <span>
                    <div
                      class="node-content"
                      v-for="(item, index) in resolveNodeDisplayName(
                        node,
                        data
                      )"
                      :key="index"
                    >
                      <el-image
                        v-if="item.displayIcon"
                        style="padding-top: 3px"
                        :src="item.displayIcon"
                      />
                      <i v-else class="el-icon-document" />
                      <span v-if="item.displayName" :id="data.id">
                        {{ item.displayName }}</span
                      >
                    </div>
                  </span>
                </span>
              </el-tree>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Tracking Permissions">
          <tracking-permission />
        </el-tab-pane>
        <el-tab-pane label="Settings" />
      </el-tabs>
    </el-main>
    <settings-modal :visible.sync="showModals.settings" />
    <add-entity :visible.sync="showModals.addEntity" />
  </el-container>
</template>
<script lang='ts'>
import { ElTree } from "element-ui/types/tree";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { MyWorkPolicy } from "@/models/myWork";
import SettingsModal from "../components/Settings/index.vue";
import AddEntity from "./addEntity.vue";
import TrackingPermission from "../components/trackingPermission.vue";
import { MyWorkModule } from "@/store/modules/myWorkMod";

@Component({
  name: "",
  components: { SettingsModal, AddEntity, TrackingPermission },
})
export default class extends Vue {
  @Prop({ required: false }) private showPage!: string;

  private loading = true;
  private form = new MyWorkPolicy();
  private enableEditName = false;
  private showModals = {
    settings: false,
    addEntity: false,
  };

  // private treeContent = {
  //   displayName: "",
  //   displayIcon: "",
  // };

  get currentTree() {
    return MyWorkModule.currentPolicy?.root?.children;
  }

  get currentPolicy() {
    return MyWorkModule.currentPolicy;
  }

  private handleNodeClick(node: any, data: any) {
    // console.log(node);
    // console.log(data);
    console.log(this.currentPolicy);
    console.log(this.currentTree);
  }

  private resolveNodeDisplayName(node: any, data: any) {
    let displayName = "Unknown type";
    let displayIcon = undefined;

    switch (data?.myspType) {
      case "TaskGroupTreeNode":
        displayName = data?.displayName;
        displayIcon = "/assets/img/my-work-task-16x16.png";
        break;
      case "FolderTreeNode":
        if (data?.taskGroups) displayName = "Task Groups";
        else displayName = "Task Styles";

        displayIcon = "/assets/img/folder-16x16.png";
        break;
      case "EntityTreeNode":
        displayName = data?.displayName;
        displayIcon = "/assets/img/entity16x16.png";
        break;
    }
    return [{ displayName, displayIcon }];
  }

  filterNode(value: any, data: any) {
    if (!value) return true;
    const filterData = value;
    return data.displayName.toLowerCase().includes(filterData.toLowerCase());
  }

  findTree = "";
  @Watch("findTree")
  filterTree(val: string) {
    (this.$refs.elTree as ElTree<any, any>).filter(val);
  }

  onSettingsClick() {
    this.showModals.settings = true;
  }

  mounted() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
}
</script>

<style lang='scss' scoped>
.el-container .page-edit-policy {
  margin: 0;
  height: 100%;
  padding: 20px;
  .el-header {
    padding: 0px;
    height: auto !important;
    .inpName {
      width: 50%;
    }
    .inpDescription {
      width: 90%;
      margin-top: 5px;
    }
  }
  .el-main {
    padding: 0px;
    padding-top: 20px;
    overflow: auto;
    .el-tabs {
      height: 100%;
    }
  }
  .el-button--text {
    text-decoration: underline;
  }
  .img-button {
    display: flex;
    align-items: center;
  }
}
</style>
