<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="showMe"
    destroy-on-close
    :before-close="handleClose"
    center
    v-loading="loading"
    element-loading-text="Loading Workflow..."
  >
    <el-container direct="vertical">
      <el-form
        ref="form"
        label-position="left"
        size="mini"
        :model="form1"
        label-width="160px"
        hide-required-asterisk
        style="width: 100%"
        :rules="formRules"
      >
        <el-row>
          <div class="form-item-title">English</div>
          <el-divider />
          <el-row>
            <el-col :span="20">
              <el-form-item
                prop="displayName"
                label="Display name"
                style="margin-left: 40px"
              >
                <el-input v-model="form1.displayName" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <div class="form-item-title">Hebrew</div>
          <el-divider />
          <el-row>
            <el-col :span="20">
              <el-form-item
                prop="hebrewName"
                label="Display name"
                style="margin-left: 40px"
              >
                <el-input v-model="form1.hebrewName" dir="rtl" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <div class="form-item-title">This workflow is based on</div>
          <el-divider />
          <el-row>
            <el-col :span="20">
              <el-form-item
                v-if="isNewAction"
                prop="entityId"
                label="Entity"
                style="margin-left: 40px"
              >
                <el-select
                  v-model="form1.entityId"
                  clearable
                  placeholder="find Worlflow by entity"
                  style="width: 100%"
                  filterable=""
                >
                  <el-option
                    v-for="item in entityList"
                    :key="item.key"
                    :label="item.key"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-row v-else type="flex" style="margin: 15px 0 15px 40px">
                <el-col class="form-item-title" style="width: 280px">
                  Entity
                </el-col>
                <el-col v-if="selectedEntity">{{
                  selectedEntity.displayName
                }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item
                v-if="isNewAction"
                prop="authorizationTreeId"
                label="Authorization Tree"
                style="margin-left: 40px"
              >
                <el-select
                  v-model="form1.authorizationTreeId"
                  clearable
                  placeholder="find Worlflow by authorization tree"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in authorizationList"
                    :key="item.key"
                    :label="item.key"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-row v-else type="flex" style="margin: 15px 0 15px 40px">
                <el-col class="form-item-title" style="width: 280px">
                  Authorization Tree
                </el-col>
                <el-col v-if="selectedAuthTree">{{
                  selectedAuthTree.displayName
                }}</el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <el-collapse v-model="collapseModal" accordion>
            <el-collapse-item title="Advance Setting" name="1">
              <el-row>
                <el-col :span="20">
                  <el-form-item
                    prop="systemName"
                    label="System name"
                    style="padding-left: 15px"
                  >
                    <el-input v-model="form1.systemName" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </el-row>
      </el-form>
    </el-container>
    <template #footer>
      <div v-show="!loading" class="dialog-footer">
        <el-button type="primary" @click="okHandler()"> Create </el-button>
        <el-button type="info" plain @click="cancelHandler()">
          Cancel
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import ModalMixin from "@/views/mywork/components/modals/mixin";
import { ElForm } from "node_modules/element-ui/types/form";
import { EntitiesModule } from "@/store/modules/entitiesMod";
import { KeyValue } from "@/models/KeyValue";

import { AuthorizationModule } from "@/store/modules/AuthorizationMod";
import { getWorkflow } from "@/api/workflowApi";
import { Workflow } from "@/models/Workflows/workflow";
import { LanguageTranslation } from "@/models/LanguageTranslation";
import { WorkflowModule } from "@/store/modules/WorkflowMod";
import { DataUtils } from "@/models/Utils/DataUtils";
import _ from "lodash";
import { ItemInstance } from "@/models/ItemInstance";
import { getAuthorizationTree } from "@/api/authorizationApi";
import { getEntityById } from "@/api/mainApi";
import { AuthorizationTree } from "@/models/authorizations/AuthorizationTree";
import { Entity } from "@/models/Entity";

export const displayNameRule = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error("Display Name required."));
  }
  if (!DataUtils.validateDisplayName(value)) {
    return callback(
      new Error(
        "DisplayName must have only English letters, numbers, and space."
      )
    );
  }
  setTimeout(() => {
    const workflowDisplayNames = _.map(WorkflowModule.Workflows, (workflow) => {
      return workflow.displayName?.toLowerCase();
    });
    if (workflowDisplayNames.includes(value.toLowerCase())) {
      callback(new Error("This name was already registered."));
    } else {
      callback();
    }
  }, 500);
};

export const systemNameRule = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error("Please input the fds."));
  }
  if (!DataUtils.validateDisplayName(value)) {
    return callback(
      new Error(
        "DisplayName must have only English letters, numbers, and space."
      )
    );
  }
  setTimeout(() => {
    const workflowDisplayNames = _.map(WorkflowModule.Workflows, (workflow) => {
      return workflow.entitySystemName?.toLowerCase();
    });
    if (workflowDisplayNames.includes(value.toLowerCase())) {
      callback(new Error("This name was already registered."));
    } else {
      callback();
    }
  }, 500);
};

