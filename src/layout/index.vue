<template>
  <div
    :class="classObj"
    class="app-wrapper"
  >
    <div
      v-if="classObj.mobile && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div
      :class="{hasTagsView: showTagsView}"
      class="main-container"
    >
      <div :class="{'fixed-header': fixedHeader}">
        <navbar />
        <!-- <tags-view v-if="showTagsView" /> -->
      </div>
      <app-main />
      <!--
        useful for Theme selection and customization for client specific settings.
        <right-panel v-if="showSettings">
        <settings />
      </right-panel> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator"
import { mixins } from "vue-class-component"
import { DeviceType, AppModule } from "@/store/modules/app"
import { SettingsModule } from "@/store/modules/settings"
import { AppMain, Navbar, Settings, Sidebar, TagsView } from "./components"
import RightPanel from "@/components/RightPanel/index.vue"
import ResizeMixin from "./mixin/resize"
import { EntitiesModule } from "@/store/modules/entitiesMod"
import { MyWorkModule } from "@/store/modules/myWorkMod"
import { AppCacheModule } from "@/store/modules/appCache"
import { AppPreferencesModule } from "@/store/modules/AppPreferencesMod"
import { AuthorizationModule } from "@/store/modules/AuthorizationMod"
import { Loading } from "element-ui"
import { ElLoading, ElLoadingComponent } from "element-ui/types/loading"
@Component({
  name: "Layout",
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView,
    EntitiesModule,
    AppCacheModule,
    AppPreferencesModule,
    AuthorizationModule,
    MyWorkModule
  }
})
export default class extends mixins(ResizeMixin) {
  get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
      mobile: this.device === DeviceType.Mobile
    }
  }

  get showSettings() {
    return SettingsModule.showSettings
  }

  get showTagsView() {
    return SettingsModule.showTagsView
  }

  get fixedHeader() {
    return SettingsModule.fixedHeader
  }

  private handleClickOutside() {
    AppModule.CloseSideBar(false)
  }

  private loadingConfig = {
    lock: true,
    text: "Loading Application Cache...",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)"
  };

  indicator: ElLoadingComponent = {} as any;
  private async loadCache() {
    this.indicator = Loading.service(this.loadingConfig)
    try {
      console.log("Loading Cache .")

      await AppCacheModule.getAppCache()
      this.indicator.close()
      console.log("Loading Cache Compelted.")
    } catch (err) {
      console.error("unable to load complete cache.")
    } finally {
      this.indicator.close()
    }
  }

  async created() {
    // await this.loadCache()
    if (!AppCacheModule.CacheLoaded) {
      await this.loadCache()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: $sideBarWidth;
  position: relative;
}

.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar {
  .main-container {
    margin-left: 54px;
  }

  .sidebar-container {
    width: 54px !important;
  }

  .fixed-header {
    width: calc(100% - 54px);
  }
}

/* for mobile response 适配移动端 */
.mobile {
  .main-container {
    margin-left: 0px;
  }

  .sidebar-container {
    transition: transform 0.28s;
    width: $sideBarWidth !important;
  }

  &.openSidebar {
    position: fixed;
    top: 0;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-$sideBarWidth, 0, 0);
    }
  }

  .fixed-header {
    width: 100%;
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
.el-collapse-item__header {
  display: flex;
  align-items: center;
  height: 48px;
  line-height: 48px;
  background-color: #f6f6f6;
  color: #303133;
  cursor: pointer;
  border-bottom: 1px solid #ebeef5;
  font-size: 13px;
  font-weight: 500;
  transition: border-bottom-color 0.3s;
  outline: none;
}
</style>
