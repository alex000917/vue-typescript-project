<template>
  <el-dialog
    width="50%"
    title="Select Preference"
    :visible.sync="showModal"
    destroy-on-close
    :close-on-click-modal="false"
    append-to-body
  >
    <Preferences
      :allowed-properties="validProperties"
      @onSelectedRowChanged="onTagsPreferenceChanged"
    />
    <span
      slot="footer"
    >
      <el-button
        type="primary"
        size="mini"
        @click="okHandler"
      >Ok</el-button>
      <el-button
        size="mini"
        @click="onCancelClick"
      >Cancel</el-button>

    </span>
  </el-dialog>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator"
import { ApplicationPreference } from "@/models/ApplicationPreference"
import Preferences from "./Preferences.vue"

@Component({
  name: "prefModel",
  components: { Preferences }
})
export default class extends Vue {
  @Prop({ required: true }) isOpen!: boolean;
  @Prop({ required: false }) resultHandler!: any;
  @Prop({ required: false }) allowedProperties!: string[];

  private selectedItem: ApplicationPreference|null = null

  get showModal() {
    return this.isOpen
  }

  set showModal(val: boolean) {
    this.$emit("update:isOpen", val)
  }

  get validProperties() {
    return this.allowedProperties
  }

  okHandler() {
    if (this.selectedItem) {
      this.resultHandler(this.selectedItem)
      this.onCancelClick()
    } else {
      this.$message("please select a Preference ")
    }
  }

  onCancelClick() {
    this.showModal = false
    this.$emit("update:isOpen", false)
  }

  onTagsPreferenceChanged(value:ApplicationPreference) {
    this.selectedItem = value
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
}
</style>
