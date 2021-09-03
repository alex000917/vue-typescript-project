<template>
    <div>
        <el-row>
            <el-col>
            <el-button
                size="mini"
                type="text"
                icon="el-icon-plus"
                title="New"
                @click="onNewTableClick"
            >
                New Table
            </el-button>
            <p>Drag properties on to the form.</p>
            </el-col>
        </el-row>

        <el-row>
            <el-col>
            <el-input
                v-model="search.text"
                placeholder="Find property"
            />
            </el-col>
        </el-row>
        <el-row>
            <!-- <el-col>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-plus"
                title="New"
                @click="onAllPropertyClick"
              >
                Added properties
              </el-button>
            </el-col> -->
            <!-- <el-collapse accordion>
              <el-collapse-item title="Added Tables">
                <el-col class="list-body">
        <div style="overflow: auto">
          <div
            v-if="addedTables && Object.keys(addedTables).length"
            :key="addedTables.length"
          >
            <div v-for="(item, index) in addedTables" :key="index">
              <div>
                <transition
                  :name="
                    showEditProperty(item) === false ? 'el-fade-in-linear' : ''
                  "
                >
                  <el-button
                    v-show="!showEditProperty(item)"
                    class="list-button"
                    @click="handleListItemClick(item)"
                  >
                    <span class="item-content">
                      <el-image
                        v-if="iconUrl(item.dataType.value)"
                        :src="iconUrl(item.dataType.value)"
                      >
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline" />
                        </div>
                      </el-image>
                      <i
                        v-else
                        style="padding-right: 10px"
                        class="el-icon-set-up"
                      />
                      <span style="padding-left: 5px">{{
                        item.displayName
                      }}</span>
                    </span>
                  </el-button>
                </transition>
                <el-collapse-transition>
                  <PropertyEditor
                    v-if="showEditProperty(item)"
                    :ref="`editProperty_${item.systemName}`"
                    :property="item"
                    @closePropertyEditor="closePropertyEditor"
                  />
                </el-collapse-transition>
              </div>
            </div>
          </div>
          <div v-else class="text-center">No data</div>
        </div>
      </el-col>
              </el-collapse-item>
              <el-collapse-item title="Out-of-the-box Tables">
                <el-col class="list-body">
        <div style="overflow: auto">
          <div
            v-if="outOfBoxTables && Object.keys(outOfBoxTables).length"
            :key="outOfBoxTables.length"
          >
            <div v-for="(item, index) in outOfBoxTables" :key="index">
              <div>
                <transition
                  :name="
                    showEditProperty(item) === false ? 'el-fade-in-linear' : ''
                  "
                >
                  <el-button
                    v-show="!showEditProperty(item)"
                    class="list-button"
                    @click="handleListItemClick(item)"
                  >
                    <span class="item-content">
                      <el-image
                        v-if="iconUrl(item.dataType.value)"
                        :src="iconUrl(item.dataType.value)"
                      >
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline" />
                        </div>
                      </el-image>
                      <i
                        v-else
                        style="padding-right: 10px"
                        class="el-icon-set-up"
                      />
                      <span style="padding-left: 5px">{{
                        item.displayName
                      }}</span>
                    </span>
                  </el-button>
                </transition>
                <el-collapse-transition>
                  <PropertyEditor
                    v-if="showEditProperty(item)"
                    :ref="`editProperty_${item.systemName}`"
                    :property="item"
                    @closePropertyEditor="closePropertyEditor"
                  />
                </el-collapse-transition>
              </div>
            </div>
          </div>
          <div v-else class="text-center">No data</div>
        </div>
      </el-col>
              </el-collapse-item>
            </el-collapse> -->
            <!-- <div class="tree-container">
              <el-tree
                    ref="elTree"
                    :data="tablesTree"
                    node-key="id"
                    :filter-node-method="filterNode"
                    class="tree-content"
                    default-expand-all
                  >
                <span slot-scope="{ node, data }" class="custom-tree-node">
                      <b v-if="!node.isLeaf">{{ data.displayName}}</b>
                      <div v-else @click="onNodeClick(data, node)">
                        <draggable group="table">
                        <span class="prop-icon">
                                  <el-image v-if="data.dataType.value" :src="iconUrl(data.dataType.value)" />
                                </span>
                        <span style="padding-left: 3px">{{ data.displayName }} </span>
                        </draggable>
                      </div>
                    </span>
              </el-tree>
            </div> -->

            <el-collapse v-model="tablesTree.children">
              <el-collapse-item title="Added Properties" name="Added Properties">
                <div @dragstart="dragStartCheck" @dragend="checkDragEnd" >
                  <draggable group="table" :move="checkMove" :list="tablesTree[0].children" @start="onStart"  @end="onDrop" @change="logChange">
                  <li v-bind:id="item.systemName" class="property-list-item" v-for="item in tablesTree[0].children" :key="item.displayName">
                      <!-- <span class="prop-icon" v-bind:id="item.systemName" :key="item.displayName">
                          <el-image v-if="item.dataType.value" :src="iconUrl(item.dataType.value)" />
                      </span> -->
                      <span style="padding-left: 3px">{{ item.displayName }} </span>
                  </li>
                  </draggable>
                </div>
              </el-collapse-item>
                <el-collapse-item title="Out-of-the-box Properties" name="Out-of-the-box Properties">
                <div @dragstart="dragStartCheck" @dragend="checkDragEnd" >
                  <draggable group="table" :move="checkMove" :list="tablesTree[1].children" @start="onStart"  @end="onDrop" @change="logChange">
                  <li v-bind:id="item.systemName" class="property-list-item" v-for="item in tablesTree[1].children" :key="item.displayName">
                    <!-- <span class="prop-icon" v-bind:id="item.systemName" :key="item.displayName">
                          <el-image v-if="item.dataType.value" :src="iconUrl(item.dataType.value)" />
                      </span> -->
                      <span style="padding-left: 3px">{{ item.displayName }} </span>
                    </li>
                  </draggable>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-row>

          <NewTable
            v-if="showNewTable"
            :show="showNewTable"
            :entity="currentEntity"
            :on-ok="onNewTableOk"
            :on-cancel="onNewTableCancel"
          />
    </div>
