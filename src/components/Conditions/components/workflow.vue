<template>
  <el-dialog
    width="40%"
    title="New Workflow Condition"
    :visible.sync="showModal"
    class="filter-container"
    destroy-on-close
    :close-on-click-modal="false"
    append-to-body
  >
    <el-form
      ref="form"
      label-position="left"
      :model="items"
      :rules="formRules"
    >
      <el-row
        style="margin-top: 10px; align-items: center"
        type="flex"
      >
        <el-col :span="6">The step of:</el-col>
        <el-col :span="12">
          <el-form-item
            prop="propertyFirst"
            style="width: 100%"
          >
            <el-input
              v-model="items.property.displayName"
              type="text"
              style="padding-right: 30px; width: 100%"
              readonly
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button
            type="text"
            style="padding: 0; padding-top: 5px"
            @click.prevent="onShowPropertySelector"
          >
            <el-image src="/assets/img/form-document-16x16.png" />
          </el-button>
        </el-col>
      </el-row>
      <el-row
        style="margin-top: 20px; align-items: center"
        type="flex"
      >
        <el-col :span="6"></el-col>
        <el-col :span="12">
          <el-select
            v-model="items.operator"
            placeholder="Select"
            style="width: 100%"
          >
            <el-option
              v-for="item in operatorOptions"
              :key="item.key"
              :label="item.key"
              :value="item.value"
              style="width: 100%"
            />
          </el-select>
        </el-col>
        <el-col :span="6"> </el-col>
      </el-row>
      <el-row
        style="margin-top: 20px; align-items: center"
        type="flex"
      >
        <el-col :span="6">Workflow</el-col>
        <el-col :span="12">
          <el-select
            v-model="items.workflow"
            placeholder="Select"
            style="width: 100%"
          >
            <el-option
              v-for="item in workflowOptions"
              :key="item.itemId"
              :label="item.displayName"
              :value="item.itemId"
              style="width: 100%"
            />
          </el-select>
        </el-col>
        <el-col :span="6"> </el-col>
      </el-row>
      <el-row
        style="margin-top: 20px; margin-bottom: 40px; align-items: center"
        type="flex"
      >
        <el-col :span="6">Step</el-col>
        <el-col :span="12">
          <el-select
            v-model="items.step"
            placeholder="Select"
            style="width: 100%"
          >
            <el-option
              v-for="item in activeWorkflow.flowSteps"
              :key="item.key"
              :label="item.displayName"
              :value="item.displayName"
              style="width: 100%"
            />
          </el-select>
        </el-col>
        <el-col :span="6"> </el-col>
      </el-row>
    </el-form>
    <div
      slot="footer"
      class="filter-footer"
    >
      <el-button
        class="filter-footer__button"
        @click="okHandler"
      >
        Add
      </el-button>
      <el-button
        class="filter-footer__button"
        type="text"
        @click="cancelHandler"
      >
        cancel
      </el-button>
    </div>
    <select-property-model
      :dialog-visible.sync="selectPropertyModal.show"
      @selectPropertyComplete="resultHandler"
      :entity-id="activeWorkflow.entityId"
    />
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { KeyValue } from "@/models/KeyValue";
import { WorkflowModule } from "@/store/modules/WorkflowMod";
import SelectPropertyModel from "@/components/PropertySelector/index.vue";
import { EntitiesModule } from "@/store/modules/entitiesMod";
import { FormsModule } from "@/store/modules/FormsStore";
import { ElForm } from "element-ui/types/form";
import { WorkflowCondition } from "@/models/Conditions";

