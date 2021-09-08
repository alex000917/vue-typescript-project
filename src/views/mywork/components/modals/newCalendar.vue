<template>
  <el-dialog
    :title="type === 'ADD' ? 'New calendar' : 'Edit calendar'"
    :visible.sync="showMe"
    width="38%"
    :before-close="handleClose"
    center
    top="10vh"
    append-to-body
  >
    <el-form
      ref="form"
      label-position="left"
      size="mini"
      :model="form"
      :rules="rules"
      hide-required-asterisk
    >
      <el-main>
        <el-row class="font-bold"> Create a new Calendar: </el-row>
        <el-form-item prop="displayName" label="DisplayName">
          <el-row>
            <el-col :lg="15" :sm="18">
              <el-input v-model="form.displayName" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="Description">
          <el-row>
            <el-col :lg="20" :sm="24">
              <el-input
                v-model="form.description"
                type="textarea"
                :autosize="{ maxRows: 2 }"
                style="padding-left: 10px"
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="Work days">
          <div style="padding-left: 100px">
            <el-checkbox
              v-for="day in daysOfWeek"
              :key="day"
              v-model="form[notCapitalize(day)]"
              :label="day"
            />
            <el-row>
              Selected work days will be open by default for user tracking.
            </el-row>
          </div>
        </el-form-item>
        <mini-table
          v-if="type === 'UPDATE'"
          ref="miniTable"
          :items="form.exceptionDays"
          :columns="expDayTable.fields"
          :table-height="150"
          @addHandler="onAddExceptionDay"
          @editHandler="onEditExceptionDay"
          @deleteHandler="onDeleteExceptionDay"
          @onRowClick="onRowSelected"
        >
          <template #filter>
            <div>Day exceptions</div>
          </template>
        </mini-table>
      </el-main>
      <el-collapse>
        <el-collapse-item title="Advanced" name="advanced">
          <el-main>
            <el-form-item label="System name" prop="systemName">
              <el-row>
                <el-col :lg="18" :sm="24">
                  <el-input
                    v-model="form.systemName"
                    :readonly="type === 'UPDATE'"
                  />
                </el-col>
              </el-row>
            </el-form-item>
          </el-main>
        </el-collapse-item>
      </el-collapse>
    </el-form>
    <el-dialog
      width="30%"
      :title="
        expDayModal.type === 'ADD' ? 'New Day Exception' : 'Edit Day Exception'
      "
      :visible.sync="expDayModal.show"
      center
      top="25vh"
      append-to-body
    >
      <el-main>
        <el-form
          ref="expDayForm"
          label-width="150px"
          label-position="top"
          size="mini"
          :model="expDayModal.data"
          :rules="expDayRules"
          hide-required-asterisk
        >
          <el-row>
            <el-col :lg="23" :sm="24">
              <el-form-item label="Name" prop="name">
                <el-input v-model="expDayModal.data.name" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :lg="12" :md="24">
              <el-form-item label="Start" prop="start">
                <el-date-picker
                  v-model="expDayModal.data.start"
                  type="date"
                  placeholder="Pick a date"
                  format="dd/MM/yyyy"
                  value-format="timestamp"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="12" :md="24">
              <el-form-item label="Finish" prop="finish">
                <el-date-picker
                  v-model="expDayModal.data.finish"
                  type="date"
                  placeholder="Pick a date"
                  format="dd/MM/yyyy"
                  value-format="timestamp"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-main>
      <div slot="footer" class="dialog-footer">
        <el-divider />
        <el-button type="primary" @click="createExceptionDayHandler()">
          {{ expDayModal.type === "ADD" ? "Create" : "Update" }}
        </el-button>
        <el-button @click="cancelExceptionDayHandler()"> Close </el-button>
      </div>
    </el-dialog>
    <div slot="footer" class="dialog-footer">
      <el-divider />
      <el-button type="primary" @click="createFormHandler()">
        {{ type === "ADD" ? "Create" : "Update" }}
      </el-button>
      <el-button @click="cancelFormHandler()"> Close </el-button>
    </div>
  </el-dialog>
</template>
<script lang='ts'>
import { Component, Prop, Watch } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import ModalMixin from "./mixin";
import { MyWorkCalendar, ExceptionDay } from "@/models/myWork";
import { MyWorkModule } from "@/store/modules/myWorkMod";
import { ArrayUtils } from "@/models/Utils/ArrayUtils";
import { DataUtils } from "@/models/Utils/DataUtils";
import MiniTable from "@/views/workflows/components/miniTable.vue";
import selectIconModalVue from "@/views/entities/components/selectIconModal.vue";
import { ElForm } from "element-ui/types/form";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

@Component({
  name: "",
  components: { MiniTable },
})
export default class extends mixins(ModalMixin) {
  @Prop({ required: true, default: "New Calendar" }) private type!: string;
  @Prop({ required: true }) private data!: MyWorkCalendar;

  private expDayTable = {
    fields: [
      {
        field: "name",
        label: "Name",
      },
      {
        field: "start",
        label: "Start Date",
      },
      {
        field: "finish",
        label: "Finish Date",
      },
    ],
  };

  private expDayModal = {
    show: false,
    type: "ADD",
    data: new ExceptionDay(),
  };

