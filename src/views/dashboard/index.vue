<template>
  <el-card
    class="box-card"
    :gatter="12"
  >
    <div
      slot="header"
      class="clearfix"
    >
      <span>Recent Items</span>
    </div>
    <div>
      <el-button
        v-for="item in RecentItems"
        :key="item.itemId"
        style="width: 99%; margin: 10px; text-align: left"
        @click="onItemClick(item)"
      >
        <div class="card">
          <img
            height="32px"
            :src="getImage(item.itemType)"
            alt="missing"
          >
          <h3>{{ item.displayName }}</h3>
          <small>{{ item.entityName }}</small>
        </div>
      </el-button>
    </div>
  </el-card>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import { AppCacheModule } from "@/store/modules/appCache"
import { DataTypeFactory } from "@/models/Utils/DataTypeFactory"
@Component({
  name: "Recent",
  components: {}
})
export default class extends Vue {
  get RecentItems() {
    return AppCacheModule.RecentItems
  }

  errorHandler() {
    return true
  }

  getImage(itemType: string) {
    return "./assets/objTyp/" + itemType + ".png"
  }

  onItemClick(item: any) {
    if (item.itemType === 1) {
      this.$router.push({
        name: "entities",
        query: { id: "EditEntity", value: item.itemId }
      })
    } else if (item.itemType === 3) {
      this.$router.push({ path: "forms/" + item.itemId })
    }
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.card {
  margin: 0;
  padding: 10px;
}
.card h3 {
  font: bold 16px;
  font-weight: 400;
}
.card img {
  float: left;
  margin: 0 15px 0 0;
}
.card small {
  font: 200 12px;
}
</style>