</template>
<script lang="ts">
import {Component, Vue, Watch, Prop} from "vue-property-decorator"
import { Entity } from "@/models/Entity";
import { AppCacheModule } from "@/store/modules/appCache";
import { BaseProperty, Property } from "@/models/Properties";
import { DataTypeFactory } from "@/models/Utils/DataTypeFactory";
import { ElTree, TreeNode } from "element-ui/types/tree";
import { KeyValue } from "@/models/KeyValue";
import { Node } from "@/models/Node";
import NewTable from "./newTable.vue";
import Draggable from "vuedraggable"
@Component({
    name: "tableselector",
    components: {Draggable, NewTable}
})

export default class extends Vue {

  @Prop({ required: true }) private entity!: Entity;
  @Prop({ required: true }) private formData: any;
  @Prop({ required: true }) private formProperties: any;
  treeNodeKey = "displayName";

  selectedEntityType=null
  search:{text:string, type:any} ={
    text: "",
    type: ""
  }
  onPropertySelected(value:any) { console.log(value) }
  onEntityTypeChanged(value:any) { console.log(value) }
  onNewPropertyClick(evt:any) { console.log(evt) }
  onAllPropertyClick(evt:any) {
     console.log(evt) 
     }
  onAppPrefClick(evt:any) { console.log(evt) }

  private showNewTable = false;
  private onNewTableOk(property: Property) {
    console.log("on Property ok...")
    this.showNewTable = false
   // this.currentEntity.properties.push(property)
  }

  private onNewTableCancel() {
    this.showNewTable = false
  }

  onNewTableClick() {
    this.showNewTable = true
  }

  get currentEntity() {
    return this.entity;
  }

  get inFormProperties(){
   return this.formProperties;
  }

  private selectedItem: BaseProperty | null = {} as any;

  duplicateProps = [] as any;
  get displayProperties() {
    let properties = this.currentEntity.properties;
    let inFormProperties = this.inFormProperties;
    
    if (this.query?.text) {
      properties = properties.filter((x) =>
        x.displayName.toLowerCase().includes(this.query?.text.toLowerCase())
      );
    }
    if (this.query?.type) {
      properties = properties.filter(
        (x) =>
          x?.dataType?.value?.toLowerCase() === this.query?.type.toLowerCase()
      );
    }
    if (properties != undefined) {
      properties.forEach( (element, propIndex) => {
      inFormProperties.forEach( (formElement: { propertySystemName: string; }, formPropIndex: any) => {
        if (element.systemName == formElement.propertySystemName) {
          if (!this.duplicateProps.includes(propIndex)) { this.duplicateProps.push(propIndex) }
         }
       })
      })
    }
    
    this.duplicateProps.forEach((element: number) => {
      properties.splice(element, 1);
    });

    return properties;
  }

