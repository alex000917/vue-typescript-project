<template>
  <el-dialog
    v-if="entityId"
    v-loading="loading"
    element-loading-text="Loading..."
    width="50%"
    title="Select Property"
    :visible.sync="showModal"
    class="filter-container"
    destroy-on-close
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

    <el-row
      type="flex"
      :gutter="10"
      justify="space-around"
      class="treeview-header"
    >
      <el-col>
        <el-input
          style="
            width: 100%;
            margin-right: 5px;
            margin: unset;
            display: inline-block;
          "
          v-model="query.text"
          size="mini"
          placeholder="Search for"
          class="filter-item1"
        />
      </el-col>
      <el-col>
        <el-select
          v-model="query.type"
          size="mini"
          placeholder="Select Type"
          clearable
          class="filter-item2"
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
              slot-scope="{ node, data }"
              class="custom-tree-node"
              :title="data.dataType.key"
            >
              <!-- <el-tooltip
                :value="!!data.dataType.key"
                :content="data.dataType.key"
                placement="top-end"
                :open-delay="1000"
                effect="light"
              > -->
              <span>
                <b v-if="!node.isLeaf">{{ data[treeNodeKey] }}</b>
                <div v-else class="node-content">
                  <el-image
                    v-if="data.icons.length"
                    :src="data.icons[0].source"
                  />
                  <i v-else class="el-icon-document" />
                  <span
                    :style="{
                      paddingLeft: '3px',
                      color: isLookupPropertyType(data) ? '#1890ff' : 'inherit',
                    }"
                    >{{ data[treeNodeKey] }}</span
                  >
                </div>
              </span>
              <!-- </el-tooltip> -->
            </span>
          </el-tree>
        </div>
      </el-col>
    </el-row>
    <el-row style="padding-top: 10px; padding: 0xp; margin: 0px">
      <el-col style="color: red">
        <span v-show="message && message.length > 0">{{ message }}</span>
      </el-col>
    </el-row>

    <div slot="footer" class="filter-footer">
      <el-button style="margin-right: 20px" @click="okHandler"> Ok </el-button>
      <el-button
        type="text"
        style="text-decoration: underline"
        @click="onCancelClick"
      >
        cancel
      </el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import miniTree from "@/components/Tables/miniTree.vue";
import { EntitiesModule } from "@/store/modules/entitiesMod";
import { AppCacheModule } from "@/store/modules/appCache";
import { DataTypeFactory } from "@/models/Utils/DataTypeFactory";
import { ElTree } from "element-ui/types/tree";
import { KeyValue } from "@/models/KeyValue";

