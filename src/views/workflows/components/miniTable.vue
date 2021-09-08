<template>
  <div>
    <el-row>
      <el-col :span="20">
        <slot name="filter" />
      </el-col>
      <el-col :span="4">
        <el-button-group
          v-if="showActions"
          class="action-items"
        >
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-circle-plus-outline"
            @click="onAddClick()"
          />
          <el-button
            :disabled="!selectedRow"
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="onEditClick()"
          />
          <el-button
            :disabled="!selectedRow"
            size="mini"
            type="primary"
            icon="el-icon-delete"
            @click="onDeleteClick()"
          />
        </el-button-group>
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <el-table
          v-loading="listLoading"
          :data="items"
          border
          fit
          stripe
          row-key="displayName"
          highlight-current-row
          class="table-container"
          default-expand-all
          max-height="80%"
          @row-click="onRowClick"
          @row-dblclick="onRowDoubleClick"
        >
          <el-table-column
            v-for="col in columns"
            :key="col.field"
            :label="col.label"
            :prop="col.field"
            :sortable="col.sortable"
            :min-width="col.width"
          />
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"

@Component({
  name: "MiniTable",
  components: {}
})
export default class extends Vue {
  @Prop({ required: false, default: true }) private showActions!: boolean;
  @Prop({ required: true }) private items!: any[];
  @Prop({ required: true }) private columns!: {
    label: string
    field: string
    width: string
    sortable: boolean
  }[];

  private listLoading = false;

  get getItems() {
    return this.items
  }

  selectedRow: any = null;
  onRowClick(value: any, node: any) {
    /// console.log(node, "hey")
    if (this.selectedRow === value) {
      this.selectedRow = null
    } else {
      this.selectedRow = value
      this.$emit("onRowClick", this.selectedRow)
    }
  }

  onRowDoubleClick(value: any, node: any) {
    this.selectedRow = value
    this.onEditClick()
  }

  // TODO Event
  onAddClick() {
    this.$emit("addHandler")
  }

  onEditClick() {
    if (this.selectedRow) {
      this.$emit("editHandler", this.selectedRow)
    }
  }

  onDeleteClick() {
    if (this.selectedRow) {
      this.$emit("deleteHandler", this.selectedRow)
    }
  }
}
</script>

<style lang="scss" scoped>
.action-items {
  display: flex;
  float: right;

  .el-button {
    padding-left: 20px;
  }
}
</style>
