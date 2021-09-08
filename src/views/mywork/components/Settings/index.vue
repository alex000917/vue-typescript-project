<template>
  <el-dialog
    title="Demand Activity Settings"
    :visible.sync="showMe"
    :before-close="handleClose"
    width="65%"
  >
    <el-tabs tab-position="left" stretch>
      <el-tab-pane label="Display">
        <el-row type="flex" align="middle">
          <el-image src="/assets/img/display-name-2-32x32.png" fit="fill" />
          <span style="font-size: 18px; margin-left: 5px">Display</span>
        </el-row>
        <el-row style="margin-top: 30px; height: calc(100% - 62px)">
          <div>
            <el-checkbox v-model="enableDisplaySetting">
              Use the following name format in My Work instead of default
            </el-checkbox>
          </div>
          <el-row style="margin-top: 10px">
            <el-col :span="17">
              <!-- <div class="tags-container"> -->
              <el-select
                ref="elSelect"
                v-model="displaySettings"
                style="width: 100%"
                value-key="displayName"
                multiple
                filterable
                allow-create
                default-first-option
                autocomplete
                remote
                :remote-method="searchPreference"
                placeholder="type of select users or e-mail"
                :disabled="!enableDisplaySetting"
              >
                <el-option
                  v-for="item in propertyOptions"
                  :key="item.displayName"
                  :label="item.displayName"
                  :value="item"
                >
                  <span style="float: left"> {{ item.displayName }}</span>
                </el-option>
              </el-select>
              <!-- </div> -->
            </el-col>
          </el-row>
          <div style="padding-top: 10px">
            <el-button
              size="mini"
              :disabled="!enableDisplaySetting"
              @click="popupModal('selectProperty')"
            >
              Insert property...
            </el-button>
          </div>
          <div
            style="margin-top: 10px"
            :class="{ 'require-content': !enableDisplaySetting }"
          >
            Example: Portfolio / Requirement / Task
          </div>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Task Forms">
        <el-row type="flex" align="middle">
          <el-image
            src="/assets/img/task-forms-settings-32x32.png"
            fit="fill"
          />
          <span style="font-size: 18px; margin-left: 5px">Task Forms</span>
        </el-row>
        <el-row style="margin-top: 30px; height: calc(100% - 62px)">
          <div>Task form:</div>
          <div style="margin: 10px 0">
            <el-select v-model="value1" placeholder="Select" size="mini">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="require-content">
            Displayed after clicking Task Details in My Work
          </div>

          <div style="margin-top: 20px">Task time report form:</div>
          <div style="margin: 10px 0">
            <el-select v-model="value2" placeholder="Select" size="mini">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="require-content">
            Displayed after double-clicking a task day cell in My Work
          </div>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Reporting">
        <reporting-mode />
      </el-tab-pane>
      <el-tab-pane label="Filter">
        <el-row type="flex" align="middle">
          <el-image src="/assets/img/Filter32x32.png" fit="fill" />
          <span style="font-size: 18px; margin-left: 5px">Filter</span>
        </el-row>
        <el-row style="margin-top: 30px; height: calc(100% - 62px)">
          <div>Display only the items which pass the following filters.</div>
          <div>
            Use role group to check different conditions based on the role of
            the logged-in user.
          </div>
          <Filters :data="[]" />
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Viewed By">
        <el-row type="flex" align="middle">
          <el-image src="/assets/img/viewed-by32x32.png" fit="fill" />
          <span style="font-size: 18px; margin-left: 5px">Viewed By</span>
        </el-row>
        <el-row style="margin-top: 30px; height: calc(100% - 62px)">
          <div>Specify who can track time and progress against items.</div>
          <Conditions :data="[]" />
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Link">
        <el-row type="flex" align="middle">
          <el-image src="/assets/img/link-32x32.png" fit="fill" />
          <span style="font-size: 18px; margin-left: 5px">Link</span>
        </el-row>
        <el-row style="margin-top: 30px; height: calc(100% - 62px)">
          <el-radio-group v-model="radio">
            <el-row>
              <el-radio label="1"> No link </el-radio>
            </el-row>
            <el-row>
              <el-radio label="2"> Link to item </el-radio>
              <div style="margin: 10px 0 0 28px">
                <el-row type="flex" align="middle" style="margin: 0">
                  <el-col :span="10">
                    <el-input size="mini" />
                  </el-col>
                  <el-button type="text" size="mini" style="margin-left: 50px">
                    <el-image src="/assets/img/select-property16x16.png" />
                  </el-button>
                </el-row>
                <div
                  class="require-content link-description"
                  style="margin-top: 10px; width: 600px"
                >
                  Example: [Detailed Planning Task: Requirement]
                </div>
              </div>
            </el-row>
            <el-row>
              <el-radio label="3"> Custom link </el-radio>
              <div style="margin-left: 28px">
                <div style="width: 500px; margin-top: 10px">
                  <el-input size="mini" />
                </div>
                <div style="margin-top: 30px">
                  <el-button size="mini" @click="popupModal('selectProperty')">
                    Insert property...
                  </el-button>
                  <el-button size="mini">
                    Insert Application Preference...
                  </el-button>
                </div>
                <div
                  class="require-content link-description"
                  style="margin-top: 10px; width: 600px"
                >
                  To include the value of the property in the URL, type @VALUE.
                  @VALUE of lookup properties is the item's ID. The link will be
                  enabled when the property has a value.
                </div>
              </div>
            </el-row>
          </el-radio-group>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Default Values">
        <el-row type="flex" align="middle">
          <el-image src="/assets/img/Default-32x32.png" fit="fill" />
          <span style="font-size: 18px; margin-left: 5px">Default Values</span>
        </el-row>
        <el-collapse accordion>
          <el-collapse-item title="Task" name="1">
            <el-container>
              <el-main>
                <el-row>
                  Set initial value to properties of tasks added to worksheets
                </el-row>
                <mini-table
                  ref="taskTable"
                  :items="defaultValues.task"
                  :columns="tableFields"
                  type="mini"
                  @addHandler="taskAddHandler"
                  @deleteHandler="taskDeleteHandler"
                >
                  <div slot="filter">h</div>
                </mini-table>
              </el-main>
            </el-container>
          </el-collapse-item>
          <el-collapse-item title="Task Time Report" name="2">
            <el-container>
              <el-main>
                <el-row>
                  Set initial value to properties of task time reports (work of
                  task per day)
                </el-row>
                <mini-table
                  ref="taskTable"
                  :items="defaultValues.task"
                  :columns="tableFields"
                  type="mini"
                  @addHandler="timeReportAddHandler"
                  @deleteHandler="timeReportDeleteHandler"
                >
                  <div slot="filter">h</div>
                </mini-table>
              </el-main>
            </el-container>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="Notes">
        <el-row type="flex" align="middle">
          <el-image src="/assets/img/notes32x32.png" fit="fill" />
          <span style="font-size: 18px; margin-left: 5px">Notes</span>
        </el-row>
        <el-row style="margin-top: 30px; height: calc(100% - 62px)">
          Notes
          <div style="margin-top: 5px">
            <el-input type="textarea" :rows="10" />
          </div>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="Advanced">
        <el-row type="flex" align="middle">
          <el-image src="/assets/img/Advanced-32x32.png" fit="fill" />
          <span style="font-size: 18px; margin-left: 5px">Advanced</span>
        </el-row>
        <el-row v-if="currentPolicy" style="margin-top: 30px; height: calc(100% - 62px)">
          <el-row>
            Entity: <b>{{ currentPolicy.displayName }}</b>
          </el-row>
          <el-row>
            Authorization Tree: <b>{{ currentPolicy.systemName }}</b>
          </el-row>
          <el-row>
            <el-checkbox>
              Sync work property from My Work to Dialog
            </el-checkbox>
          </el-row>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="showMe = false"> OK </el-button>
        <el-button type="info" plain @click="showMe = false">
          Cancel
        </el-button>
      </div>
    </template>
    <select-property-model
      :dialog-visible.sync="modal.show"
      :result-handler="selectProperyHandler"
      :entity-id="entity.id"
    />
  </el-dialog>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import ModalMixin from "../modals/mixin";