@Component({
  name: "workflow-condition",
  components: { SelectPropertyModel },
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) condition!: WorkflowCondition;

  private items = {
    property: {
      displayName: "",
      value: [],
    },
    operator: "",
    workflow: null as any,
    step: "",
  } as any;

  private dataType: number = 1;

  private lastPath: KeyValue | any = null;
  private entityId: string = "";
  private systemName: string = "";

  private formRules = {
    property: [
      {
        required: true,
        message: "Please select entity property",
        trigger: "blur",
      },
    ],
    operator: [
      {
        required: true,
        message: "Please select entity property",
        trigger: "blur",
      },
    ],
    workflow: [
      {
        required: true,
        message: "Please select entity property",
        trigger: "blur",
      },
    ],
    step: [
      {
        required: true,
        message: "Please select entity property",
        trigger: "blur",
      },
    ],
  };

  private operatorOptions: KeyValue[] = [];

  private workflowOptions: any[] = [];

  // private stepOptions = ["Approved", "Awaiting approval", "Draft", "Start"];

  private selectPropertyModal = {
    show: false,
  };

  @Watch("dialogVisible", { deep: true, immediate: true })
  async setUp(val: boolean) {
    if (val) {
      if (this.condition.mainOperand?.length > 0) {
        this.items.property.value = this.condition.mainOperand;
        if (this.items.property?.value?.length > 0) {
          let rs = await EntitiesModule.getEntity(
            this.condition.mainOperand[0].value
          );
          let property = rs.properties.find(
            (prop: any) => prop.systemName === this.condition.mainOperand[1].key
          );
          this.items.property.displayName += `[Workflow(${rs.displayName}): ${property?.displayName}]`;
          this.dataType = property?.dataType?.value;
          this.workflowOptions = WorkflowModule.Workflows;
          // this.systemName = rs.systemName;
        }
        this.items.operator = this.condition.operator;
        this.items.workflow = this.condition.workflowId;
        this.items.step = this.condition.secondaryOperand[0].key;
      } else {
        this.items.property.value = [new KeyValue('tbl', this.activeWorkflow.entityId)];
        this.items.property.displayName = `[Workflow(${this.activeWorkflow.displayName})`;
        this.workflowOptions = WorkflowModule.Workflows;
      }
    }
  }

  get currentEntity() {
    return EntitiesModule.currentEntity;
  }

  get stepOptions() {
    return this.currentEntity?.status;
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

  @Watch("lastPath", { deep: true, immediate: true })
  async setOperatorsAndWorkflows(propertyPath: KeyValue) {
    if (propertyPath) {
      this.entityId = propertyPath.value;
      var rs = await EntitiesModule.getEntity(this.entityId);
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

  @Watch("dataType", { immediate: true })
  private async loadOptions(datatype: number, old: number) {
    if (datatype !== old)
      await FormsModule.getOperatorsByDataType(datatype).then((rs) => {
        console.log('rs', rs);
        if (rs?.length) {
          let pair: KeyValue;
          for (pair of rs) {
            this.operatorOptions.push(pair);
          }
        }
      });
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

  resultHandler(displayPaths: KeyValue[], result: KeyValue[]) {
    let str: string = "";
    if (result.length > 1) {
      str += `[Workflow(${result[0].displayName}): ${result[1].displayName}]`;
    }
    this.items.property.displayName = str;
    this.items.property.value = result;
    if (result.length > 1) {
      this.lastPath = result[result.length - 1];
    }
  }

  onShowPropertySelector() {
    this.selectPropertyModal.show = true;
  }

  okHandler() {
    (this.$refs.form as ElForm).validate((valid: boolean) => {
      if (valid) {
        var workflowCondition = new WorkflowCondition();
        if (this.items.property.value.length === 1) {
          this.items.property.displayName = "";
          return;
        }
        workflowCondition.mainOperand = [...this.items.property.value];
        if (this.items.workflow) {
          let workflow = this.workflowOptions.find(
            (workflow) => workflow.itemId === this.items.workflow
          );
          workflowCondition.secondaryOperand = [
            new KeyValue(
              this.items.step,
              workflow.itemId + "_" + this.items.step
            ),
          ];
        }
        workflowCondition.operator = this.items.operator;
        workflowCondition.step = this.items.step;
        workflowCondition.workflowId = this.items.workflow;
        this.$emit("onSave", workflowCondition);
        this.cancelHandler();
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }

  cancelHandler() {
    this.showModal = false;
  }
}
</script>

<style lang="scss" scoped>
$borderColor: #dcdfe6;

.filter-footer {
  border: none;
  text-align: right;
  padding-top: 5px;
  &__button {
    margin-right: 20px;
    width: 100px;
    padding: 5px 0;
  }
}
</style>