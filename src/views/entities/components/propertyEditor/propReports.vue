<template>
  <el-form
    style="padding-left: 30px"
    label-position="left"
  >
    <el-row style="margin: 10px 0px">
      <div style="margin-right: 10%">
        To include this property in the report generator, select the entity from
        <b>Entities</b> list, open <b>Settings</b> tab, open
        <b>Reports</b> section and select
        <b>Users can create reports based on this entity</b> check box
      </div>
    </el-row>

    <div
      v-if="['3', '9', '11'].includes(currentProperty.dataType.value)"
      style="margin-top: 10px"
    >
      <div>User can filter items using:</div>
      <div style="margin-left: 15px">
        <el-switch
          v-model="currentProperty.displayAsAutoCompleteInReports"
          style="display: block"
          active-text="Auto-complete text box"
          inactive-text="List"
        />
      </div>
      <el-row
        v-if="['9'].includes(currentProperty.dataType.value)"
        style="margin-top: 10px"
      >
        <el-switch
          v-model="currentProperty.canBeUseAsReferenceInReports"
        />Users can create reports based on the lookup entity
      </el-row>
      <el-row>
        <el-switch
          v-model="currentProperty.excludePropertyFromReportGenerator"
        />
        <span>Exclude this property from report generator" </span>
      </el-row>
      <el-row
        style="display: flex; margin-top: 10px"
        align="middle"
      >
        <div style="margin-right: 10px">
          Default Width (px):
        </div>
        <el-input-number
          v-model="currentProperty.defaultWidth"
          controls-position="right"
        />
      </el-row>
    </div>
    <el-row v-if="'11' === currentProperty.dataType.value">
      <el-switch v-model="currentProperty.excludePropertyFromReportGenerator" />
      <span>Exclude this property from report generator" </span>
    </el-row>
    <div
      v-if="
        ['1', '2', '4', '5', '6', '7', '8'].includes(
          currentProperty.dataType.value
        )
      "
    >
      <el-row>
        <el-switch
          v-model="currentProperty.excludePropertyFromReportGenerator"
        />
        <span>Exclude this property from report generator" </span>
      </el-row>
      <el-row
        style="display: flex; margin-top: 10px"
        align="middle"
      >
        <div style="margin-right: 10px">
          Default Width (px):
        </div>
        <el-input-number
          v-model="currentProperty.defaultWidth"
          controls-position="right"
        />
      </el-row>
    </div>
  </el-form>
</template>

<script lang="ts">
import { BaseProperty } from "@/models/Properties"
import { Component, Prop, Vue } from "vue-property-decorator"

@Component({
  name: "PropReports",
  components: {}
})
export default class extends Vue {
  @Prop({ required: true }) private property!: BaseProperty;

  private currentProperty: BaseProperty | any;
  created() {
    this.currentProperty = this.property
  }
}
</script>
