<template>
  <el-container>
    <el-row type="flex" :gutter="10" class="entity-container" justify="center">
      <el-col :span="6" class="card-panel-left">
        <left-side-panel
          :header-data="leftPanelData.header"
          :tree-data="leftPanelData.tree"
        />
      </el-col>
      <el-col :span="18" class="card-panel-right">
        <div v-if="currentPageId === 'empty'" class="no-data">
          Select a MyWork Policy to view its settings
        </div>
        <new-policy v-if="currentPageId === 'newPolicy'" ref="newPolicy" />
        <edit-policy
          v-if="currentPageId === 'editPolicy'"
          ref="editPolicy"
        />
      </el-col>
    </el-row>
    <calendars-modal :visible.sync="modal.visible" />
  </el-container>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import LeftSidePanel from "./components/container/leftside.vue";
import { MyWorkModule } from "@/store/modules/myWorkMod";
import { Node } from "@/models/Node";
import { Loading } from "element-ui";
import CalendarsModal from "./components/modals/calendars.vue";
import NewPolicy from "./pages/newPolicy.vue";
import EditPolicy from "./pages/editPolicy.vue";
import { ElLoading, ElLoadingComponent } from "element-ui/types/loading";
import { debug } from "console";
import { EntitiesModule } from "@/store/modules/entitiesMod";

@Component({
  name: "mywork",
  components: {
    LeftSidePanel,
    CalendarsModal,
    NewPolicy,
    EditPolicy,
  },
})
export default class extends Vue {
  private leftPanelData = {
    header: {
      title: "MyWork",
      commands: [
        {
          title: "New Policy",
          handler: this.newPolicyHandler,
        },
        {
          title: "Calendars",
          handler: this.calendarsHandler,
        },
      ],
    },
    tree: {
      data: this.TreeData,
      handler: this.policyTreeNodeClick,
    },
  };

  $refs!: {
    newPolicy: NewPolicy;
  };

  get TreeData() {
    return MyWorkModule.treeItems;
  }

  private loadingConfig = {
    lock: true,
    text: "Loading Policy data...",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)",
  };

  private modal = {
    visible: false,
    type: "",
  };

  currentPageId = "empty";
  get CurrentPageView() {
    return MyWorkModule.currentPageId;
  }

  get currentPolicy() {
    return MyWorkModule.currentPolicy;
  }

  newPolicyHandler() {
    // this.$store.commit("SET_MYWORK_PAGE_ID", "newPolicy");
    this.LoadPage("newPolicy", null);
  }

  calendarsHandler() {
    this.modal.visible = true;
  }

  indicator = {} as ElLoadingComponent;
  async policyTreeNodeClick(data: Node) {
    // console.log(this.TreeData);
    await this.LoadPage("editPolicy", data.id);
  }

  async LoadPage(viewName: string, policyName: string | null) {
    try {
      // this.$store.commit("SET_MYWORK_PAGE_ID", "editPolicy")
      // await this.$store.dispatch("getCurrentPolicy", data.id)
      // await MyWorkModule.SelectCurrentPolicy(data.id)

      if (this.currentPageId !== undefined || this.currentPageId !== "empty") {
        // this.$confirm("unsaved changes might be lost. Continue ?", "Warning", {
        //   confirmButtonText: "OK",
        //   cancelButtonText: "Cancel",
        //   type: "warning",
        // })
        //   .then((_) => {
        this.$router.push({
          name: "mywork",
          query: { id: viewName, value: policyName },
        });
        // })
        // .catch((_) => {
        //   console.log("");
        // });
      } else {
        this.$router.push({
          name: "mywork",
          query: { id: viewName, value: policyName },
        });
      }
    } finally {
      this.indicator.close();
    }
  }

  @Watch("$route", { immediate: true })
  async onRoutechange(route: any) {
    const key = route.query.id;
    const value = route.query.value;

    // console.log("route change to " + key + " , " + value);
    switch (key) {
      case "editPolicy":
        await this.onSetRightSideView("editPolicy", value);
        break;
      case "newPolicy":
        await this.onSetRightSideView("newPolicy");
        break;
      default:
        await this.onSetRightSideView("empty");
        break;
    }
  }

  async onSetRightSideView(
    viewName: string,
    policyId: string | undefined = undefined
  ) {
    this.indicator = Loading.service(this.loadingConfig);
    try {
      MyWorkModule.ResetSelection();
      if (viewName && policyId) {
        this.currentPageId = "";
        this.currentPageId = viewName;
        this.$store.commit("SET_MYWORK_PAGE_ID", viewName);
        // console.log("policyId ====>  " +  policyId);
        await MyWorkModule.SelectCurrentPolicy(policyId);
      } else if (viewName === "newPolicy") {
        this.currentPageId = viewName;
        this.$store.commit("SET_MYWORK_PAGE_ID", viewName);
      } else {
        this.currentPageId = viewName;
      }
    } finally {
      this.indicator.close();
    }
  }
}
</script>

<style lang="scss" scoped>
.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: $textGray;
}

.el-container {
  margin: 12px 0 0 14px;
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    width: 100%;
  }
  @media (max-width: 648px) {
    min-width: 640px;
  }
  .card-panel-left {
    height: calc(100vh - 4.5em);
    border: 1px solid e2e3e6;
    box-shadow: 1px 1px 10px #525050;
    padding: 0 !important;
    min-width: 250px;
    margin-right: 8px;
    overflow: auto;
  }
  .card-panel-right {
    height: calc(100vh - 4.5em);
    border: 1px solid e2e3e6;
    box-shadow: 1px 1px 10px #525050;
    padding: 0 !important;
    margin-left: 8px;
  }
}
</style>
