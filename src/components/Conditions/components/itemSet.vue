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
    <el-form ref="form" label-position="left" :model="items" :rules="formRules">
      <el-row> Set property (Multi lookup or table) </el-row>
      <el-row style="margin-top: 20px; align-items: center" type="flex">
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
      <div class="outer-modal-container">
        <slot name="description">Item Conditions:</slot>
        <el-row type="flex" class="command-container">
          <el-col :span="5" class="command-button">
            <el-button
              type="text"
              icon="el-icon-user"
              :title="
                lpmInstance.getLocalizedString(
                  languagesPresentationModel.NEW_ROLE_GROUP
                )
              "
            >
              <span class="button-text" @click="showRoleGroupPopup()">{{
                lpmInstance.getLocalizedString(
                  languagesPresentationModel.NEW_ROLE_GROUP
                )
              }}</span>
            </el-button>
          </el-col>
          <el-col v-if="showFiltersButton" class="command-button">
            <el-dropdown trigger="click" size="small" placement="bottom-start">
              <el-button type="text" icon="el-icon-brush">
                <span class="button-text">New Filter</span>
              </el-button>
              <el-dropdown-menu slot="dropdown" style="margin-top: 0">
                <el-dropdown-item
                  v-for="filter in filtersList"
                  :key="filter.id"
                  :command="filter.id"
                >
                  {{ filter.label }} filter...
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="5" class="command-button">
            <el-dropdown trigger="click" size="small" placement="bottom-start">
              <el-button
                type="text"
                icon="el-icon-brush"
                :disabled="!showConditionsButton"
              >
                <span class="button-text">New Condition </span>
              </el-button>
              <el-dropdown-menu slot="dropdown" style="margin-top: 0">
                <el-dropdown-item
                  v-for="condition in conditionsList"
                  :key="condition.id"
                  :command="condition.id"
                >
                  {{ condition.label }} Conditions...
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="2" class="command-button">
            <el-button type="text" icon="el-icon-edit-outline">
              <span class="button-text">Edit</span>
            </el-button>
          </el-col>
          <el-col :span="2" class="command-button">
            <el-button type="text" icon="el-icon-delete">
              <span class="button-text">Delete</span>
            </el-button>
          </el-col>
        </el-row>
        <div
          class="table-container"
          :class="conditionsDivHeight ? 'table-container-small' : ''"
        >
          <el-tree
            :data="treeItems"
            accordion
            default-expand-all
            class="tree-container"
            @node-click="handleNodeClick"
          >
            <span slot-scope="{ node, data }" class="custom-tree-node">
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
      <el-row style="margin-top: 10px;">
        <el-col :span="8">This item set conditoin passes when:</el-col>
        <el-col :span="12">
            <el-select v-model="items.condition" placeholder="Select" style="width: 100%;">
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
      <el-row style="margin-top: 10px"> Item set name</el-row>
      <el-row style="margin-right: 15px; margin-top: 10px; align-items: center" type="flex">
        <el-form-item prop="property">
          <el-input
            v-model="items.name"
            type="text"
            style="padding-right: 30px"
            readonly
          />
        </el-form-item>
      </el-row>
      <el-checkbox-group style="margin-top: 10px" v-model="items.skipCheck">
        <el-checkbox label="property">
          Skip this item set condition if the set is empty
        </el-checkbox>
      </el-checkbox-group>
    </el-form>
    <div slot="footer">
      <el-button style="margin-right: 20px" @click="okHandler"> Ok </el-button>

      <el-button style="margin-right: 20px" @click="cancelHandler">
        Cancel
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
import { LanguagesPresentationModel } from "@/models/Utils/LanguagesPresentationModel";
import prefModel from "@/components/Preferences/prefModel.vue";
import SelectPropertyModel from "@/components/PropertySelector/index.vue";

@Component({
  name: "itemset-condition",
  components: { SelectPropertyModel, prefModel },
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;

  private lpmInstance = LanguagesPresentationModel.getInstance();

  private options = ["All items pass the conditions"];

  private items = {
    property: {
      displayName: "",
      value: null,
    },
    condition: "",
    skipCheck: [],
    name: "",
  } as any;

  private formRules = {
    propertyFirst: [
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

  private selectPropertyModal = {
    show: false,
  };

  private selectedFilterKey = "";

  private conditionsList = [
    { id: "property", label: "Property" },
    { id: "entityCategory", label: "Entity category" },
    { id: "javascript", label: "Javscript" },
    { id: "worksheet", label: "Worksheet" },
  ];

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

  private treeItems = [];

  private showConditionsButton = false

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

  showRoleGroupPopup() {
      this.treeItems.push({ label: 'Everyone' , children: [] });
  }

  resultHandler(result: KeyValue[]) {
      let str: string = ""
      if (result?.length > 0)
        str += `[Workflow(${result[0].key}): ${result[1].key}]`;
      this.items.property.displayName = str;
      this.items.property.value = result[0]
  }

  handleNodeClick(data: any) {
    this.selectedFilterKey = data.key;
    this.showConditionsButton = true
  }

  onShowPropertySelector() {
    console.log("first clicked");
    this.selectPropertyModal.show = true;
  }

  okHandler() {
    this.$emit("onItemsetComplete", this.items);
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