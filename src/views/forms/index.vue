<template>
  <el-card class="box-card">
    <div
      slot="header"
      class="clearfix"
    >
      <span>Available Forms</span>
    </div>

    <el-form
      :inline="true"
      style="float:right"
    >
      <el-form-item>
        <el-input
          v-model="search.text"
          placeholder="Find form"
        />
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="search.type"
          clearable
          placeholder="find form by entity"
        >
          <el-option
            v-for="item in entityTypeList"
            :key="item.key"
            :label="item.key"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          variant="outline-primary"
          title="create New Form"
          icon="el-icon-plus"
          @click="showNewForm = !showNewForm"
        />
        <el-dialog
          ref="newFormModel"
          :visible.sync="showNewForm"
          width="30%"
          center
          title="New Form"
          :before-close="onNewDialogClose"
        >
          <NewForm />
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="showNewForm = false">Cancel</el-button>
            <el-button
              type="primary"
              @click="showNewForm = false"
            >Confirm</el-button>
          </span>
        </el-dialog>
        <el-button
          :disabled="!hasSelectedRows"
          icon="el-icon-document-copy"
          title="Copy selected Form"
          variant="outline-primary"
        />
        <el-button
          :disabled="!hasSelectedRows"
          variant="outline-primary"
          icon="el-icon-view"
          title="open selected form"
          @click="onOpenClick"
        />
        <el-button
          variant="outline-danger"
          title="Delete"
          icon="el-icon-delete"
          :disabled="!hasSelectedRows"
        />
      </el-form-item>
    </el-form>

    <el-table
      ref="elTable"
      :data="formsTable"
      border
      stripe
      size="mini"
      highlight-current-row
      default-expand-all
      row-key="rowId"
      @current-change="onSelectedRow"
      @row-dblclick="onRowDoubleClick"
    >
      <el-table-column
        type="index"
        :index="indexMethod"
      />
      <!-- <el-table-column prop="name" label="Name" sortable width="180"></el-table-column> -->
      <el-table-column
        prop="displayName"
        label="Display name"
      />

      <el-table-column
        prop="dateModified"
        label="Date Modified"
        sortable
      >
        <template slot-scope="scope">
          <span
            v-if="scope.row.dateModified"
            style="margin-left: 10px"
          >{{ new Date(scope.row.dateModified).toDateString() }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="modifiedBy"
        column-key="date"
        label="modified By"
        sortable
      />
      <el-table-column
        prop="entityName"
        label="Entity"
        sortable
      />
    </el-table>
  </el-card>
</template>
<script lang="ts">
import { KeyValue } from "@/models/KeyValue"
import { constantRoutes } from "@/router"
import { AppCacheModule } from "@/store/modules/appCache"
import { FormsModule } from "@/store/modules/FormsStore"
// import { RSA_PKCS1_PADDING } from "constants"
import { Component, Vue, Watch } from "vue-property-decorator"
import NewForm from "./components/newForm.vue"
@Component({
  name: "forms",
  components: { NewForm }
})
export default class extends Vue {
  formInline = {
    user: "",
    region: ""
  }

  search:{text:string, type:any} ={
    text: "",
    type: ""
  }

  showNewForm = false
  tableData = [] as any[]
  selectedEntityType = null
  selectedRow ={} as any

  get formsData() {
    return FormsModule.Forms
  }

  // set formsData(val: any) {
  //   this.formsData = val;
  // }

  onSubmit() {
    console.log("submit!")
  }

  onOpenClick() {
    if (this.selectedRow && this.selectedRow.itemId) {
      this.$router.push("designer/" + this.selectedRow.itemId)
    }
  }

  onRowDoubleClick(row:any) {
    if (row.itemId) {
      this.$router.push("designer/" + row.itemId)
    }
  }

  indexMethod(index:number) {
    return index
  }

  get hasSelectedRows() {
    return this.selectedRow != null
  }

  onSelectedRow(val:any) {
    this.selectedRow = val
  }

  onNewDialogClose(done:any) {
    this.$confirm("Are you sure to close this dialog?")
      .then((_) => {
        console.log(_)
        done()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  formsTable = [] as any;
  @Watch("search", { deep: true })
  onSearchChanged(value:{text:string, type:string}) {
    // console.log('watch search triggered' + value)
    // this.formsTable = this.formsData;
    this.formsTable.length = 0;
    this.formsTable.push.apply(this.formsTable, this.formsData)
    if (value === undefined) { return }
    let filteredTable = [] as any;
    debugger;
    const table:any = this.$refs.elTable
    filteredTable  = table.data.filter((data: { displayName: string, entityName: string }) => !value ||
        data.displayName.toLowerCase().includes(value.text.toLowerCase()))
    debugger;
    // const rs = this.tableGropuedData.filter((p) => {
    //   return p.children.filter((c) => {
    //     return c.entityName === value.type ||
    //      c.displayName.toLowerCase().includes(value.text.toLowerCase())
    //   })
    // })

    // return rs
    this.formsTable.length = 0;
    debugger;
    this.formsTable.push.apply(this.formsTable, filteredTable)
  }

  onEntityTypeChanged(value: string) {
    console.log("selected value is " + value)
    this.search.type = value
    this.tableGropuedData.filter((x) => {
      x.children.filter((c:any) => {
        const val = this.search.type as string

        return c.entityName.toLowerCase() === val.toLowerCase()
      })
    })
  }

  getEntityTypeList() {
    const rs: any[] = []
    this.formsData.filter((thing, i, arr) =>
      arr.findIndex(t => t.entityName === thing.entityName) === i
    ).forEach((x) => {
      rs.push({ key: x.entityName, value: x.entityName })
    })

    return rs
  }

  get tableGropuedData() {
    let index = 1
    this.formsData.forEach((row) => {
      row.rowId = index
      index = index + 1
    })
    const outofbox = this.formsData.filter((x) => {
      return x.outOfTheBox === true
    })

    const nonoutofbox = this.formsData.filter((x) => {
      return x.outOfTheBox === false
    })

    this.tableData.push({
      displayName: "Added Forms",
      children: nonoutofbox,
      itemType: ""
    })
    this.tableData.push({
      displayName: "Out-of-the-box Forms",
      children: outofbox,
      itemType: ""
    })

    return this.tableData
  }

entityTypeList:KeyValue[] =[]
mounted() {
  
  this.entityTypeList = this.getEntityTypeList()
}
}
</script>
