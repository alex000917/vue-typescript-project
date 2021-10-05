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
      <el-row
        style="align-items: center"
        type="flex"
      >
        <el-form-item prop="property">
          <el-input
            type="text"
            style="padding-right: 30px"
            v-model="entityScope.propertyText"
            readonly
          />
        </el-form-item>

        <el-button
          type="text"
          @click="selectPropertyModal = true"
        >
          <el-image src="/assets/img/form-document-16x16.png" />
        </el-button>
      </el-row>
      <el-row>
        <span>Item conditions:</span>
      </el-row>
      <el-row>
        <div class="outer-modal-container">
          <slot name="description" />
          <el-row
            type="flex"
            class="command-container"
          >
            <el-col
              :span="5"
              class="command-button"
            >
              <el-button
                type="text"
                icon="el-icon-user"
                :title="
                  lpmInstance.getLocalizedString(
                    languagesPresentationModel.NEW_ROLE_GROUP
                  )
                "
              >
                <span
                  class="button-text"
                  @click="showRoleGroupPopup('new')"
                >{{
                  lpmInstance.getLocalizedString(
                    languagesPresentationModel.NEW_ROLE_GROUP
                  )
                }}</span>
              </el-button>
            </el-col>
            <el-col
              v-if="showFiltersButton"
              class="command-button"
            >
              <el-dropdown
                trigger="click"
                size="small"
                placement="bottom-start"
                @command="newFilterHandler"
              >
                <el-button
                  type="text"
                  icon="el-icon-brush"
                >
                  <span class="button-text">New Filter</span>
                </el-button>
                <el-dropdown-menu
                  slot="dropdown"
                  style="margin-top: 0"
                >
                  <el-dropdown-item
                    v-for="filter in filtersList"
                    :key="filter.id"
                    :command="filter.id"
                  >
                    {{ filter.label }} filter...
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <el-col
              :span="5"
              class="command-button"
            >
              <el-dropdown
                trigger="click"
                size="small"
                placement="bottom-start"
                @command="newFilterHandler"
                ref="dropdown"
              >
                <el-button
                  type="text"
                  icon="el-icon-brush"
                  :disabled="!showConditionsButton"
                  @click="handleChange"
                >
                  <span class="button-text">New Condition </span>
                </el-button>
                <el-dropdown-menu
                  slot="dropdown"
                  style="margin-top: 0"
                >
                  <el-dropdown-item
                    v-for="condition in conditionsList"
                    :key="condition.id"
                    :command="condition.id"
                  >
                    {{ condition.label }} Conditions...
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <el-col
              :span="2"
              class="command-button"
            >
              <el-button
                type="text"
                icon="el-icon-edit-outline"
                @click="editCondition"
              >
                <span class="button-text">Edit</span>
              </el-button>
            </el-col>
            <el-col
              :span="2"
              class="command-button"
            >
              <el-button
                type="text"
                icon="el-icon-delete"
              >
                <span class="button-text">Delete</span>
              </el-button>
            </el-col>
          </el-row>
          <div
            class="table-container"
            :class="conditionsDivHeight ? 'table-container-small' : ''"
          >
            <el-tree
              :data="getTreeItems"
              accordion
              :props="defaultTreeProps"
              default-expand-all
              class="tree-container"
              @node-click="handleNodeClick"
            >
              <span
                slot-scope="{ node, data }"
                class="custom-tree-node"
              >
                <div style="display: flex; align-items: center">
                  <el-image
                    style="width: 20px; height: 20px"
                    :src="
                      data.key === `everyone`
                        ? `/assets/img/approved-by-32x32.png`
                        : `/assets/img/User-set-in-an-application-preference16x16.png`
                    "
                  />
                  <span style="margin-left: 5px">
                    {{ node.label }}
                  </span>
                </div>
              </span>
            </el-tree>
          </div>
        </div>
      </el-row>
      <el-row style="margin-top: 20px">
        <span>This item set condition passes when:
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
        <el-checkbox v-model="entityScope.skipConditionIfSetIsEmpty">Skip this item set condition if the set is empty.</el-checkbox>
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
      <el-button
        style="margin-right: 20px"
        @click="okHandler"
      > Ok </el-button>
      <el-button
        style="margin-right: 20px"
        @click="cancelHandler"
      >
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

    <entity-condition-modal
      key="entityCategory"
      :dialogVisible.sync="showFilterModal['EntityCategoryCondition']"
      :condition.sync="currentCondition"
      @onSave="onSave"
    />
    <attachment-condition-modal
      :dialogVisible.sync="showFilterModal['AttachmentCondition']"
      :condition.sync="currentCondition"
      @onSave="onSave"
    />
    <javascript-condition-modal
      :dialogVisible.sync="showFilterModal['JavascriptCondition']"
      :condition.sync="currentCondition"
      @onSave="onSave"
    />
    <property-filter
      :dialogVisible.sync="showFilterModal['PropertyCondition']"
      :condition.sync="currentCondition"
      @onSave="onSave"
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
import { RoleGroup } from "@/models/RoleGroup";
import { LanguagesPresentationModel } from "@/models/Utils/LanguagesPresentationModel";

