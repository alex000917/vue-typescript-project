<template>
  <el-dialog
    title="Add Entity to My Work Policy"
    :visible.sync="showMe"
    :before-close="handleClose"
    width="65%"
    center
  >
    <el-steps :active="currentStep" finish-status="success" :space="300">
      <el-step title="Entity and Forms" />
      <el-step title="Reporting Mode" />
    </el-steps>
    <el-container>
      <el-form
        v-if="currentStep === 1"
        ref="newEntityForm"
        :model="form"
        :rules="firstStepRoles"
        label-position="left"
        :inline="true"
        :show-message="false"
      >
        <el-form-item label="Entity:" prop="entity">
          <el-select
            v-model="form.entity"
            placeholder="Select"
            size="mini"
            value-key="id"
          >
            <el-option
              v-for="item in entities"
              :key="item.id"
              :label="item.name"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Authorization Tree:"
          style="margin-top: 20px"
          prop="authTree"
        >
          <el-select v-model="form.authTree" size="mini" placeholder="Select">
            <el-option
              v-for="item in authorizationTree.children"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Task form:" style="margin-top: 20px" prop="task">
          <el-select v-model="form.task" size="mini" placeholder="Select">
            <el-option
              v-for="item in taskForms"
              :key="item.itemId"
              :label="item.displayName"
              :value="item.itemId"
            />
          </el-select>
          <el-row class="require-content">
            Displayed after clicking Task Details in My Work
          </el-row>
        </el-form-item>
        <el-form-item
          label="Task time report form:"
          style="margin-top: 20px"
          prop="taskTimeReport"
        >
          <el-select
            v-model="form.taskTimeReport"
            size="mini"
            placeholder="Select"
          >
            <el-option
              v-for="item in taskTimeRoportForms"
              :key="item.itemId"
              :label="item.displayName"
              :value="item.itemId"
            />
          </el-select>
          <el-row class="require-content">
            Displayed after double-clicking a task day cell in My Work
          </el-row>
        </el-form-item>
      </el-form>
      <reporting-mode
        v-if="currentStep === 2"
        ref="report"
        :entity="currentEntity"
      />
    </el-container>
    <template #footer>
      <el-divider />
      <div class="dialog-footer">
        <el-button
          v-if="currentStep === 2"
          type="primary"
          @click="previousStep()"
        >
          Back
        </el-button>
        <el-button type="primary" @click="nextStep()">
          {{ currentStep === 1 ? "Next >" : "Finish" }}
        </el-button>
        <el-button type="info" plain @click="showMe = false">
          Cancel
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import ModalMixin from "../components/modals/mixin";
import { mixins } from "vue-class-component";
import ReportingMode from "../components/Settings/reporting.vue";
import { ElForm } from "element-ui/types/form";
import { EntitiesModule } from "@/store/modules/entitiesMod";
import { AuthorizationModule } from "@/store/modules/AuthorizationMod";
import { FormsModule } from "@/store/modules/FormsStore";
import { MyWorkModule } from "@/store/modules/myWorkMod";
import { Form } from "element-ui";
import { MyWorkPolicy, EntityTreeNode } from "@/models/myWork";
import { BaseContent } from "@/models/BaseContent";
import { Node } from "@/models/Node";

@Component({
  name: "",
  components: {
    ReportingMode,
  },
})
export default class ComponentName extends mixins(ModalMixin) {
  private currentStep = 1;
  private form = {
    entity: {} as any,
    authTree: "",
    task: "",
    taskTimeReport: "",
  };

  $refs!: {
    report: ReportingMode;
    newEntityForm: ElForm;
  };

  // TODO:: getting real entity object by api call to server.
  get entities() {
    return EntitiesModule.EntitiesTree.children.reduce((acc: any, entity) => {
      return [
        ...acc,
        ...entity.children.filter((e) => {
          return (
            e.attributes.findIndex(
              (attr) =>
                attr.key === "TIME_AND_PROGRESS_TRACKING_ATTRIBUTE" &&
                attr.value === true
            ) > 0
          );
        }),
      ];
    }, []);
  }

  get authorizationTree() {
    const result = AuthorizationModule.AuthTree?.children.find(
      (item) => item.id === this.form.entity.id
    );
    if (result) {
      this.form.authTree = result.children[0].id as string;
      return result;
    }
    return [];
  }

  get taskForms() {
    const result = FormsModule.Forms.filter(
      (form) => form.entityName === this.form.entity.name
    );
    if (result.length) {
      this.form.task = result[0].itemId;
      return result;
    }
    return [];
  }

  get taskTimeRoportForms() {
    return FormsModule.Forms.filter(
      (form) => form.entitySystemName === "MyWorkTimeReport"
    );
  }

  get currentEntity() {
    return this.form.entity;
  }

  firstStepRoles = {
    entity: [{ required: true, trigger: "change" }],
    authTree: [{ required: true, trigger: "change" }],
    task: [{ required: true, trigger: "change" }],
    taskTimeReport: [{ required: true, trigger: "change" }],
  };

  async nextStep() {
    if (this.currentStep === 1) {
      this.$refs.newEntityForm.validate((valid: boolean) => {
        if (valid) {
          this.currentStep++;
        } else {
          console.log("form validation was failed");
        }
      });
    } else {
      // const currentPolicy = Object.assign({}, MyWorkModule.currentPolicy)
      const newEntity = new EntityTreeNode();
      newEntity.displayName = this.form.entity.name;
      newEntity.taskFormSystemName = this.form.task;
      newEntity.taskTimeReportFormSystemName = this.form.taskTimeReport;
      newEntity.entityId = this.form.entity.id;
      newEntity.authorizationTreeId = this.form.authTree;
      newEntity.propertyHoldingPlannedWorkSystemName =
        this.$refs.report.propertyHoldingPlannedWorkComboBox.systemName;
      newEntity.trackingType = this.$refs.report.trackingType;

      newEntity.children = [
        {
          myspType: "FolderTreeNode",
          description: null,
          displayName: null,
          displayNameLanguageKey: null,
          descriptionLanguageKey: null,
          languageTranslations: [],
          notes: null,
          systemName: null,
          children: [],
          taskGroups: true,
        },
        {
          myspType: "FolderTreeNode",
          description: null,
          displayName: null,
          displayNameLanguageKey: null,
          descriptionLanguageKey: null,
          languageTranslations: [],
          notes: null,
          systemName: null,
          children: [],
          taskGroups: false,
        },
      ];

      // //* ** TODO :: assign selectedEntity to currentPolicy */
      // // const selectedEntity = await ...

      // newEntity.entity = EntitiesModule.currentEntity
      // newEntity.authorizationTree = AuthorizationModule.AuthTree
      this.currentPolicy?.root?.children.push(newEntity);
      // this.$store.commit("SET_CURRENT_POLICY", this.currentPolicy)

      // console.log(this.form.entity);
      // var entityObj = await EntitiesModule.getEntity(
      //   "com.msp.dao.entities.cse.custom.Cse_Cse_DetailedTask"
      // );
      // console.log(JSON.stringify(entityObj));
      // console.log(JSON.stringify(newEntity));

      this.showMe = false;
    }
  }

  previousStep() {
    if (this.currentStep > 0) this.currentStep--;
  }

  get currentPolicy() {
    return MyWorkModule.currentPolicy;
  }

  @Watch("visible")
  onShowModal() {
    this.currentStep = 1;
    this.form.taskTimeReport =
      this.taskTimeRoportForms.length && this.taskTimeRoportForms[0].itemId;
  }
}
</script>

<style lang='scss' scoped>
</style>
