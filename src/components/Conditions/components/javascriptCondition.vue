<template>
  <el-dialog
    width="25%"
    title="Javascript condition"
    :visible.sync="showModal"

    class="filter-container"
    destroy-on-close
    :close-on-click-modal="false"
    append-to-body
  >
    <el-row
      type="flex"
      style="align-items: center"
    >
      <div style="min-width: 100px">
        Display Name
      </div>
      <el-input
        v-model="items.displayName"
        type="text"
      />
    </el-row>
    <el-row style="margin-top: 20px">
      <div style="margin-bottom: 5px">
        Enter Javascript code that can be evaluated as true or flase
      </div>
      <el-input
        v-model="items.text"
        type="textarea"
        :autosize="{minRows: 5}"
      />
    </el-row>
    <div style="text-align: right">
      <el-button
        type="text"
        style="padding: 0; padding-top: 5px"
      >
        <el-image src="/assets/img/help16x16.png" />
      </el-button>
    </div>
    <div
      slot="footer"
    >
      <el-button
        style="margin-right: 20px"
        @click="okHandler"
      >
        Ok
      </el-button>
      <el-button
        type="text"
        style="text-decoration: underline"
        @click="showModal = false"
      >
        cancel
      </el-button>
    </div>
  </el-dialog>
</template>
<script lang='ts'>
import { FreeTextCondition } from "@/models/Conditions";
import { Component, Prop, Watch, Vue } from "vue-property-decorator"

@Component({
  name: "",
  components: {}
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) condition!: FreeTextCondition;

  private items = {};

  get showModal() {
    return this.dialogVisible
  }

  set showModal(val: boolean) {
    this.$emit("update:dialogVisible", val)
  }

  @Watch("condition", { immediate: true, deep: true })
  private setItems(val: any) {
    this.items = { ...val }
    console.log(this.items);
  }

  okHandler() {
    this.$emit("update:condition", this.items)
    this.$emit("onSave", this.items);
    this.showModal = false
  }
}
</script>

<style lang='scss' scoped>
.filter-container {
  .filter-footer {
    text-align: center;
    padding-top: 5px;
    border-top: 1px solid $borderGray;
  }
}
</style>