import PropertyFilter from "@/components/Conditions/components/propertyFilter.vue";
import EntityConditionModal from "@/components/Conditions/components/entityFilter.vue";
import AttachmentConditionModal from "@/components/Conditions/components/attachmentFilter.vue";
import JavascriptConditionModal from "@/components/Conditions/components/javascriptCondition.vue";

import {
  BaseCondition,
  PropertyCondition,
  EntityCategoryCondition,
  AttachmentCondition,
  RoleCondition,
  JavascriptCondition,
} from "@/models/Conditions";

@Component({
  name: "",
  components: {
    SelectPropertyModel,
    prefModel,
    conditionTree: () => import("@/components/Conditions/index.vue"),

    PropertyFilter,
    EntityConditionModal,
    AttachmentConditionModal,
    JavascriptConditionModal,
  },
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) condition!: ItemSetCondition;
  selectedCondition = null;
  selectedPassCondition = 1;


  private lpmInstance = LanguagesPresentationModel.getInstance();

  private conditionsList = [
    { id: "PropertyCondition", label: "Property" },
    { id: "EntityCategoryCondition", label: "Entity category" },
    { id: "JavascriptCondition", label: "Javscript" },
    { id: "AttachmentCondition", label: "Attachment" },
  ];

  private showFilterModal: any = {
    EntityCategoryCondition1: false,
    userRole: false,
    PropertyCondition1: false,
    WorkflowCondition1: false,
    AttachmentCondition1: false,
  };

  //Total Data
  private roleGroups: RoleGroup[] = [];
  //Tree Data
  private treeItems: any[] = [];
  private defaultTreeProps = {
    children: "children",
    label: "label",
  };

  private currentRoleGroup: RoleGroup | null = new RoleGroup();
  private currentCondition: BaseCondition | any = null;
  private selectedRoleGroupIndex = -1;
  private selectedConditionIndex = -1;

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

  allowedProperties = ["9", "10", "11"];

  private entityScope = {
    propertyText: "",
    property: [],
    restriction: new Restriction(),
    selectedPassCondition: 1,
    skipConditionIfSetIsEmpty: false,
    displayName: "",
  };

  // get roleGroups() {
  //   if (this.condition) return this.condition.restriction?.roleGroups;
  //   else return [];
  // }

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
      },
    ],
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

  mounted() {
    if (this.condition) {
      this.entityScope.restriction = this.condition.restriction as Restriction;
      this.entityScope.property = this.condition.property as any;
      this.resultHandler(this.entityScope.property as any).then();
      this.entityScope.selectedPassCondition = this.condition
        .itemSetConditionType as number;
      this.entityScope.displayName = this.condition.displayName as string;
      this.entityScope.skipConditionIfSetIsEmpty =
        this.condition.skipConditionIfSetIsEmpty;
    }
  }

  handleChange() {
    this.$nextTick(() => {
      this.$refs.dropdown.show();
    });
  }

  newFilterHandler(command: string) {
    console.log("command", command);
    this.selectedConditionIndex = -1;
    switch (command) {
      case "PropertyCondition":
        this.currentCondition = new PropertyCondition();
        break;
      case "EntityCategoryCondition":
        this.currentCondition = new EntityCategoryCondition();
        break;
      case "JavascriptCondition":
        this.currentCondition = new JavascriptCondition();
        break;
      case "AttachmentCondition":
        this.currentCondition = new AttachmentCondition();
        break;
      default:
        break;
    }
    this.editCondition();
  }

  editCondition() {
    this.showFilterModal[this.currentCondition.myspType] = true;
    console.log(
      this.currentCondition.myspType,
      this.showFilterModal[this.currentCondition.myspType]
    );
  }

  onSave(condition: any) {
    console.log("condition", condition);
    if (!this.currentRoleGroup) this.currentRoleGroup = new RoleGroup();

    let children: any = [];

    if (this.selectedConditionIndex === -1) {
      this.selectedConditionIndex = this.currentRoleGroup.conditions.length;
      this.currentRoleGroup.conditions.push(condition);
      this.roleGroups[this.selectedRoleGroupIndex] = this.currentRoleGroup;
      let index: string =
        "" + this.selectedRoleGroupIndex + "-" + this.selectedConditionIndex;
      this.treeItems[this.selectedRoleGroupIndex].children.push({
        key: "",
        label: condition.getDisplayName(),
        index: index,
        children: children ? children : [],
      });
      if (condition.myspType === "PropertyCondition") {
        if (condition.skipConditionIfMainOperandIsEmpty)
          children.push({
            label: condition.getSkipMailOperandAlert(),
            key: "",
            index: index,
          });
        if (condition.skipConditionIfSecondaryOperandIsEmpty)
          children.push({
            label: condition.getSkipSecondOperandAlert(),
            key: "",
            index: index,
          });
      }
    } else {
      let index: string =
        "" +
        this.selectedRoleGroupIndex +
        "-" +
        this.currentRoleGroup.conditions.length;
      this.currentRoleGroup.conditions[this.selectedConditionIndex] = condition;
      this.treeItems[this.selectedRoleGroupIndex].children[
        this.selectedConditionIndex
      ].label = condition.getDisplayName();
      this.treeItems[this.selectedRoleGroupIndex].children[
        this.selectedConditionIndex
      ].children = children ? children : [];
      if (condition.myspType === "PropertyCondition") {
        if (condition.skipConditionIfMainOperandIsEmpty)
          children.push({
            label: condition.getSkipMailOperandAlert(),
            key: "",
            index: index,
          });
        if (condition.skipConditionIfSecondaryOperandIsEmpty)
          children.push({
            label: condition.getSkipSecondOperandAlert(),
            key: "",
            index: index,
          });
      }
    }

    this.currentCondition = condition;
  }

  handleClose() {
    this.showModal = false;
  }

  okHandler() {
    this.$emit("onSave", this.entityScope);
    this.showModal = false;
  }

  cancelHandler() {
    this.showModal = false;
  }

  onAddEveryone() {}

  onNewConditionSelect() {}

  async resultHandler(result: PropertySelectorPath) {
    const copy = JSON.parse(JSON.stringify(result));
    this.resolveDisplayName(copy).then((name) => {
      if (name) this.entityScope.propertyText = `[${name}]`;
      this.entityScope.property = copy;
    });
  }

  private async resolveDisplayName(data: any) {
    let str = "";
    if (typeof data === "object") {
      if (Array.isArray(data)) {
        if (
          ApplicationPreferenceFactory.isKeyValueArrayApplicationPreference(
            data
          )
        ) {
          const list = AppPreferencesModule.Preferences;
          const pref = list.find((x) => {
            return x.systemName === data[1].key;
          });

          return pref?.displayName;
        }

        let entity: Entity | null = null;
        for (const item of data) {
          if (item.value) {
            entity = await EntitiesModule.getEntity(item.value);

            str += entity?.displayName + " : ";
          } else {
            const prop = entity?.properties.find(
              (x) => x.systemName === item.key
            );
            str += prop?.displayName;
          }
        }
        return str;
      }
    } else {
      str = data;
    }

    return str;
  }
}
</script>

<style lang='scss' scoped>
.outer-modal-container {
  .command-container {
    margin: 20px 0;
    .command-button {
      text-align: left;
      .button-text {
        text-decoration: underline;
      }
    }
  }
  .table-container {
    width: 100%;
    height: 250px;
    border: 1px solid lightgrey;
    overflow: auto;
  }
  .table-container-small {
    height: 50px;
  }
}
</style>
