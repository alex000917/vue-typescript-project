<template>
  <el-dialog
    title="Results Filter"
    :visible.sync="showModal"
    width="50%"
    destroy-on-close
    :close-on-click-modal="false"
    append-to-body
    center
  >
    <filters
      ref="filters"
      :data="[]"
    />
    <template #footer>
      <div
        class="dialog-footer"
      >
        <el-button
          style="margin-right: 20px"
          @click="outerDialogOk()"
        >
          Ok
        </el-button>
        <el-button
          type="text"
          style="text-decoration: underline"
          @click="outerDialogCancel()"
        >
          cancel
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import StateFilter from "./stateFilter.vue"
import EntityCategoryFilter from "./entityCategoryFilter.vue"
import UserRoleFilter from "./userRoleFilter.vue"
import PropertyFilter from "./propertyFilter.vue"
import SqlFilter from "./sqlFilter.vue"
import { filter } from "jszip"
import Filters from "./index.vue"

@Component({
  name: "",
  components: {
    Filters
  }
})
export default class extends Vue {
  @Prop({ required: true }) private visible!: boolean;
  @Prop({ required: false }) private resultHandler!: () => {}

  get showModal(): boolean {
    return this.visible
  }

  set showModal(value: boolean) {
    this.$emit("update:visible", value)
  }

  outerDialogOk() {
    this.showModal = false
    // TODO
    // data = this.$refs.filters.data
    // this.resultHandler(data)
  }

  outerDialogCancel() {
    this.showModal = false
  }
}
</script>

<style lang="scss" scoped>
.outer-modal-container {
  .command-container {
    margin: 20px 0;
    .command-button {
      text-align: center;
      .button-text {
        text-decoration: underline;
      }
    }
  }
  .table-container {
    width: 100%;
    height: 250px;
    border: 1px solid $borderGray;
    overflow: auto;
  }
}
</style>
