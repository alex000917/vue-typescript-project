<template>
  <el-dialog
    title="New Role Group"
    :visible.sync="showModal"
    width="25%"
    destroy-on-close
    :close-on-click-modal="false"
    append-to-body
    center
  >
    <p style="margin: 0 0 10px 0">
      {{
        lpmInstance.getLocalizedString(
          languagesPresentationModel.SELECT_ROLE_TO_AUTHORIZE
        )
      }}
    </p>
    <el-row type="flex">
      <el-button
        type="text"
        @click="expandTree()"
      >
        {{
          lpmInstance.getLocalizedString(languagesPresentationModel.EXPAND_ALL)
        }}
      </el-button>
      <el-button
        type="text"
        @click="collapseTree()"
      >
        {{
          lpmInstance.getLocalizedString(languagesPresentationModel.COLLAPSE)
        }}
      </el-button>
      <el-input
        style="margin-left: 10px"
        :placeholder="
          lpmInstance.getLocalizedString(languagesPresentationModel.FIND)
        "
      />
    </el-row>
    <el-row>
      <div class="table-container">
        <el-tree
          :data="currentAuthTree.root.children"
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
      <div style="color: #ababab">
        {{
          lpmInstance.getLocalizedString(
            languagesPresentationModel.SENIOR_ROLES_ARE_AUTHORIZED
          )
        }}
      </div>

      <div
        v-if="displayWarningMessage"
        style="color: red; padding-top: 5px;"
      >
        {{ lpmInstance.getLocalizedString(languagesPresentationModel.SELECT_AT_LEAST_ONE_NODE) }}
      </div>
    </el-row>
    <template #footer>
      <el-row class="dialog-footer">
        <el-button
          style="float: left"
          @click="addEveryoneRoleGroup()"
        >
          Add Everyone
        </el-button>
        <el-button
          style="margin-right: 20px"
          @click="saveRoleGroup()"
        >
          Ok
        </el-button>
        <el-button
          type="text"
          style="text-decoration: underline"
          @click="closeDialog()"
        >
          cancel
        </el-button>
      </el-row>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { AuthorizationTree } from "@/models/authorizations/AuthorizationTree"
import { AuthorizationNode } from "@/models/authorizations/AuthorizationNode"
import { AuthorizationTreeUtils } from "@/models/Utils/AuthorizationTreeUtils"
import { FolderAuthorizationNodeType } from "@/models/authorizations/FolderAuthorizationNodeType"
import { LanguagesPresentationModel } from "@/models/Utils/LanguagesPresentationModel"

@Component({
  name: "",
  components: {}
})
export default class extends Vue {
  @Prop({ required: true }) private visible!: boolean;
  @Prop({ required: false }) private resultHandler!: () => {};
  @Prop({ required: false, default: new AuthorizationTree() })
  private currentAuthTree!: AuthorizationTree;

  @Prop({ required: false, default: [] }) private allowedNodeTypes!: [];
  @Prop({ required: false, default: "" }) private state!: string;
  @Prop({ required: false, default: true })
  private shouldShowEveryoneButton!: boolean;

  @Prop({ required: false, default: [] }) private authNodesSystemNames!: any[];

  private allTreeNodesArray: any[] | null = [];
  private allTreeNodesHashMap: Map<string, any> = new Map<string, any>();
  private searchText = "";
  private languagesPresentationModel = LanguagesPresentationModel;
  private lpmInstance: LanguagesPresentationModel = this.languagesPresentationModel.getInstance();
  private displayWarningMessage: Boolean = false;

  get showModal(): boolean {
    return this.visible
  }

  set showModal(value: boolean) {
    this.$emit("update:visible", value)
  }

  get dialogTitle() {
    return this.state === "new"
      ? this.lpmInstance.getLocalizedString(
        this.languagesPresentationModel.NEW_ROLE_GROUP
      )
      : this.lpmInstance.getLocalizedString(
        this.languagesPresentationModel.EDIT_ROLE_GROUP
      )
  }

  get getMainButtonText() {
    return this.state === "new"
      ? this.lpmInstance.getLocalizedString(this.languagesPresentationModel.ADD)
      : this.lpmInstance.getLocalizedString(this.languagesPresentationModel.OK)
  }

  outerDialogOk() {
    this.showModal = false
    // TODO
    // data = this.$refs.filters.data
    // this.resultHandler(data)
  }

  outerDialogCancel() {
    this.showModal = false
  }

  expandTree() {
    console.log("expandTree", "---hello")
  }

  collapseTree() {
    console.log("collapseTree", "---hello")
  }

  private addEveryoneRoleGroup() {
    const nodeNames = null
    const name = this.lpmInstance.getLocalizedString(
      this.languagesPresentationModel.EVERYONE
    )
    this.$emit("onClickAddEveryOne", nodeNames, name)
    this.showModal = false
  }

