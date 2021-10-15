<template>
  <el-dialog
    width="25%"
    title="New Attachment Condition"
    :visible.sync="showModal"
    class="filter-container"
    destroy-on-close
    :close-on-click-modal="false"
    append-to-body
  >
    <el-form
      ref="form"
      :model="items"
      :rules="formRules"
      label-position="top"
    >
      <el-row
        class="filter-container__row"
        type="flex"
      >
        <el-form-item
          prop="property"
          label="Item:"
          class="filter-container__row--form-item"
        >
          <el-input
            v-model="items.property.displayName"
            type="text"
            readonly
          />
        </el-form-item>
        <el-button
          type="text"
          style="padding: 0; padding-top: 5px; margin-left: 30px"
          @click.prevent="onShowPropertySelector"
        >
          <el-image src="/assets/img/form-document-16x16.png" />
        </el-button>
      </el-row>

      <el-row class="filter-container__row">
        <el-col>
          <el-row class="filter-container__row--detail">
            <el-radio
              v-model="contains"
              label="1"
            >Contains</el-radio>
          </el-row>
          <el-row class="filter-container__row--detail">
            <el-radio
              v-model="contains"
              label="0"
            >Does not contains</el-radio>
          </el-row>
        </el-col>
      </el-row>

      <el-row class="filter-container__row filter-container__row--last">
        <el-form-item
          label="Attachment of type:"
          prop="attachmentType"
          class="filter-container__row--form-item"
        >
          <el-input v-model="items.attachmentType"></el-input>
        </el-form-item>
      </el-row>
    </el-form>
    <div
      slot="footer"
      class="filter-container__footer"
    >
      <el-button @click="okHandler"> Add </el-button>
      <el-button
        class="underline"
        type="text"
        @click="cancelHandler"
      >
        cancel
      </el-button>
    </div>
    <select-property-model
      :dialog-visible.sync="selectPropertyModal"
      @selectPropertyComplete="resultHandler"
      :entity-id="activeWorkflow.entityId"
    />
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { WorkflowModule } from "@/store/modules/WorkflowMod";
import { KeyValue } from "@/models/KeyValue";
import SelectPropertyModel from "@/components/PropertySelector/index.vue";
import { AttachmentCondition } from "@/models/Conditions";
import { ElForm } from "element-ui/types/form";
import { EntitiesModule } from "@/store/modules/entitiesMod";

@Component({
  name: "attachment-condition",
  components: { SelectPropertyModel },
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) condition!: AttachmentCondition;

  private defaultItems: any = {
    property: {
      displayName: "",
      value: null,
    },
    contains: 0,
    attachmentType: "",
    restrictions: null
  };

  private items: any = {
    property: {
      displayName: "",
      value: [],
    },
    contains: 1,
    attachmentType: "",
    restrictions: null
  };

  private contains: string = "1";

  @Watch("contains", { immediate: true })
  changeRadio(val: string) {
    this.items.contains = parseInt(val);
  }

  private formRules = {
    property: [
      {
        required: true,
        message: "Please select entity property.",
        trigger: "blur",
      },
    ],
    attachmentType: {
      required: true,
      message: "Please enter the attachment type.",
      trigger: "change",
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

  @Watch("dialogVisible", { deep: true, immediate: true })
  async setUp(val: boolean) {
    if (val) {
      if (this.condition.property.length) {
        this.items.property.value = this.condition.property;
        let rs = await EntitiesModule.getEntity(
          this.condition.property[0].value
        );
        let property = rs.properties.find(
          (prop: any) => prop.systemName === this.condition.property[1].key
        );
        let isContains = true;
        this.items.property.displayName = `[(${rs.displayName}): ${property?.displayName}]`;
        if (this.condition.displayName.includes("does not contain")) this.contains = "1"; 
        else if (this.condition.displayName.includes("contain")) this.contains = "0";
        else isContains = false;
        
        let splitedName = this.condition.displayName.split(" ");
        if (isContains && !splitedName[splitedName.length - 1].includes("contain")) this.items.attachmentType = splitedName[splitedName.length - 1];

      } else {
        this.items = this.defaultItems;
      }
    }
  }

  onShowPropertySelector() {
    this.selectPropertyModal = true;
  }

  resultHandler(displayPaths: KeyValue[], result: KeyValue[]) {
    let str = "";
    if (result.length > 1) {
      str += `[Workflow(${result[0].displayName}): ${result[1].displayName}]`;
      this.items.property.displayName = str;
      this.items.property.value = result;
    }
  }

  okHandler() {
    (this.$refs.form as ElForm).validate((valid: boolean) => {
      if (valid) {
        let attachmentCondition = new AttachmentCondition();
        attachmentCondition.attachmentType = this.items.attachmentType;
        attachmentCondition.contains = this.items.contains;
        attachmentCondition.mainOperand = this.items.property.value;
        attachmentCondition.displayName = this.items.property.displayName;
        attachmentCondition.displayName +=  this.items.contain === "1" ? " contains" :" does not contain";
        attachmentCondition.displayName += " " + this.items.attachmentType;

        this.$emit("update:condition", attachmentCondition);
        this.$emit("onSave", attachmentCondition);
      } else {
        console.log("error submit!!");
        return false;
      }
    });
    this.cancelHandler();
  }

  cancelHandler() {
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
  .el-dialog-body {
    padding: 0 20px;
  }

  .underline {
    span {
      text-decoration: underline;
    }
  }

  .el-dialog-header {
    text-align: center;
  }
}
</style>