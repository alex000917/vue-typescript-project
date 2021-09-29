<template>
  <el-dialog
    width="35%"
    title="New Attachment Condition"
    :visible.sync="showModal"
    class="filter-container"
    destroy-on-close
    :close-on-click-modal="false"
    append-to-body
  >
    <el-form ref="form" :model="items" :rules="formRules" label-position="top">
      <el-row class="filter-container__row">
        Property Value is about to change
      </el-row>
      <el-row class="filter-container__row" type="flex">
        <el-form-item
          prop="property"
          label="Item:"
          class="filter-container__row--form-item"
        >
          <el-input v-model="items.property.displayName" type="text" readonly />
        </el-form-item>
        <el-button
          type="text"
          style="padding: 0; padding-top: 5px; margin-left: 30px"
          @click.prevent="onShowPropertySelector"
        >
          <el-image src="/assets/img/form-document-16x16.png" />
        </el-button>
      </el-row>

      <el-row class="filter-container__row filter-container__row--last">
        <el-col>
          <el-row class="filter-container__row--detail">
            <el-radio v-model="items.canEmpty" label="1"
              >New value cannot be empty</el-radio
            >
          </el-row>
          <el-row class="filter-container__row--detail">
            <el-radio v-model="items.contains" label="0"
              >New value can be empty</el-radio
            >
          </el-row>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="filter-container__footer">
      <el-button @click="okHandler"> Add </el-button>
      <el-button class="underline" type="text" @click="cancelHandler">
        cancel
      </el-button>
    </div>
    <select-property-model
      :dialog-visible.sync="selectPropertyModal"
      :result-handler="resultHandler"
      :entity-id="activeWorkflow.entityId"
    />
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { WorkflowModule } from "@/store/modules/WorkflowMod";
import { KeyValue } from "@/models/KeyValue";
import SelectPropertyModel from "@/components/PropertySelector/index.vue";

@Component({
  name: "new-property-change",
  components: { SelectPropertyModel },
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;

  private defaultItems: any = {
    property: {
      displayName: "",
      value: null,
    },
    canEmpty: 1,
  };

  private items: any = {
    property: {
      displayName: "",
      value: null,
    },
    contains: 1,
  };

  private formRules = {
    property: [
      {
        required: true,
        message: "Please select entity property.",
        trigger: "blur",
      },
    ],
    canEmpty: {
      required: true,
      message: "Please enter the attachment type.",
      trigger: "blur",
    },
  };

  private selectPropertyModal: boolean = false;

  get showModal() {
    return this.dialogVisible;
  }

  set showModal(val: boolean) {
    this.$emit("update:dialogVisible", val);
  }

  get activeWorkflow() {
    return WorkflowModule.activeWorkflow;
  }

  onShowPropertySelector() {
    this.selectPropertyModal = true;
  }

  resultHandler(result: KeyValue[]) {
    console.log("propertyReulst", result);
    let str = "";
    if (result.length > 1) {
      str += `[Workflow(${result[0].key}): ${result[1].key}]`;
      this.items.property.displayName = str;
      this.items.property.value = result;
    }
  }

  okHandler() {
    this.$emit("onAttachmentComplete", this.items);
    this.showModal = false;
  }

  cancelHandler() {
    this.items = { ...this.defaultItems };
    this.showModal = false;
  }
}
</script>

<style lang='scss' scoped>
$borderColor: #dcdfe6;

.filter-container {
  &__row {
    margin-top: 10px;

    &--form-item {
      width: 80%;
    }

    &--last {
      padding-bottom: 10px;
      border-bottom: 2px solid $borderColor;
    }

    input {
      width: 60%;
    }

    &--detail {
    }
  }

  &__footer {
    align-items: center;

    button {
      width: 120px;
      height: 30px;
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>

<style lang='scss'>
.filter-container {
  .el-dialog {
    .el-dialog__header {
      text-align: center;
    }
  }

  .el-dialog-body {
    padding: 0 20px;
  }

  .underline {
    span {
      text-decoration: underline;
    }
  }
}
</style>