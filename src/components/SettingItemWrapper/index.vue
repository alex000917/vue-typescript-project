<template>
  <el-row class="setting-item-wrapper">
    <el-row type="flex" align="middle" class="setting-item-wrapper__header">
      <el-image :src="iconUrl" fit="fill" />
      <span class="setting-item-wrapper__title">{{ title }}</span>
    </el-row>

    <slot />
  </el-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component({
  name: "SettingItemWrapper"
})
export default class extends Vue {
  @Prop({ required: true }) private iconName!: string;
  @Prop({ required: true }) private title!: string;

  get iconUrl() {
    return `/assets/img/${this.iconName}.png`
  }
}
</script>

<style lang="scss">
.setting-item-wrapper {
  &__header {
    margin: 10px 0;
  }

  &__title {
    font-size: 18px;
    margin-left: 10px;
  }
}
</style>
