/* eslint-disable no-undef */
<template>
  <div size="mini">
    <el-row>
      <el-col
        v-show="showSearch"
        :span="12"
      >
        <el-input
          v-model="search.text"
          size="mini"
          placeholder="Search item"
          style="width: 200px"
          class="filter-item"
          @keyup.enter.native="searchData"
        />

        <el-select
          v-model="search.type"
          size="mini"
          placeholder="Filter by Type"
          clearable
          class="filter-item"
          style="width: 130px"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.key"
            :label="item.key"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :span="12">
        <slot name="commands" />
      </el-col>
    </el-row>

    <!-- :key="tableKey" -->
    <el-table
      :data="searchData()"
      border
      stripe
      size="mini"
      :fit="isFit"
      :max-height="maxHeight"
      highlight-current-row
      @row-click="onRowClick"
    >
      <el-table-column
        v-for="col in columns"
        :key="col.field"
        :label="col.label"
        :prop="col.field"
        :min-width="col.width"
        resizable
        show-overflow-tooltip
      >
        <template
          v-if="col.label === 'Name'"
          v-slot="item"
        >
          <div style="display: flex; align-items: center">
            <div style="margin-top: 5px; margin-right: 4px">
              <el-image
                v-if="iconUrl(item.row.dataType)"
                style="width: 16px; height: 16px"
                :src="iconUrl(item.row.dataType)"
              />
            </div>
            <div>
              {{ item.row.displayName }}
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { DataTypeFactory } from "@/models/Utils/DataTypeFactory"
import { ApplicationPreference } from "@/models/ApplicationPreference"

@Component({
  name: "miniTable",
  components: {}
})
export default class extends Vue {
  @Prop({ required: true }) private items!: any[];
  @Prop({ required: false }) private typeOptions!: {
    key: string
    value: string
  }[];

  @Prop({ required: false, default: true }) isFit!:boolean
  @Prop({ required: true }) private columns!: {
    label: string
    field: string
    width: string
  }[];

  @Prop({ default: true, required: false }) private showSearch!: boolean;
  @Prop({ default: "dataType", required: false }) private searchTypeKey!: string;
  @Prop({ default: "displayName", required: false })
  private searchOnField!: string;

  @Prop({ default: false, required: false }) private dragable!: boolean;
  @Prop({ required: true }) private selectedRow!: ApplicationPreference;
  @Prop({ required: true }) private selectedRowIndex!: number;
  @Prop({ required: false, default: "300" }) private maxHeight!: string;
  private search = {
    text: "",
    type: ""
  };

  @Watch("search", { deep: true })
  private searchData() {
    if (this.search.text === "" && this.search.type === "") {
      return this.items
    }

    console.log("mini table searching on " + JSON.stringify(this.search))
    const query = this.search
    let rs = this.items
    if (query.text.length > 0) {
      rs = rs.filter(
        (data) =>
          !this.search ||
          data[this.searchOnField]
            .toLowerCase()
            .includes(query.text.toLowerCase())
      )
    }
    if (query.type.length > 0) {
      rs =
        rs.filter(
          (item) => !this.search || item[this.searchTypeKey] === query.type
        )
        // || item[this.searchTypeKey] == query.type
    }
    return rs
  }

  private iconUrl(key: string) {
    const dataTypeicon = DataTypeFactory.getDataTypeIcon(key)
    return dataTypeicon
  }

  public onRowClick(row: any) {
    this.items.filter((item, index) => {
      if (item.displayName === row.displayName) {
        this.$emit("update:selectedRow", item)
        this.$emit("update:selectedRowIndex", index)
        this.$emit("onRowSelected", item)

        return true
      }
    })
  }
}
</script>
