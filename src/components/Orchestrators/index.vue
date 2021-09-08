<template>
  <div>
    <el-row>
      <el-col type="flex" :span="10">
        <el-input class="searchBox" placeholder="Find Orchestrator" />
      </el-col>
      <el-col :span="3" :offset="11">
        <el-button-group class="action-items" style="float: right">
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
          :data="filteredOrchestratorList"
          border
          fit
          stripe
          row-key="displayName"
          highlight-current-row
          class="table-container tblOrchestrator"
          default-expand-all
          max-height="80%"
          @row-click="onRowClick"
          @row-dblclick="onRowDoubleClick"
        >
          <el-table-column
            v-for="col in fields"
            :key="col.field"
            :label="col.label"
            :prop="col.field"
            :sortable="col.sortable"
            :min-width="col.width"
          />
        </el-table>
      </el-col>
    </el-row>
<!-- align="center" -->
    <!-- <add-orchestrators
      v-if="editRecord"
      :key="editRecord"
      ref="adddialog"
      :title="'Add Orchestrator'"
      :items="orchestratorList"
      :is-open.sync="showAddform"
      :record="editRecord"
      @onOk="onAddOkClick"
      @onCancel="onAddCancelClick"
    /> -->
    <left-side-nav v-if="editRecord" :is-open.sync="showEditform" :items="orchestratorList" :record="editRecord"> </left-side-nav>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import MiniTable from "@/views/workflows/components/miniTable.vue";
import { Orchestrator } from "@/models/orchestrator/Orchestrator";
import { debug } from "console";
import { AppCacheModule } from "@/store/modules/appCache";
import { AppPreferencesModule } from "@/store/modules/AppPreferencesMod";
import AddOrchestrators from "./AddOrchestrators.vue";
import LeftSideNav from "./OrchestratorSettings/LeftSideNav.vue";

@Component({
  name: "",
  components: { MiniTable, AddOrchestrators, LeftSideNav },
})
export default class extends Vue {
  private listLoading = false;
  private list: Orchestrator[] = [];

  private get orchestratorList() {
    
    if (this.list) {
      var obj = new Orchestrator();
      obj.displayName = "Orchestrator";
      obj.systemName = "cse_Orchestrator";
      this.list.push(obj);
    }

    return this.list;
  }

  private searchBy = "";
  showAddform = false;
  showEditform = false;
  editRecord: Orchestrator | null = null;

  get filteredOrchestratorList() {
    if (this.searchBy) {
      return this.orchestratorList.filter((x) =>
        x.displayName.toLowerCase().includes(this.searchBy.toLowerCase())
      );
    } else {
      return this.orchestratorList;
    }
  }

  onAddClick() {
    this.editRecord = null;
    this.editRecord = new Orchestrator();
    this.showAddform = true;
  }

  onEditClick() {
    console.log(this.selectedRow);
    this.editRecord = this.selectedRow;
     this.showEditform = true;
  }

  onDeleteClick() {
    this.$confirm(
      "This will delete the [" + this.selectedRow.displayName + "]. Continue?",
      "Warning",
      {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      }
    )
      .then(() => {
        this.deleteStatus(this.selectedRow);
        this.$message({
          type: "success",
          message: "Deleted [ " + this.selectedRow.displayName + " ].",
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "Delete canceled",
        });
      });
  }

  deleteStatus(value: any): boolean {
    return false;
  }

  selectedRow: any = null;
  onRowClick(value: any, node: any) {
    if (this.selectedRow === value) {
      this.selectedRow = null;
    } else {
      this.selectedRow = value;
      this.$emit("onRowClick", this.selectedRow);
    }
  }

  onRowDoubleClick(value: any, node: any) {
    this.selectedRow = value;
    this.onEditClick();
  }

  addOrchestrator(value: any) {
    this.orchestratorList.push(value);
  }

  updateOrchestrator(value: Orchestrator) {
    const index = this.orchestratorList.findIndex(
      (x) => x.systemName === value.systemName
    );
    if (index > -1) {
      this.$set(this.orchestratorList, index, value);
    }
  }

  onAddOkClick(value: Orchestrator) {
    if (this.editRecord?.displayName) {
      this.updateOrchestrator(value);
    } else {
      this.addOrchestrator(value);
    }
    this.showAddform = false;
    this.editRecord = null;
  }

  onAddCancelClick(value: any) {
    this.showAddform = false;
  }

  mounted() {
    console.log("Orchestrator list mounted.");
  }

  destroyed() {
    console.log("distroyed.");
  }

  private fields = [
    {
      field: "displayName",
      label: "Display Name",
      sortable: true,
    },
  ];
}
</script>

<style lang="scss" scoped>
.searchBox {
  margin-bottom: 10px;
}
.tblOrchestrator {
  height: 200px;
}

</style>
