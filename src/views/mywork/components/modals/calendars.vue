<template>
  <el-dialog
    title="Calendars"
    :visible.sync="showMe"
    width="50%"
    :before-close="handleClose"
    center
  >
    <mini-table
      ref="miniTable"
      :items="tableItems"
      :columns="tableData.fields"
      :table-height="350"
      @addHandler="onAddClick"
      @editHandler="onEditClick"
      @deleteHandler="onDeleteClick"
      @onRowClick="onRowSelected"
    >
      <el-input
        slot="filter"
        v-model="tableData.searchBy"
        placeholder="Find status"
      />
    </mini-table>
    <div
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="showMe = false">
        Close
      </el-button>
    </div>
    <new-calendar
      :visible.sync="innerModal.visible"
      :type="innerModal.type"
      :data="innerModal.data"
    />
  </el-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { MyWorkModule } from "@/store/modules/myWorkMod"
import { mixins } from "vue-class-component"
import ModalMixin from "./mixin"
import MiniTable from "@/views/entities/components/miniTable.vue"
import NewCalendar from "./newCalendar.vue"
import { MyWorkCalendar, MyWorkPolicy } from "@/models/myWork"
import { ArrayUtils } from "@/models/Utils/ArrayUtils"

@Component({
  name: "CalendarModal",
  components: { MiniTable, NewCalendar }
})
export default class extends mixins(ModalMixin) {
  private get tableItems() {
    return [
      {
        displayName: "Added Calendars",
        children: [...this.calendars.filter((x) => !x.outOfTheBox)]
      },
      {
        displayName: "Out-of-the-box Calendars",
        children: [...this.calendars.filter((x) => x.outOfTheBox)]
      }
    ]
  }

  private tableData = {
    fields: [
      {
        field: "displayName",
        label: "Name",
        sortable: true
      },
      {
        field: "description",
        label: "Description"
      }
    ],
    searchBy: ""
  };

  private innerModal: {
    visible: Boolean
    type: string
    data: MyWorkCalendar | null
  } = {
    visible: false,
    type: "ADD",
    data: null
  };

  get calendars() {
    return MyWorkModule.calendars
  }

  $refs!: {
    miniTable: MiniTable
  };

  @Watch("tableData.searchBy")
  private onSearchTableData(value: string) {
    if (value) {
      this.calendars!.filter((calendar: MyWorkCalendar) => {
        return calendar.displayName.toLowerCase().includes(value.toLowerCase())
      })
    }
  }

  @Watch("visible")
  private detectModalShow(value: Boolean) {
    this.$refs.miniTable.selectedRow = null
  }

  onAddClick() {
    this.innerModal = {
      visible: true,
      type: "ADD",
      data: null
    }
    this.$refs.miniTable.selectedRow = null
  }

  onEditClick(row: any) {
    this.innerModal.visible = true
    this.innerModal.type = "UPDATE"
  }

  onDeleteClick(row: any) {
    this.$confirm("Do you want to delete this Calendar?", "Warning", {
      confirmButtonText: "Delete",
      cancelButtonText: "Do not delete",
      type: "warning"
    })
      .then(() => {
        const index = ArrayUtils.getIndex(
          MyWorkModule.calendars as any[],
          this.innerModal.data
        )
        this.$store.commit("UPDATE_CALENDARS", {
          index,
          data: {} as MyWorkCalendar,
          type: "DELETE"
        })
        this.$message({
          type: "success",
          message: "Delete completed"
        })
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "Delete canceled"
        })
      })
  }

  onRowSelected(row: MyWorkCalendar) {
    this.innerModal.data = row
  }

  mounted() {
    this.innerModal.data = null
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer {
  padding-right: 5px;
  text-align: right;
}
</style>
