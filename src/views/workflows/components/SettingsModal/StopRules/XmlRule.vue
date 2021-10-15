<template>
  <el-dialog
    :visible.sync="showModal"
    :before-close="cancelHandler"
    title="New Xml Rule"
    width="50%"
    center
    class="xml-rule"
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
        <el-row class="xml-rule__row">
          <el-col>
            <div>
              <el-form-item label="Xml:" prop="xml">
                <el-input
                  v-model="items.xml"
                  type="textarea"
                  class="xml-rule__row--textarea"
                />
              </el-form-item>
              <div class="xml-rule__row--hint">
                Add [Creteria], [ActionsOnTrue] or [ActionsOnFalse] XML
                elements. They will be automatically be placed inside a
                [Condition] XML element.
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row class="xml-rule__row">
          <el-col>
            <el-form-item label="Action name:" prop="displayName">
              <el-input v-model="items.displayName" class="xml-rule__row--input" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-container>
    <div slot="footer" class="footer">
      <el-button type="primary" @click="okHandler()">Add</el-button>
      <el-button @click="cancelHandler" type="text">Cancel</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { ElForm } from "element-ui/types/form";
import { XmlWorkflowRule } from "@/models/Workflows/StopWorkflowRule";

@Component({
  name: "xml-stop-rule",
  components: {},
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) action!: XmlWorkflowRule;

  private defaultItems: any = {
    displayName: "",
    xml: "",
  };

  private items: any = {
    displayName: "",
    xml: "",
  };

  private formRules = {
    displayName: [
      {
        required: true,
        message: "Please type name",
        trigger: "blur",
      },
      { min: 3, message: "Length should be 3 to 5", trigger: "blur" },
    ],
    xml: [
      {
        required: true,
        message: "Please type the xml",
        trigger: "blur",
      },
    ],
  };

  @Watch("dialogVisible", {deep: true, immediate: true})
  setUp(val: boolean) {
    if (val) {
      if (this.action.displayName) {
        this.items = {...this.action}
        console.log(this.items)
      } else {
        this.items = {...this.defaultItems}
      }
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
        let action = new XmlWorkflowRule()
        action.xml = this.items.xml;
        action.displayName = this.items.displayName;console.log('xml', action);
        this.$emit("onSave", action);
        this.showModal = false;
      } else {
        return false;
      }
    });
    this.showModal = false;
  }

  cancelHandler() {
    this.showModal = false;
  }
}
</script>

<style lang="scss" scoped>
$border-color: #cacaca;

.xml-rule {
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
