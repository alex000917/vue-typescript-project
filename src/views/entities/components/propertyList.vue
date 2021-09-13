<template>
  <div class="list-container">
    <el-row>
      <el-col>
        <el-row type="flex">
          <el-col
            style="padding-left: 30px"
            :span="18"
          >
            <el-button
              type="text"
              style="text-decoration: underline"
              title="new Property"
              @click="onNewProperty"
            >
              New
            </el-button>
            |
            <el-button
              type="text"
              style="text-decoration: underline; margin: 0"
              @click="onNewFormula"
            >
              New Formula
            </el-button>
          </el-col>
          <el-col
            :span="6"
            style="padding-right: 20px"
          >
            <el-row>
              <el-col :span="12">
                <el-input
                  v-model="query.text"
                  size="mini"
                  placeholder="Find property"
                />
              </el-col>
              <el-col :span="12">
                <el-select
                  v-model="query.type"
                  size="mini"
                  placeholder="Find by data type"
                  style="padding-left: 10px"
                  clearable
                  filterable
                >
                  <el-option
                    v-for="item in dataTypes"
                    :key="item.value"
                    :label="item.key"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-divider />
    <el-row>
      <el-col class="list-body">
        <div style="overflow: auto">
          <div
            v-if="displayProperties && Object.keys(displayProperties).length"
            :key="displayProperties.length"
          >
            <div
              v-for="(item, index) in displayProperties"
              :key="index"
            >
              <div >
                <transition
                  :name="
                    showEditProperty(item) === false
                      ? 'el-zoom-in-top'
                      : ''
                  "
                >
                  <el-button
                    v-show="!showEditProperty(item)"     
                    v-bind:style="{ 'background-color':index % 2==0 ? 'white' : '#f5f7fa','width':'100%'}"               
                    @click="handleListItemClick(item)"
                  >
                    <span class="item-content">
                      <el-image
                        v-if="iconUrl(item.dataType.value)"
                        :src="iconUrl(item.dataType.value)"
                      >
                        <div
                          slot="error"
                          class="image-slot"
                        >
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
          <div
            v-else
            class="text-center"
          >
            No data
          </div>
          <NewProperty
            v-if="showNewProperty"
            :show="showNewProperty"
            :entity="currentEntity"
            :on-ok="onPropertyOk"
            :on-cancel="onPropertyCancel"
          />
          <NewFormula
            v-if="showNewFormula"
            :show="showNewFormula"
            :entity="currentEntity"
            :ok-handler="onFormulaOk"
            @onCancel="onFormulaCancel"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator"

import { EntitiesModule } from "@/store/modules/entitiesMod"
import { DataTypeFactory } from "@/models/Utils/DataTypeFactory"
import { Entity } from "@/models/Entity"
import EditProperty from "./editProperty.vue"
import { update } from "lodash"
import { BaseProperty, Property } from "@/models/Properties"
import PropertyEditor from "./propertyEditor/index.vue"
import { AppCacheModule } from "@/store/modules/appCache"
import NewProperty from "./NewProperty.vue"
import NewFormula from "./NewFormula.vue"
@Component({
  name: "PropertyList",
  components: { PropertyEditor, NewFormula, NewProperty }
})
export default class extends Vue {
  @Prop({ required: true }) private entity!: Entity;
  @Prop({ required: false }) private setLoading: any;

  private selectedItem: BaseProperty | null = {} as any;

  get currentEntity() {
    return this.entity
  }

  get dataTypes() {
    return AppCacheModule.FlexSettings.dataTypes
  }

  showEditProperty(item: any) {
    return item.displayName === this.selectedItem?.displayName
  }

  handleListItemClick(item: any) {
    this.selectedItem = item
  }

  closePropertyEditor() {
    this.selectedItem = null
  }

  iconUrl(key: string) {
    const dataTypeicon = DataTypeFactory.getDataTypeIcon(key)
    return dataTypeicon
  }

  private query = {
    text: "",
    type: ""
  };

  get displayProperties() {
    let properties = this.currentEntity.properties
    if (this.query?.text) {
      properties = properties.filter(x =>
        x.displayName.toLowerCase().includes(this.query?.text.toLowerCase())
      )
    }
    if (this.query?.type) {
      properties = properties.filter(
        x =>
          x?.dataType?.value?.toLowerCase() === this.query?.type.toLowerCase()
      )
    }
    return properties
  }

  @Watch("query", { deep: true })
  onfilterValid(item: any) {
    // both empty
    if ((!this.query.text || this.query.text.length == 0) && !this.query.type) { return true }

    // only text match
    if (this.query.text.length > 0 && !this.query.type) {
      return item.displayName
        ?.toLowerCase()
        .includes(this.query.text.toLowerCase())
    }

    // ony type match
    if (this.query.text.length <= 0 && this.query.type) { return item.dataType?.value == +this.query.type }

    // both match
    return (
      item.displayName?.toLowerCase().includes(this.query.text.toLowerCase()) &&
      item.dataType?.value == +this.query.type
    )
  }

  updatePropertyHandler() {
    // const updatedValue = this.$refs[`editProperty_${this.selectedItem.systemName}`][0].$data.newForm
    // TODO update to vuex store
  }

  private showNewProperty = false;
  private onPropertyOk(property: Property) {
    console.log("on Property ok...")
    this.showNewProperty = false
    this.currentEntity.properties.push(property)
  }

  private onPropertyCancel() {
    this.showNewProperty = false
  }

  private showNewFormula = false;
  private onFormulaOk(property: Property) {
    console.log("on Formula ok...")
    this.showNewFormula = false
    this.currentEntity.properties.push(property)
  }

  private onFormulaCancel() {
    this.showNewFormula = false
  }

  onNewProperty() {
    this.showNewFormula = false
    this.showNewProperty = true
  }

  onNewFormula() {
    this.showNewProperty = false
    this.showNewFormula = true
  }

  returnProperty() {
    this.showNewProperty = false
    this.showNewFormula = false
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  max-height: 80%;
  width: 100%;

  .text-center {
    padding: 20px;
    text-align: center;
  }
  .item-content {
    display: flex;
    align-items: center;
    align-self: center;
  }
  .el-fade-in-linear-enter-active,
  .el-fade-in-linear-leave-active {
    transition: 0.7s;
  }
}
</style>
