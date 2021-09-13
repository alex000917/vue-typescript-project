<template>
  <el-form style="padding-left: 20px">
    <el-row>
      Properties can be links to other forms, or to external pages or systems
    </el-row>
    <!-- <el-row style="margin-top: 25px">
      <el-switch v-model="enableCustomLink" :label="0" />
      <span>use Cutom link</span>
    </el-row> -->
    <el-row>
      <el-radio-group
        v-model="selectedLinkType"
        @change="onLinkTypeChanged"
      >
        <el-radio :label="0">
          No Link
        </el-radio>
        <el-radio
          v-if="['9'].includes(currentProperty.dataType.value)"
          :label="1"
        >
          Link to Entity Form
        </el-radio>
        <el-radio :label="2">
          use Custom Link
        </el-radio>
      </el-radio-group>
    </el-row>
    <el-row>
      <el-col v-if="selectedLinkType===2">
        <tags-view
          :allowed-properties="['1', '2']"
          :base-entity-id="currentProperty.entityId"
          :data="currentProperty.customLink"
          @onItemsUpdated="onCustomLinkUpdated"
        />
        <span style="margin-left: 25px; width: 80%; min-width: 350px">
          To include the value of the property in the URL, type @VALUE. @VALUE
          of lookup properties is the item's ID. The link will be enabled when
          the property has a value.
        </span>
      </el-col>
    </el-row>
    <el-row />
  </el-form>
</template>

<script lang="ts">
import { BaseProperty } from "@/models/Properties"
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import TagsView from "@/components/Tags/index.vue"
@Component({
  name: "PropLinks",
  components: {
    "tags-view": TagsView
  }
})
export default class extends Vue {
  @Prop({ required: true }) private property!: BaseProperty|any;

  enableCustomLink = true;

  @Watch("enableCustomLink", { immediate: true })
  updateEnablelink(value: boolean) {
    if (!value) {
      this.currentProperty.customLink = null
    }
  }

  get currentProperty() {
    return this.property
  }

  onCustomLinkUpdated(value: any) {
    
    this.currentProperty.customLink = value
  }

  selectedLinkType=0
  onLinkTypeChanged(value: any) {
    console.log("selected radio type " + value)
    switch (value) {
      case 0:
        this.currentProperty.customLink = null
        this.currentProperty.linkToEntity = false
        break
      case 1:
        this.currentProperty.customLink = null
        this.currentProperty.linkToEntity = true
        break
      case 2:
        this.currentProperty.customLink = null

        this.currentProperty.linkToEntity = false
        break
      default:
        this.currentProperty.customLink = null
        this.currentProperty.linkToEntity = false
        break
    }
  }

  mounted() {
    if (this.currentProperty.customLink) {
      this.selectedLinkType = 2
    } else if (this.currentProperty.linkToEntity) {
      this.selectedLinkType = 1
    } else {
      this.selectedLinkType = 0
    }
  }
}
</script>
