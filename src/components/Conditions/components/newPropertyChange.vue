<template>
  <el-dialog
    width="35%"
    title="New Property Change Condition"
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
      <el-row class="filter-container__row">
        Property Value is about to change
      </el-row>
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

      <el-row class="filter-container__row filter-container__row--last">
        <el-col>
          <el-radio-group
            v-model="newValueCanBeEmpty"
            @change="changeRadio"
          >
            <el-row class="filter-container__row--detail">
              <el-radio label="1">New value cannot be empty</el-radio>
            </el-row>
            <el-row class="filter-container__row--detail">
              <el-radio label="0">New value can be empty</el-radio>
            </el-row>
          </el-radio-group>
        </el-col>
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
import { PropertyChangeCondition } from "@/models/Conditions";
import { ElForm } from "element-ui/types/form";
import { EntitiesModule } from "@/store/modules/entitiesMod";

@Component({
  name: "new-property-change",
  components: { SelectPropertyModel },
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) condition!: PropertyChangeCondition;

  private defaultItems: any = {
    property: {
      displayName: "",
      value: null,
    },
    newValueCanBeEmpty: 1,
  };

  items: any = {
    property: {
      displayName: "",
      value: null,
    },
    newValueCanBeEmpty: 1,
  };

  newValueCanBeEmpty: string = "1";

  private formRules = {
    property: [
      {
        required: true,
        message: "Please select entity property.",
        trigger: "blur",
      },
    ],
    newValueCanBeEmpty: {
      required: true,
      message: "Please enter the attachment type.",
      trigger: "blur",
    },
  };

  private selectPropertyModal: boolean = false;

  @Watch("dialogVisible", { deep: true, immediate: true })
  async setUp(val: boolean) {
    if (val) {
      if (this.condition.property && this.condition.property.length > 1) {
        this.items.property.value = this.condition.property;
        let rs = await EntitiesModule.getEntity(
          this.condition.property[0].value
        );
        let property = rs.properties.find(
          (prop: any) => prop.systemName === this.condition.property[1].key
        );
        this.items.property.displayName = `[Workflow(${rs.displayName}): ${property?.displayName}]`;
        this.items.newValueCanBeEmpty = this.condition.newValueCanBeEmpty;
        console.log("items", this.items);
      }
    }
  }

  get showModal() {
    return this.dialogVisible;
  }

  set showModal(val: boolean) {
    this.$emit("update:dialogVisible", val);
  }

  get activeWorkflow() {
    return WorkflowModule.activeWorkflow;
  }

  changeRadio(val: string) {
    this.items.newValueCanBeEmpty = parseInt(val);
  }

  onShowPropertySelector() {
    this.selectPropertyModal = true;
  }

  async resultHandler(displayPath: KeyValue[], result: KeyValue[]) {
    console.log("propertyReulst", result);
    let str = "";
    if (result.length > 1) {
      let rs = await EntitiesModule.getEntity(this.condition.property[0].value);
      let property = rs.properties.find(
        (prop: any) => prop.systemName === this.condition.property[1].key
      );
      str += `[Workflow(${rs.displayName}): ${property?.displayName}]`;
      this.items.property.displayName = str;
      this.items.property.value = result;
    }
  }

  okHandler() {
    (this.$refs.form as ElForm).validate((valid: boolean) => {
      if (valid) {
        let condition = new PropertyChangeCondition();
        condition.property = this.items.property.value;
        condition.newValueCanBeEmpty = this.items.newValueCanBeEmpty;
        this.$emit("update:condition", condition);
        this.$emit("onSave", condition);
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