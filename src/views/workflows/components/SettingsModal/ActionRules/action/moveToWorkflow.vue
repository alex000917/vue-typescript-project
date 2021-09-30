<template>
  <el-dialog
    :visible.sync="showModal"
    :before-close="cancelHandler"
    title="New Move Workflow action"
    width="40%"
    center
    class="move-workflow"
    append-to-body
  >
    <el-container direction="vertical">
      <el-form
        label-position="left"
        label-width="100px"
        :model="items"
        :rules="formRules"
        ref="form"
      >
        <el-row>
          <el-col> Move workflow to a specific step. </el-col>
        </el-row>
        <el-row class="move-workflow__row" type="flex">
          <el-form-item prop="property" label="Item:">
            <el-input
              v-model="items.property.displayName"
              type="text"
              class="move-workflow__row--input"
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
        <el-row class="move-workflow__row">
          <el-col>
            <el-form-item prop="workflow" label="Workflow:">
              <el-select
                v-model="items.workflow"
                size="mini"
                placeholder="Select workflow"
                class="move-workflow__row--input"
                clearable
              >
                <el-option
                  v-for="item in workflowOptions"
                  :key="item.key"
                  :label="item.key"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="move-workflow__row">
          <el-col>
            <el-form-item prop="step" label="Step:">
              <el-select
                v-model="items.step"
                size="mini"
                placeholder="Select the step"
                class="move-workflow__row--input"
                clearable
              >
                <el-option
                  v-for="item in stepOptions"
                  :key="item.key"
                  :label="item.key"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-container>
    <div slot="footer" class="footer">
      <el-button type="primary" @click="okHandler()">Ok</el-button>
      <el-button @click="cancelHandler" type="text">Cancel</el-button>
    </div>
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
import SelectPropertyModel from "@/components/PropertySelector/index.vue";
import { ElForm } from "element-ui/types/form";

@Component({
  name: "move-workflow-action",
  components: { SelectPropertyModel },
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;

  private items = {
    property: {
      displayName: "",
      value: null,
    },
    workflow: "",
    step: "",
  } as any;

  private defaultItems = {
    property: {
      displayName: "",
      value: null,
    },
    workflow: "",
    step: "",
  } as any;

  private formRules = {
    property: [
      {
        required: true,
        message: "Please type name",
        trigger: "blur",
      }
    ],
    workflow: [
      {
        required: true,
        message: "Please type the description",
        trigger: "blur",
      },
    ],
    step: [
      {
        required: true,
        message: "Please type the description",
        trigger: "blur",
      },
    ]
  };

  private selectPropertyModal: any = {
    show: false,
    key: "first",
  };

  private workflowOptions = [{ id: "agile", value: "Agile Task" }];

  private stepOptions = [{ id: "accept", value: "Acceptence" }];

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
  }

  async resultHandler(result: KeyValue[]) {
    let str = "";
    if (result.length > 1) {
      str += `[Workflow(${result[0].key}): ${result[1].key}]`;
      this.items.property = {};
      this.items.property.displayName = str;
      this.items.property.value = result;
    }
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
    this.items = this.defaultItems;
    this.showModal = false;
  }
}
</script>

<style lang="scss" scoped>
$border-color: #cacaca;

.move-workflow {
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
    align-items: center;

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
