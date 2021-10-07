<template>
  <el-dialog
    width="50%"
    title="Property Filter"
    :visible.sync="showModal"
    class="filter-container"
    destroy-on-close
    :close-on-click-modal="false"
    append-to-body
  >
    <el-form ref="form" label-position="left" :model="items" :rules="formRules">
      <el-row>
        Compare a property to another property or to a given value
      </el-row>
      <el-row style="margin-top: 20px; align-items: center" type="flex">
        <el-form-item prop="propertyFirst">
          <el-input
            v-model="items.propertyFirst.displayName"
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
      <el-row style="margin-top: 20px" type="flex">
        <el-select v-model="items.operator" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.key"
            :label="item.key"
            :value="item.key"
          />
        </el-select>
      </el-row>
      <el-row style="margin-top: 20px" type="flex">
        <el-form-item prop="propertySecond">
          <el-input
            v-model="items.propertySecond.displayName"
            type="text"
            style="padding-right: 30px"
            :readonly="secondPropertyReadOnly"
          />
        </el-form-item>
        <el-dropdown
          ref="dropdown"
          trigger="click"
          size="small"
          placement="bottom-start"
          style="display: flex; align-items: center"
          @command="selectInputMethod"
        >
          <el-button type="text" style="padding: 0" @click="handleChange">
            <el-image src="/assets/img/down_arrow.png" />
          </el-button>
          <el-dropdown-menu slot="dropdown" style="margin-top: 0">
            <el-dropdown-item command="typeText">
              Type text...
            </el-dropdown-item>
            <el-dropdown-item command="selectProperty">
              Select propery...
            </el-dropdown-item>
            <el-dropdown-item command="selectPreference">
              Select application Preference...
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
      <div style="margin-top: 20px">
        <el-checkbox
          label="propertyFirst"
          v-if="!!items.propertyFirst.displayName"
          v-model="items.skipConditionIfMainOperandIsEmpty"
        >
          Skip this condition if{{ items.propertyFirst.displayName }} is empty
        </el-checkbox>
        <el-checkbox
          v-if="
            !!items.propertySecond.displayName
          "
          v-model="items.skipConditionIfSecondaryOperandIsEmpty"
          label="propertySecond"
        >
          Skip this condition if[{{ items.propertySecond.displayName }}] is
          empty
        </el-checkbox>
      </div>
    </el-form>
    <div slot="footer">
      <el-button style="margin-right: 20px" @click="okHandler"> Ok </el-button>

      <el-button style="margin-right: 20px" @click="cancelHandler">
        Cancel
      </el-button>
    </div>
    <!-- <select-property
      :result-handler="resultHandler"
      :dialog-visible.sync="selectPropertyModal.show"
    /> -->
    <prefModel :is-open.sync="showPref" :result-handler="onPrefSelected" />
    <select-property-model
      key="first"
      :dialog-visible.sync="selectPropertyModal.show"
      @selectPropertyComplete="resultHandler"
      :entity-id="activeWorkflow.entityId"
    />
    <select-property-model
      key="second"
      :dialog-visible.sync="selectPropertySecondModal"
      @selectPropertyComplete="resultHandler"
      :entity-id="activeWorkflow.entityId"
    />
  </el-dialog>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
// import SelectProperty from "./selectProperty.vue"
import SelectPropertyModel from "@/components/PropertySelector/index.vue";
import { EntitiesModule } from "@/store/modules/entitiesMod";
import { FormsModule } from "@/store/modules/FormsStore";
import { WorkflowModule } from "@/store/modules/WorkflowMod";
import { KeyValue } from "@/models/KeyValue";
import { ApplicationPreferenceFactory } from "@/models/Utils/ApplicationPreferenceFactory";
import { ApplicationPreference } from "@/models/ApplicationPreference";
import { TextAssembly } from "@/models/TextAssembly";
import { PropertySelectorPath } from "@/models/PropertySelectorPath";
import propertyselectorVue from "@/views/forms/components/propertyselector.vue";
import { PropertyCondition } from "@/models/Conditions";
import { ElForm } from "element-ui/types/form";
import prefModel from "@/components/Preferences/prefModel.vue";

