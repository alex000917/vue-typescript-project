<template>
  <el-dialog
    width="45%"
    title="Logged in User role Filter"
    :visible.sync="showModal"
    destroy-on-close
    :close-on-click-modal="false"
    append-to-body

    class="filter-container"
  >
    <div>Logged In User is assigned to one of the following roles:</div>
    <el-row style="margin-top: 20px">
      <div class="list-container">
        <el-button
          v-for="item in items"
          :key="item"
          class="list-item"
        >
          {{
            item
          }}
        </el-button>
      </div>
    </el-row>
    <div style="display: flex; flex-wrap: wrap; margin-top: 20px">
      <div style="padding-right: 10px">
        <el-autocomplete
          v-model="autoCompleteText"
          style="width: 250px;"
          :fetch-suggestions="querySearch"
          placeholder="Enter Logged in user role"
          value-key="displayName"
          clearable
          @select="handleSelect"
        />
      </div>
      <div>
        <el-button @click="browseVisible = true">
          Browse
        </el-button>
      </div>
    </div>
    <div
      slot="footer"
    >
      <el-button
        style="margin-right: 20px"
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
    <browse-item
      :dialog-visible.sync="browseVisible"
      :result.sync="items"
    />
  </el-dialog>
</template>
<script lang='ts'>
import { Component, Prop, Watch, Vue } from "vue-property-decorator"
import BrowseItem from "./browseItem.vue"
import { _getDialogRoles } from "./data"

@Component({
  name: "",
  components: { BrowseItem }
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) data!: [];

  private items: any = [];
  private browseVisible = false;
  private autoCompleteText = ""

  get showModal() {
    return this.dialogVisible
  }

  set showModal(val: boolean) {
    this.$emit("update:dialogVisible", val)
  }

  @Watch("data", { immediate: true, deep: true })
  private setItems(val: any) {
    this.items = [...val]
  }

  querySearch(queryString:string, cb:any) {
    const items = _getDialogRoles
    const results = queryString ? items.filter(this.createFilter(queryString)) : items
    cb(results)
  }

  createFilter(queryString:string) {
    return (item:any) => {
      return (item.displayName.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
    }
  }

  handleSelect(item:any) {
    const displayName = item.displayName
    if (this.items.indexOf(displayName) > -1) {
      this.items.splice(this.items.indexOf(displayName), 1)
    } else this.items.push(displayName)
    this.autoCompleteText = ""
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
  .list-container {
    width: 100%;
    min-height: 300px;
    border: 1px solid $borderGray;
    overflow: auto;
  }
  .list-item {
    text-align: left;
    width: 100%;
    margin: 0;
    border: none;
  }
}
</style>
