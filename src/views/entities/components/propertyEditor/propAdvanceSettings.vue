<template>
  <el-form
    v-if="currentProperty"
    :model="currentProperty"
    :rules="validationRules"
    style="padding:10px"
    label-position="left"
  >
    <div style="padding-left:20px">
      <el-row
        type="flex"
      >
        <el-col :span="6">
          Tabular Reports Property Category
        </el-col>
        <el-col :span="18">
          <el-form-item>
            <el-input
              v-model="currentProperty.tabularReportsCategory"
              style="max-width:500px"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          Notes
        </el-col>
        <el-col :span="18">
          <el-form-item>
            <el-input
              v-model="currentProperty.notes"
              class="advanced-item-input"
              size="mini"
              type="textarea"
              :autosize="{maxRows: 3}"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        v-if="['11', '10'].includes(currentProperty.dataType.value)"
        type="flex"
        align="middle"
      >
        <el-form-item label="Order by">
          <el-input
            v-model="currentProperty.orderByColumnName"
            class="advanced-item-input"
            size="mini"
          />
        </el-form-item>
      </el-row>
      <el-row
        v-if="['10'].includes(currentProperty.dataType.value)"
        type="flex"
        align="middle"
      >
        <el-form-item label="Row filter">
          <el-input
            v-model="currentProperty.filter"
            class="advanced-item-input"
            size="mini"
            type="textarea"
            :autosize="{maxRows: 5}"
          />
        </el-form-item>
      </el-row>
      <el-row>
        <el-switch v-model="currentProperty.excludePropertyFromEventsGenerator" />Exclude this property from events
      </el-row>
      <el-row>
        <div>
          System name: <b>{{ currentProperty.systemName }}</b> | Database key column name: <b>{{ currentProperty.databaseColumnName }}</b>
        </div>
        <!-- <div>Database table name: <b>{{ currentProperty.table }}</b></div>-->
      </el-row>
    </div>
  </el-form>
</template>
<script lang="ts">

import { LanguageTranslation } from "@/models/LanguageTranslation"
import { BaseProperty } from "@/models/Properties"
import { Component, Prop, Vue } from "vue-property-decorator"

@Component({
  name: "PropAdvanceSettings",
  components: {

  }
})
export default class extends Vue {
 @Prop({ required: true }) private property!:BaseProperty

  private validationRules = {

    systemName: [
      { required: true, message: "System Name required", trigger: "blur" }
    ]

  };

  currentProperty:BaseProperty |null = null
  created() {
    if (this.property) { this.currentProperty = this.property }
  }
}
</script>
