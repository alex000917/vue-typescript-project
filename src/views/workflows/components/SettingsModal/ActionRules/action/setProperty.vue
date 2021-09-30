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
        <el-row style="margin-top: 20px; align-items: center" type="flex">
          <el-form-item prop="propertyFirst" label="Property to set value to">
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
      </el-form>
    </el-container>
    <div slot="footer" class="footer">
      <el-button type="primary" @click="okHandler()">Ok</el-button>
      <el-button @click="cancelHandler" type="text">Cancel</el-button>
    </div>
    <prefModel :is-open.sync="showPref" :result-handler="onPrefSelected" />
    <select-property-model
      :dialog-visible.sync="selectPropertyModal.show"
      :result-handler="resultHandler"
      :entity-id="activeWorkflow.entityId"
    />
  </el-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { WorkflowModule } from "@/store/modules/WorkflowMod";
import { KeyValue } from "@/models/KeyValue";
import { ApplicationPreference } from "@/models/ApplicationPreference";
import SelectPropertyModel from "@/components/PropertySelector/index.vue";
import prefModel from "@/components/Preferences/prefModel.vue";
import { ElForm } from "element-ui/types/form";

@Component({
  name: "set-property-action",
  components: { SelectPropertyModel, prefModel },
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;

  private items = {
    propertyFirst: {
      displayName: "",
      value: null,
    },
    propertySecond: {
      displayName: "",
      value: null,
    },
  } as any;

  private formRules = {
    propertyFirst: [
      {
        required: true,
        message: "Please select the property",
        trigger: "blur",
      }
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

  get activeWorkflow() {
    return WorkflowModule.activeWorkflow;
  }

  get showModal() {
    return this.dialogVisible;
  }

  set showModal(val: boolean) {
    this.$emit("update:dialogVisible", val);
  }

  onShowPropertySelector() {
    this.selectPropertyModal.show = true;
    this.selectPropertyModal.key = "first";
    console.log("this.selectProperty", this.selectPropertyModal);
  }

  selectInputMethod(command: string) {
    this.items.propertySecond = "";
    if (command === "typeText") {
      this.selectPropertyModal = {
        show: false,
        key: "first",
      };
      this.secondPropertyReadOnly = false;
      this.items.propertySecond = { displayName: "" };
    } else if (command === "selectPreference") {
      this.showPref = true;
    } else {
      if (command === "selectProperty") {
        this.selectPropertyModal = {
          show: true,
          key: "second",
        };
      }
      this.secondPropertyReadOnly = true;
    }
  }

  async resultHandler(result: KeyValue[]) {
    let str = "";
    if (result.length > 1) {
      str += `[Workflow(${result[0].key}): ${result[1].key}]`;
    }
    if (this.selectPropertyModal.key === "first") {
      this.items.propertyFirst = {};
      this.items.propertyFirst.displayName = str;
      this.items.propertyFirst.value = result;
    } else {
      this.items.propertySecond = {};
      this.items.propertySecond.displayName = str;
      this.items.propertySecond.value = result;
    }
  }

  onPrefSelected(value: ApplicationPreference) {
    this.items.propertySecond = value;
  }

  okHandler() {
    (this.$refs.form as ElForm).validate((valid: boolean) => {
      if (valid) {
        this.$emit("onAttachmentComplete", this.items);
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
