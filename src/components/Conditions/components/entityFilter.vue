<template>
  <el-dialog
    width="40%"
    title="Entity Category Condition"
    :visible.sync="showModal"
    custom-class="entity-filter"
    destroy-on-close
    :close-on-click-modal="false"
    append-to-body
  >
    <el-form ref="form" label-position="left" :model="items" :rules="formRules">
      <el-row class="entity-filter__row" type="flex">
        <el-col :md="8" :sm="24">Entity Category of the:</el-col>
        <el-col :md="16" :sm="24">
          <el-row>
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
          </el-row>
          <el-row class="entity-filter__row">
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
          </el-row>
        </el-col>
      </el-row>
      <el-row class="entity-filter__row" type="flex">
        <el-col :md="18" :sm="24" class="entity-filter__row--list">
          <el-row v-for="(item, index) in browseItems" :key="index">
            {{ item }}
          </el-row>
        </el-col>
      </el-row>
      <el-row class="entity-filter__row" type="flex">
        <el-col :md="15" :sm="12">
          <el-input
            v-model="items.autoCompleteText"
            style="width: 100%"
            placeholder="Enter Entity Category"
            value-key="displayName"
            clearable
          />
        </el-col>
        <el-col :md="7" :sm="12" class="entity-filter__row--sibling">
          <el-button @click="handleSelect">Browse</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="entity-filter__footer">
      <el-button @click="okHandler"> Ok </el-button>
      <el-button class="underline" type="text" @click="cancelHandler"> cancel </el-button>
    </div>
    <browse-item :dialogVisible.sync="showBrowseDialog" :result.sync="items.status"/>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { KeyValue } from "@/models/KeyValue";
import { WorkflowModule } from "@/store/modules/WorkflowMod";
import BrowseItem from "./browseItem.vue";

@Component({
  name: "entity-condition",
  components: { BrowseItem },
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;

  private showBrowseDialog: boolean = false;
  private status: any[] = [];

  private items = {
    property: {
      displayName: "",
      value: null,
    },
    condition: "",
    status: [],
    autoCompleteText: ""
  } as any;

  private formRules = {
    property: [
      {
        required: true,
        message: "Please select entity property",
        trigger: "blur",
      },
    ],
    condition: [
      {
        required: true,
        message: "Please select condition",
        trigger: "blur",
      },
    ],
    status: [
      {
        required: true,
        message: "Please select Status",
        trigger: "blur",
      },
    ],
    autoCompleteText: [
      {
        required: false,
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

  private selectPropertyModal = {
    show: false,
  };

  get browseItems() {
    return this.items.status;
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

  querySearch() {
    return "";
  }

  handleSelect() {
    this.showBrowseDialog = true
    console.log('this.showBrowseDialog', this.showBrowseDialog)
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
    console.log('cancel', this.showModal)
    this.showModal = false;
  }
}
</script>

<style lang="scss" scoped>
$borderColor: #dcdfe6;

.entity-filter {
  border: none;
  text-align: right;
  padding-top: 5px;

  &__row {
    margin-top: 10px;

    &--list {
      height: 250px;
      border: 2px solid $borderColor;
    }

    &--sibling {
      margin-left: 15px;

      button {
        width: 100%;
        font-weight: bold;
        font-size: 16px;
        border: 1px solid gray;
        border-radius: 8px;
        background-color: $borderColor;
      }
    }

    input::placeholder {
      font-style: italic;
      color: $borderColor;
    }
  }

  &__footer {
    margin-top: 40px;
    margin-bottom: 20px;

    button {
      width: 120px;
      height: 30px;
      font-size: 14px;
      text-align: center;

      .underline {
        text-decoration: underline;
      }
    }
  }
}
</style>