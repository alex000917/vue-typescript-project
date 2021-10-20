<template>
  <el-dialog
    :visible.sync="showModal"
    :before-close="cancelHandler"
    title="Set property value"
    width="50%"
    center
    class="set-property"
    append-to-body
  >
    <el-container direction="vertical">
      <el-form
        label-position="top"
        label-width="100px"
        :model="items"
        :rules="formRules"
        ref="form"
      >
        <el-row
          style="margin-top: 20px; align-items: center;"
          type="flex"
        >
          <el-form-item
            prop="propertyFirst"
            label="Property to set value to"
          >
            <el-input
              v-model="items.propertyFirst.displayName"
              type="text"
              style="padding-right: 30px;"
              readonly
            />
          </el-form-item>
          <el-button
            type="text"
            style="padding: 0; padding-top: 5px;"
            @click.prevent="onShowPropertySelector"
          >
            <el-image src="/assets/img/form-document-16x16.png" />
          </el-button>
        </el-row>
        <el-row
          style="margin-top: 20px;"
          type="flex"
        >
          <el-form-item prop="propertySecond">
            <el-input
              v-model="items.propertySecond.displayName"
              :type="isNumber ? 'number' : 'text'"
              :disabled="isBlank"
              style="padding-right: 30px;"
              :readonly="secondPropertyReadOnly"
            />
          </el-form-item>
          <el-dropdown
            trigger="click"
            size="small"
            placement="bottom-start"
            style="display: flex; align-items: center;"
            @command="selectInputMethod"
            ref="dropdown"
          >
            <el-button
              type="text"
              style="padding: 0;"
              @click="handleChange"
            >
              <el-image src="/assets/img/down_arrow.png" />
            </el-button>
            <el-dropdown-menu
              slot="dropdown"
              style="margin-top: 0;"
            >
              <el-dropdown-item
                v-for="menu in dropdownList"
                :key="menu.command"
                :command="menu.command"
              >
                {{ menu.text }}...
              </el-dropdown-item>
              <!-- <el-dropdown-item command="Yes">
                Yes...
              </el-dropdown-item>
              <el-dropdown-item command="No">
                No...
              </el-dropdown-item>
              <el-dropdown-item command="selectProperty">
                Select propery...
              </el-dropdown-item>
              <el-dropdown-item command="selectPreference">
                Select application Preference...
              </el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
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
    <prefModel
      :is-open.sync="showPref"
      :result-handler="onPrefSelected"
    />
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
import { EntitiesModule } from "@/store/modules/entitiesMod";
import { KeyValue } from "@/models/KeyValue";
import { ApplicationPreference } from "@/models/ApplicationPreference";
import SelectPropertyModel from "@/components/PropertySelector/index.vue";
import prefModel from "@/components/Preferences/prefModel.vue";
import { ElForm } from "element-ui/types/form";
import { PropertyCondition } from "@/models/Conditions";
import { ServerAction } from "@/models/Workflows/Actions";

