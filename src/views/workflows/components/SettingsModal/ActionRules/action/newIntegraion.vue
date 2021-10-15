<template>
  <el-dialog
    :visible.sync="showModal"
    :before-close="cancelHandler"
    title="New Integraion Operation"
    width="40%"
    class="integration"
    center
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
        <el-row>
          <el-col>
            An Instance level integration operation will be created (if not
            already created) and then run.
          </el-col>
        </el-row>
        <el-row
          class="integration__row"
          type="flex"
        >
          <el-form-item
            prop="name"
            label="Display name:"
          >
            <el-input
              v-model="items.name"
              type="text"
              class="integration__row--input"
            />
          </el-form-item>
        </el-row>
        <el-row
          class="integration__row"
          type="flex"
        >
          <el-form-item
            prop="description"
            label="Description:"
          >
            <el-input
              v-model="items.description"
              type="text"
              class="integration__row--input"
            />
          </el-form-item>
        </el-row>
        <el-row
          class="integration__row"
          type="flex"
        >
          <el-form-item
            prop="javascript"
            label="Javascript Description:"
          >
            <el-input
              v-model="items.javascript"
              type="text"
              class="integration__row--input"
            />
          </el-form-item>
        </el-row>
        <el-row
          class="integration__row"
          type="flex"
        >
          <el-col>
            <el-row>
              <el-form-item
                prop="runType"
                label="Run type:"
                class="integration__row--radio-group"
              >
                <div>
                  <el-radio
                    v-model="runType"
                    label="1"
                  >Reoccurring</el-radio>
                </div>
                <div>
                  <el-radio
                    v-model="runType"
                    label="2"
                  >One time</el-radio>
                </div>
                <div class="integration__row--group">
                  <el-radio
                    v-model="runType"
                    label="3"
                  >Custom</el-radio>
                  <div class="integration__row--group-input">
                    <span>Workflow:</span>
                    <el-input
                      v-model="items.custom.workflow"
                      class="integration__row--group-input__control"
                      :readonly="runType !== '3'"
                    ></el-input>
                  </div>
                  <div class="integration__row--group-input">
                    <span>Button:</span>
                    <el-input
                      v-model="items.custom.button"
                      class="integration__row--group-input__control"
                      :readonly="items.runType !== '3'"
                    ></el-input>
                  </div>
                </div>
              </el-form-item>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="integration__row">
          <el-alert
            type="info"
            show-icon
          >To run this operation on a specific Orchestra, click settings from
            the Solution designer home page,<br />
            open the Orchestrators section, and then open the Orchestrator's
            settings window.
          </el-alert>
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
  </el-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { WorkflowModule } from "@/store/modules/WorkflowMod";
import { KeyValue } from "@/models/KeyValue";
import SelectPropertyModel from "@/components/PropertySelector/index.vue";
import { ElForm } from "element-ui/types/form";
import { IntegrationAction } from "@/models/Workflows/Actions";

@Component({
  name: "new-integraion-action",
  components: { SelectPropertyModel },
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) action!: IntegrationAction;

  private defaultItems = {
    name: "",
    description: "",
    javascript: "",
    runType: 0,
    custom: {
      workflow: "",
      button: "",
    },
  };

  private items = {
    name: "",
    description: "",
    javascript: "",
    runType: "0",
    custom: {
      workflow: "",
      button: "",
    },
  };

  private runType: string = "1";

  private formRules = {
    name: [
      {
        required: true,
        message: "Please type name",
        trigger: "blur",
      },
    ],
    description: [
      {
        required: true,
        message: "Please type the description",
        trigger: "blur",
      },
    ],
    javascript: [
      {
        required: true,
        message: "Please type the description",
        trigger: "blur",
      },
    ],
    runType: [
      {
        required: true,
        message: "Please select the run type",
        trigger: "blur",
      },
    ],
  };

  @Watch("dialogVisible", { immediate: true })
  setUp(val: boolean) {
    if (val) {
      if (this.action && this.action.displayName) {
        console.log("action", this.action);
        this.items.name = this.action.displayName;
        this.items.description = this.action.description;
        this.items.javascript = this.action.javascriptFunction;
        if (this.action.reoccurring) this.runType = "1";
        else if (this.action.useConditions) this.runType = "2";
        else this.runType = "3";
        if (this.runType === "3") {
          this.items.custom = {
            workflow: this.action.customWorkflow,
            button: this.action.customButton,
          };
        }
      } else {
        this.items = { ...this.defaultItems };
      }
    }
  }

  @Watch("runType", { immediate: true })
  clearCustomValue() {
    this.items.runType = this.runType;
    if (this.runType !== "3") {
      this.items.custom.workflow = "";
      this.items.custom.button = "";
    }
  }

  get showModal() {
    return this.dialogVisible;
  }

  set showModal(val: boolean) {
    this.$emit("update:dialogVisible", val);
  }

  okHandler() {
    (this.$refs.form as ElForm).validate((valid: boolean) => {
      if (valid) {
        let action: any = new IntegrationAction();
        action.displayName = this.items.name;
        action.description = this.items.description;
        action.javascriptFunction = this.items.javascript;
        if (this.runType === "1") action.reoccurring = true;
        else if (this.runType === "2") action.useConditions = true;
        else {
          action.customWorkflow = this.items.custom.workflow;
          action.customButton = this.items.custom.button;
        }
        this.$emit("update:action", action);
        this.$emit("onSave", action);
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

<style lang="scss">
$border-color: #cacaca;

.integration {
  .el-dialog {
    &__body {
      padding: 10px 25px;
      border-bottom: 1px soild $border-color;
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

    .el-form-item {
      margin: 0;
    }

    &--radio-group {
      div {
        margin-top: 5px;
      }
    }

    &--group {
      display: flex;
      align-items: center;
      justify-content: start;

      &-input {
        width: 30%;
        display: flex;
        margin-left: 1rem;

        span {
          width: 50%;
        }
      }
    }

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
