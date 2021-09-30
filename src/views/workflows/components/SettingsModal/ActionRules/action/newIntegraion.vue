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
        :rule="formRules"
        ref="form"
      >
        <el-row>
          <el-col>
            An Instance level integration operation will be created (if not
            already created) and then run.
          </el-col>
        </el-row>
        <el-row class="integration__row" type="flex">
          <el-form-item prop="name" label="Display name:">
            <el-input
              v-model="items.name"
              type="text"
              class="integration__row--input"
            />
          </el-form-item>
        </el-row>
        <el-row class="integration__row" type="flex">
          <el-form-item prop="description" label="Description:">
            <el-input
              v-model="items.description"
              type="text"
              class="integration__row--input"
            />
          </el-form-item>
        </el-row>
        <el-row class="integration__row" type="flex">
          <el-form-item prop="javascript" label="Javascript Description:">
            <el-input
              v-model="items.javascript"
              type="text"
              class="integration__row--input"
            />
          </el-form-item>
        </el-row>
        <el-row class="integration__row" type="flex">
          <el-col>
            <el-row>
              <el-form-item
                prop="runType"
                label="Run type:"
                class="integration__row--radio-group"
              >
                <div>
                  <el-radio v-model="items.runType" label="1" border
                    >Reoccurring</el-radio
                  >
                </div>
                <div>
                  <el-radio v-model="items.runType" label="2" border
                    >One time</el-radio
                  >
                </div>
                <div class="integration__row--group">
                  <el-radio v-model="items.runType" label="3" border
                    >Custom</el-radio
                  >
                  <div class="integration__row--group-input">
                    <span>Workflow:</span>
                    <el-input
                      v-model="items.custom.workflow"
                      class="integration__row--group-input__control"
                      :readonly="items.runType !== '3'"
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
          <el-alert type="info" show-icon
            >To run this operation on a specific Orchestra, click settings from
            the Solution designer home page,<br />
            open the Orchestrators section, and then open the Orchestrator's
            settings window.
          </el-alert>
        </el-row>
      </el-form>
    </el-container>
    <div slot="footer" class="footer">
      <el-button type="primary" @click="okHandler()">Ok</el-button>
      <el-button @click="cancelHandler" type="text">Cancel</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { WorkflowModule } from "@/store/modules/WorkflowMod";
import { KeyValue } from "@/models/KeyValue";
import SelectPropertyModel from "@/components/PropertySelector/index.vue";
import { ElForm } from "element-ui/types/form";

@Component({
  name: "new-integraion-action",
  components: { SelectPropertyModel },
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;

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
    runType: 0,
    custom: {
      workflow: "",
      button: "",
    },
  };

  private formRules = {
    name: [
      {
        required: true,
        message: "Please type name",
        trigger: "change",
      },
      { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
    ],
    description: [
      {
        required: true,
        message: "Please type the description",
        trigger: "change",
      },
    ],
    javascript: [
      {
        required: true,
        message: "Please type the description",
        trigger: "change",
      },
    ],
    runType: [
      {
        required: true,
        message: "Please select the run type",
        trigger: "change",
      },
    ],
  };

  @Watch("items.runType", { immediate: true })
  clearCustomValue() {
    this.items.custom.workflow = "";
    this.items.custom.button = "";
  }

  private selectPropertyModal: any = {
    show: false,
    key: "first",
  };

  get showModal() {
    return this.dialogVisible;
  }

  set showModal(val: boolean) {
    this.$emit("update:dialogVisible", val);
  }

  onShowPropertySelector() {
    this.selectPropertyModal.show = true;
  }

  okHandler() {
    console.log(this.items);
    (this.$refs.form as ElForm).validate((valid: boolean) => {
      if (valid) {
        this.$emit("onAttachmentComplete", this.items);
        this.showModal = false;
      } else {
        console.log("error submit!!");
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
        label {
          border: none;
        }
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
