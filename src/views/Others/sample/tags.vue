<template>
  <el-form>
    <!-- <el-form-item>
      <TagsView
        :items="tags"
        :base-entity-id="entityId"
      />
    </el-form-item> -->

    {{ CurrentEntity.lookupDefaultNameFormat }}
    <el-form-item>
      <!-- <Tags :tagsData="tags2" :baseEntityId="entityId" :allowedProperties="allowedProperties" /> -->
      <Tags
        :data="CurrentEntity.lookupDefaultNameFormat"

        :base-entity-id="entityId"
        :allowed-properties="allowedProperties"
        :allowed-entity-name="allowedLookupName"
      />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { DataTypeFactory } from "@/models/Utils/DataTypeFactory"
import { EntitiesModule } from "@/store/modules/entitiesMod"
import { Component, Vue } from "vue-property-decorator"
import TagsView from "@/components/TagsView/index.vue"

import Tags from "@/components/Tags/index.vue"
import { Entity } from "@/models/Entity"
@Component({
  name: "sample",
  components: { TagsView, Tags }
})
export default class extends Vue {
  showModel = false;
  tags: any[] = [];
  selectedProperty: any;
  allowedProperties=["1", "2"]
  allowedLookupName="user"
  tags2:any[] =[...[{ key: "somthing", value: "somthing" }]]
  get CurrentEntity() {
    return this.entity
  }

  get properties() {
    return this.CurrentEntity?.properties
  }

  entityId = "com.msp.dao.entities.cse.custom.Cse_AxEntity"
  private entity:Entity |null=null;
  async getEntity() {
    this.entity = await EntitiesModule.getEntity(this.entityId)
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

</style>
