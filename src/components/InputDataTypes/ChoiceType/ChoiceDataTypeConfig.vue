<template>
  <div style="width: 250px">
    <el-row>
      <el-col>
        <el-form :inline="true" style="float: right">
          <el-form-item>
            <el-button
              type="plain"
              title="Create New Choice"
              icon="el-icon-plus"
              @click="onNewClick"
            />

            <el-button
              :disabled="!selectedRow"
              variant="outline-primary"
              icon="el-icon-edit"
              title="open selected form"
              @click="onOEditClick"
            />
            <el-button
              variant="outline-danger"
              title="Delete"
              icon="el-icon-delete"
              :disabled="!selectedRow"
              @click="onDeleteClick"
            />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table
          :data="choicelist"
          height="200px"
          style="width: 250px"
          highlight-current-row
          empty-text="No Choice"
          @current-change="handleCurrentChange"
        >
          <el-table-column prop="displayName" label="" />
        </el-table>
      </el-col>
    </el-row>
    <el-dialog
      ref="dialog"
      :visible.sync="showNewForm"
      title="New Choice"
      append-to-body
      destroy-on-close
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :before-close="handleClose"
      :key="newFormStatus"
      @opened="formOpened"
    >
      <!-- <NewChoice v-if="showNewForm"  @onNewChoiceAdded="onNewChoiceAdded" /> -->

      <el-form
        ref="newChoiseForm"
        label-position="right"
        status-icon
        :model="form"
        :rules="rules"
        inline-message
        hide-required-asterisk
      >
        <el-form-item ref="refDisplayName" label="English" prop="displayName">
          <el-input
            v-model="form.displayName"
            autocomplete="off"
            placeholder="Type display name here."
            style="width: 50%; font-size: 16px"
            type="text"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.description"
            type="textarea"
            :autosize="{ maxRows: 2 }"
            style="min-width: 245px; font-size: 10px"
            placeholder="Type descripttion here"
          />
        </el-form-item>

        <el-divider />

        <el-form-item label="Hebrew" prop="he.displayName">
          <el-input
            v-model="form.he.displayName"
            autocomplete="off"
            placeholder="Type display name here."
            style="width: 50%; font-size: 16px; direction: rtl"
            type="text"
          />
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="form.he.description"
            type="textarea"
            :autosize="{ maxRows: 2 }"
            style="min-width: 245px; font-size: 10px; direction: rtl"
            placeholder="Type descripttion here"
          />
        </el-form-item>
        <el-divider />
        <el-collapse>
          <el-collapse-item title="Advance Setting" name="1">
            <el-form-item prop="systemName" label="System Name">
              <el-input
                v-model="form.systemName"
                type="text"
                autocomplete="off"
                :disabled="formEditMode"
              />
              <small
                >Cannot contain spaces, Capitalize first word letters, Example
                MyChoice
              </small>
            </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </el-form>

      <div slot="footer" class="filter-footer">
        <el-button type="primary" @click="submitForm">Add</el-button>
        <el-button @click="onNewDialogClose">Cancel</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { BaseContent } from "@/models/BaseContent";
import { ChoiceOption } from "@/models/ChoiceOption";
import { KeyValue } from "@/models/KeyValue";
import { LanguageTranslation } from "@/models/LanguageTranslation";
import { DataUtils } from "@/models/Utils/DataUtils";
import { AppCacheModule } from "@/store/modules/appCache";
import choicePropertyVue from "@/views/entities/components/propertyEditor/choiceProperty.vue";
import { ElForm } from "node_modules/element-ui/types/form";
import { ElInput } from "node_modules/element-ui/types/input";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import NewChoice from "./NewChoice.vue";
@Component({
  name: "ChoiceDataTypeConfig",
  components: { NewChoice },
})
export default class extends Vue {
  // @Prop({ required: false }) private options:KeyValue[]=[]
  choicelist: ChoiceOption[] = [];
  showNewForm = false;

  selectedRow: ChoiceOption | null = null;

  get newFormStatus() {
    return this.showNewForm;
  }
  formOpened() {
    (this.$refs.refDisplayName as ElInput).focus();
  }

  onNewChoiceAdded(value: any) {
    this.$emit("onChoiceListchanged", this.choicelist);
  }