  private addRoleGroup(nodesSystemNames: any[]) {
    const nodeNames = nodesSystemNames
    const name = this.generateRoleGroupName(nodesSystemNames)
    this.$emit("onClickAddEveryOne", nodeNames, name)
  }

  private generateRoleGroupName(nodesSystemNames: any[]): string {
    let result: string =
      this.lpmInstance.getLocalizedString(
        this.languagesPresentationModel.LOGGED_IN_USER
      ) +
      " " +
      this.lpmInstance.getLocalizedString(this.languagesPresentationModel.IS) +
      " "

    nodesSystemNames.forEach((nodeSystemName, i) => {
      result += (this.allTreeNodesHashMap.get(
        nodeSystemName
      ) as AuthorizationNode).displayName

      if (nodesSystemNames.length > 1 && i < nodesSystemNames.length - 1) {
        if (i === nodesSystemNames.length - 2) {
          result +=
            " " +
            this.lpmInstance.getLocalizedString(
              this.languagesPresentationModel.OR
            ) +
            " "
        } else {
          result += ", "
        }
      }
    })
    return result
  }

  private collectNodesSystemNames(): any[] {
    return this.allTreeNodesArray?.reduce(
      (authorizationNode: AuthorizationNode, result) => {
        if (
          authorizationNode.checkBoxSelected &&
          !authorizationNode.checkBoxDisabled
        ) {
          result = [...result, authorizationNode.systemName]
        }
        return result
      },
      []
    )
  }

  private saveRoleGroup(): void {
    const nodesSystemNames: any[] = this.collectNodesSystemNames()
    if (nodesSystemNames.length > 0) {
      this.addRoleGroup(nodesSystemNames)
    } else {
      this.displayWarningMessage = true
    }

    this.showModal = false
  }

  private closeDialog(): void {
    if (this.searchText && this.currentAuthTree) {
      this.searchText = ""
      this.searchTreeByText()
    }
    this.displayWarningMessage = false
    this.showModal = false
  }

  private searchTreeByText() {
    // TODO: Should send the treeData to param
    // AuthorizationTreeUtils.searchTreeByText(treeData, this.currentAuthTree.root, this.searchText)
  }

  private clearSearch() {
    if (this.searchText != null && this.currentAuthTree != null) {
      this.searchText = ""
      this.searchTreeByText()
    }
  }

  private disableUnAllowedNodeTypes(): void {
    if (this.allowedNodeTypes && this.allowedNodeTypes.length > 0) {
      this.allTreeNodesArray?.forEach(
        (authorizationNode: AuthorizationNode) => {
          if (
            !AuthorizationTreeUtils.nodeIsFromRelevantType(
              authorizationNode,
              this.allowedNodeTypes
            )
          ) {
            authorizationNode.checkBoxDisabled = true
            authorizationNode.checkBoxSelected = false
          }
        }
      )
    }
  }

  private updateNodeAncestors(node: AuthorizationNode, selected: boolean) {
    const ancestorNodes: any[] = AuthorizationTreeUtils.getNodeAncestors(node)
    ancestorNodes.forEach((authorizationNode: AuthorizationNode) => {
      if (!(authorizationNode.type instanceof FolderAuthorizationNodeType)) {
        authorizationNode.checkBoxDisabled = selected
        authorizationNode.checkBoxSelected = selected
      }
    })
  }

  private updateNodeChildren(node: AuthorizationNode): void {
    const childNodes = AuthorizationTreeUtils.getChildNodes(node)
    childNodes?.forEach((authorizationNode: AuthorizationNode) => {
      authorizationNode.checkBoxDisabled = node.checkBoxSelected
      authorizationNode.checkBoxSelected = node.checkBoxSelected
    })
  }

  private refreshTreeNodes() {
    this.allTreeNodesArray?.forEach((authorizationNode: AuthorizationNode) => {
      if (authorizationNode.checkBoxSelected) {
        if (authorizationNode.type instanceof FolderAuthorizationNodeType) {
          this.updateNodeChildren(authorizationNode)
        }
        this.updateNodeAncestors(authorizationNode, true)
      }
    })

    this.disableUnAllowedNodeTypes()
  }

  @Watch("visible", { deep: true, immediate: true })
  isOpenDialog(value: boolean) {
    this.updateNodeChildren(this.currentAuthTree.root)

    this.allTreeNodesArray = AuthorizationTreeUtils.getChildNodes(
      this.currentAuthTree.root
    )
    this.allTreeNodesArray?.forEach((authorizationNode: AuthorizationNode) => {
      this.allTreeNodesHashMap.set(
        authorizationNode.systemName,
        authorizationNode
      )
      if (
        this.state === "edit" &&
        this.authNodesSystemNames.includes(authorizationNode.systemName)
      ) {
        authorizationNode.checkBoxSelected = true
      }
    })

    this.refreshTreeNodes()
    this.clearSearch()
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0px;
  }
}
.table-container {
  width: 100%;
  height: 250px;
  border: 1px solid $borderGray;
  overflow: auto;
}
</style>