@Component({
  name: "WorkflowActioModal",
  components: {},
})
export default class extends mixins(ModalMixin) {
  @Prop({ required: true, default: null })
  selectedRow!: ItemInstance | null;

  @Prop({ required: true, default: true }) isNewAction!: boolean;

  $refs!: {
    form: ElForm;
  };

  private form = {
    englishName: "",
    hebrewName: "",
    entity: "",
    authorizationTree: "",
    systemName: "",
  };

  private form1 = Object.assign(new Workflow(), { hebrewName: "" });

  private formRules = {
    displayName: [{ validator: displayNameRule, trigger: "blur" }],
    hebrewName: [
      {
        required: true,
        message: "Please input Hebrew name",
        trigger: "blur",
      },
    ],
    entityId: [
      {
        required: true,
        message: "Please select entity category",
        trigger: "change",
      },
    ],
    authorizationTreeId: [
      {
        required: true,
        message: "Please select entity category",
        trigger: "change",
      },
    ],
    systemName: [{ validator: systemNameRule, trigger: "blur" }],
  };

  private loading = false;
  collapseModal = "1";

  get dialogTitle() {
    return this.isNewAction ? "New Workflow" : "Copy Workflow";
  }

  get authorizationList() {
    const authorizations = AuthorizationModule.getAuthorizationsByEntityId(
      this.form1.entityId
    );
    if (authorizations.length) {
      this.form1.authorizationTreeId = authorizations[0]?.value;
    } else {
      this.form1.authorizationTreeId = null;
    }
    return authorizations;
  }

  @Watch("form1.displayName", { immediate: true })
  updateSystemName() {
    if (!this.form1?.displayName) {
      this.form.systemName = "";
      return;
    }

    this.form1.systemName =
      "cse_" +
      (
        this.form1.displayName.charAt(0).toLowerCase() +
        this.form1.displayName.slice(1)
      ).replace(/\s/g, "");
  }

  @Watch("visible", { immediate: true })
  async loadModal(value: boolean) {
    if (value) {
      this.form1 = Object.assign(new Workflow(), { hebrewName: "" });
      this.$refs.form?.resetFields();
      if (this.selectedRow?.itemId && !this.isNewAction) {
        this.loading = true;
        try {
          await this.loadWorkflow(this.selectedRow?.itemId as string);
        } finally {
          this.loading = false;
        }
      }
    }
  }

  private selectedWorkflow: Workflow | null = null;
  async loadWorkflow(workflowId: string) {
    if (workflowId) {
      const workflow = await getWorkflow(workflowId)      
        this.selectedWorkflow =Object.assign(new Workflow(), workflow)
debugger
        this.getAuthTree(this.selectedWorkflow?.authorizationTreeId as string);
        this.GetEntity(this.selectedWorkflow?.entityId as string);      
    }
  }
  selectedAuthTree: AuthorizationTree | null | any = null;
  async getAuthTree(treeid: string) {
    const auth = await getAuthorizationTree(treeid);
    this.selectedAuthTree = auth;
  }
  selectedEntity: Entity | null | any = null;
  async GetEntity(entityId: string) {
    const entity = await getEntityById(entityId);
    this.selectedEntity = entity;
  }
  okHandler() {
    this.$refs.form.validate((valid: boolean) => {
      if (valid) {
        this.form1.languageTranslations = [
          new LanguageTranslation("en", this.form1.displayName, ""),
          new LanguageTranslation("he", this.form1.hebrewName, ""),
        ];
        const { hebrewName, ...newWorkflow } = this.form1;
        const newWorkflowListItem = new ItemInstance();
        newWorkflowListItem.displayName = newWorkflow.displayName;
        newWorkflowListItem.itemId = newWorkflow.systemName;
        const selectedEntity = this.entityList.find(
          (entity) => entity.value === newWorkflow.entityId
        );
        newWorkflowListItem.entitySystemName = selectedEntity?.value;
        newWorkflowListItem.entityName = selectedEntity?.key as string | null;

        const newWorkflows = [...WorkflowModule.Workflows, newWorkflowListItem];
        this.$store.commit("SET_WORKFLOWs", newWorkflows);

        // TODO
        // newWorkflow & newWorkflowListItem should be saved by real post API
        this.$router.push("edit/" + newWorkflowListItem.itemId);
        this.showMe = false;
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }

  cancelHandler() {
    this.$refs.form?.resetFields();
    this.showMe = false;
  }

  entityList: KeyValue[] = [];
  mounted() {
    this.entityList = EntitiesModule.allEntities;
  }
}
</script>
<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 5px 0;
}
.el-form-item {
  margin-top: 15px;
  ::v-deep .el-form-item__label {
    font-weight: 600;
  }
}
.form-item-title {
  font-weight: 600;
}
::v-deep .el-collapse-item__content {
  padding-bottom: 0px;
  ::v-deep .el-form-item--mini.el-form-item {
    margin-bottom: 0px;
  }
}
</style>
