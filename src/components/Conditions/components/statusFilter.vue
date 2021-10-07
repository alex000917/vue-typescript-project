<template>
  <el-dialog
    width="30%"
    title="Status Condition"
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
      <div class="select-label">Status of the:</div>
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
          :key="item.value"
          :label="item.key"
          :value="item.key"
        />
      </el-select>
    </div>
    <el-row class="margin-top-20">
      <div class="list-container">
        <el-button
          v-for="(item, index) in entityScope.secondaryOperand"
          :key="item.key"
          @click = "deleteItem(index)"
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
          placeholder="Enter Status"
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
      :itemList="Status"
      :selectedItems="selectedStatus"
      keyName="systemName"
      @onUpdate="onStatusUpdate"
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

@Component({
  name: "status-condition-modal",
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

  private get Status() {
    return this.Entity?.status;
  }

  private get Entity() {
    return EntitiesModule.currentEntity;
  }

  private entityScope = {
    mainOperand: [],
    secondaryOperand: [],
    operator: "",
    name: "",
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

  @Watch("dialogVisible", { deep: true, immediate: true })
  setUp(val: boolean) {
    if (val)
      if (this.condition?.mainOperand?.length) {
        this.entityScope = { ...this.condition };
        if (
          this.entityScope.mainOperand &&
          this.entityScope.mainOperand.length > 1
        ) {
          this.entityScope.name = this.entityScope.mainOperand[1].value;
        }
      } else {
        let status = this.Entity?.defaultColumns.find((c) => c.key == "STATUS");
        console.log(status);
        if (status) this.entityScope.mainOperand = status.value;

        this.entityScope.mainOperand = this.Entity?.defaultColumns.find(
          (c) => c.key == "STATUS"
        )?.value;
        console.log("status", this.entityScope.mainOperand);
        this.entityScope.name = "";
        this.entityScope.operator = "";
        this.entityScope.secondaryOperand = [];
      }
  }

  mounted() {}

  querySearch(queryString: string, cb: any) {
    const items = queryString
      ? this.Status?.filter(this.createFilter(queryString))
      : this.Status;
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

  handleSelect(item: Status) {
    this.entityScope.secondaryOperand.push(
      new KeyValue(item.displayName, item.systemName, item.displayName)
    );
    this.autoCompleteText = "";
  }

  async okHandler() {
    let statusCondition = new StatusCondition();
    statusCondition.operator = this.entityScope.operator;
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
    statusCondition.mainOperand = this.entityScope.mainOperand;
    statusCondition.secondaryOperand = this.entityScope.secondaryOperand;

    this.$emit("onSave", statusCondition);
    this.showModal = false;
  }

  cancelHandler() {
    this.showModal = false;
  }

  selectedStatus: any[] = [];

  _selectedStatus = [];
  onStatusUpdate(result: any) {
    this.entityScope.secondaryOperand = this.Status?.filter((c) =>
      result.includes(c.systemName)
    ).map((d) => {
      return new KeyValue(d.displayName, d.systemName, d.displayName);
    }) as any;

    this._selectedStatus = result;
    this.selectedStatus = this._selectedStatus;
  }
}
</script>

<style lang='scss' scoped>
.margin-top-20 {
  margin-top: 20px;
}
.filter-container {
  z-index: 3000;
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
