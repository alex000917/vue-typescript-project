<template>
  <el-dialog
    :visible.sync="showModal"
    :before-close="cancelHandler"
    title="New Attachment Stop Rule"
    width="40%"
    class="attach-stop"
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
            The user will have to attach a file before the item can be
            progressed.
          </el-col>
        </el-row>
        <el-row class="attach-stop__row" type="flex">
          <el-form-item prop="type" label="Attachment of type:">
            <el-input
              v-model="items.type"
              type="text"
              class="attach-stop__row--input"
            />
          </el-form-item>
        </el-row>
        <el-row class="attach-stop__row" type="flex">
          <el-form-item
            prop="step"
            label="Attachment must exist from this step on wards:"
          >
            <el-select v-model="items.step" filterable
              ><el-option
                v-for="item in options"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row class="attach-stop__row" type="flex">
          <el-form-item prop="ruleName" label="Rule name:">
            <el-input
              v-model="items.ruleName"
              type="text"
              class="attach-stop__row--input"
            />
          </el-form-item>
        </el-row>
        <el-row class="attach-stop__row attach-stop__row--advance" type="flex">
          <el-col>
            <el-collapse accordion>
              <el-collapse-item title="Advanced settings" name="setting">
                <el-form-item label="System name:">
                  <el-input
                    v-model="items.systemName"
                    type="text"
                    class="attach-stop__row--input"
                  />
                </el-form-item> </el-collapse-item
            ></el-collapse>
          </el-col>
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
  name: "attach-stop-rule",
  components: { SelectPropertyModel },
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;

  private defaultItems = {
    type: '',
    step: '',
    ruleName: '',
    systemName: ''
  };

  private items = {
    type: '',
    step: '',
    ruleName: '',
    systemName: ''
  };

  private formRules = {
    type: [
      {
        required: true,
        message: "Please type name",
        trigger: "blur",
      },
      { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
    ],
    step: [
      {
        required: true,
        message: "Please type the description",
        trigger: "blur",
      },
    ],
    ruleName: [
      {
        required: true,
        message: "Please type the description",
        trigger: "blur",
      },
    ]
  };

  private options = [
    {id: 'start', value: 'Start'},
    {id: 'draft', value: 'Draft'},
    {id: 'backlog', value: 'Backlog'},
    {id: 'implementation', value: 'Implementation'},
    {id: 'completed', value: 'Completed'},
  ]

  get showModal() {
    return this.dialogVisible;
  }

  set showModal(val: boolean) {
    this.$emit("update:dialogVisible", val);
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

<style lang="scss">
$border-color: #cacaca;

.attach-stop {
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

    &--advance {
      margin-top: 20px;
    }

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