@Component({
  name: "property-filter",
  components: { SelectPropertyModel, prefModel },
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) condition!: PropertyCondition;

  private secondPropertyReadOnly = false;
  private currentPaths: KeyValue[] = [];
  private selectPropertySecondModal = false;

  private defaultItems = {
    propertyFirst: {
      displayName: "",
      value: [],
    },
    propertySecond: {
      displayName: "",
      value: [],
    },
    operator: "",
    secondOperandIsApplicationPreference: false,
    secondOperandIsProperty: false,
    skipConditionIfMainOperandIsEmpty: false,
    skipConditionIfSecondaryOperandIsEmpty: false,
  } as any;

  private items = {
    propertyFirst: {
      displayName: "",
      value: null,
    },
    propertySecond: {
      displayName: "",
      value: null,
    },
    operator: "",
    secondOperandIsApplicationPreference: false,
    secondOperandIsProperty: false,
    skipConditionIfMainOperandIsEmpty: false,
    skipConditionIfSecondaryOperandIsEmpty: false,
  } as any;

  private lastPath: KeyValue | any = null;
  private entityId: string = "";
  private systemName: string = "";

  get entity() {
    return EntitiesModule.currentEntity;
  }

  private options: KeyValue[] = [];

  get activeWorkflow() {
    return WorkflowModule.activeWorkflow;
  }

  onShowPropertySelector() {
    console.log("first clicked");
    this.selectPropertyModal.show = true;
    this.selectPropertyModal.key = "first";
  }

  @Watch("dataType", { immediate: true })
  private async loadOptions(datatype: number) {
    await FormsModule.getOperatorsByDataType(datatype).then((rs) => {
      this.options = [];
      if (rs?.length) {
        let pair: any = null;
        for (pair of rs) {
          this.options.push(pair);
        }
      }
    });
  }

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
    key: "first",
  };

  get showModal() {
    return this.dialogVisible;
  }

  set showModal(val: boolean) {
    this.$emit("update:dialogVisible", val);
  }

  @Watch("dialogVisible", { deep: true, immediate: true })
  setUp(val: boolean) {
    if (val) {
      if (this.condition?.mainOperand) {
        this.items = { ...this.condition };
        this.items.propertyFirst = {
          displayName: "",
          value: [],
        };
        this.items.propertyFirst.value = this.condition.mainOperand;
        if (this.items.propertyFirst?.value?.length > 0) {
          this.items.propertyFirst.displayName += `[Workflow(${this.items.propertyFirst.value[0].displayName}): ${this.items.propertyFirst.value[1].displayName}]`;
          this.lastPath =
            this.items.propertyFirst.value[
              this.items.propertyFirst.value.length - 1
            ];
        }
        this.items.propertySecond = {
          displayName: "",
          value: [],
        };
        this.items.propertySecond.value = this.condition.secondaryOperand;
        if (this.items.propertySecond?.value?.length > 0) {
          this.secondPropertyReadOnly = true;
          if (this.items.secondOperandIsProperty)
            this.items.propertySecond.displayName += `[Workflow(${this.items.propertySecond.value[0].displayName}): ${this.items.propertySecond.value[1].displayName}]`;
          else if (this.items.secondOperandIsApplicationPreference)
            this.items.propertySecond.displayName += `${this.items.propertySecond.value[0].displayName}`;
          else {
            this.secondPropertyReadOnly = false;
            this.items.propertySecond.displayName =
              this.items.propertySecond.value[0];
          }
        }

        console.log("items", this.items);
      }
    }
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

  handleChange() {
    this.$nextTick(() => {
      this.$refs.dropdown.show();
    });
  }

  selectInputMethod(command: string) {
    this.items.propertySecond = {
      displayName: "",
      value: null,
    };
    if (command === "typeText") {
      this.selectPropertyModal = {
        show: false,
        key: "first",
      };
      this.items.skipConditionIfSecondaryOperandIsEmpty = false;
      this.secondPropertyReadOnly = false;
      this.items.propertySecond = { displayName: "" };
      this.items.secondOperandIsApplicationPreference = false;
      this.items.secondOperandIsProperty = false;
    } else if (command === "selectPreference") {
      this.items.secondOperandIsApplicationPreference = true;
      this.showPref = true;
      this.secondPropertyReadOnly = true;
    } else if (command === "selectProperty") {
      this.items.secondOperandIsProperty = true;
      this.selectPropertySecondModal = true;
      this.selectPropertyModal = {
        show: false,
        key: "second",
      };
      this.secondPropertyReadOnly = true;
    }
  }

  okHandler() {
    (this.$refs.form as ElForm).validate((valid: boolean) => {
      if (valid) {
        var propertyCondition = new PropertyCondition();
        propertyCondition.mainOperand = [...this.items.propertyFirst.value];
        if (this.items.secondOperandIsApplicationPreference) {
          propertyCondition.secondaryOperand = [
            ...this.items.propertySecond.value,
          ];
        } else if (this.items.secondOperandIsProperty)
          propertyCondition.secondaryOperand = [
            ...this.items.propertySecond.value,
          ];
        else
          propertyCondition.secondaryOperand = [
            this.items.propertySecond.displayName,
          ];

        propertyCondition.skipConditionIfSecondaryOperandIsEmpty =
          this.items.skipConditionIfSecondaryOperandIsEmpty;
        propertyCondition.skipConditionIfMainOperandIsEmpty =
          this.items.skipConditionIfMainOperandIsEmpty;
        propertyCondition.operator = this.items.operator;
        propertyCondition.secondOperandIsProperty =
          this.items.secondOperandIsProperty;
        propertyCondition.secondOperandIsApplicationPreference =
          this.items.secondOperandIsApplicationPreference;
        this.$emit("update:condition", propertyCondition);
        this.$emit("onSave", propertyCondition);
      } else {
        console.log("error submit!!");
        return false;
      }
    });
    this.cancelHandler();
  }

  cancelHandler() {
    this.items = this.defaultItems;
    this.showModal = false;
  }

  dataType = 1;
  resultHandler(displayPaths: KeyValue[], result: KeyValue[]) {
    console.log("result", result);
    let str = "";
    let newItems = Object.assign({}, this.items);
    if (result.length > 1) {
      str += `[Workflow(${displayPaths[0].key}): ${displayPaths[1].key}]`;
    }
    if (this.selectPropertyModal.key === "first") {
      newItems.propertyFirst = {};
      newItems.propertyFirst.displayName = str;
      newItems.propertyFirst.value = result;
    } else {
      newItems.propertySecond = {};
      newItems.propertySecond.displayName = str;
      newItems.propertySecond.value = result;
    }
    this.items = { ...newItems };
    if (this.selectPropertyModal.key === "first") {
      const lastpart = displayPaths[result.length - 1];
      this.dataType = parseInt(lastpart?.value?.dataType?.value);
    }
  }

  convertToTextAssembly(data: any[]) {
    const textAssembly = new TextAssembly();
    textAssembly.parts = [];
    const item: any = Object.assign({}, data);

    if (typeof item === "object") {
      // if item.parts then its PropertyPaths
      if (item.paths) {
        textAssembly.parts?.push(
          (item as PropertySelectorPath).toTextAssemblyParts()
        );
      }
    } else {
      textAssembly?.parts?.push(item);
    }

    return textAssembly;
  }

  async created() {}

  showPref = false;

  onPrefSelected(value: ApplicationPreference) {
    console.log("appPreference", value);
    this.items.secondOperandIsApplicationPreference = true;
    this.items.propertySecond.value = [];
    this.items.propertySecond.value.push(value);
    if (value?.displayName)
      this.items.propertySecond.displayName = value.displayName;
    console.log("propertySe", this.items.propertySecond);
  }
}
</script>

<style lang="scss" scoped>
.filter-container {
  .select-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .select-label {
      min-width: 150px;
    }
  }
  .filter-footer {
    text-align: right;
    padding-top: 5px;
    border-top: 1px solid $borderGray;
  }
}
</style>
