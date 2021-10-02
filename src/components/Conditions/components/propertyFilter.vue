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
          trigger="click"
          size="small"
          placement="bottom-start"
          style="display: flex; align-items: center"
          @command="selectInputMethod"
        >
          <el-button type="text" style="padding: 0">
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
            !!items.propertySecond.displayName &&
            selectPropertyModal.key === 'second'
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
      :dialog-visible.sync="selectPropertyModal.show"
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

  // @Watch("data", { immediate: true, deep: true })
  // private setItems(val: any) {
  //   this.items = { ...val };
  // }

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
      this.secondPropertyReadOnly = false;
      this.items.propertySecond = { displayName: "" };
    } else if (command === "selectPreference") {
      this.items.secondOperandIsApplicationPreference = true;
      this.showPref = true;
    } else {
      if (command === "selectProperty") {
        this.items.secondOperandIsProperty = true;
        this.selectPropertyModal = {
          show: true,
          key: "second",
        };
      }
      this.secondPropertyReadOnly = true;
    }
  }

  okHandler() {
    (this.$refs.form as ElForm).validate((valid: boolean) => {
      if (valid) {
        var propertyCondition = new PropertyCondition();
        console.log('propertypathlength',this.items.propertyFirst.value.length)
        propertyCondition.mainOperand = [...this.items.propertyFirst.value];
        if (this.items.propertySecond.secondOperandIsApplicationPreference)
          propertyCondition.secondaryOperand = [...this.items.propertySecond.value];
        else
          propertyCondition.secondaryOperand = [...this.items.propertySecond.value];

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
    console.log('result',result)
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
    this.items.propertySecond = value;
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
