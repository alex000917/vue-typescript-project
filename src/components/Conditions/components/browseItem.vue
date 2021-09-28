<template>
  <el-dialog
    width="55%"
    title="Browse"
    :visible.sync="showModal"
    destroy-on-close
    :close-on-click-modal="false"
    append-to-body
  >
    <div>
      <el-transfer
        v-model="selectedItems"
        filterable
        filter-placeholder="search items"
        :data="data"
        :titles="['Filter Items', 'Filter selected']"

        :props="{
          key: 'displayName',
          label: 'displayName'
        }"
      />
    </div>
    <div
      slot="footer"
    >
      <el-button
        style="margin-right: 10px"
        @click="okHandler"
      >
        Ok
      </el-button>
      <el-button
        style="margin-left: 10px"
        @click="showModal = false"
      >
        cancel
      </el-button>
    </div>
  </el-dialog>
</template>
<script lang='ts'>
import { Component, Prop, Watch, Vue } from "vue-property-decorator"
import { _getDialogRoles } from "./data.js"

@Component({
  name: "",
  components: {}
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) result!: [];

  private data:any = _getDialogRoles;
  private selectedItems = ["29", "30"];

  get showModal() {
    return this.dialogVisible
  }

  set showModal(val: boolean) {
    this.$emit("update:dialogVisible", val)
  }

  @Watch("result", { immediate: true, deep: true })
  private setItems(val: any) {
    this.selectedItems = [...val]
  }

  okHandler() {
    this.$emit("update:result", this.selectedItems)
    this.showModal = false
  }
}
</script>

<style lang='scss' scoped>
.filter-container {
  .filter-item {
    display: block;
  }
  .filter-footer {
    text-align: center;
    padding-top: 5px;
    border-top: 1px solid $borderGray;
  }
}
</style>
