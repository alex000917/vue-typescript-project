<template>
  <el-form
    v-if="currentProperty"
    :model="currentProperty"
    :rules="validationRules"
    style="padding: 10px"
    label-position="left"
  >
    <div style="padding-left:20px">
      <el-row
        v-if="currentProperty.dataType.value !=='3'"
      >
        <el-form-item label="Default Value">
          <el-input
            ref="default"
            v-model="currentProperty.defaultValue"
            type="text"
            :disabled="!defaultValueInputEnabled"
          >
            <el-dropdown
              slot="append"
              trigger="click"

              placement="bottom-start"
              style="display: flex; align-items: center; margin-left: 5px"
              @command="selectInputMethod"
            >
              <el-button
                type="text"
                style="padding: 0"
                icon="el-icon-caret-bottom"
              />
              <el-dropdown-menu
                slot="dropdown"
                style="margin-top: 0"
              >
                <el-dropdown-item
                  v-if="['1','2'].includes(currentProperty.dataType.value)"
                  command="typeText"
                >
                  Type text
                </el-dropdown-item>
                <el-dropdown-item :command="{key: 'blank',value: 'default'}">
                  Blank
                </el-dropdown-item>
                <el-dropdown-item :command="{key: 'selectProperty',value: 'default'}">
                  Select propery...
                </el-dropdown-item>
                <el-dropdown-item :command="{key: 'selectPreference',value: 'default'}">
                  Select application Preference...
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-input>
        </el-form-item>
      </el-row>
      <el-row
        v-if="currentProperty.dataType.value === '3'"
      >
        <el-form-item>
          <el-switch
            v-model="currentProperty.includeBlank"
            active-color="#13ce66"
            inactive-color="gray"
            @change="onIncludeBlankChanged"
          /><span style="font-weight: 500">Includde a blank option</span>

          <el-input
            v-model="currentProperty.blankOptionText"
            style="width:150px"
            :disabled="!currentProperty.includeBlank"
          />
          <br>
          <span style="font-weight: 500">Examples: "None", "Other", "Select"</span>
        </el-form-item>
        <el-form-item label="Default">
          <el-select
            v-model="currentProperty.defaultValue"
            placeholder="Choose property data type"
            value-key="key"
          >
            <el-option
              v-for="item in currentProperty.dataType.options"
              :key="item.displayName"
              :label="item.displayName"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-row>
      <el-row
        v-if="currentProperty.dataType.value==='4'"
      >
        <el-form-item label="Must be before">
          <el-input
            ref="beforeDate"
            type="text"
          >
            <el-dropdown
              slot="append"
              trigger="click"
              placement="bottom-start"
              style="display: flex; align-items: center; margin-left: 5px"
              @command="selectInputMethod"
            >
              <el-button
                type="text"
                style="padding: 0"
                icon="el-icon-caret-bottom"
              />
              <el-dropdown-menu
                slot="dropdown"
                style="margin-top: 0"
              >
                <el-dropdown-item :command="{key: 'Today', value: 'beforeDate'}">
                  Today
                </el-dropdown-item>
                <el-dropdown-item :command="{key: 'selectProperty',value: 'beforeDate'}">
                  >
                  Select propery...
                </el-dropdown-item>
                <el-dropdown-item :command="{key: 'selectPreference',value: 'beforeDeate'}">
                  Select application Preference...
                </el-dropdown-item>
                <el-dropdown-item :command="{key: 'noLimit',value: 'beforeDeate'}">
                  No limit
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-input>
        </el-form-item>
      </el-row>
      <el-row
        v-if="currentProperty.dataType.value==='4'"
      >
        <el-form-item label="Must be After">
          <el-input
            ref="afterDate"
            type="text"
          >
            <el-dropdown
              slot="append"
              trigger="click"
              placement="bottom-start"
              style="display: flex; align-items: center; margin-left: 5px"
              @command="selectInputMethod"
            >
              <el-button
                type="text"
                style="padding: 0"
                icon="el-icon-caret-bottom"
              />
              <el-dropdown-menu
                slot="dropdown"
                style="margin-top: 0"
              >
                <el-dropdown-item :command="{key: 'Today', value: 'afterDate'}">
                  Today
                </el-dropdown-item>
                <el-dropdown-item :command="{key: 'selectProperty',value: 'afterDate'}">
                  >
                  Select propery...
                </el-dropdown-item>
                <el-dropdown-item :command="{key: 'selectPreference',value: 'afterDate'}">
                  Select application Preference...
                </el-dropdown-item>
                <el-dropdown-item :command="{key: 'noLimit',value: 'afterDate'}">
                  No limit
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-input>
        </el-form-item>
      </el-row>

      <el-row
        v-if="['6','7','8'].includes(currentProperty.dataType.value)"
      >
        <el-form-item label="Must be at least">
          <el-input
            ref="atLeast"
            type="text"
          >
            <el-dropdown
              slot="append"
              trigger="click"
              placement="bottom-start"
              style="display: flex; align-items: center; margin-left: 5px"
              @command="selectInputMethod"
            >
              <el-button
                type="text"
                style="padding: 0"
                icon="el-icon-caret-bottom"
              />
              <el-dropdown-menu
                slot="dropdown"
                style="margin-top: 0"
              >
                <el-dropdown-item :command="{key: 'typeANumber', value: 'atLeast'}">
                  Type a number
                </el-dropdown-item>
                <el-dropdown-item :command="{key: 'selectProperty',value: 'atLeast'}">
                  >
                  Select propery...
                </el-dropdown-item>
                <el-dropdown-item :command="{key: 'selectPreference',value: 'atLeast'}">
                  Select application Preference...
                </el-dropdown-item>
                <el-dropdown-item :command="{key: 'noLimit',value: 'atLeast'}">
                  No limit
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-input>
        </el-form-item>
      </el-row>
      <el-row
        v-if="['6','7','8'].includes(currentProperty.dataType.value)"
      >
        <el-form-item label="Must be at most">
          <el-input
            ref="atMost"
            type="text"
          >
            <el-dropdown
              slot="append"
              trigger="click"
              placement="bottom-start"
              style="display: flex; align-items: center; margin-left: 5px"
              @command="selectInputMethod"
            >
              <el-button
                type="text"
                style="padding: 0"
                icon="el-icon-caret-bottom"
              />
              <el-dropdown-menu
                slot="dropdown"
                style="margin-top: 0"
              >
                <el-dropdown-item :command="{key: 'typeANumber', value: 'atMost'}">
                  Type a number
                </el-dropdown-item>
                <el-dropdown-item :command="{key: 'selectProperty',value: 'atMost'}">
                  >
                  Select propery...
                </el-dropdown-item>
                <el-dropdown-item :command="{key: 'selectPreference',value: 'atMost'}">
                  Select application Preference...
                </el-dropdown-item>
                <el-dropdown-item :command="{key: 'noLimit',value: 'atMost'}">
                  No limit
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-input>
        </el-form-item>
      </el-row>
    </div>
    <!-- <select-property-model
      v-if="modal.type === 'selectProperty' && CurrentEntity"
      :dialog-visible.sync="modal.show"
      :result-handler="selectProperyHandler"
      :entity="CurrentEntity"
    />
    <prefModel
      v-if="modal.type === 'selectPreference'"
      :is-open.sync="modal.show"
      :result-handler="onPrefSelected"
    /> -->
  </el-form>
