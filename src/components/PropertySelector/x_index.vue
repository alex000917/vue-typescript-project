<template>
  <el-dialog
    v-if="showModal"
    v-loading="loading"
    width="30%"
    title="Select Property"
    :visible.sync="showModal"
    class="filter-container"
    destroy-on-close
    :close-on-click-modal="false"
    append-to-body
  >
    <div v-if="currentEntity">
      <el-row
        type="flex"
        class="result-container"
      >
        <el-dropdown
          trigger="click"
          placement="bottom-start"
          style="margin: 0 15px 0 5px"
          @command="selectInputMethod"
        >
          <el-button
            class="image-button"
            type="text"
            style="padding-bottom: 3px"
          >
            <i class="el-icon-caret-bottom" />
          </el-button>
          <el-dropdown-menu
            slot="dropdown"
            style="margin-top: 0"
          >
            <el-dropdown-item command="entity">
              Entity [{{ currentEntity.displayName }}]
            </el-dropdown-item>
            <el-dropdown-item command="user">
              Logged in user
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-row
          style="width: 100%"
          type="flex"
        >
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              v-for="(path, index) in propertyPath.paths"
              :key="index"
              type="flex"
            >
              <el-button
                style="text-decoration: underline"
                type="text"
                @click="onBreadCrumClick(path)"
              >
                {{ path.displayName }}
              </el-button>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </el-row>
        <!--
      <i
        class="el-icon-caret-left"
        disabled
      />

      <i
        class="el-icon-caret-right"
        disabled
      /> -->
      </el-row>
      <!-- <miniTree
      :tree-data="getTreeData"
      :type-options="filterSelectData"
      :handle-node-click="nodeClickHandler"
      :title="'select Property'"
      :inline-modal="true"
      :tree-node-key="'displayName'"
    /> -->

      <el-row
        type="flex"
        :gutter="10"
        justify="space-around"
        class="treeview-header"
      >
        <el-col style="display: inline-flex">
          <el-input
            v-model="query.text"
            size="mini"
            placeholder="Search for"
            class="filter-item"
          />

          <el-select
            v-model="query.type"
            size="mini"
            placeholder="Select Type"
            clearable
            class="filter-item"
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
      <el-row>
        <el-col>
          <div class="tree-container">
            <el-tree
              ref="elTree"
              :data="getTreeData"
              class="tree-content"
              node-key="id"
              default-expand-all
              highlight-current
              :filter-node-method="filterNode"
              @node-click="nodeClickHandler"
            >
              <span
                slot-scope="{node, data}"
                class="custom-tree-node"
              >
                <span>
                  <b v-if="!node.isLeaf">{{ data[treeNodeKey] }}</b>
                  <div
                    v-else
                    class="node-content"
                  >
                    <el-image
                      v-if="data.icons.length"
                      :src="data.icons[0].source"
                    />
                    <i
                      v-else
                      class="el-icon-document"
                    />
                    <span
                      :title="data.dataType.key"
                      style="padding-left: 3px"
                    >{{ data[treeNodeKey] }}</span>
                  </div>
                </span>
              </span>
            </el-tree>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="color: red">
          <span v-if="message.length > 0">{{ message }}</span>
        </el-col>
      </el-row>
      <div
        slot="footer"
        class="filter-footer"
      >
        <el-button
          style="margin-right: 20px"
          @click="okHandler"
        >
          Ok
        </el-button>
        <el-button
          type="text"
          style="text-decoration: underline"
          @click="onCancelClick"
        >
          cancel
        </el-button>
      </div>
    </div>
    <div v-else>
      Loading....
    </div>
  </el-dialog>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator"

import miniTree from "@/components/Tables/miniTree.vue"
import { EntitiesModule } from "@/store/modules/entitiesMod"
import { AppCacheModule } from "@/store/modules/appCache"
import { DataTypeFactory } from "@/models/Utils/DataTypeFactory"
import { ElTree } from "element-ui/types/tree"
import { KeyValue } from "@/models/KeyValue"

import { Entity } from "@/models/Entity"
import { TextAssembly } from "@/models/TextAssembly"
import { ConditionUtils } from "@/models/Utils/ConditionUtils"
import { text } from "express"
import {
  PropertyPath,
  PropertySelectorPath
} from "@/models/PropertySelectorPath"
import { EntityController } from "@/models/controllers/EntityController"
import { last } from "lodash"

