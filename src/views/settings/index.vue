<template>
  <el-container
    class="elcontainer"
    size="mini"
  >
    <el-main
      class="elmain"
      style="padding:10px"
    >
      <div
        slot="header"
        class="clearfix"
      >
        <span>Settings </span>
      </div>

      <el-collapse
        v-model="activeTab"

        class="el-collapse"

        accordion
      >
        <el-collapse-item

          title="Application Preferences"
        >
          <Preferences />
        </el-collapse-item>
        <el-collapse-item
          title="Display languages"
        >
          <AppLanguages />
        </el-collapse-item>
        <el-collapse-item
          title="Orchestrators"
        >
         <Orchestrators />
          <!-- <el-row>
            <el-col>
              Orchestrators are the components responsible for running integration operations. After installing new orchestrators, add them to this list.
            </el-col>
          </el-row> -->
          <!-- <Orchestrators /> -->
        </el-collapse-item>
        <el-collapse-item
          title="Server Health"
        >
          <el-row>
            <el-col>
              Long running operations
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Preferences from "@/components/Preferences/Preferences.vue"
import AppLanguages from "./components/AppLanguages.vue"
import Orchestrators from "@/components/Orchestrators/index.vue"
import AppOrchestrators from "./components/AppOrchestrators.vue"

@Component({
  name: "settings",
  components: { AppLanguages, Preferences, Orchestrators, AppOrchestrators }
})
export default class extends Vue {
  prefTable: any;

  selectMode = "single";
activeTab:any=""
  langTable: any = {
    data: [],
    fields: [
      {
        key: "displayName",
        sortable: false
      }
    ]
  };

  private selected: any;
  private hasSelectedRows: boolean|undefined;
  private totalRows: any;
  private currentPage: number|undefined;

  onRowClick(row: any) {
    console.log(row)
  }

  onRowSelected(items: any) {
    this.selected = items
    if (this.selected.length > 0) this.hasSelectedRows = true
    else this.hasSelectedRows = false
  }

  onFiltered(filteredItems: string | any[]) {
    // Trigger pagination to update the number of buttons/pages due to filtering
    this.totalRows = filteredItems.length
    this.currentPage = 1
  }
}
</script>
