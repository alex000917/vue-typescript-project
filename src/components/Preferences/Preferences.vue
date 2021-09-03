<template>
  <el-row>
    <el-col>
      <miniTable
        :columns="fields"

        :items="displayPreferences"
        :type-options="propertyDataTypes"
        :search-type-key="'dataType'"
        :search-on-field="'displayName'"
        :selected-row.sync="selectedRow"
        :selected-row-index.sync="selectedRowIndex"
        @onRowSelected="onRowSelected"
      >
        <el-button-group
          slot="commands"
          class="button-group-container"
        >
          <el-button
            type="text"
            class="button-item"
            title="create New Form"
            icon="el-icon-circle-plus"
            @click="
              showNewForm = !showNewForm;
              dialogAction = 0;
            "
          />
          <el-dialog
            ref="dialog"
            max-height="70%"
            :visible.sync="showNewForm"
            title="Application Preference"
            destroy-on-close
            :close-on-click-modal="false"
            append-to-body
          >
            <NewPreferences
              ref="preference"
              :visible.sync="showNewForm"
              :dialog-action="dialogAction"
              :selected-row-index="selectedRowIndex"
            />
          </el-dialog>

          <el-button
            :disabled="selectedRowIndex === -1 ? true : false"
            class="button-item"
            type="text"
            title="Edit"
            icon="el-icon-edit"
            @click="showEditForm = true"
          />
          <editPreference
            :is-open="showEditForm"
            :record="selectedRow"
            :update-handler="onEditPreferenceUpdate"
            @cancel="onEditCancel"
          />
          <el-button
            class="button-item"
            type="text"
            title="Delete"
            icon="el-icon-delete"
            :disabled="selectedRowIndex === -1 ? true : false"
            @click="onDeletePreferences"
          />
        </el-button-group>
      </miniTable>
    </el-col>
  </el-row>
</template>
<script lang="ts">
// import { RSA_PKCS1_PADDING } from "constants"
import { Component, Vue, Prop, Watch } from "vue-property-decorator"
import NewPreferences from "./components/NewPreferences.vue"
import editPreference from "./components/editPreference.vue"
import { AppPreferencesModule } from "@/store/modules/AppPreferencesMod"
import { FlexPreferencesModule } from "@/store/modules/AppFlexPreferencesMod"
import { AppCacheModule } from "@/store/modules/appCache"
import miniTable from "@/components/Tables/miniTable.vue"

import { PropertyFactory } from "../../models/Utils/PropertyFactory"
import { ApplicationPreference } from "../../models/ApplicationPreference"
@Component({
  name: "Perfrences",
  components: { NewPreferences, editPreference, miniTable }
})
export default class extends Vue {
  @Prop({ required: false }) allowedProperties!: string[];
  selectedRow: ApplicationPreference | null = null;
  dialog = {} as any;
  dialogAction = 0;
  selectedRowIndex = -1;
  showNewForm = false;
  selectedPropertyType = null;
  showEditForm = false;

  tableData = [];
  fields = [
    {
      field: "displayName",
      label: "Name",
      sortable: true,
      "min-width": "200"
    },
    {
      field: "value",
      label: "Value",
      sortable: true,
      "min-width": "250"
    },
    {
      field: "description",
      label: "description"
    }
  ];

  get validProperties() {
    return this.allowedProperties
  }

  get displayPreferences() {
    if (this.validProperties) {
      return this.appPreferences.filter((x) =>
        this.validProperties.includes(x.dataType as string)
      )
    } else {
      return this.appPreferences
    }
  }

  get appPreferences() {
    const pref = AppPreferencesModule.Preferences
    return pref
  }

  get propertyDataTypes() {
    const rs = AppCacheModule.FlexSettings
    const types = rs.propertyDataTypes
    return types
  }

  // Preferences = [] as any;

  mounted() {
    // this.Preferences = AppCacheModule.Preferences as any[]
  }

  onDeletePreferences() {
    const record = this.appPreferences[this.selectedRowIndex]
    this.$confirm("Are you sure to delete \"" + record.displayName + "\"?")
      .then(() => {
        AppPreferencesModule.delete(record)
        this.selectedRowIndex = -1
      })
      .catch(() => {
        return false
      })
  }

  onRowSelected(value: ApplicationPreference) {
    this.$emit("onSelectedRowChanged", value)
    this.selectedRow = value
    console.log("selected pref " + value)
  }

  onEditPreferenceUpdate(value: ApplicationPreference) {
    AppPreferencesModule.upSert(value)
    this.showEditForm = false
  }

  onEditCancel() {
    this.showEditForm = false
  }
}
</script>

<style>
table.vgt-table {
  font-size: smaller;
  border-collapse: collapse;
  background-color: white;
  width: 100%;
  max-width: 100%;
  max-height: 70%;
  overflow: auto;
  table-layout: auto;
  border: 1px solid $border-color;
  & td {
    padding: 0.75em 0.75em 0.75em 0.75em;
    vertical-align: top;
    border-bottom: 1px solid $border-color;
    color: $text-color;
  }
  & tr.clickable {
    cursor: pointer;
    &:hover {
      background-color: $highlight-color;
    }
  }
}

.button-group-container {
  display: inline-flex;
  float: right;
  .button-item {
    padding-left: 30px;
  }
}
.button-item {
  padding-left: 15px;
}
.table-container {
  width: 100%;
  overflow: auto;
}
</style>
