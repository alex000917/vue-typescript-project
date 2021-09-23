<template>
  <el-dialog
    width="50%"
    title="Select Property"
    :visible.sync="showModal"
    destroy-on-close
    :close-on-click-modal="false"
    append-to-body
  >
    <el-row type="flex" class="result-container">
      <el-dropdown
        trigger="click"
        placement="bottom-start"
        style="margin: 0 15px 0 5px"
        @command="selectInputMethod"
      >
        <el-button class="image-button" type="text" style="padding-bottom: 3px">
          <i class="el-icon-caret-bottom" />
        </el-button>
        <el-dropdown-menu slot="dropdown" style="margin-top: 0">
          <el-dropdown-item command="entity">
            Entity [{{ origEntity.key }}]
          </el-dropdown-item>
          <el-dropdown-item command="user"> Logged in user </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-row style="width: calc(100% - 50px);" type="flex">
        <scroll-pane ref="scrollPane" class="tags-view-wrapper">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              v-for="(path, index) in displayPaths"
              :key="index"
              type="flex"
            >
              <el-button
                class="tags-view-item"
                style="text-decoration: underline"
                type="text"
                @click="onBreadCrumClick(path)"
              >
                {{ path.key }}
              </el-button>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </scroll-pane>
      </el-row>
    </el-row>

  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { KeyValue } from "@/models/KeyValue";
import ScrollPane from "@/components/Tags/ScrollPane.vue";
import { ConditionUtils } from "@/models/Utils/ConditionUtils";
import { Entity } from "@/models/Entity";
import { EntityController } from "@/models/controllers/EntityController";

@Component({
  name: "PropertySelectModel",
  components: {ScrollPane}
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) entityId!: string;
  @Prop({ required: true }) resultHandler!: any;

  private propertyPath: KeyValue[] = [];
  private displayPaths: KeyValue[] = [];
  private currentEntity: Entity | null = null;

  get showModal() {
    return this.dialogVisible;
  }

  set showModal(val: boolean) {
    this.$emit("update:dialogVisible", val);
  }

  get origEntityId() {
    // return 'com.msp.dao.entities.cse.custom.Cse_DemandActivity';
    return this.entityId;
  }

  get origEntity() {
    const key = this.origEntityId.substring(
      this.origEntityId.lastIndexOf(".") + 1
    );
    var rs = new KeyValue(key, this.origEntityId);
    return rs;
  }

  selectInputMethod(command: string) {
    console.log("display name from inputmethod.");
    // const key = command === "user" ? "Logged in user" : this.origEntity.key.split("_")[1] as string

    if (command === "user") {
      this.loadBaseEntity(EntityController.USER_CLASS_NAME);
    } else {
      this.loadBaseEntity();
    }
  }

  async loadBaseEntity(userclass = "") {
    const entityName = userclass || this.origEntityId;

    var rs = await EntitiesModule.getEntity(entityName);
    this.currentEntity = rs;
    this.propertyPath = [];
    this.propertyPath.push(new KeyValue(ConditionUtils.TBL, this.origEntityId));
    this.displayPaths = [];
    this.displayPaths.push(
      new KeyValue(
        this.currentEntity?.displayName as string,
        this.currentEntity
      )
    );
  }
}
</script>

<style lang="scss" scoped>
$borderColor: #dcdfe6;

.filter-container {
  .filter-item1 {
    width: 50%;
    margin-right: 5px;
    margin: unset;
    display: inline-block;
  }

  .filter-item2 {
    display: inline-block;
    margin: 0 0 0 5px;
    width: 100%;
  }

  .filter-footer {
    border: none;
    text-align: right;
    padding-top: 5px;
  }

  .result-container {
    align-items: center;
    border: 1px solid $borderColor;
    border-radius: 4px;
    height: 35px;
  }

  .tree-container {
    padding: 0px 10px;
    padding-top: 5px;
    position: relative;
    overflow: auto;
    height: 250px;

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

  .treeview-header {
    margin-top: 10px;
  }
}
</style>