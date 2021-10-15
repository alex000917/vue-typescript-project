<template>
  <el-dialog
    :visible.sync="showModal"
    :before-close="cancelHandler"
    title="New Move Workflow action"
    width="40%"
    center
    class="move-workflow"
    append-to-body
  >
    <el-container direction="vertical">
      <el-form
        label-position="left"
        label-width="100px"
        :model="items"
        :rules="formRules"
        ref="form"
      >
        <el-row>
          <el-col> Move workflow to a specific step. </el-col>
        </el-row>
        <el-row
          class="move-workflow__row"
          type="flex"
        >
          <el-form-item
            prop="property"
            label="Item:"
          >
            <el-input
              v-model="items.property.displayName"
              type="text"
              class="move-workflow__row--input"
            />
          </el-form-item>
          <el-button
            type="text"
            style="padding: 0; padding-top: 5px"
            @click.prevent="onShowPropertySelector"
          >
            <el-image src="/assets/img/form-document-16x16.png" />
          </el-button>
        </el-row>
        <el-row class="move-workflow__row">
          <el-col>
            <el-form-item
              prop="workflow"
              label="Workflow:"
            >
              <el-select
                v-model="items.workflowSystemName"
                size="mini"
                placeholder="Select workflow"
                class="move-workflow__row--input"
                clearable
              >
                <el-option
                  v-for="item in workflowOptions"
                  :key="item.itemId"
                  :label="item.displayName"
                  :value="item.itemId"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="move-workflow__row">
          <el-col>
            <el-form-item
              prop="step"
              label="Step:"
            >
              <el-select
                v-model="items.stepSystemName"
                size="mini"
                placeholder="Select the step"
                class="move-workflow__row--input"
                clearable
              >
                <el-option
                  v-for="item in stepOptions"
                  :key="item.key"
                  :label="item.displayName"
                  :value="item.systemName"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-container>
    <div
      slot="footer"
      class="footer"
    >
      <el-button
        type="primary"
        @click="okHandler()"
      >Ok</el-button>
      <el-button
        @click="cancelHandler"
        type="text"
      >Cancel</el-button>
    </div>
    <select-property-model
      :dialog-visible.sync="selectPropertyModal.show"
      @selectPropertyComplete="resultHandler"
      :entity-id="activeWorkflow.entityId"
    />
  </el-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { WorkflowModule } from "@/store/modules/WorkflowMod";
import { KeyValue } from "@/models/KeyValue";
import SelectPropertyModel from "@/components/PropertySelector/index.vue";
import { ElForm } from "element-ui/types/form";
import { MoveWorkflowAction } from "@/models/Workflows/Actions";
import { EntitiesModule } from "@/store/modules/entitiesMod";
import { FormsModule } from "@/store/modules/FormsStore";