  outOfBoxTablesList = {
    id: "OutOfBox",
    name: "Out-of-the-box Properties",
    label: "Out-of-the-box Properties",
    tooltip: "Out-of-the-box Properties",
    displayName: "Out-of-the-box Properties",
    children: [] as any,
    branch: true,
    myspType: "Node"
  };
  get outOfBoxTables() {
    if (this.displayProperties != undefined) {
      this.displayProperties.forEach((element, index) => {
        if (element.outOfTheBox && (element.myspType == "CompositeTable" || element.myspType == "SetProperty")) { this.outOfBoxTablesList.children.push(element); }
      })
    }
    return this.outOfBoxTablesList;
  }

  addedTablesList = {
    id: "AddedProps",
    name: "Added Properties",
    tooltip: "Added Properties",
    label: "Added Properties",
    displayName: "Added Properties",
    children: [] as any,
    branch: true,
    myspType: "Node"
    };
  get addedTables() {
    if (this.displayProperties != undefined) {
      this.displayProperties.forEach((element, index) => {
        if (!element.outOfTheBox && (element.myspType == "CompositeTable" || element.myspType == "SetProperty")) { this.addedTablesList.children.push(element); }
      })
    }
    return this.addedTablesList
  }

  tablesTree = [] as any;
  get propertyTree() {
    this.tablesTree.push(this.propertiesList);
    this.tablesTree.push(this.boxPropertiesList);
    return this.tablesTree;
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
      this.propertiesList.children.push.apply(this.propertiesList.children, this.addedTablesList.children)
       //this.addedProps.children;
      let filteredBoxProps = [] as any
      this.boxPropertiesList.children.length = 0;
      this.boxPropertiesList.children.push.apply(this.boxPropertiesList.children, this.outOfBoxTablesList.children)
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

  get getEntityTypeList() {
    return []
  }

  showEditProperty(item: any) {
    return item.displayName === this.selectedItem?.displayName;
  }

  get dataTypes() {
    return AppCacheModule.FlexSettings.dataTypes;
  }


  handleListItemClick(item: any) {
    this.selectedItem = item;
  }

  closePropertyEditor() {
    
    this.selectedItem = null;
  }

  iconUrl(key: string) {
    const dataTypeicon = DataTypeFactory.getDataTypeIcon(key);
    return dataTypeicon;
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



  onDrop(evt: any) {
   // console.log(this.formData)
    let rowSystemName = "";
    let colSpanItem = 0;
    let newClass = "";
    let itemMovedSystemName = evt.item.id;
    console.log("property list drop event", evt)
    let rowElement = evt.to.parentElement
    if (rowElement.id == "") {
      rowSystemName = rowElement.parentElement.id;
    }
    else { rowSystemName = rowElement.id; }
    this.formData.tabs.forEach(tabs => {
      tabs.controlsContainers.forEach(controlsContainer => {
        if (controlsContainer.displayName != 'Workflow Graph' && controlsContainer.controls.length > 0) {
            controlsContainer.controls.forEach(element => {
              if (element.systemName.trim() == itemMovedSystemName.trim()) {
                newClass = "el-col-" + 24/controlsContainer.controlsInARow * 1;
                console.log(newClass);
                document.getElementById(itemMovedSystemName).parentElement.parentElement.parentElement.classList.add(newClass);
              }
            });
        }
      });
    });
  }


  onStart(evt: any) {
    console.log("start move event" , evt);
  }

  dragStartCheck(evt: any) {
    console.log("drag start check", evt);
    evt.dataTransfer.setData("text", evt.srcElement.firstChild.id)
  }

  checkDragEnd(evt: any) {
    console.log("check drag end", evt)
  }

  logChange(event: any) {
    console.log("change log", event)
 
  }

  options = {
        onDragstart(event: any){ 
          console.log(event)
          } 
      }

  mounted() {
    // this.outOfBoxTablesList = this.outOfBoxTables;
    // this.addedTablesList = this.addedTables;
    this.propertiesList.children.length = 0;
    this.propertiesList.children.push.apply(this.propertiesList, this.addedTablesList)

    this.boxPropertiesList.children.length = 0;
    this.boxPropertiesList.children.push.apply(this.boxPropertiesList, this.outOfBoxTablesList)
}

}
</script>

<style lang="css">
  .list-button {
    padding-left: 15px;
  }
  .el-image {
    margin-bottom: -10px;
  }
  .tree-container {
    padding: 0px 10px;
    padding-top: 5px;
    position: relative;
    overflow: auto;
    height: calc(100% - 38px);
  }
    .tree-content {
      position: relative;
    }
    .node-content {
      display: flex;
      align-items: center;
      align-self: center;
    }
    .el-tree.tree-content {
      background: none;
    }
</style>