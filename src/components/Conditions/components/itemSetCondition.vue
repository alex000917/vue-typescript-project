<template>
  <el-dialog
    width="40%"
    title="Item Set Condition"
    :visible.sync="showModal"
    class="filter-container"
    destroy-on-close
    :close-on-click-modal="false"
    :before-close="handleClose"
    append-to-body
  >
    <el-form
      ref="form"
      label-position="left"
      :model="entityScope"
      :rules="formRules"
    >
      <el-row>
        <span>Set property (Multi lookup or table) :</span>
      </el-row>
      <el-row style="align-items: center" type="flex">
          <el-form-item prop="property">
        <el-input
          type="text"
          style="padding-right: 30px"
          v-model="entityScope.propertyText"
          readonly
        />
          </el-form-item>

        <el-button type="text" @click="selectPropertyModal = true">
          <el-image src="/assets/img/form-document-16x16.png" />
        </el-button>
      </el-row>
      <el-row>
        <span>Item conditions:</span>
      </el-row>
      <el-row>
        <conditionTree
        :visibleConditions="conditionsList"
        :roleGroups="roleGroups"/>
      </el-row>
      <el-row style="margin-top: 20px">
        <span
          >This item set condition passes when:
          <el-select
            placeholder="Select"
            style="min-width: 300px"
            v-model="entityScope.selectedPassCondition"
          >
            <el-option
              v-for="item in passCondition"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </span>
      </el-row>
      <el-row style="margin: 10px 0">
        <el-checkbox v-model="entityScope.skipConditionIfSetIsEmpty"
          >Skip this item set condition if the set is empty.</el-checkbox
        >
      </el-row>
      <el-row>
        <el-col :span="20">
          Item set name <br />
          <el-form-item prop="displayName">
            <el-input v-model="entityScope.displayName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div slot="footer">
      <el-button style="margin-right: 20px" @click="okHandler"> Ok </el-button>
      <el-button style="margin-right: 20px" @click="cancelHandler">
        Cancel
      </el-button>
    </div>

    <select-property-model
      v-if="selectPropertyModal"
      :dialog-visible.sync="selectPropertyModal"
      :result-handler="resultHandler"
      :entity-id="entity.id"
      :allowedProperties="allowedProperties"
    />
  </el-dialog>
</template>
<script lang='ts'>
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
// import SelectProperty from "./selectProperty.vue"
import SelectPropertyModel from "@/components/PropertySelector/index.vue";
import { EntitiesModule } from "@/store/modules/entitiesMod";
import { PropertySelectorPath } from "@/models/PropertySelectorPath";
import prefModel from "@/components/Preferences/prefModel.vue";
import { Entity } from "@/models/Entity";
import { AppPreferencesModule } from "@/store/modules/AppPreferencesMod";
import { ApplicationPreferenceFactory } from "@/models/Utils/ApplicationPreferenceFactory";
import { Restriction } from "@/models/Restriction";
import { ItemSetCondition } from "@/models/Conditions";

@Component({
  name: "",
  components: { SelectPropertyModel, prefModel,
    conditionTree: () => import("@/components/Conditions/index.vue")
   },
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) condition!: ItemSetCondition;
  selectedCondition = null;
  selectedPassCondition = 1;

conditionsList = [
    "property" ,
    "itemset",
    "workflow",
    "status",
    "entityCategory",
    "javascript",
    "attachement"
  ]

  passCondition = [
    {
      value: 1,
      label: "All least passs to conditions",
    },
    {
      value: 2,
      label: "At least one item passes the conditions",
    },
    {
      value: 3,
      label: "At least one item doesn't pass the conditions",
    },
    {
      value: 4,
      label: "None of the item pass the condition",
    },
  ];

  allowedProperties=["9","10","11"];

  private entityScope = {
    propertyText: "",
    property: [],
    restriction: new Restriction(),
    selectedPassCondition:1,
    skipConditionIfSetIsEmpty: false,
    displayName: "",
  };

  get roleGroups(){
    if(this.condition)
      return this.condition.restriction?.roleGroups;
    else
    return [];
  } 

  private formRules = {
    propertyText: [
      {
        required: true,
        message: "Property is required",
        trigger: "change",
      },
    ],
    displayName: [
      {
        required: true,
        message: "Item set is required",
        trigger: "change",
      }
    ]
  };

  selectPropertyModal = false;
  get showModal() {
    return this.dialogVisible;
  }

  set showModal(val: boolean) {
    this.$emit("update:dialogVisible", val);
  }

  get entity() {
    return EntitiesModule.currentEntity;
  }

  mounted(){

    if(this.condition){
      this.entityScope.restriction = this.condition.restriction as Restriction;
      this.entityScope.property = this.condition.property as any;
      this.resultHandler(this.entityScope.property as any).then();
      this.entityScope.selectedPassCondition = this.condition.itemSetConditionType as number;
      this.entityScope.displayName = this.condition.displayName as string;
      this.entityScope.skipConditionIfSetIsEmpty = this.condition.skipConditionIfSetIsEmpty;
    }
  }

  handleClose() {
    this.showModal = false;
  }

  okHandler() {
   this.$emit("onSave",this.entityScope);
   this.showModal = false;
  }

  cancelHandler() {
    this.showModal = false;
  }

  onAddEveryone() {}

  onNewConditionSelect() {}

  async resultHandler(result: PropertySelectorPath) {
    const copy = JSON.parse(JSON.stringify(result))
    this.resolveDisplayName(copy).then((name) => {
        if(name) this.entityScope.propertyText = `[${name}]`;
        this.entityScope.property = copy;
    });
  }

  private async resolveDisplayName(data: any) {
    let str = ""
    if (typeof data === "object") {
      if (Array.isArray(data)) {
        if (
          ApplicationPreferenceFactory.isKeyValueArrayApplicationPreference(
            data
          )
        ) {
          const list = AppPreferencesModule.Preferences
          const pref = list.find((x) => {
            return x.systemName === data[1].key
          })

          return pref?.displayName
        }

        let entity: Entity | null = null
        for (const item of data) {
          if (item.value) {
            entity = await EntitiesModule.getEntity(item.value)

            str += entity?.displayName + " : "
          } else {
            const prop = entity?.properties.find(
              (x) => x.systemName === item.key
            )
            str += prop?.displayName
          }
        }
        return str
      }
    } else {
      str = data
    }

    return str
  }
}
</script>

<style lang='scss' scoped>
</style>