@Component({
  name: "move-workflow-action-modal",
  components: { SelectPropertyModel },
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) action!: MoveWorkflowAction;

  private items = {
    property: {
      displayName: "",
      value: null,
    },
    workflowSystemName: "",
    stepSystemName: "",
  } as any;

  private defaultItems = {
    property: {
      displayName: "",
      value: null,
    },
    workflowSystemName: "",
    stepSystemName: "",
  } as any;

  private formRules = {
    property: [
      {
        required: true,
        message: "Please type name",
        trigger: "blur",
      },
    ],
    workflowSystemName: [
      {
        required: true,
        message: "Please type the description",
        trigger: "blur",
      },
    ],
    stepSystemName: [
      {
        required: true,
        message: "Please type the description",
        trigger: "blur",
      },
    ],
  };

  private selectPropertyModal: any = {
    show: false,
    key: "first",
  };

  private entityId: string = "";
  private systemName: string = "";
  private lastPath: KeyValue | any = null;
  dataType = 1;

  private workflowOptions: any = [];

  get currentEntity() {
    return EntitiesModule.currentEntity;
  }

  get stepOptions() {
    return EntitiesModule.currentEntity?.status;
  }

  get activeWorkflow() {
    return WorkflowModule.activeWorkflow;
  }

  get showModal() {
    return this.dialogVisible;
  }

  set showModal(val: boolean) {
    this.$emit("update:dialogVisible", val);
  }

  @Watch("dialogVisible", { immediate: true })
  async setUp(val: boolean) {
    console.log("moveAction", this.action);
    if (val) {
      if (this.action && this.action.item.length > 0) {
        this.items.property.value = this.action.item;
        let rs = await EntitiesModule.getEntity(this.action.item[0].value);
        let str = `[Workflow(${rs.displayName})`;
        if (this.action.item.length > 1) {
          let property = rs.properties.find(
            (prop: any) => prop.systemName === this.action.item[1].key
          );
          str += property?.displayName ? ` : ${property?.displayName}` : "";
        }
        str += "]";
        this.items.property.displayName = str;
        this.lastPath = this.action.item[this.action.item.length - 1];
        this.workflowOptions = WorkflowModule.Workflows;
        this.items.workflowSystemName = this.action.workflowSystemName;
        this.items.stepSystemName = this.action.stepSystemName;
      } else {
        let workflow = WorkflowModule.Workflows[0];
        this.items.property.displayName = `[${workflow.entityName}]`;
        this.items.property.value = [
          new KeyValue("tbl", this.activeWorkflow.entityId),
        ];
        this.workflowOptions = [...WorkflowModule.Workflows];
        this.items.workflowSystemName = workflow.itemId;
        this.items.stepSystemName = this.stepOptions[0].systemName;
      }
    }
  }

  @Watch("lastPath", { deep: true, immediate: true })
  async setOperatorsAndWorkflows(propertyPath: KeyValue) {
    if (propertyPath) {
      this.entityId = propertyPath.value;
      console.log("this.entityId", this.entityId);
      var rs = await EntitiesModule.getEntity(this.entityId);
      await EntitiesModule.setCurrentEntity(rs);
      this.systemName = rs.systemName;
      if (propertyPath.key === "tbl") {
        this.dataType = 1;
      } else {
        if (rs && rs.properties.length > 0) {
          let property = rs.properties.find(
            (property) => property.systemName === propertyPath.key
          );
          this.dataType = property?.dataType?.value;
        }
      }
    }
  }

  @Watch("systemName", { immediate: true })
  private loadWorkflowOptions(systemName: string, oldName: string) {
    if (systemName !== oldName) {
      let workflows = WorkflowModule.Workflows;
      if (workflows?.length > 0) {
        this.workflowOptions = workflows.filter(
          (workflow: any) => workflow.entitySystemName === systemName
        );
      }
    }
  }

  onShowPropertySelector() {
    this.selectPropertyModal.show = true;
  }

  async resultHandler(displayPath: any[], result: KeyValue[]) {
    let str = "";
    if (result.length > 1) {
      str += `[Workflow(${result[0].displayName}): ${result[1].displayName}]`;
      this.items.property = {};
      this.items.property.displayName = str;
      this.items.property.value = result;
    }
    if (result.length > 1) {
      this.lastPath = result[result.length - 1];
    }
  }

  okHandler() {
    (this.$refs.form as ElForm).validate((valid: boolean) => {
      if (valid) {
        let workflowAction = new MoveWorkflowAction();
        workflowAction.item = this.items.property.value;
        workflowAction.workflowSystemName = this.items.workflowSystemName;
        workflowAction.stepSystemName = this.items.stepSystemName;

        this.$emit("update:action", workflowAction);
        this.$emit("onSave", workflowAction);
        this.showModal = false;
      } else {
        return false;
      }
    });
  }

  cancelHandler() {
    this.items = this.defaultItems;
    this.showModal = false;
  }
}
</script>

<style lang="scss" scoped>
$border-color: #cacaca;

.move-workflow {
  .el-dialog {
    &__body {
      padding: 0 15px;
      border-bottom: 1px soild $border-color;
      height: 33vh;

      .el-container {
        height: 100%;
      }
    }

    &__footer {
      padding: 0 15px;
      align-items: center;

      .footer {
        height: 40px;
        border-top: 1px solid $border-color;
        align-items: center;

        .el-button {
          width: 120px;
          margin: 4px 10px;

          &--text {
            text-decoration: underline;
          }
        }
      }
    }
  }

  &__row {
    margin-top: 10px;
    align-items: center;

    &--last {
      height: calc(20vh + 20px);
      padding-bottom: 20px;
    }

    &--hint {
      letter-spacing: -1px;
      font-style: italic;
    }

    &--input {
      width: 70%;
    }

    &--textarea {
      width: 100%;
      textarea {
        height: 115px;
      }
    }
  }
}
</style>
