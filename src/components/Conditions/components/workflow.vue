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
    <el-form ref="form" label-position="left" :model="items" :rules="formRules">
      <el-row style="margin-top: 10px; align-items: center" type="flex">
        <el-col :span="6">The step of:</el-col>
        <el-col :span="12"
          ><el-form-item prop="propertyFirst" style="width: 100%">
            <el-input
              v-model="items.property.displayName"
              type="text"
              style="padding-right: 30px; width: 100%"
              readonly
            /> </el-form-item
        ></el-col>
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
      <el-row style="margin-top: 20px; align-items: center" type="flex">
        <el-col :span="6"></el-col>
        <el-col :span="12">
          <el-select
            v-model="items.condition"
            placeholder="Select"
            style="width: 100%"
          >
            <el-option
              v-for="item in conditionOptions"
              :key="item"
              :label="item"
              :value="item"
              style="width: 100%"
            />
          </el-select>
        </el-col>
        <el-col :span="6"> </el-col>
      </el-row>
      <el-row style="margin-top: 20px; align-items: center" type="flex">
        <el-col :span="6">Workflow</el-col>
        <el-col :span="12">
          <el-select
            v-model="items.workflow"
            placeholder="Select"
            style="width: 100%"
          >
            <el-option
              v-for="item in workflowOptions"
              :key="item"
              :label="item"
              :value="item"
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
              v-for="item in stepOptions"
              :key="item"
              :label="item"
              :value="item"
              style="width: 100%"
            />
          </el-select>
        </el-col>
        <el-col :span="6"> </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="filter-footer">
      <el-button class="filter-footer__button" @click="okHandler">
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
      :result-handler="resultHandler"
      :entity-id="activeWorkflow.entityId"
    />
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { KeyValue } from "@/models/KeyValue";
import { WorkflowModule } from "@/store/modules/WorkflowMod";
import SelectPropertyModel from "@/components/PropertySelector/index.vue";

@Component({
  name: "workflow-condition",
  components: { SelectPropertyModel },
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;

  private items = {
    property: {
      displayName: "",
      value: null,
    },
    condition: "",
    workflow: "",
    step: "",
  } as any;

  private formRules = {
    property: [
      {
        required: true,
        message: "Please select entity property",
        trigger: "blur",
      },
    ],
    propertySecond: [
      {
        required: true,
        message: "Please select entity property",
        trigger: "blur",
      },
    ],
  };

  private conditionOptions = [
    "Is at or beyond step",
    "Is beyond step",
    "Is at or before step",
    "Is before step",
    "Is equal to",
    "Is not equal to",
  ];

  private workflowOptions = [
    "Agile Task",
    "Badget Change Request",
    "Badget Request",
    "Business Requirement",
    "Project Change Request",
    "Epic",
  ];

  private stepOptions = ["Approved", "Awaiting approval", "Draft", "Start"];

  private selectPropertyModal = {
    show: false,
  };

  get activeWorkflow() {
    return WorkflowModule.activeWorkflow;
  }

  get showModal() {
    return this.dialogVisible;
  }

  set showModal(val: boolean) {
    this.$emit("update:dialogVisible", val);
  }

  resultHandler(result: KeyValue[]) {
    let str: string = "";
    if (result?.length > 0)
      str += `[Workflow(${result[0].key}): ${result[1].key}]`;
    this.items.property.displayName = str;
    this.items.property.value = result[0];
  }

  onShowPropertySelector() {
    console.log("first clicked");
    this.selectPropertyModal.show = true;
  }

  okHandler() {
    this.$emit("onWorkflowComplete", this.items);
    this.showModal = false;
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