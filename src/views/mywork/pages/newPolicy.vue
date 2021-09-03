<template>
  <el-form
    ref="newPolicyForm"
    label-position="top"
    :model="form"
    :rules="validationRules"
    :show-message="false"
  >
    <el-container>
      <el-header>
        <el-form-item prop="displayName" style="margin-bottom: 0px">
          <el-input
            v-model="form.displayName"
            placeholder="Enter new Policy Name"
            class="displayName"
            @blur="enableEditName = false"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.description"
            type="textarea"
            :autosize="{ maxRows: 2 }"
            size="mini"
            class="description"
            placeholder="Type description here"
          />
        </el-form-item>
      </el-header>
      <el-main>
        <el-form-item label="Calendar" prop="calendarSystemName">
          <el-select
            v-model="form.calendarSystemName"
            placeholder="Select"
            class="form-item__top-label"
            size="mini"
          >
            <el-option
              v-for="calendar in calendars"
              :key="calendar.systemName"
              :label="calendar.displayName"
              :value="calendar.systemName"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Worksheet authorization tree:"
          prop="worksheetAuthorizationTreeSystemName"
        >
          <el-select
            v-model="form.worksheetAuthorizationTreeSystemName"
            placeholder="Select"
            class="form-item__top-label"
            size="mini"
          >
            <el-option
              v-for="authTree in authorizationTree.children"
              :key="authTree.id"
              :label="authTree.name"
              :value="authTree.name"
            />
          </el-select>
          <div class="require-content form-item-description">
            Worksheet approval is managed by a workflow
          </div>
        </el-form-item>
        <el-form-item
          label="Worksheet workflow:"
          prop="worksheetWorkflowSystemName"
        >
          <el-select
            v-model="form.worksheetWorkflowSystemName"
            placeholder="Select"
            class="form-item__top-label"
            size="mini"
          >
            <el-option
              v-for="workflow in workflows"
              :key="workflow.itemId"
              :label="workflow.displayName"
              :value="workflow.itemId"
            />
          </el-select>
          <div class="require-content form-item-description">
            Displayed when clicking Worksheet Details in My Work
          </div>
        </el-form-item>
        <el-form-item label="Worksheet form:" prop="worksheetFormSystemName">
          <el-select
            v-model="form.worksheetFormSystemName"
            placeholder="Select"
            class="form-item__top-label"
            size="mini"
          >
            <el-option
              v-for="worksheetForm in worksheetForms"
              :key="worksheetForm.itemId"
              :label="worksheetForm.displayName"
              :value="worksheetForm.itemId"
            />
          </el-select>
          <div class="require-content form-item-description">
            Displayed when double-clicking on admin day cell in My Work
          </div>
        </el-form-item>
        <el-form-item
          label="Admin Time Report form:"
          prop="adminTimeReportFormSystemName"
        >
          <el-select
            v-model="form.adminTimeReportFormSystemName"
            placeholder="Select"
            class="form-item__top-label"
            size="mini"
          >
            <el-option
              v-for="reportForm in reportForms"
              :key="reportForm.itemId"
              :label="reportForm.displayName"
              :value="reportForm.itemId"
            />
          </el-select>
          <div class="require-content form-item-description">
            Displayed when double-clicking on admin day cell in My Work
          </div>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="enableTransfer">
            Display the following worksheet colmuns instead of the default
            columns
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-transfer
            v-model="form.worksheetColumns"
            :data="worksheetColumns"
            :class="{ 'disabled-transfer': !enableTransfer }"
            :titles="['Available columns', 'Displayed columns(3max)']"
          />
        </el-form-item>
        <el-collapse>
          <el-collapse-item title="Advanced Settings" name="systemName">
            <el-row type="flex" align="middle">
              <el-col :span="2" style="min-width: 105px"> System name </el-col>
              <el-col :span="10">
                <el-input v-model="form.systemName" size="mini" />
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-main>
      <el-divider />
      <el-footer>
        <div
          style="
            display: inline-flex;
            justify-content: right;
            width: 100%;
            padding-right: 50px;
          "
          size="mini"
        >
          <el-button type="primary" plain @click="onCreateClick()">
            Create
          </el-button>
          <div style="padding: 0 10px" />
          <el-button plain style="text-decoration: underline" type="info">
            Cancel
          </el-button>
        </div>
      </el-footer>
    </el-container>
  </el-form>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { BaseTreeNode, MyWorkPolicy } from "@/models/myWork";
import { MyWorkModule } from "@/store/modules/myWorkMod";
import { FormsModule } from "@/store/modules/FormsStore";
import { AuthorizationModule } from "@/store/modules/AuthorizationMod";
import { LanguagesPresentationModel } from "@/models/Utils/LanguagesPresentationModel";
import { displayNameRule } from "../util";
import { watch } from "fs";
import { ElForm } from "element-ui/types/form";
import { Restriction } from "@/models/Restriction";
import { Workflow } from "@/models/Workflows/workflow";
import { ItemInstance } from "@/models/ItemInstance"