@Component({
  name: "PropertySelectModel",
  components: { miniTree }
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) entityId!: string;
  @Prop({ required: false }) resultHandler!: any;
  treeNodeKey = "displayName";

  loading = false;
  private propertyPath = new PropertySelectorPath();

  private query = {
    text: undefined,
    type: undefined
  };

  message = "";

  get typeOptions() {
    return AppCacheModule.FlexSettings.dataTypes
  }

  @Watch("query.text")
  filterText(val: string) {
    (this.$refs.elTree as ElTree<any, any>).filter(val)
  }

  @Watch("query.type")
  filtertype(val: string) {
    (this.$refs.elTree as ElTree<any, any>).filter((x: any) => {
      return x.dataType.value === this.query.type
    })
  }

  filterNode(value: any, data: any) {
    if (!value) return true
    return (
      data.name.toLowerCase().includes(value.toLowerCase()) ||
      data.id.toLowerCase().includes(value.toLowerCase())
    )
  }

  get showModal() {
    return this.dialogVisible
  }

  set showModal(val: boolean) {
    this.$emit("update:dialogVisible", val)
  }

  private currentEntity: Entity|null=null;

  get getTreeData() {
    this.currentEntity?.properties.map((d: any) => {
      d.icons = []
      d.icons.push({
        source: DataTypeFactory.getDataTypeIcon(d.dataType.value)
      })
    })
    return [
      {
        displayName: "Added Properties",
        dataType: {
          key: "",
          value: ""
        },
        icons: [],
        children: this.currentEntity?.properties.filter(
          (x) => x.outOfTheBox === false
        )
      },
      {
        displayName: "Out-of-the-box properties",
        dataType: {
          key: "",
          value: ""
        },
        icons: [],
        children: this.currentEntity?.properties.filter((x) => x.outOfTheBox)
      }
    ]
  }

  onBreadCrumClick(value: any) {
    const index = this.propertyPath.paths.findIndex(
      (x:any) => x.displayName === value.displayName
    )

    let lastItemIndex = this.propertyPath.paths.length - 1
    while (index < lastItemIndex) {
      this.propertyPath.paths.pop()
      lastItemIndex = this.propertyPath.paths.length - 1
    }
    this.loadLookupEntity(value)
  }

  async nodeClickHandler(data: any, node: any) {
    const lastProp = this.propertyPath.paths[
      this.propertyPath.paths.length - 1
    ]
    if (this.isLookupPropertyType(data)) {
      this.loadLookupEntity(data)
    } else {
      if (!lastProp.lookupTo) {
        this.propertyPath.paths.splice(this.propertyPath.paths.length - 1, 1)
      }
      const prop = new PropertyPath(
        node.data.displayName,
        node.data.systemName,
        null,
        node.data,
        node.data.dataType
      )
      this.propertyPath.paths.push(prop)
    }
  }

  async loadLookupEntity(data: any) {
    const lookupId = data.dataType.lookupClassName

    const prop = new PropertyPath(
      data.displayName,
      data.systemName,
      lookupId || null,
      data,
      data.dataType
    )

    if (!lookupId) {
      this.propertyPath.paths.push(prop)
      return
    }
    this.loading = true
    try {
      if (lookupId) {
        // const entity: Entity = await getEntity(lookupId)
        const entity: Entity = await EntitiesModule.getEntity(lookupId)

        this.currentEntity = entity
      }
      const lastPrp = this.propertyPath.paths[
        this.propertyPath.paths.length - 1
      ]
      if (!lastPrp.lookupTo) {
        this.propertyPath.paths.splice(this.propertyPath.paths.length - 1, 1)
      }
      this.propertyPath.paths.push(prop)
    } finally {
      this.$nextTick(() => {
        this.loading = false
      })
    }
  }

  isLookupPropertyType(data: any) {
    const lookupTypeslist = [9, 10, 11]
    const propType = data.dataType

    if (
      propType &&
      propType.lookupClassName &&
      lookupTypeslist.includes(parseInt(propType.value))
    ) {
      return true
    }
    return false
  }

  selectInputMethod(command: string) {
    console.log("display name from inputmethod.")
    this.propertyPath.paths[0].systemName = command
    this.propertyPath.paths[0].displayName = "";
      command === "user" ? "Logged in user" : this.currentEntity?.displayName as string

    if (command === "user") {
      this.setCurrentEntity(EntityController.USER_CLASS_NAME)
      const data = new PropertyPath(
        this.currentEntity?.displayName as string,
        ConditionUtils.TBL,
        this.entityId,
        this.currentEntity
      )
      this.propertyPath.displayName = "User"
      this.propertyPath.paths = []
      this.propertyPath.paths.push(data)
    }
  }

  okHandler() {
    const lastPath = this.propertyPath.paths[
      this.propertyPath.paths.length - 1
    ]

    if (!lastPath.lookupTo) {
      this.propertyPath.displayName = this.propertyPath.toString()
      this.resultHandler(this.propertyPath)
      this.onCancelClick()
    } else {
      this.$message("Please select a Property Type")
    }
  }

  getTextAsseblyParts() {
    const text = new TextAssembly()
    const parts: any[] | null = []
    const prevNode = this.currentEntity

    this.propertyPath.paths.map((x:any) => {
      parts.push(new KeyValue(x.systemName, x.lookupTo))
    })
    text.parts = parts

    return text
  }

  onCancelClick() {
    this.showModal = false
    this.$emit("update:dialogVisible", false)
  }

  @Watch("entityId")
  async setCurrentEntity(entityId: string) {
    this.currentEntity = await EntitiesModule.getEntity(entityId)
  }

  async mounted() {
    if (!this.entityId) {
      this.currentEntity = EntitiesModule.currentEntity as Entity
      this.$emit("update:entityId", this.currentEntity.id)
    }
    this.setCurrentEntity(this.entityId).then((rs) => {
      const data = new PropertyPath(
        this.currentEntity?.displayName as string,
        ConditionUtils.TBL,
        this.entityId,
        this.currentEntity
      )
      this.propertyPath.paths.push(data)
    })
  }
}
</script>

<style lang='scss' scoped>
$borderColor: #dcdfe6;

.filter-container {
  .filter-item {
    display: block;
  }

  .filter-footer {
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
}
</style>