import { MyWorkModule } from "@/store/modules/myWorkMod";
import { AppPreferencesModule } from "@/store/modules/AppPreferencesMod";
import SelectPropertyModel from "@/components/PropertySelector/index.vue";
import {
  PropertyPath,
  PropertySelectorPath,
} from "@/models/PropertySelectorPath";
import { EntitiesModule } from "@/store/modules/entitiesMod";
import Filters from "@/components/Filters/index.vue";
import Conditions from "@/components/Conditions/index.vue";
import MiniTable from "@/views/workflows/components/miniTable.vue";
import ReportingMode from "./reporting.vue";
import { KeyValue } from "@/models/KeyValue";
import propertyFilterVue from "@/components/Filters/components/propertyFilter.vue";
import { PropertyFactory } from "@/models/Utils/PropertyFactory";

const _settingItems = [
  { id: "display", label: "Display", icon: "display-name-2-32x32.png" },
  {
    id: "taskForms",
    label: "Task Forms",
    icon: "task-forms-settings-32x32.png",
  },
  { id: "reporting", label: "Reporting", icon: "reporting-settings-32x32.png" },
  { id: "filter", label: "Filter", icon: "Filter32x32.png" },
  { id: "viewedBy", label: "Viewed By", icon: "viewed-by32x32.png" },
  { id: "link", label: "Link", icon: "link-32x32.png" },
  { id: "defaultValue", label: "Default Values", icon: "Default-32x32.png" },
  { id: "notes", label: "Notes", icon: "notes32x32.png" },
  { id: "advanced", label: "Advanced", icon: "Advanced-32x32.png" },
];

