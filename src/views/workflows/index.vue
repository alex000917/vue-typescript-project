<template>
  <el-container direction="vertical">
    <el-header style="padding: 30px 0 0 20px">
      Availble Worflows
      Note: local examples  Goal, agile project, idea
    </el-header>
    <el-main>
      <el-container
        class="table-container"
        direction="vertical"
      >
        <el-row :gutter="5">
          <el-col :span="7">
            <el-input
              v-model="search.text"
              clearable
              placeholder="Find Worlflows"
            />
          </el-col>
          <el-col :span="7">
            <el-select
              v-model="search.type"
              clearable
              placeholder="find Worlflow by entity"
              style="width: 100%"
            >
              <el-option
                v-for="item in entityTypeList"
                :key="item.key"
                :label="item.key"
                :value="item.key"
              />
            </el-select>
          </el-col>
          <el-col
            :offset="4"
            :span="6"
          >
            <el-row
              type="flex"
              justify="space-around"
              align="middle"
            >
              <el-button
                variant="outline-primary"
                title="create New Form"
                icon="el-icon-plus"
                @click="onNewActionClick()"
              >New </el-button>
              <el-button
                :disabled="!selectedWorkFlow"
                icon="el-icon-document-copy"
                title="Copy selected Workflow"
                variant="outline-primary"
                @click="onCopyActionClick()"
              >Copy</el-button>
              <el-button
                :disabled="!selectedWorkFlow"
                variant="outline-primary"
                icon="el-icon-view"
                title="open selected Workflow"
                @click="onOpenActionClick()"
              >Open</el-button>
              <el-button
                variant="outline-danger"
                title="Delete"
                icon="el-icon-delete"
                :disabled="!selectedWorkFlow"
                @click="onDeleteActionClick()"
              >Delete</el-button>
            </el-row>
          </el-col>
        </el-row>
        <el-row style="margin-top: 10px">
          <el-col>
            <el-table
              :data="listData"
              style="width: 100%"
              row-key="displayName"
              default-expand-all
              border
              stripe
              highlight-current-row
              @row-click="onRowClick"
              @row-dblclick="onRowDblclick"
            >
              <el-table-column
                type="index"
                :index="indexMethod"
              />
              <el-table-column
                prop="displayName"
                label="Display name"
              >
                <template slot-scope="scope">
                  <span v-if="scope.row.entityName">
                    <el-image
                      src="/assets/img/workflow-document-32x32.png"
                      style="
                        width: 16px;
                        height: 16px;
                        transform: translate(0px, 4px);
                      "
                      fit="fill"
                    />
                    {{ scope.row.displayName }}
                  </span>
                  <span v-else>{{ scope.row.displayName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="modifiedBy"
                column-key="date"
                label="Modified By"
                sortable
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
                  >{{ scope.row.dateModified| toLocalDateString }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="entityName"
                label="Entity"
                sortable
              />
            </el-table>
          </el-col>
        </el-row>
      </el-container>
    </el-main>
    <action-modal
      :visible.sync="modal.showActionModal"
      :is-new-action="modal.isNewAction"
      :selected-row="selectedWorkFlow"
    />
  </el-container>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import { WorkflowModule } from "@/store/modules/WorkflowMod"
import ActionModal from "./components/actionModal.vue"
import _ from "lodash"
import { Workflow } from "@/models/Workflows/workflow"
import { ItemInstance } from "@/models/ItemInstance"

@Component({
  name: "workFlows",
  components: { ActionModal }
})
export default class extends Vue {
  modal = {
    isNewAction: true,
    showActionModal: false
  };

  addedWorkFlows: ItemInstance[] = [];
  outOfTheBoxWorkFlows: ItemInstance[] = [];
  selectedWorkFlow: ItemInstance | null = null;

  get workFlows() {
    console.log(WorkflowModule.Workflows);
    return WorkflowModule.Workflows
  }

  get entityTypeList() {
    return WorkflowModule.workflowEntityNameList
  }

  search: { text: string, type: any } = {
    text: "",
    type: ""
  };

  get listData() {
    let tempWorkFlows = this.workFlows
    this.addedWorkFlows = []
    this.outOfTheBoxWorkFlows = []
    if (this.search.text || this.search.type) {
      tempWorkFlows = this.workFlows.filter((el) => {
        const lowerCaseSearchText = this.search.text.toLowerCase()
        const lowerCaseSearchType = this.search.type.toLowerCase()

        if (this.search.text && this.search.type) {
          return (
            (el.displayName as string).toLowerCase().includes(lowerCaseSearchText) &&
            (el.entityName as string) === this.search.type
          )
        } else if (this.search.type) {
          return (el.entityName as string) === this.search.type
        } else if (this.search.text) {
          return (el.displayName as string).toLowerCase().includes(lowerCaseSearchText)
        }
      })
    }

    tempWorkFlows.forEach((element) => {
      if (element.outOfTheBox === false) {
        this.addedWorkFlows = [...this.addedWorkFlows, element]
      } else if (element.outOfTheBox === true) {
        this.outOfTheBoxWorkFlows = [...this.outOfTheBoxWorkFlows, element]
      }
    })

    return [
      { displayName: "Added workFlows", children: this.addedWorkFlows },
      {
        displayName: "Out-of-the-box-Workflows",
        children: this.outOfTheBoxWorkFlows
      }
    ]
  }

  onRowClick(row: ItemInstance) {
    if (row.itemId) {
      this.selectedWorkFlow = row
    } else this.selectedWorkFlow = null
  }

  onRowDblclick(row: ItemInstance) {
    if (row.itemId) {
      this.selectedWorkFlow = row
      this.$router.push("edit/" + this.selectedWorkFlow.itemId)
    } else {
      this.selectedWorkFlow = null
    }
  }

  onNewActionClick() {
    this.modal.isNewAction = true
    this.modal.showActionModal = !this.modal.showActionModal
  }

  onCopyActionClick() {
    this.modal.isNewAction = false
    this.modal.showActionModal = !this.modal.showActionModal
  }

  onOpenActionClick() {
    if (this.selectedWorkFlow) {
      // console.log(this.hasselectedrow)
      this.$router.push("edit/" + this.selectedWorkFlow.itemId)
    }
  }

  onDeleteActionClick() {
    this.$confirm(
      "Are you sure you want to permanently delete the workflow?",
      "Delete Workflow",
      {
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        type: "warning"
      }
    )
      .then(() => {
        const newWorkflows = _.filter(this.workFlows, (workflow: ItemInstance) => {
          return workflow.itemId !== this.selectedWorkFlow?.itemId
        })
        this.$store.commit("SET_DIRTYITEMS", {
          data: this.selectedWorkFlow,
          action: "add"
        })
        this.$store.commit("SET_WORKFLOWs", newWorkflows)
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

  indexMethod(index: number) {
    return index + 1
  }

  getFormatedDate(milliseconds: string): string {
    const dateObj = new Date(milliseconds)
    const month = ("0" + (dateObj.getMonth() + 1)).slice(-2) // months from 1-12
    const day = ("0" + (dateObj.getDate() + 1)).slice(-2)
    const year = dateObj.getFullYear()

    return day + "/" + month + "/" + year
  }
}
</script>
<style lang="scss" scoped>
.el-container.table-container {
  padding: 0 10px;
  margin: 0;
}
::v-deep .el-table {
  overflow-y: auto;
  th.is-leaf div {
    text-align: center;
  }
}
::v-deep .el-message-box__btns {
  direction: rtl;
  button:nth-child(2) {
    margin-left: 0;
  }

  button:nth-child(1) {
    margin-left: 10px;
  }
}
</style>
