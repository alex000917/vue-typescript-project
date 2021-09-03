<template>
  <div
    id="tags-view-container"
    class="tags-view-container"
  >
    <el-row class="el-row">
      <scroll-pane
        ref="scrollPane"
        class="tags-view-wrapper"
      >
        <InputTags
          class="tags-view-item"
          :value="AllTags"
          :size="'small'"
          @change="onChange"
        />
      </scroll-pane>
    </el-row>
    <el-row class="el-row">
      <div style="float: right; padding-right: 10px; padding-top: 4px; display: inline-flex">
        <el-button
          size="mini"
          type="text"
          @click="showPropertySelector = true"
        >
          Insert property...
        </el-button>

        <el-button
          size="mini"
          type="text"
          @click="showPrefSelector = true"
        >
          Insert Application Preference...
        </el-button>
      </div>
    </el-row>

    <prefModel
      :is-open.sync="showPrefSelector"
      :result-handler="selectPrefHandler"
      :allowed-properties="validPropertyTypes"
    />

    <select-property-model
      :dialog-visible.sync="showPropertySelector"
      :result-handler="selectProperyHandler"
      :entity-id="baseEntityId"
      :allowed-properties="validPropertyTypes"
      :allowed-entity-name="validlookupName"
    />
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import ScrollPane from "./ScrollPane.vue"
import { KeyValue } from "@/models/KeyValue"
import InputTags from "./inputtag.vue"
import SelectPropertyModel from "@/components/PropertySelector/index.vue"
import prefModel from "@/components/Preferences/prefModel.vue"
import { ApplicationPreferenceFactory } from "@/models/Utils/ApplicationPreferenceFactory"
import { ApplicationPreference } from "@/models/ApplicationPreference"
import { AppPreferencesModule } from "@/store/modules/AppPreferencesMod"
import { EntitiesModule } from "@/store/modules/entitiesMod"
import { Entity } from "@/models/Entity"
import { TextAssembly } from "@/models/TextAssembly"
import { PropertyFactory } from "@/models/Utils/PropertyFactory"
export type ITagView = Partial<KeyValue>

@Component({
  name: "InputTagsView",
  components: {
    ScrollPane,
    InputTags,
    prefModel,
    SelectPropertyModel
  }
})
export default class extends Vue {
  private visible = false;
  private top = 0;
  private left = 0;
  private affixTags: KeyValue[] = [];
  private showPropertySelector = false;
  private showPrefSelector = false;
  // @Prop({ required: true, default: [] }) tagsData!: Array<KeyValue>;
  @Prop({ required: true }) baseEntityId!: string;
  @Prop({ required: true, default: [] }) data!: TextAssembly;
  @Prop({ required: false }) private allowedProperties!: string[];
  @Prop({ required: false }) private allowedEntityName!: string;

  private innerData = new TextAssembly();
  get AllTags() {
    return this.innerTags.parts
  }

  get innerTags() {
    if (this.data && this.data.parts) {
      this.innerData = Object.assign(this.innerData, this.data)
    } else {
      this.innerData = new TextAssembly()
    }
    return this.innerData
  }

  get currentEntity() {
    // return EntitiesModule.getCurrentEntity;
    let entity: Entity|null = null
    EntitiesModule.getEntity(this.baseEntityId).then((e) => {
      entity = e
    })
    return entity
  }

  get validPropertyTypes() {
    return this.allowedProperties
  }

  get validlookupName() {
    return this.allowedEntityName
  }

  get Preferences() {
    return AppPreferencesModule.Preferences
  }

  async selectProperyHandler(result: KeyValue[]) {
    this.showPropertySelector = false
    
    this.innerData.parts.push(result)
    this.onTagsChanged(this.innerData)
  }

  onChange(value:[]) {
    this.innerData.parts = value
    this.onTagsChanged(this.innerData)
  }

  onTagsChanged(value: any) {
    
    // this.$emit("onItemsUpdated", value)
    this.$emit("onItemsUpdated", value)
  }

  selectPrefHandler(result: ApplicationPreference) {
    this.showPrefSelector = false

    const pair = ApplicationPreferenceFactory.createKeyValueArrayFromApplicationPreference(
      result
    )
    
    this.innerData.parts.push(pair)
    this.onTagsChanged(this.innerData)
  }
}
</script>

<style lang="scss">
// Reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }

      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.tags-view-container {
  height: 36px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 28px;
      line-height: 26px;

      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;

      &:first-of-type {
        margin-left: 2px;
      }

      &:last-of-type {
        margin-right: 2px;
      }

      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;

        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
.el-container .el-row{
  margin: 0px;
  padding: 0px;
}
</style>