@Component({
  name: "set-property-action",
  components: { SelectPropertyModel, prefModel },
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) condition!: ServerAction;

  private dropdownMenus = {
    "0": [{ command: "", text: "" }],
    "1": [
      { command: "typeText", text: "Type text" },
      { command: "blank", text: "Blank" },
      { command: "selectProperty", text: "Select propery" },
      { command: "selectPreference", text: "Select application Preference" },
    ],
    "2": [
      { command: "Yes", text: "Yes" },
      { command: "No", text: "No" },
      { command: "selectProperty", text: "Select propery" },
      { command: "selectPreference", text: "Select application Preference" },
    ],
    "3": [
      { command: "number", text: "Type the number" },
      { command: "zero", text: "zero" },
      { command: "selectProperty", text: "Select propery" },
      { command: "selectPreference", text: "Select application Preference" },
    ],
  };

  get dropdownList() {
    let key = "0";
    if (this.dataType === "0") key = "0";
    else if (this.dataType === "5") key = "2";
    else if (
      this.dataType === "6" ||
      this.dataType === "7" ||
      this.dataType === "8"
    )
      key = "3";
    else key = "1";
    return this.dropdownMenus[key];
  }

  private items = {
    propertyFirst: {
      displayName: "",
      value: [],
    },
    propertySecond: {
      displayName: "",
      value: null,
    },
    secondOperandIsApplicationPreference: false,
    secondOperandIsProperty: false,
  } as any;

  private defaultItems = {
    propertyFirst: {
      displayName: "",
      value: [],
    },
    propertySecond: {
      displayName: "",
      value: null,
    },
    secondOperandIsApplicationPreference: false,
    secondOperandIsProperty: false,
  } as any;

  private formRules = {
    propertyFirst: [
      {
        required: true,
        message: "Please select the property",
        trigger: "blur",
      },
    ],
    propertySecond: [
      {
        required: true,
        message: "Please select the property",
        trigger: "blur",
      },
    ],
  };

  private selectPropertyModal: any = {
    show: false,
    key: "first",
  };

  private showPref: boolean = false;

  private secondPropertyReadOnly = false;

  private dataType = "0";

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
    if (val) {
      if (
        this.condition.leftOperand &&
        this.condition.leftOperand?.length > 0
      ) {
        // this.items = { ...this.condition };
        this.items.propertyFirst = {
          displayName: "",
          value: [],
        };
        this.items.propertyFirst.value = this.condition.leftOperand;
        console.log(this.items.propertyFirst.value);
        let rs: any = null;
        let property: any = null;
        let str = "";
        if (this.items.propertyFirst?.value?.length > 0) {
          rs = await EntitiesModule.getEntity(
            this.condition.leftOperand[0].value
          );
          let str = `[Workflow(${rs.displayName})`;

          if (this.items.propertyFirst?.value?.length > 1) {
            for (let i = 1; i < this.items.propertyFirst.value.length; i++) {
              property = rs.properties.find(
                (prop: any) =>
                  prop.systemName === this.condition.leftOperand[i].key
              );
              str += ` : ${property.displayName}`;
            }
            this.dataType = property.dataType.value;
          } else {
            this.dataType = "1";
          }
          str += "]";
          this.items.propertyFirst.displayName += str;
        }
        this.items.propertySecond = {
          displayName: "",
          value: [],
        };
        this.items.propertySecond.value = this.condition.rightOperand;
        console.log("se", this.items.propertySecond);
        this.items.propertySecond.value = this.condition.rightOperand;
        if (this.condition.rightOperand?.length > 0) {
          if (this.condition.rightOperand?.length > 1) {
            this.secondPropertyReadOnly = true;
            this.items.secondOperandIsProperty = true;
            property = rs.properties.find(
              (prop: any) =>
                prop.systemName === this.condition.leftOperand[1].key
            );
            this.items.propertySecond.displayName += `[Workflow(${rs.displayName}): ${property.displayName}]`;
          } else if (this.condition.rightOperand?.length === 1) {
            if (this.items.propertySecond.value[0].key) {
              this.items.propertySecond.displayName =
                this.items.propertySecond.value[0].value;
            } else { console.log(typeof this.items.propertySecond.value[0].value)
              if (
                typeof this.items.propertySecond.value[0].value === "boolean"
              ) {
                if (this.items.propertySecond.value[0].value) {
                  this.items.propertySecond.displayName = "Yes";
                } else {
                  this.items.propertySecond.displayName = "No";
                }
              } else {
                this.items.propertySecond.displayName =
                  this.items.propertySecond.value[0].value;
              }
            }
          }
        }
      } else {
        this.items = { ...this.defaultItems };
        this.dataType = "0";
      }
    }
  }

  onShowPropertySelector() {
    this.selectPropertyModal.show = true;
    this.selectPropertyModal.key = "first";
    console.log("this.selectProperty", this.selectPropertyModal);
  }

  isNumber = false;
  isBlank = false;

  selectInputMethod(command: string) {
    console.log("comand", command);
    this.items.propertySecond = {
      displayName: "",
      value: null,
    };
    console.log(command);
    if (command === "typeText") {
      this.secondPropertyReadOnly = false;
      this.isNumber = false;
      this.isBlank = false;
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
      this.selectPropertyModal = {
        show: true,
        key: "second",
      };
      this.secondPropertyReadOnly = true;
      this.isNumber = false;
      this.isBlank = false;
    } else if (command === "blank") {
      this.items.secondOperandIsApplicationPreference = false;
      this.items.secondOperandIsProperty = false;
      this.items.propertySecond.displayName = "";
      this.isBlank = true;
      this.isNumber = false;
      this.secondPropertyReadOnly = true;
    } else if (command === "Yes") {
      this.items.secondOperandIsApplicationPreference = false;
      this.items.secondOperandIsProperty = false;
      this.items.propertySecond.displayName = "Yes";
      this.items.propertySecond.value = [new KeyValue(null, true)];
      this.secondPropertyReadOnly = true;
    } else if (command === "No") {
      this.items.secondOperandIsApplicationPreference = false;
      this.items.secondOperandIsProperty = false;
      this.items.propertySecond.displayName = "No";
      this.items.propertySecond.value = [new KeyValue(null, false)];
      this.secondPropertyReadOnly = true;
    } else if (command === "number") {
      this.items.secondOperandIsApplicationPreference = false;
      this.items.secondOperandIsProperty = false;
      this.secondPropertyReadOnly = false;
      this.isNumber = true;
      this.isBlank = false;
      this.secondPropertyReadOnly = false;
    } else if (command === "zero") {
      this.items.secondOperandIsApplicationPreference = false;
      this.items.secondOperandIsProperty = false;
      this.secondPropertyReadOnly = true;
      this.items.propertySecond.displayName = "0";
      this.items.propertySecond.value = [new KeyValue(null, 0)];
      this.secondPropertyReadOnly = true;
    }
  }

  handleChange() {
    this.$nextTick(() => {
      this.$refs.dropdown.show();
    });
  }

  onIsNumber(e: any) {
    console.log(e);
  }

  async resultHandler(displayPaths: KeyValue[], result: KeyValue[]) {
    console.log("result", result);
    let str = "";
    let newItems = Object.assign({}, this.items);
    let rs = await EntitiesModule.getEntity(result[0].value);
    let property: any = null;
    str = `[Workflow(${rs.displayName})`;
    if (result.length > 1) {
      for (let i = 1; i < result.length; i++) {
        property = rs.properties.find(
          (prop: any) => prop.systemName === result[i].key
        );
        str += ` : ${property.displayName}]`;
      }
      console.log("property", property);
      str += "]";
    }
    if (this.selectPropertyModal.key === "first") {
      newItems.propertyFirst = {};
      newItems.propertyFirst.displayName = str;
      newItems.propertyFirst.value = result;
      newItems.propertySecond = {};
      newItems.propertySecond.displayName = "";
      newItems.propertySecond.value = [];
      if (property) this.dataType = property.dataType.value;
      else this.dataType = "1";
    } else {
      this.items.secondOperandIsProperty = true;
      newItems.propertySecond = {};
      newItems.propertySecond.displayName = str;
      newItems.propertySecond.value = result;
    }
    console.log("dataType", this.dataType);
    this.items = { ...newItems };
  }

  onPrefSelected(value: ApplicationPreference) {
    this.items.secondOperandIsApplicationPreference = true;
    this.items.propertySecond.value = [];
    this.items.propertySecond.value.push(
      new KeyValue(value.systemName, value.displayName)
    );
    if (value?.displayName)
      this.items.propertySecond.displayName = value.displayName;
    console.log("propertySe", this.items.propertySecond);
  }

  okHandler() {
    (this.$refs.form as ElForm).validate((valid: boolean) => {
      if (valid) {
        var propertyCondition = new ServerAction();
        propertyCondition.leftOperand = [...this.items.propertyFirst.value];
        if (
          this.items.secondOperandIsApplicationPreference &&
          this.items.propertySecond.value.length > 0
        ) {
          propertyCondition.rightOperand = [...this.items.propertySecond.value];
        } else if (
          this.items.secondOperandIsProperty &&
          this.items.propertySecond.value.length > 0
        )
          propertyCondition.rightOperand = [...this.items.propertySecond.value];
        else if (!this.secondPropertyReadOnly) {
          propertyCondition.rightOperand = [
            new KeyValue(null, this.items.propertySecond.displayName),
          ];
        } else if(this.isBlank) {
          propertyCondition.rightOperand = [
            new KeyValue(null, this.items.propertySecond.displayName),
          ];
        }
        else
          propertyCondition.rightOperand = [...this.items.propertySecond.value];

        this.$emit("onSave", propertyCondition);
        this.showModal = false;
      } else {
        return false;
      }
    });
  }

  cancelHandler() {
    this.items = {
      propertyFirst: {
        displayName: "",
        value: null,
      },
      propertySecond: {
        displayName: "",
        value: null,
      },
    };
    this.showModal = false;
  }
}
</script>

<style lang="scss" scoped>
$border-color: #cacaca;

.set-property {
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

    &--last {
      height: calc(20vh + 20px);
      padding-bottom: 20px;
    }

    &--hint {
      letter-spacing: -1px;
      font-style: italic;
    }

    &--input {
      width: 50%;
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