@Component({
  name: "",
  components: {
    SelectPropertyModel,
    Filters,
    Conditions,
    MiniTable,
    ReportingMode,
  },
})
export default class extends mixins(ModalMixin) {
  settingsItems = _settingItems;
  currentSetting = {};
  options = [
    {
      value: "Option1",
      label: "Option1",
    },
    {
      value: "Option2",
      label: "Option2",
    },
    {
      value: "Option3",
      label: "Option3",
    },
    {
      value: "Option4",
      label: "Option4",
    },
    {
      value: "Option5",
      label: "Option5",
    },
  ];

  modal = {
    type: "",
    show: false,
  };

  private tableFields = [
    {
      field: "property",
      label: "Property",
    },
    {
      field: "Value",
      label: "value",
    },
  ];

  private defaultValues = {
    task: [],
    taskTimeReport: [],
  };

  private value1 = "";
  private value2 = "";
  private radio = "1";
  private enableDisplaySetting = false;
  private reportingRadio = "";
  private displaySettings = "";

  onListItemClick(item: any) {
    this.currentSetting = item;
  }

  get currentPolicy() {
    return MyWorkModule.currentPolicy;
  }

  get Preferences() {
    return AppPreferencesModule.Preferences;
  }

  get entity() {
    return EntitiesModule.getCurrentEntity;
  }

  popupModal(type: string) {
    this.modal.type = type;
    this.modal.show = true;
  }

  taskAddHandler() {
    console.log("hey");
  }

  taskDeleteHandler() {
    console.log("");
  }

  timeReportAddHandler() {
    console.log("");
  }

  timeReportDeleteHandler() {
    console.log("timeReportDeleteHandler");
  }

  propertyOptions: any[] = [];
  searchPreference(query: string) {
    if (query !== "") {
      this.propertyOptions = [];
      setTimeout(() => {
        this.propertyOptions = this.Preferences.filter((item) => {
          return (
            item.displayName.toLowerCase().indexOf(query.toLowerCase()) > -1
          );
        });
      }, 200);
    } else {
      this.propertyOptions = [];
    }
  }

  selectProperyHandler(result: KeyValue[]) {
    this.propertyOptions.push(result);
    const displayName = PropertyFactory.getPropertyNameFromPropertyPath(result);
    console.log(result, "Once selected the property");
    // this.options.push(result)
    // this.form[this.propertyModel.type].addresses.push(result)
    // this.propertyModel.show = true
    // this.propertyModel.type = ''
  }
}
</script>

<style lang='scss' scoped>
// .panel-container {
//   height: 500px;
//   overflow: auto;
// }
// .left-side {
//   padding: 5px;
// }
// .right-side {
//   padding: 10px 15px;
// }
.list-item {
  width: 100%;
  border: none;
  border-radius: 0;
  text-align: left;
}
// .dialog-footer {
//   padding-right: 25px;
//   text-align: right;
// }
// .link-description {
//   font-size: 14px;
//   word-break: initial;
//   line-height: 1.2;
// }
// .el-divider--vertical {
//   height: 27em;
// }
// .tags-container {
//   background-color: white;
//   border: 1px solid $borderGray;
//   line-height: 30px;
//   max-height: 50px;
//   overflow-y: auto;
//   display: inline-flex;
//   width: 450px;

//   .tag-item {
//     border-color: $borderGray;
//     color: $borderGray;
//     margin: 0 5px;
//   }
// }
</style>