import { Entity } from "@/models/Entity";
import { TextAssembly } from "@/models/TextAssembly";
import { ConditionUtils } from "@/models/Utils/ConditionUtils";
import { text } from "express";
import {
  PropertyPath,
  PropertySelectorPath,
} from "@/models/PropertySelectorPath";
import { EntityController } from "@/models/controllers/EntityController";
import { last } from "lodash";
import { StringUtils } from "@/models/Utils/StringUtils";
import { PropertyFactory } from "@/models/Utils/PropertyFactory";
import { join } from "path";
import { LanguagesPresentationModel } from "@/models/Utils/LanguagesPresentationModel";
import ScrollPane from "@/components/Tags/ScrollPane.vue";
@Component({
  name: "PropertySelectModel",
  components: { miniTree, ScrollPane },
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  // @Prop({ required: true }) entity!: Entity;
  @Prop({ required: true }) entityId!: string;
  @Prop({ required: true }) resultHandler!: any;
  @Prop({ required: false }) allowedProperties!: string[];
  @Prop({ required: false }) allowedEntityName!: string;
  @Prop({ required: false }) path!: KeyValue[];
  treeNodeKey = "displayName";

  loading = false;
  private propertyPath: KeyValue[] = [];
  private displayPaths: KeyValue[] = [];

  private languagesPresentationModel = LanguagesPresentationModel;
  private lookupTypeslist = ["9", "11"];
  private query = {
    text: "",
    type: "",
  };

  message = "";
  get origPath() {
    return this.path;
  }

  get validProperties() {
    return this.allowedProperties;
  }

  get displayPropertyTypes() {
    const rs: string[] = [];
    if (this.validProperties && this.validProperties.length > 0) {
      //rs.push(...this.lookupTypeslist);
      this.validProperties.forEach((x) => {
        rs.push(x);
      });
    } else {
      this.typeOptions.forEach((x) => {
        rs.push(x.value);
      });
    }
    return rs;
  }

  get typeOptions() {
    return AppCacheModule.FlexSettings.dataTypes;
  }

  @Watch("query", { deep: true, immediate: true })
  filterText(val: any) {
    if (this.$refs.elTree) {
      (this.$refs.elTree as ElTree<any, any>).filter(
        `${val.text}||${val.type}`
      );
    }
  }

  filterNode(value: any, data: any) {
    // const filterData = value.split("_")
    const filterData = value.split("||");
    if (!filterData[0] && !filterData[1]) return true;

    if (data.branch) return true;
    let rs = false;
    if (this.query.text.length > 0) {
      rs = data[this.treeNodeKey]
        .toLowerCase()
        .includes(filterData[0].toLowerCase());
    }
    let rs2 = false;
    if (this.query.type.length > 0) {
      rs2 = data.dataType.value.toLowerCase() === filterData[1].toLowerCase();
    }
    if (this.query.text.length > 0 && this.query.type.length > 0) {
      return rs && rs2;
    } else {
      return rs || rs2;
    }
  }

  get showModal() {
    return this.dialogVisible;
  }

  set showModal(val: boolean) {
    this.$emit("update:dialogVisible", val);
  }

  private currentEntity: Entity | null = null;

  get allowedPropTypesString() {
    if (!this.validProperties) return "";
    const validPropTitles = this.validProperties?.map((vProp) => {
      return this.typeOptions.find((option) => option.value === vProp)?.key;
    });
    return this.validProperties.length
      ? "Select a property of type " + validPropTitles.join(" or ")
      : "";
  }

  get getFilteredProperties() {
    return this.allowedProperties
      ? this.currentEntity?.properties.filter((x) =>
          this.displayPropertyTypes.includes(x.dataType?.value)
        )
      : this.allowedEntityName
      ? this.currentEntity?.properties.filter((x) =>
          this.lookupTypeslist.includes(x.dataType?.value)
        )
      : this.currentEntity?.properties;
  }

  get getTreeData() {
    this.getFilteredProperties?.map((d: any) => {
      d.icons = [];
      d.icons.push({
        source: DataTypeFactory.getDataTypeIcon(d.dataType.value),
      });
    });
    this.message = this.allowedPropTypesString;
    return [
      {
        displayName: "Added Properties",
        dataType: {
          key: "",
          value: "",
        },
        icons: [],
        children: this.getFilteredProperties?.filter(
          (x) => x.outOfTheBox === false
        ),
      },
      {
        displayName: "Out-of-the-box properties",
        dataType: {
          key: "",
          value: "",
        },
        icons: [],
        children: this.getFilteredProperties?.filter((x) => x.outOfTheBox),
      },
    ];
  }

  getLocalizedString(val: string) {
    const languagesModel = LanguagesPresentationModel.getInstance();
    return languagesModel.getLocalizedString(val);
  }

  onBreadCrumClick(value: any) {
    const index = this.displayPaths.findIndex((x) => x.key === value.key);

    let lastItemIndex = this.displayPaths.length - 1;
    while (index < lastItemIndex) {
      this.propertyPath.pop();
      this.displayPaths.pop();
      lastItemIndex = this.displayPaths.length - 1;
    }

    this.setCurrentEntity(value.key, value?.value, index == 0);
    const lastProp = this.displayPaths[this.displayPaths.length - 1];
    if (lastProp.key === value.key && this.displayPaths.length > 1) {
      this.propertyPath.pop();
      this.displayPaths.pop();
    }
  }

  async nodeClickHandler(data: any) {
    try {
      this.loading = true;
      await this.updateData(data);
    } finally {
      this.$nextTick(() => {
        this.loading = false;
      });
    }
  }

  private async updateData(data: any) {
    const lastProp = this.propertyPath[this.propertyPath.length - 1];

    if (this.isLookupPropertyType(data)) {
      await this.loadLookupEntity(data);
    } else {
      if (lastProp.value === null && this.propertyPath.length > 1) {
        this.displayPaths.splice(this.displayPaths.length - 1, 1);
        this.propertyPath.splice(this.propertyPath.length - 1, 1);
      }
      this.displayPaths.push(new KeyValue(data.displayName, data));
      this.propertyPath.push(new KeyValue(data.systemName, null));
    }
    this.IsSelectionValid();
  }

  async loadLookupEntity(data: any) {
    const lookupId = data?.dataType?.lookupClassName;
    if (lookupId) {
      await this.setCurrentEntity(data.displayName, data);
    }
  }

  isLookupPropertyType(data: any) {
    const propType = data.dataType;

    if (
      propType &&
      propType.lookupClassName &&
      this.lookupTypeslist.includes(propType.value)
    ) {
      return true;
    }
    return false;
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

  private IsSelectionValid() {
    let result = false;
    const lastPath = this.propertyPath[this.propertyPath.length - 1];
    const lastDisplayPath = this.displayPaths[this.displayPaths.length - 1];

    if (this.validProperties) {
      if (
        this.validProperties.includes(lastDisplayPath?.value?.dataType?.value)
      ) {
        this.message = "";
        result = true;
      } else {
        this.message = this.allowedPropTypesString;
        result = false;
      }
    } else if (
      this.allowedEntityName &&
      this.isLookupPropertyType(lastDisplayPath?.value)
    ) {
      const allowedlookupName = this.allowedEntityName.substring(
        this.allowedEntityName.lastIndexOf(".") + 1,
        this.allowedEntityName.length
      );
      const lookupClass = lastDisplayPath?.value.dataType?.lookupClassName;
      const selectedLookupName = lookupClass.substring(
        lookupClass.lastIndexOf(".") + 1,
        lookupClass.length
      );

      result =
        allowedlookupName?.toLowerCase() === selectedLookupName?.toLowerCase();
      this.message = !result
        ? "Select a property of type " + allowedlookupName
        : "";
      return result;
    } else {
      this.message = ".";
      result = true;
    }

    return result;
  }

  okHandler() {
    if (this.IsSelectionValid()) {
      this.resultHandler(this.propertyPath);
      this.onCancelClick();
    } else {
      this.$message("Please select a Property Type ");
    }
  }

  getTextAsseblyParts() {
    const text = new TextAssembly();
    const parts: any[] | null = [];
    const prevNode = this.currentEntity;

    this.propertyPath.map((x) => {
      parts.push(x);
    });
    text.parts = parts;

    return text;
  }

  onCancelClick() {
    this.showModal = false;
    this.$emit("update:dialogVisible", false);
  }

  private async setCurrentEntity(
    displayName: string,
    data: any,
    isRoot = false
  ) {
    try {
      this.loading = true;
      const entityId = isRoot ? data.id : data?.dataType?.lookupClassName;
      if (entityId) {
        var rs = await EntitiesModule.getEntity(entityId);
        this.currentEntity = rs;
        const lastProp = this.propertyPath[this.propertyPath.length - 1];
        if (lastProp.value === null && this.propertyPath.length > 1) {
          this.displayPaths.splice(this.displayPaths.length - 1, 1);
          this.propertyPath.splice(this.propertyPath.length - 1, 1);
        }
        if (isRoot) return;
        this.propertyPath.push(new KeyValue(data.systemName, entityId));
        this.displayPaths.push(new KeyValue(displayName, data));
        this.IsSelectionValid();
      }
    } finally {
      this.$nextTick(() => {
        this.loading = false;
      });
    }
  }

  get origEntityId() {
    return this.entityId;
  }

  get origEntity() {
    const key = this.origEntityId.substring(
      this.origEntityId.lastIndexOf(".") + 1
    );
    var rs = new KeyValue(key, this.origEntityId);
    return rs;
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

  mounted() {
    console.log("loading current entity." + this.origEntityId);

    if (StringUtils.isNullOrEmpty(this.origEntityId)) {
      this.$alert(
        "Entity Name for Property Selector should not be null or empty."
      );
      this.onCancelClick();
      return;
    }
    if (this.path && this.path.length > 0) {
      this.loadProperties();
    } else {
      this.loadBaseEntity();
    }
  }

  async loadProperties() {
    this.displayPaths = [];
    await this.loadBaseEntity(this.path[0].value);
    for (let i = 1; i < this.path.length; i++) {
      var prop = this.currentEntity?.properties.find(
        (c) => c.systemName == this.path[i].key
      );
      if (prop) {
        await this.setCurrentEntity(prop.displayName, prop);
      }
    }
  }

  onOpen() {
    console.log("on Open");
  }

  onClosed() {
    console.log("on Closed");
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
