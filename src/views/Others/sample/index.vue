<template>
  <el-container>
    <el-aside>
      <el-table
        ref="singleTable"
        :data="sortedProperties"
        highlight-current-row
        style="width: 100%"
        max-height="600"
        @current-change="handleCurrentChange"
      >
        <el-table-column
          property="displayName"
          label="Name"
        >
          <template slot-scope="scope">
            <el-image
              style="height: 16px; width: 16px"
              :src="getIcon(scope.row.dataType.value)"
              fit="fill"
            />
            <span> {{ scope.row.displayName }} </span>
          </template>
        </el-table-column>
        <el-table-column
          property="dataType.value"
          width="40"
        />
      </el-table>
    </el-aside>
    <el-main v-if="selectedProperty">
      <!-- <StringProperty
        v-if="['1', '2'].includes(selectedProperty.dataType.value)"
        :key="selectedProperty"
        :property="selectedProperty"
      />
      <ChoiceProperty
        v-if="['3'].includes(selectedProperty.dataType.value)"
        :key="selectedProperty"
        :property="selectedProperty"
      />
      <DateTimeProperty
        v-else-if="['4'].includes(selectedProperty.dataType.value)"
        :key="selectedProperty"
        :property="selectedProperty"
      />
      <NumericProperty
        v-else-if="['6', '7', '8'].includes(selectedProperty.dataType.value)"
        :key="selectedProperty"
        :property="selectedProperty"
      />
      <LookupsProperty
        v-else-if="['9', '10', '11'].includes(selectedProperty.dataType.value)"
        :key="selectedProperty"
        :property="selectedProperty"
      />
      <span v-else>unkonwn property </span>
      -->
      <PropertyEditor
        :key="selectedProperty.systemName"
        :property="selectedProperty"
      />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import StringProperty from "@/views/entities/components/propertyEditor/stringProperty.vue"
import { Entity } from "@/models/Entity"
import { EntitiesModule } from "@/store/modules/entitiesMod"
import { BaseProperty } from "@/models/Properties"
import { DataTypeFactory } from "@/models/Utils/DataTypeFactory"
import PropertyEditor from "@/views/entities/components/propertyEditor/index.vue"
@Component({
  name: "sample",
  components: {
    PropertyEditor
  }
})
export default class extends Vue {
  showModel = false;
  tags: any[] = [];
  private riskEntity: Entity | null = null;

  selectedProperty :BaseProperty|null = null

  get CurrentEntity() {
    return EntitiesModule.getCurrentEntity
  }

  get properties() {
    return this.CurrentEntity?.properties
  }

  get sortedProperties() {
    const sorted = this.properties.sort((x, y) => {
      if (parseInt(x.dataType?.value) > parseInt(y.dataType?.value)) {
        return 1
      }
      if (parseInt(x.dataType?.value) < parseInt(y.dataType?.value)) {
        return -1
      }
      return 0
    })
    return sorted
  }

  entityId = "com.msp.dao.entities.Risk"
  async getEntity() {
    await EntitiesModule.getEntityToEdit(this.entityId)
  }

  getIcon(dataTypeValue:string) {
    return DataTypeFactory.getDataTypeIcon(dataTypeValue)
  }

  handleCurrentChange(value:any) {
    // const prop = this.properties.find(x => x.displayName === value.value)
    // if (prop) {
    this.selectedProperty = value
    // } else {
    //   this.selectedProperty = null
    // }
  }

  async created() {
    await this.getEntity()
  }

  showRec = false;

  onOkRecipients(value: Notification) {
    alert("show rec ok")
    this.showRec = false
  }

  onCancelRecipients(value: any) {
    this.showRec = false
  }
}
</script>
<style lang="scss" scoped>
.tags-container {
  background-color: white;
  border: 1px solid $borderGray;
  line-height: 30px;
  max-height: 50px;
  overflow: auto;
  display: inline-flex;
  width: 450px;

  .tag-item {
    border-color: $borderGray;
    color: $borderGray;
    margin: 0 5px;
  }
}
</style>
