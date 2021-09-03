<template>
  <div>

    <el-aside class="elaside">
      <el-collapse accordion>
        <el-collapse-item
          title="Properties"
          name="1"
        >

        <property-selector-list :entity="currentEntity" :formData="formData" :formProperties="formProperties"/>
          
        </el-collapse-item>
        <el-collapse-item
          title="Tables"
          name="2"
        >
        <tableselector :entity="currentEntity" :formData="formData" :formProperties="formProperties"/>
        </el-collapse-item>

        <el-collapse-item
          title="Development"
          name="4"
        >
        <developmentselector />
        </el-collapse-item>
      </el-collapse>
    </el-aside>



  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator"
import { Entity } from "@/models/Entity";
import { AppCacheModule } from "@/store/modules/appCache";
import { BaseProperty, Property } from "@/models/Properties";
import { DataTypeFactory } from "@/models/Utils/DataTypeFactory";
import miniTable from "@/components/Tables/miniTable.vue"
import miniTree from "@/components/Tables/miniTree.vue"
import propertyselector from "./propertyselector.vue"
import tableselector from "./tableselector.vue"
import developmentselector from "./developmentselector.vue"
import JsonEditor from "@/components/JsonEditor/index.vue"
import axios from "axios"
import { FormsModule } from "@/store/modules/FormsStore"
import { Loading, Message } from "element-ui"
import { EntitiesModule } from "@/store/modules/entitiesMod"
import  PropertySelectModel  from "@/components/PropertySelector/index.vue"
import PropertySelectorList from "./propertyselectorlist.vue"

@Component({
  name: "propertyselector",
  components: {miniTable, miniTree, propertyselector, JsonEditor, tableselector, developmentselector, PropertySelectModel, PropertySelectorList}
})
export default class extends Vue {
  propertiesView = {
    properties: [],
    selectedProperty: null,
    serach: null
  };

  @Prop({ required: true }) private entity!: Entity;
  @Prop({ required: true }) private formData: any;
  @Prop({ required: true }) private formProperties: any;

  private selectedItem: BaseProperty | null = {} as any;


  selectedEntityType=null
  search=null;
  onPropertySelected(value:any) { console.log(value) }
  onEntityTypeChanged(value:any) { console.log(value) }
  onNewPropertyClick(evt:any) { console.log(evt) }
  onAllPropertyClick(evt:any) { console.log(evt) }
  onAppPrefClick(evt:any) { console.log(evt) }
  get getEntityTypeList() {
    return []
  }

  showEditProperty(item: any) {
    return item.displayName === this.selectedItem?.displayName;
  }

  get dataTypes() {
    return AppCacheModule.FlexSettings.dataTypes;
  }

  get currentEntity() {
    return this.entity;
  }

  get inFormProperties(){
   return this.formProperties;
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

  

}
</script>
