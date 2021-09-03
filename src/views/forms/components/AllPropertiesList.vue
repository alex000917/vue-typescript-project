<template>
  <div>
    <!-- <el-form
      ref="form"
      :rules="rules"
      style="width: 100%; overflow: auto"
      :model="form"
      label-position="left"
      :inline-message="true"
    > -->
    <el-row>
      <el-col>
        <el-input
          v-model="search.text"
          placeholder="Find property"
        />
      </el-col>
    </el-row>
    <div class="tree-container">
        <el-tree
            ref="elTree"
            :data="this.displayProperties"
            node-key="id"
            :filter-node-method="filterNode"
            class="tree-content"
            >
        <span slot-scope="{ node, data }" class="custom-tree-node">
                <b v-if="!node.isLeaf">{{ data.displayName}}</b>
                <div v-else @click="onNodeClick(data, node)">
                  <draggable>
                <span class="prop-icon">
                            <el-image v-if="data.dataType.value" :src="iconUrl(data.dataType.value)" />
                        </span>
                <span style="padding-left: 3px">{{ data.displayName }} </span>
                  </draggable>
                </div>
            </span>
        </el-tree>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch, Prop} from "vue-property-decorator"
import { ElForm } from "element-ui/types/form"
import { ElTree, TreeNode } from "element-ui/types/tree";
import { KeyValue } from "@/models/KeyValue";
import { Node } from "@/models/Node";
import { DataTypeFactory } from "@/models/Utils/DataTypeFactory";
import Draggable from "vuedraggable"
@Component({
    name: "allpropertieslist",
    components: {Draggable}
})

export default class extends Vue {
    @Prop({ required: true }) displayProperties: any;
    @Prop({ required: false }) show!: boolean;
    @Prop({ required: false }) onOk!: any;
    @Prop({ required: false }) onCancel!: any;
    treeNodeKey = "displayName";

  get showModal() {
    return this.show
  }

  private handleClose(done: any) {
    done()
    this.onCancelClick()
  }

   private onCancelClick() {
    this.resetForm()
    this.$emit("update:showModel", false)
  }

  resetForm() {
    (this.$refs.form as ElForm).resetFields()
  }


    private query = {
    text: "",
    type: "",
  };
    @Watch("query", { deep: true })
    onfilterValid(item: any) {
        // both empty
        if ((!this.query.text || this.query.text.length == 0) && !this.query.type)
        return true;

        // only text match
        if (this.query.text.length > 0 && !this.query.type)
        return item.displayName
            ?.toLowerCase()
            .includes(this.query.text.toLowerCase());

        // ony type match
        if (this.query.text.length <= 0 && this.query.type)
        return item.dataType?.value == +this.query.type;

        // both match
        return (
        item.displayName?.toLowerCase().includes(this.query.text.toLowerCase()) &&
        item.dataType?.value == +this.query.type
        );
    }

  search:{text:string, type:any} ={
    text: "",
    type: ""
  }

  propertiesList = {
    id: "AddedProps",
    name: "Added Properties",
    tooltip: "Added Properties",
    label: "Added Properties",
    displayName: "Added Properties",
    children: [] as any,
    branch: true,
    myspType: "Node"
  };
  boxPropertiesList = {
    id: "OutOfBox",
    name: "Out-of-the-box Properties",
    label: "Out-of-the-box Properties",
    tooltip: "Out-of-the-box Properties",
    displayName: "Out-of-the-box Properties",
    children: [] as any,
    branch: true,
    myspType: "Node"
  };

    @Watch("search", { deep: true })
  onSearchChanged(value:{text:string, type:string}) {
      console.log('watch search triggered ' + value.text);
      let filteredAddedProps = [] as any 
      debugger;
      this.propertiesList.children.length = 0;
      this.propertiesList.children.push.apply(this.propertiesList.children, this.displayProperties[0].children)
       //this.addedProps.children;
      let filteredBoxProps = [] as any
      this.boxPropertiesList.children.length = 0;
      this.boxPropertiesList.children.push.apply(this.boxPropertiesList.children, this.displayProperties[1].children)
       //this.outOfBox.children;
      if (value === undefined) { return }
      //console.log(this.addedProps.children)
      debugger;
      filteredAddedProps = this.propertiesList.children.filter((data: {  displayName: string, entityName: string }) => !value ||
        data.displayName.toLowerCase().includes(value.text.toLowerCase()));
      filteredBoxProps = this.boxPropertiesList.children.filter((data: {  displayName: string, entityName: string }) => !value ||
        data.displayName.toLowerCase().includes(value.text.toLowerCase()));
      console.log(filteredAddedProps);
      console.log(filteredBoxProps);

    this.propertiesList.children.length = 0;
    this.propertiesList.children.push.apply(this.propertiesList.children, filteredAddedProps)

    this.boxPropertiesList.children.length = 0;
    this.boxPropertiesList.children.push.apply(this.boxPropertiesList.children, filteredBoxProps)
  }


    filterNode(value: any, data: any) {
    // const filterData = value.split("_")
    const filterData = value.split("||");
    if (!filterData[0] && !filterData[1]) return true;

    if (data.branch) return true;
    let rs = false;
    // if (!rs && filterData[1] === "name" && this.query.text.length > 0) {
    if (this.query.text.length > 0) {
      rs = data[this.treeNodeKey]
        .toLowerCase()
        .includes(filterData[0].toLowerCase());
    }
    let rs2 = false;
    // if (!rs && filterData[1] === "type" && this.query.type.length > 0) {
    if (this.query.type.length > 0) {
      // TODO update this for tree search by attribte discipline.
      const attributes = data.attributes?.find(
        (x: KeyValue) => x.key === "DISCIPLINE"
      );
      rs2 =
        attributes?.value.value.toLowerCase() === filterData[1].toLowerCase();
      // rs2 = attributes?.value.value.toLowerCase() === filterData[0].toLowerCase()
      // return data.id.toLowerCase().includes(filterData[0].toLowerCase())
    }

    if (this.query.text.length > 0 && this.query.type.length > 0) {
      return rs && rs2;
    } else {
      return rs || rs2;
    }
  }

  iconUrl(key: string) {
    const dataTypeicon = DataTypeFactory.getDataTypeIcon(key);
    return dataTypeicon;
  }

}
</script>