  handleCurrentChange(value: any) {
    this.selectedRow = value;
  }

  onNewClick() {
    this.showNewForm = !this.showNewForm;
  }
  onDeleteClick() {
    
    if (!this.selectedRow) return;
    const selectedDisplayName = this.selectedRow.displayName;
    const index = this.choicelist.findIndex(
      (x) => x.displayName === selectedDisplayName
    );

    if (index > -1) {
      this.choicelist.splice(index, 1);
    }
  }

  onOEditClick() {
    
    if (!this.selectedRow) return;
    const selectedDisplayName = this.selectedRow.displayName;

    const index = this.choicelist.findIndex(
      (x) => x.displayName === selectedDisplayName
    );
    if (index > -1) {
      this.formEditMode = true;
      const obj = this.choicelist[index];
      this.form = this.choiceOptionToForm(obj);
      this.showNewForm = true;
    }
  }

  // show New Form Dialog
  private formEditMode = false;
  private form = {
    displayName: "",
    description: "",

    he: {
      displayName: "",
      description: "",
    },
    systemName: "",
  };
  private choiceOptionToForm(option: ChoiceOption) {
    if (!option) {
      console.error("Invalid choice option");
    }

    const obj = Object.assign(
      new ChoiceOption(),
      JSON.parse(JSON.stringify(option))
    );
    let form = {} as any;
    form.displayName = obj.displayName;
    form.description = obj.description;
    form.he = {} as any;
    form.he.displayName = obj.languageTranslations[0].displayName;
    form.he.description = obj.languageTranslations[0].description;
    form.systemName = obj.systemName;
    return form;
  }
  private formToChoiceOption(obj: any) {
    let cop = new ChoiceOption();
    cop.displayName = obj.displayName;
    cop.description = obj.description;
    const heName = obj.he.displayName;
    const hedesc = obj.he.description;
    cop.languageTranslations = [];
    cop.languageTranslations.push(
      new LanguageTranslation("he", heName, hedesc)
    );
    cop.systemName = obj.systemName;
    return cop;
  }
  private displayNameRule = (rule: any, value: string, callback: any) => {
    if (!value) {
      return callback(new Error("Please input the displayName."));
    }
    if (!DataUtils.validateDisplayName(value)) {
      return callback(
        new Error(
          "DisplayName must have only English letters, numbers, and space."
        )
      );
    }
    setTimeout(() => {
      if (
        this.choicelist.findIndex(
          (x) => x.displayName.toLowerCase() === value.toLowerCase()
        ) > -1
      ) {
        callback(new Error("This name was already taken."));
      } else {
        callback();
      }
    }, 500);
  };

  rules = {
    displayName: [{ validator: this.displayNameRule, trigger: "blur" }],

    he: {
      displayName: [
        { required: true, message: "display name required", trigger: "blur" },
      ],
    },
    systemName: [
      { required: true, message: "System name required.", trigger: "blur" },
    ],
  };

  @Watch("form.displayName", { immediate: true, deep: true })
  onEnDisplayNameChanged() {
    if (this.formEditMode === true) {
      return;
    }

    this.form.systemName =
      "cse_" + this.form.displayName.toLowerCase().replace(/\s/g, "");
  }

  submitForm() {
    (this.$refs.newChoiseForm as ElForm).validate((valid: boolean) => {
      if (valid) {
        
        if (this.formEditMode) {
          const index = this.choicelist.findIndex(
            (x) => x.systemName === this.form.systemName
          );
          if (index > -1) {
            const dataform = this.formToChoiceOption(this.form);
            //this.choicelist[index] = dataform;
            this.$set(this.choicelist, index, dataform);
            //this.choicelist.splice(index, 1);
            //this.choicelist.push(dataform);
          }
          this.formEditMode = false;
        } else {
          const dataform = this.formToChoiceOption(this.form);
          this.choicelist.push(dataform);
          this.onNewChoiceAdded(this.choicelist);
        }
        this.showNewForm = false;
        this.resetForm();
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }

  resetForm() {
    (this.$refs.newChoiseForm as ElForm).resetFields();
  }

  onNewDialogClose() {
    this.resetForm();
    this.showNewForm = false;
  }

  private handleClose(done: any) {
    done();
    this.showNewForm = false;
  }
  // END Show New Form Dialog
}
</script>
