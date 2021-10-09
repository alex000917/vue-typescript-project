<template>
  <el-dialog
    width="50%"
    title="New Itemset Condition"
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
      <el-row> Set property (Multi lookup or table) </el-row>
      <el-row
        style="margin-top: 20px; align-items: center"
        type="flex"
      >
        <el-form-item prop="propertyFirst">
          <el-input
            v-model="items.property.displayName"
            type="text"
            style="padding-right: 30px"
            readonly
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
      <el-row>
        <condition-tree :visibleConditions="conditionsList" :data.sync = "roleGroups"/>
      </el-row>
      <el-row style="margin-top: 10px;">
        <el-col :span="8">This item set conditoin passes when:</el-col>
        <el-col :span="12">
          <el-select
            v-model="items.itemSetConditionType"
            placeholder="Select"
            style="width: 100%;"
          >
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item"
              style="width:100%;"
            />
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px"> Item set name:</el-row>
      <el-row
        style="margin-right: 15px; margin-top: 10px; align-items: center"
        type="flex"
      >
        <el-form-item prop="property">
          <el-input
            v-model="items.displayName"
            type="text"
            style="padding-right: 30px"
          />
        </el-form-item>
      </el-row>
      <el-checkbox-group
        style="margin-top: 10px"
        v-model="items.skipConditionIfSetIsEmpty"
      >
        <el-checkbox label="property">
          Skip this item set condition if the set is empty
        </el-checkbox>
      </el-checkbox-group>
    </el-form>
    <div slot="footer">
      <el-button
        style="margin-right: 20px"
        @click="okHandler"
      > Ok </el-button>

      <el-button
        style="margin-right: 20px"
        @click="cancelHandler"
      >
        Cancel
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
import { LanguagesPresentationModel } from "@/models/Utils/LanguagesPresentationModel";
import prefModel from "@/components/Preferences/prefModel.vue";
import SelectPropertyModel from "@/components/PropertySelector/index.vue";
import { RoleGroup } from "@/models/RoleGroup";

import {
  ItemSetCondition,
} from "@/models/Conditions";
import { Restriction } from "@/models/Restriction";

@Component({
  name: "itemset-condition",
  components: {
    SelectPropertyModel,
    prefModel,
    conditionTree: () => import("@/components/Conditions/index.vue"),
  },
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) condition!: ItemSetCondition;

  private lpmInstance = LanguagesPresentationModel.getInstance();

  private options = ["All items pass the conditions"];

  private conditionsList = [
    { id: "PropertyCondition", label: "Property" },
    { id: "EntityCategoryCondition", label: "Entity category" },
    { id: "JavascriptCondition", label: "Javscript" },
    { id: "AttachmentCondition", label: "Attachment" },
  ];

  //Total Data
  private roleGroups: RoleGroup[] | any = [];
  //Tree Data
  private treeItems: any[] = [];

  private items = {
    property: {
      displayName: "",
      value: null,
    },
    itemSetConditionType: "",
    skipConditionIfSetIsEmpty: 0,
    displayName: "",
  } as any;

  private formRules = {
    property: [
      {
        required: true,
        message: "Please select entity property",
        trigger: "blur",
      },
    ]
  };

  private selectPropertyModal = {
    show: false,
  };

  private selectedFilterKey = "";

  private filtersList = [
    { id: "state", label: "State" },
    { id: "entityCategory", label: "Entity category" },
    { id: "userRole", label: "Logged in user role" },
    { id: "property", label: "Property" },
    { id: "sql", label: "SQL" },
  ];

  private visibleFilters = [];

  private visibleConditions = [];

  private conditionsDivHeight = false;

  // private treeItems = [];

  private showConditionsButton = false;

  get showFiltersButton() {
    return !!this.visibleFilters.length;
  }

  get languagesPresentationModel() {
    return LanguagesPresentationModel;
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

  @Watch('dailogVisible', {deep: true, immediate: true})
  setUp(val: boolean) {
    if (val) {
      if (this.condition) {
        this.items.property.value = this.condition.property;
        this.items.property.displayName = this.condition.getPropertyDisplayName();
        this.items.itemSetConditionType = this.condition.itemSetConditionType;
        this.items.skipConditionIfSetIsEmpty = this.condition.skipConditionIfSetIsEmpty;
        this.items.displayName = this.condition.displayName;
        this.roleGroups = this.condition.restriction?.roleGroups;
      }
    }
  }

  resultHandler(displayPath: KeyValue[], result: KeyValue[]) {
    let str: string = "";
    if (result?.length > 0)
      str += `[Workflow(${result[0].displayName}): ${result[1].displayName}]`;
    this.items.property.displayName = str;
    this.items.property.value = result;
  }

  handleNodeClick(data: any) {
    this.selectedFilterKey = data.key;
    this.showConditionsButton = true;
  }

  onShowPropertySelector() {
    console.log("first clicked");
    this.selectPropertyModal.show = true;
  }

  okHandler() {
    let condition = new ItemSetCondition();
    condition.property = this.items.property.value;
    condition.restriction = new Restriction();
    condition.restriction.roleGroups = this.roleGroups;
    condition.displayName = this.items.displayName;
    condition.itemSetConditionType = this.items.itemSetConditionType;
    condition.skipConditionIfSetIsEmpty = this.items.skipConditionIfSetIsEmpty
    this.$emit("onSave", condition);
    this.showModal = false;
  }

  cancelHandler() {
    this.showModal = false;
  }
}
</script>

<style lang="scss" scoped>
.outer-modal-container {
  .command-container {
    margin: 20px 0;
    .command-button {
      text-align: left;
      .button-text {
        text-decoration: underline;
      }
    }
  }
  .table-container {
    width: 100%;
    height: 250px;
    border: 1px solid lightgrey;
    overflow: auto;
  }
  .table-container-small {
    height: 50px;
  }
  .el-select {
    width: 100%;
  }
}
</style>