  private displayNameRule = (rule: any, value: string, callback: any) => {
    if (!value) {
      return callback(new Error("Please input the displayName."));
    }
    setTimeout(() => {
      const calendarDisplayNames = ArrayUtils.getValueListByKey(
        MyWorkModule.calendars,
        "displayName"
      );
      if (calendarDisplayNames.includes(value) && this.type === "ADD") {
        callback(new Error("This displayName was already registered."));
      } else {
        callback();
      }
    }, 500);
  };

  private expDayNameRule = (rule: any, value: string, callback: any) => {
    if (!value) {
      return callback(new Error("Please input the name."));
    }
    setTimeout(() => {
      const valueAry = ArrayUtils.getValueListByKey(
        this.form.exceptionDays,
        "name"
      );
      if (valueAry.includes(value) && this.expDayModal.type === "ADD") {
        callback(new Error("This name was already registered."));
      } else {
        callback();
      }
    }, 500);
  };

  private form = new MyWorkCalendar();

  private rules = {
    displayName: [{ validator: this.displayNameRule, trigger: "blur" }],
    systemName: [
      { required: true, message: "Please input systemName", trigger: "blur" },
    ],
  };

  private expDayRules = {
    name: [{ validator: this.expDayNameRule, trigger: "blur" }],
  };

  $refs!: {
    form: ElForm;
    expDayForm: ElForm;
    miniTable: MiniTable;
  };

  get daysOfWeek() {
    return daysOfWeek;
  }

  @Watch("visible")
  private onChangeVisible() {
    this.form = this.data
      ? Object.assign({} as MyWorkCalendar, this.data)
      : new MyWorkCalendar();
  }

  @Watch("form.displayName")
  private onChangeDisplayName(value: string) {
    this.form.systemName = value
      ? "Cse_" +
        (value.charAt(0).toUpperCase() + value.slice(1)).replace(/\s/g, "")
      : "";
  }

  notCapitalize(value: string) {
    return value?.charAt(0).toLowerCase() + value.slice(1);
  }

  createFormHandler() {
    const index = ArrayUtils.getIndex(
      MyWorkModule.calendars as any[],
      this.data
    );
    if (this.type === "UPDATE") {
      this.$store.commit("UPDATE_CALENDARS", {
        index,
        data: this.form,
        type: "UPDATE",
      });
      this.showMe = false;
    } else {
      this.$refs.form.validate((valid: boolean) => {
        if (valid) {
          this.$store.commit("UPDATE_CALENDARS", {
            index: -1,
            data: this.form,
            type: "ADD",
          });
          this.showMe = false;
        }
      });
    }
  }

  cancelFormHandler() {
    this.$refs.form.resetFields();
    this.showMe = false;
  }

  createExceptionDayHandler() {
    if (this.expDayModal.type === "ADD") {
      this.$refs.expDayForm.validate((valid: boolean) => {
        if (valid) {
          let start = this.expDayModal.data.start;
          let finish = this.expDayModal.data.finish;
          if (start != null && finish != null && start > finish) {
            this.$message({
              type: "error",
              message: "Finish Date must be greater that Start Date.",
            });
            this.expDayModal.data.start = null;
            this.expDayModal.data.finish = null;
          } else {
            const exceptionDayProtoType = new ExceptionDay();
            if (
              JSON.stringify(exceptionDayProtoType) !==
              JSON.stringify(this.expDayModal.data)
            ) {
              this.form.exceptionDays.push(this.expDayModal.data);
              this.expDayModal.show = false;
            }
          }
        }
      });
    } else {
      const index = this.form.exceptionDays.findIndex(
        (x) => x.name === this.$refs.miniTable.selectedRow.name
      );
      const expDaysInstance = [...this.form.exceptionDays];
      expDaysInstance[index] = this.expDayModal.data;
      this.form.exceptionDays = expDaysInstance;
      this.expDayModal.show = false;
    }
  }

  cancelExceptionDayHandler() {
    this.$refs.expDayForm.resetFields();
    this.expDayModal.data = Object.assign(
      {} as ExceptionDay,
      this.$refs.miniTable.selectedRow
    );
    this.expDayModal.show = false;
  }

  onAddExceptionDay() {
    this.expDayModal = {
      data: new ExceptionDay(),
      show: true,
      type: "ADD",
    };
  }

  onEditExceptionDay(row: any) {
    this.expDayModal.show = true;
    this.expDayModal.type = "UPDATE";
  }

  onDeleteExceptionDay(row: any) {
    this.$confirm("Do you want to delete this exceptionDay?", "Warning", {
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      type: "warning",
    })
      .then(() => {
        const index = this.form.exceptionDays.findIndex(
          (x) => x.name === this.$refs.miniTable.selectedRow.name
        );
        this.form.exceptionDays.splice(index, 1);
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "Delete canceled",
        });
      });
  }

  onRowSelected(row: ExceptionDay) {
    this.expDayModal.data = Object.assign({} as ExceptionDay, row);
  }
}
</script>

<style lang='scss' scoped>
.dialog-footer {
  padding-right: 5px;
  text-align: right;
}
.font-bold {
  font-weight: 500;
}
.font-normal {
  font-weight: 400;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-main {
  padding-bottom: 0;
}
.el-divider {
  padding: 0 5px;
}
.el-checkbox {
  width: 90px;
}
</style>