</template>
<script lang="ts">
import { BaseProperty } from "@/models/Properties"
import { Component, Vue, Watch, Prop } from "vue-property-decorator"
import SelectPropertyModal from "@/components/PropertySelector/index.vue"
import prefModel from "@/components/Preferences/prefModel.vue"
@Component({
  name: "data-editor",
  components: { SelectPropertyModal, prefModel }
})
export default class extends Vue {
  @Prop({ required: true }) private property!: BaseProperty;
  defaultValueInputEnabled = false;
  private validationRules = {
    displayName: [
      { required: true, message: "display name required", trigger: "blur" }
    ]
  };

  public model:any = {
    show: false,
    type: "",
    data: {} as any
  };

  selectInputMethod(command:any) {
    console.log("command " + JSON.stringify(command))

    if (command.key === "blank") {
      this.currentProperty.defaultValue = ""
      this.defaultValueInputEnabled = false
    } else if (command.key === "selectProperty") {
      this.model.type = command.key
      this.model.show = true
      this.defaultValueInputEnabled = false
    } else if (command.key === "selectPreference") {
      this.model.type = command.key
      this.model.show = true
      this.defaultValueInputEnabled = false
    } else if (command.key === "typeText") {
      this.defaultValueInputEnabled = true
    } else if (command.key === "today") {
    } else if (command.key === "typeANumber") {
    }
  }

  x_selectInputMethod(command: string, $evt:Event) {
    console.log("command " + command)

    if (command === "blank") {
      this.currentProperty.defaultValue = ""
      this.defaultValueInputEnabled = false
    } else if (command === "selectProperty") {
      this.model.type = command
      this.model.show = true
      this.defaultValueInputEnabled = false
    } else if (command === "selectPreference") {
      this.model.type = command
      this.model.show = true
      this.defaultValueInputEnabled = false
    } else if (command === "typeText") {
      this.defaultValueInputEnabled = true
    } else if (command === "today") {
    }
  }

  onIncludeBlankChanged(value:any) {
    console.log("include Blank changed.....")
    if (!value) {
      this.currentProperty.defaultValue = ""
    }
  }

  selectProperyHandler(value:any) {
    console.log("property selected.....")
  }

  onPrefSelected(value:any) {
    console.log("Preference selected.....")
  }

  private currentProperty!:BaseProperty|any

  @Watch("currentProperty", { immediate: true, deep: true })
  private updateCurrentProperty(prop: Object) {
    this.$emit("update:property", this.currentProperty)
  }

  created() {
    this.currentProperty = this.property
  }
}
</script>
