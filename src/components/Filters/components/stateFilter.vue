<template>
  <el-dialog
    width="30%"
    title="Filter By State"
    :visible.sync="showModal"
    destroy-on-close
    :close-on-click-modal="false"
    append-to-body

    class="filter-container"
  >
    <el-row :gutter="20">
      <el-col
        :span="10"
        style="text-align: right"
      >
        State is
      </el-col>
      <el-col :span="14">
        <el-checkbox-group v-model="items">
          <el-checkbox
            class="filter-item"
            label="active"
          >
            Active
          </el-checkbox>
          <el-checkbox
            class="filter-item"
            label="inactive"
          >
            Inactive
          </el-checkbox>
          <el-checkbox
            class="filter-item"
            label="deleted"
          >
            Deleted
          </el-checkbox>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <div
      slot="footer"
    >
      <el-button
        style="margin-right: 20px"
        size="mini"
        @click="okHandler"
      >
        Ok
      </el-button>
      <el-button
        type="text"
        style="text-decoration: underline"
        @click="showModal = false"
      >
        cancel
      </el-button>
    </div>
  </el-dialog>
</template>
<script lang='ts'>
import { Component, Prop, Watch, Vue } from "vue-property-decorator"

@Component({
  name: "",
  components: {}
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) data!: {
    active: boolean
    inactive: boolean
    deleted: boolean
  };

  private items:any = [];

  get showModal() {
    return this.dialogVisible
  }

  set showModal(val: boolean) {
    this.$emit("update:dialogVisible", val)
  }

  @Watch("data", { immediate: true, deep: true })
  private setItems(val: any) {
    if (val.length) { this.items = [...val] }
  }

  okHandler() {
    this.$emit("update:data", this.items)
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