@Component({
  name: "",
  components: {},
})
export default class extends Vue {
  private form = new MyWorkPolicy();
  private enableEditName = false;
  private enableTransfer = false;
  private langUtils = LanguagesPresentationModel.getInstance();
  private worksheetColumns = [
    { key: "balance", label: this.langUtils.getLocalizedString("BALANCE") },
    {
      key: "percent_consumption",
      label: this.langUtils.getLocalizedString("PERCENT_CONSUMPTION"),
    },
    {
      key: "predicted_work",
      label: this.langUtils.getLocalizedString("PREDICTED_WORK"),
    },
    {
      key: "percent_predicted_consumption",
      label: this.langUtils.getLocalizedString("PERCENT_PREDICTED_CONSUMPTION"),
    },
    { key: "work", label: this.langUtils.getLocalizedString("WORK") },
    {
      key: "complete_percentage",
      label: this.langUtils.getLocalizedString("COMPLETE_PERCENTAGE"),
    },
    {
      key: "remaining_work",
      label: this.langUtils.getLocalizedString("REMAINING_WORK"),
    },
  ];

  private validationRules = {
    displayName: [{ validator: displayNameRule, trigger: "blur" }],
    calendarSystemName: [{ required: true, trigger: "change" }],
    worksheetAuthorizationTreeSystemName: [
      { required: true, trigger: "change" },
    ],
    worksheetWorkflowSystemName: [{ required: true, trigger: "change" }],
    worksheetFormSystemName: [{ required: true, trigger: "change" }],
    adminTimeReportFormSystemName: [{ required: true, trigger: "change" }],
  };


  get calendars() {
    return MyWorkModule.calendars;
  }

  get workflows() {
    return MyWorkModule.workflows?.filter((workflow: ItemInstance) => 
    workflow.entitySystemName === "Worksheet"
    );
  }

  get authorizationTree() {
    return AuthorizationModule.AuthTree?.children.find(
      (item) => item.id === "com.msp.dao.entities.Worksheet"
    );
  }

  get worksheetForms() {
    return FormsModule.Forms.filter(
      (form) => form.entitySystemName === "Worksheet"
    );
  }

  get reportForms() {
    return FormsModule.Forms.filter(
      (form) => form.entitySystemName === "MyWorkTimeReport"
    );
  }

  @Watch("form.displayName")
  private onChangeDisplayName(value: string) {
    this.form.systemName = value
      ? "Cse_" +
        (value.charAt(0).toUpperCase() + value.slice(1)).replace(/\s/g, "")
      : "";
  }

  @Watch("form.worksheetColumns", { deep: true })
  private onChangeTranfer(newVal: any, oldVal: any) {
    if (oldVal.length === 3 || newVal.length > 3) {
      this.$message({
        type: "warning",
        message: "Maximum default columns is 3.",
        duration: 2000,
      });
      this.form.worksheetColumns = oldVal;
    }
  }

  onEditName() {
    this.enableEditName = true;
  }

  onCreateClick() {
    (this.$refs.newPolicyForm as ElForm).validate((valid: boolean) => {
      if (valid) {
        this.form.newInstance = true;
        this.form.id = this.form.systemName;
        const root: BaseTreeNode = new BaseTreeNode();
        root.parent = null;
        root.displayName = "root";
        this.form.root = root;
        this.form.nonWorkWeekDays = new Restriction();
        this.form.dayExceptions = new Restriction();
        this.form.workWeekDays = new Restriction();
        this.form.tasks = new Restriction();
        this.form.adminTime = new Restriction();
        this.form.attendance = new Restriction();
        this.form.policyAssignment = new Restriction();
        this.form.itemType = 0;

        // this.$store.commit("SET_CURRENT_POLICY", this.form);

        this.$store.commit("UPDATE_MYWORK_TREE_ITEMS", {
          type: "ADD",
          data: this.form,
        });

        this.$store.commit("SET_MYWORK_PAGE_ID", "editPolicy");
        this.$router.push({
          name: "mywork",
          query: { id: "editPolicy", value: this.form.systemName },
        });
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }
}
</script>

<style lang='scss' scoped>
.el-form {
  height: inherit;
}
.el-container {
  margin: 0;
  height: inherit;
  .el-header {
    padding: 10px;
    height: auto !important;
    .displayName {
      width: 50%;
      font-size: 20px;
    }
    .description {
      width: 90%;
      margin-top: 5px;
    }
  }
  .el-main {
    overflow: auto;
    position: relative;
  }
  .component-new-policy {
    height: inherit;
  }
  .el-form-item {
    .form-item__top-label {
      top: -10px;
    }
    .form-item-description {
      margin-top: -10px;
    }
  }
  .el-row {
    margin-top: 20px;
  }
  .disabled-transfer {
    cursor: not-allowed;
    opacity: 0.4;
  }
}
</style>
