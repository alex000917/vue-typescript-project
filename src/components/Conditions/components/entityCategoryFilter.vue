<template>
  <el-dialog
    width="30%"
    title="Entity Category Condition"
    :visible.sync="showModal"
    destroy-on-close
    :close-on-click-modal="false"
    append-to-body
    class="filter-container"
  >
    <div
      class="select-container"
      style=""
    >
      <div class="select-label">Entity Category of the:</div>
      <el-select
        v-model="entityScope.name"
        placeholder="Select"
      >
        <el-option
          v-for="item in WorkflowList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="select-container margin-top-20">
      <div class="select-label" />
      <el-select
        v-model="entityScope.operator"
        placeholder="Select"
      >
        <el-option
          v-for="item in operatorList"
          :key="item.key"
          :label="item.key"
          :value="item.value"
        />
      </el-select>
    </div>
    <el-row class="margin-top-20">
      <div class="list-container">
        <el-button
          v-for="(item, index) in entityScope.secondaryOperand"
          :key="item.key"
          @click="deleteItem(index)"
          class="list-item"
        >
          {{ item.key }}
        </el-button>
      </div>
    </el-row>
    <div class="margin-top-20 browse-container">
      <div style="padding-right: 10px">
        <el-autocomplete
          v-model="autoCompleteText"
          style="width: 200px"
          :fetch-suggestions="querySearch"
          placeholder="Enter Entity Category"
          value-key="displayName"
          clearable
          @select="handleSelect"
        />
      </div>
      <div>
        <el-button @click="showBrowseDialog = true">Browse</el-button>
      </div>
    </div>
    <div slot="footer">
      <el-button
        class="margin-top-20"
        @click="okHandler"
      > Ok </el-button>
      <el-button
        type="text"
        style="text-decoration: underline"
        @click="cancelHandler"
      >
        cancel
      </el-button>
    </div>

    <browse-item
      v-if="showBrowseDialog"
      :dialogVisible.sync="showBrowseDialog"
      :itemList="EntityCategories"
      :result.sync="selectedCategory"
      keyName="key"
      @onUpdate="onListUpdate"
    />
  </el-dialog>
</template>
<script lang='ts'>
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { ElForm } from "element-ui/types/form";
import { EntityCategoryCondition, StatusCondition } from "@/models/Conditions";
import { EntitiesModule } from "@/store/modules/entitiesMod";
import BrowseItem from "./browseItem.vue";
import { KeyValue } from "@/models/KeyValue";
import { Status } from "@/models/Status";
import { WorkflowModule } from "@/store/modules/WorkflowMod";

@Component({
  name: "entity-category-condition-modal",
  components: {
    BrowseItem,
  },
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) condition!: StatusCondition | undefined;

  private get WorkflowList() {
    return [new KeyValue(this.Entity?.id, this.Entity?.displayName)];
  }

  private get EntityCategories() {
    return this._categories.map((c) => {
      return { key: c.key, displayName: c.value };
    });
  }

  private get Entity() {
    return EntitiesModule.currentEntity;
  }

  private entityScope = {
    mainOperand: [],
    secondaryOperand: [],
    operator: "1",
  } as any;

  private autoCompleteText = "";
  private items: any = [];

  private formRules = {
    name: [
      {
        required: true,
        message: "Please select entity category",
        trigger: "change",
      },
    ],
  };

  get showModal() {
    return this.dialogVisible;
  }

  set showModal(val: boolean) {
    this.$emit("update:dialogVisible", val);
  }

  _categories: any[] = [];

  @Watch("dialogVisible", { deep: true, immediate: true })
  setUp(val: boolean) {
    if (this.condition && this.condition.mainOperand?.length) {
      this.entityScope = { ...this.condition };
      if (
        this.entityScope.mainOperand &&
        this.entityScope.mainOperand.length > 1
      ) {
        this.entityScope.name = this.entityScope.mainOperand[1].value;
      }
    } else {
      if (this.Entity)
        EntitiesModule.getEntityCategories(this.Entity.id).then(
          (categories: any[]) => {
            this._categories = categories;
          }
        );

      this.entityScope.mainOperand = this.Entity?.defaultColumns.find(
        (c) => c.key == "CATEGORY"
      )?.value;

      if (this.condition) {
        this.entityScope.operator = this.condition.operator;

        if (this.condition.secondaryOperand) {
          this.entityScope.secondaryOperand = this.condition.secondaryOperand;
          this.selectedCategory = this.condition.secondaryOperand.map(
            (c) => c.key
          );

          console.log(this.condition.secondaryOperand);
        }
      }
    }
  }

  mounted() {}

  querySearch(queryString: string, cb: any) {
    const items = queryString
      ? this.EntityCategories?.filter(this.createFilter(queryString))
      : this.EntityCategories;
    cb(items);
  }

  createFilter(queryString: string) {
    return (item: any) => {
      return (
        item.displayName.toLowerCase().indexOf(queryString.toLowerCase()) > -1
      );
    };
  }

  get operatorList() {
    return [
      {
        key: "Is equal to",
        value: "1",
      },
      {
        key: "Is not equal to",
        value: "2",
      },
    ];
  }

  private showBrowseDialog: boolean = false;

  deleteItem(key: number) {
    this.entityScope.secondaryOperand.splice(key, 1);
  }

  handleSelect(item: any) {
    console.log(item);
    this.entityScope.secondaryOperand.push(
      new KeyValue(item.displayName, item.systemName, item.displayName)
    );
    this.autoCompleteText = "";
  }

  async okHandler() {
    let entityCategoryCondition = new EntityCategoryCondition();
    entityCategoryCondition.operator = this.entityScope.operator;
    if (
      this.entityScope.mainOperand &&
      this.entityScope.mainOperand.length > 1
    ) {
      let rs = await EntitiesModule.getEntity(
        this.entityScope.mainOperand[0].value
      );
      this.entityScope.mainOperand[0].displayName = rs.displayName;
      rs = await EntitiesModule.getEntity(
        this.entityScope.mainOperand[1].value
      );
      this.entityScope.mainOperand[1].displayName = rs.displayName;
    }
    entityCategoryCondition.mainOperand = this.entityScope.mainOperand;
    entityCategoryCondition.secondaryOperand =
      this.entityScope.secondaryOperand;

    this.$emit("onSave", entityCategoryCondition);
    this.showModal = false;
  }

  cancelHandler() {
    this.showModal = false;
  }

  selectedCategory: any[] = [];

  _selectedCategory = [];
  onListUpdate(result: any) {
    this.entityScope.secondaryOperand = this._categories?.filter((c) =>
      result.includes(c.key)
    );

    this._selectedCategory = result;
    this.selectedCategory = this._selectedCategory;
  }
}
</script>

<style lang='scss' scoped>
.margin-top-20 {
  margin-top: 20px;
}
.filter-container {
  .select-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .select-label {
      min-width: 150px;
    }
  }
  .filter-footer {
    text-align: center;
    padding-top: 5px;
    border-top: 1px solid $borderGray;
  }
  .list-container {
    width: 100%;
    height: 150px;
    border: 1px solid $borderGray;
    overflow: auto;
    .list-item {
      text-align: left;
      width: 100%;
      margin: 0;
      border: none;
    }
  }
  .browse-container {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
