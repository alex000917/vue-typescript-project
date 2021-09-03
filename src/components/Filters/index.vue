<template>
  <div>
    <div class="outer-modal-container">
      <el-row
        type="flex"
        class="command-container"
      >
        <el-col class="command-button">
          <el-button
            type="text"
            icon="el-icon-user"
          >
            <span
              class="button-text"
              @click="addEveryOne()"
            >Add Everyone</span>
          </el-button>
        </el-col>
        <el-col class="command-button">
          <el-dropdown
            trigger="click"
            size="small"
            placement="bottom-start"
            @command="newFilterHandler"
          >
            <el-button
              type="text"
              icon="el-icon-brush"
            >
              <span class="button-text">New Filter</span>
            </el-button>
            <el-dropdown-menu
              slot="dropdown"
              style="margin-top: 0"
            >
              <el-dropdown-item command="state">
                State filter...
              </el-dropdown-item>
              <el-dropdown-item command="entityCategory">
                Entity category filter...
              </el-dropdown-item>
              <el-dropdown-item command="userRole">
                Logged in user role filter...
              </el-dropdown-item>
              <el-dropdown-item command="property">
                Property filter...
              </el-dropdown-item>
              <el-dropdown-item command="sql">
                SQL filter...
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col class="command-button">
          <el-button
            type="text"
            icon="el-icon-edit-outline"
          >
            <span class="button-text">Edit</span>
          </el-button>
        </el-col>
        <el-col class="command-button">
          <el-button
            type="text"
            icon="el-icon-delete"
            @click="deleteHandler"
          >
            <span class="button-text">Delete</span>
          </el-button>
        </el-col>
      </el-row>
      <div class="table-container">
        <el-tree
          :data="treeItems"
          accordion
          :props="defaultTreeProps"
          default-expand-all
          class="tree-container"
          @node-click="handleNodeClick"
        >
          <span
            slot-scope="{node, data}"
            class="custom-tree-node"
          >
            <div style="display: flex; align-items: center">
              <el-image
                style="width: 20px; height: 20px"
                :src="
                  data.key === `everyone`
                    ? `/assets/img/approved-by-32x32.png`
                    : `/assets/img/User-set-in-an-application-preference16x16.png`
                "
              />
              <span style="margin-left: 5px">
                {{ node.label }}
              </span>
            </div>
          </span>
        </el-tree>
      </div>
    </div>
    <state-filter
      :dialog-visible.sync="showFilterModal.state"
      :data.sync="filterData.state"
    />
    <entity-category-filter
      :dialog-visible.sync="showFilterModal.entityCategory"
      :data.sync="filterData.userRole"
    />
    <user-role-filter
      :dialog-visible.sync="showFilterModal.userRole"
      :data.sync="filterData.userRole"
    />
    <property-filter
      :dialog-visible.sync="showFilterModal.property"
      :data.sync="filterData.property"
    />
    <sql-filter
      :dialog-visible.sync="showFilterModal.sql"
      :data.sync="filterData.sql"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import StateFilter from "./components/stateFilter.vue"
import EntityCategoryFilter from "./components/entityCategoryFilter.vue"
import UserRoleFilter from "./components/userRoleFilter.vue"
import PropertyFilter from "./components/propertyFilter.vue"
import SqlFilter from "./components/sqlFilter.vue"
import { filter } from "jszip"

interface ITreeRole {
  label: String
  key: String
  children: ITreeRole[]
}

const defaultFilterData = {
  state: [],
  userRole: [],
  sql: {
    displayName: null,
    query: null
  },
  property: ""
}

@Component({
  name: "",
  components: {
    StateFilter,
    EntityCategoryFilter,
    UserRoleFilter,
    PropertyFilter,
    SqlFilter
  }
})
export default class extends Vue {
  @Prop({ required: true }) private data!: any;

  private treeItems: ITreeRole[] = [
    {
      label: "EveryOne",
      key: "everyone",
      children: []
    }
  ];

  private defaultTreeProps = {
    children: "children",
    label: "label"
  };

  private showFilterModal = {
    state: false,
    entityCategory: false,
    userRole: false,
    property: false,
    sql: false
  };

  private filterData = defaultFilterData;
  private selectedFilterKey = "";

  @Watch("getFilterData", { deep: true, immediate: true })
  private changeTreeData(data: any, oldData: any) {
    const stateLabel = "State is "
    this.updateTreeChildren("state", data, stateLabel)

    const userRoleLabel = "Logged in user is assigned to role "
    this.updateTreeChildren("userRole", data, userRoleLabel)

    const newData = Object.assign({}, data)
    newData.sql = data.sql.displayName ? [data.sql.displayName] : []
    this.updateTreeChildren("sql", newData, "")

    if ((oldData && data) && oldData.property !== data.property) {
      this.treeItems[0].children.push({
        label: data.property,
        key: "property",
        children: []
      })
    }
  }

  get getFilterData() {
    return Object.assign({}, this.filterData)
  }

  handleNodeClick(data: any) {
    this.selectedFilterKey = data.key
  }

  updateTreeChildren(key: string, childNodeData: any, initialLabel: string) {
    let label = initialLabel
    if (childNodeData[key].length) {
      label += childNodeData[key].join(" or ")
    } else {
      this.treeItems[0].children = this.treeItems[0].children.filter(
        (item: ITreeRole) => item.key !== key
      )
    }
    let flag = false
    this.treeItems[0].children.forEach((item: ITreeRole) => {
      if (item.key === key) {
        item.label = label
        flag = true
      }
    })
    if (!flag && childNodeData[key].length) {
      this.treeItems[0].children.push({
        label,
        key,
        children: []
      })
    }
  }

  // commands action
  addEveryOne() {
    if (this.treeItems.length > 0 && this.treeItems[0].key === "everyone") {
      this.$message({
        type: "error",
        message: "There was already one everyone item.",
        duration: 2000
      })
      return
    }
    this.treeItems.push({
      label: "Everyone",
      key: "everyone",
      children: []
    })
  }

  newFilterHandler(command: string) {
    (this.showFilterModal as any)[command] = true
  }

  deleteHandler() {
    if (this.selectedFilterKey === "everyone") {
      this.filterData = defaultFilterData
    } else {
      (this.filterData as any)[this.selectedFilterKey] =
        (defaultFilterData as any)[this.selectedFilterKey]
    }
  }

  created() {
    this.filterData = defaultFilterData
  }
}
</script>

<style lang="scss" scoped>
.outer-modal-container {
  .command-container {
    margin: 20px 0;
    .command-button {
      text-align: center;
      .button-text {
        text-decoration: underline;
      }
    }
  }
  .table-container {
    width: 100%;
    height: 250px;
    border: 1px solid $borderGray;
    overflow: auto;
  }
}
</style>
