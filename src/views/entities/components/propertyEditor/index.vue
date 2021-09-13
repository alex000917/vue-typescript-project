<template>
  <div
    style="background-color:#e2e3e6"
    class="edit-property-container"
  >
    <StringProperty
      v-if="['1', '2'].includes(selectedProperty.dataType.value)"
      :key="selectedProperty.displayName"
      :property="selectedProperty"
      @cancel="onCancel"
      @delete="onDelete"
    />
    <ChoiceProperty
      v-if="['3'].includes(selectedProperty.dataType.value)"
      :key="selectedProperty.displayName"
      :property="selectedProperty"
      @cancel="onCancel"
      @delete="onDelete"
    />
    <DateTimeProperty
      v-else-if="['4'].includes(selectedProperty.dataType.value)"
      :key="selectedProperty.displayName"
      :property="selectedProperty"
      @cancel="onCancel"
      @delete="onDelete"
    />
    <YesNoProperty
      v-if="['5'].includes(selectedProperty.dataType.value)"
      :key="selectedProperty.displayName"
      :property="selectedProperty"
      @cancel="onCancel"
      @delete="onDelete"
    />
    <NumericProperty
      v-else-if="['6', '7', '8'].includes(selectedProperty.dataType.value)"
      :key="selectedProperty.displayName"
      :property="selectedProperty"
      @cancel="onCancel"
      @delete="onDelete"
    />
    <LookupsProperty
      v-else-if="['9', '10', '11'].includes(selectedProperty.dataType.value)"
      :key="selectedProperty.displayName"
      :property="selectedProperty"
      @cancel="onCancel"
      @delete="onDelete"
    />
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { mixins } from "vue-class-component"
import { AppCacheModule } from "@/store/modules/appCache.ts"
import EntitiesMixin from "../../mixin"
// import ChooseOptions from "../../components/chooseOptions.vue"
import SelectPropertyModal from "@/components/PropertySelector/index.vue"
import prefModel from "@/components/Preferences/prefModel.vue"
import { BaseProperty } from "@/models/Properties"
import { EntitiesModule } from "@/store/modules/entitiesMod"
import StringProperty from "@/views/entities/components/propertyEditor/stringProperty.vue"
import NumericProperty from "@/views/entities/components/propertyEditor/numericProperty.vue"
import ChoiceProperty from "@/views/entities/components/propertyEditor/choiceProperty.vue"
import DateTimeProperty from "@/views/entities/components/propertyEditor/datetimeProperty.vue"
import YesNoProperty from "@/views/entities/components/propertyEditor/yesNoProperty.vue"
import LookupsProperty from "@/views/entities/components/propertyEditor/lookupsProperty.vue"
import { DataTypeFactory } from "@/models/Utils/DataTypeFactory"
import { debug } from "console"
@Component({
  name: "PropertyEditor",
  components: {
    StringProperty, NumericProperty, ChoiceProperty, DateTimeProperty, YesNoProperty, LookupsProperty
  }
})
export default class extends mixins(EntitiesMixin) {
  @Prop({ required: true }) private property!: BaseProperty;
  @Prop({ required: false }) private icon!: string;
  // @Prop({ required: true }) private visible!: boolean;

  get selectedProperty() {
    return this.property
  }

  set selectedProperty(prop:BaseProperty) {
    this.$emit("update:property", prop)
  }

  get CurrentEntity() {
    return EntitiesModule.currentEntity
  }

  getIcon(dataTypeValue:string) {
    return DataTypeFactory.getDataTypeIcon(dataTypeValue)
  }

  onCancel() {
    this.$parent.$data.selectedItem = null
    this.$emit("closePropertyEditor")
  }

  onDelete() {
    this.$confirm("[" + this.selectedProperty?.displayName + "] This will delete this property. Continue?", "Warning", {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning"
    }).then(() => {
      this.validateDependencycheck(this.selectedProperty)
    }).catch(err => {
      const msg = (err == "cancel") ? "Delete canceled" : "Delete failed try again!!"
      this.$message({
        type: "info",
        message: msg
      })
    })
  }

  private validateDependencycheck(property:BaseProperty|any) {
    // TODO: validate before delete using
    /**
     *   var dirtyData:SDData = new SDData();

      dirtyData.applicationPreferences = new ArrayCollection(model.dirtyApplicationPreferences.getValues());
      dirtyData.dialogRoles = new ArrayCollection(model.dirtyDialogRoles.getValues());
      dirtyData.entities = new ArrayCollection(model.dirtyEntities.getValues());
      dirtyData.forms = new ArrayCollection(model.dirtyForms.getValues());
      dirtyData.authorizationTrees = new ArrayCollection(model.dirtyAuthorizationTrees.getValues());
      dirtyData.workflows = new ArrayCollection(model.dirtyWorkflows.getValues());
      dirtyData.myWorkPolicies = new ArrayCollection(model.dirtyMyWorkPolicies.getValues());

      executeServiceCall(
              delegate.validateOperationDependency(
                      model.sessionId,
                      args.baseContent,
                      args.baseContentUID,
                      DependencyValidatedOperationType.DELETE,
                      dirtyData
              ),
              validateOperationDependency_ResultHanlder,
              null,
              [args.dependencyValidatedOperationType, args.baseContent, args.returnFunction, null]

              message CANNOT_DELETE_OBJECT_CAUSE_OTHER_USING_IT
     */

    // TODO: update this property delete should include dependency check as avove.
    // const propIndex:number = this.CurrentEntity?.properties.findIndex(x => x.systemName === this.selectedProperty.systemName)
    // if (propIndex > -1) {
    //    this.CurrentEntity?.properties.splice(propIndex, 1)
    //    this.$parent.$data.selectedItem = {}
    //    this.$message({
    //      type: "success",
    //      message: "property deleted"
    //    })
    // }
  }
}
</script>

<style lang='scss' scoped>
.edit-property-container {
  font-weight: 500;
  border-radius: 10px;
  background-color:whitesmoke;
  width: 100%;
  .flex-row {
    .el-button {
      color: gray;
    }
    .el-image {
      width: 16px;
      height: 16px;
      margin: 0 5px;
    }
    display: flex;
    align-items: center;
  }
  .transparent-input {
    margin-left: 45px;
    border: none;
    background: transparent;
    &:focus {
      outline: none;
      background-color: white;
    }
  }
  .type-container {
    align-items: center;
    margin-top: 10px;
    padding-left: 50px;
    span {
      margin-right: 10px;
    }
  }
  .lang-title {
    font-weight: 500;
    font-size: 15px;
    padding-left: 5px;
    border-bottom: solid $borderGray 1px;
  }
  .data-entry-container {
    margin-top: 10px;
    .input-title {
      width: 120px;
    }
    .el-input {
      width: 50%;
    }
  }
  .select-container {
    margin-top: 20px;
  }
  .radio-group-item {
    display: block;
    margin-top: 10px;
  }
  .require-content {
    color: #8e8e8e;
    margin: 0;
    padding: 0;
  }
  .advanced-container {
    margin: 20px 0 0 30px;
    .advanced-item-title {
      width: 210px;
    }
    .advanced-item-input {
      width: 40%;
    }
  }
}
</style>
