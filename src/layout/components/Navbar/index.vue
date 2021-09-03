<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="device !== 'mobile'" size="mini">
        <!--   <header-search class="right-menu-item" />
        <error-log class="errLog-container right-menu-item hover-effect" />
        <screenfull class="right-menu-item hover-effect" />
        <el-tooltip
          :content="$t('navbar.size')"
          effect="dark"
          placement="bottom"
        >
          <size-select class="right-menu-item hover-effect" />
        </el-tooltip>
        <lang-select class="right-menu-item hover-effect" />-->
        <el-button
          class="button right-menu-item"
          style="color: gray"
          type="text"
        >
          {{ userName }}
        </el-button>
        <el-button class="button right-menu-item hover-effect" type="text">
          <a href="#"> Advanced</a>
        </el-button>
        <el-button class="button right-menu-item hover-effect" type="text">
          Web Site
        </el-button>
        <el-button
          type="Text"
          class="button right-menu-item hover-effect"
          icon="el-icon-refresh"
          @click="onReloadSettingsClick"
        >
          Reload Settings
        </el-button>
        <!-- <el-badge
          :value="dirtyItemsCount"
          class="item right-menu-item hover-effect"
          type="warning"
        > -->
        <el-button
          type="primary"
          class="right-menu-item"
          icon="el-icon-upload"
          :disabled="!saveEnabled"
          @click="onSaveClick"
          plain
        >
          Save
        </el-button>
        <!-- </el-badge> -->
      </template>

      <!-- <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/">
            <el-dropdown-item>{{ $t('navbar.profile') }}</el-dropdown-item>
          </router-link>

          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { AppModule } from "@/store/modules/app";
import { UserModule } from "@/store/modules/user";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import ErrorLog from "@/components/ErrorLog/index.vue";
import Hamburger from "@/components/Hamburger/index.vue";
import HeaderSearch from "@/components/HeaderSearch/index.vue";
import LangSelect from "@/components/LangSelect/index.vue";
import Screenfull from "@/components/Screenfull/index.vue";
import SizeSelect from "@/components/SizeSelect/index.vue";
import { AppCacheModule } from "@/store/modules/appCache";
import { EntitiesModule } from "@/store/modules/entitiesMod";
import { AppPreferencesModule } from "@/store/modules/AppPreferencesMod";
import { partition } from "lodash";
import { EventBus } from "@/utils/event-bus";
import { EventKeys } from "@/models/Utils/EventKeys";
import { Loading } from "element-ui";
import { ElLoadingComponent } from "element-ui/types/loading";
import { AuthorizationModule } from "@/store/modules/AuthorizationMod";
import { MyWorkModule } from "@/store/modules/myWorkMod";
import { FormsModule } from "@/store/modules/FormsStore";

@Component({
  name: "Navbar",
  components: {
    Breadcrumb,
    ErrorLog,
    Hamburger,
    HeaderSearch,
    LangSelect,
    Screenfull,
    SizeSelect,
  },
})
export default class extends Vue {
  get sidebar() {
    return AppModule.sidebar;
  }

  get device() {
    return AppModule.device.toString();
  }

  get avatar() {
    return UserModule.avatar;
  }

  get userName() {
    return UserModule.name;
  }

  private toggleSideBar() {
    AppModule.ToggleSideBar(false);
  }

  get hasUnsavedChagnes() {
    return parseFloat(this.dirtyItemsCount) > 0;
  }

  saveEnabled = false;

  async getDirtyItemsState() {
    return await AppCacheModule.getDirtyItems();
  }

  get dirtyItemsCount() {
    // Get all dirtyItems counts.
    this.getDirtyItemsState().then((rs) => {
      return rs === 0 ? "" : rs.toString();
    });
    return "";
  }

  private async logout() {
    await UserModule.LogOut();
    this.$router.push(`/login?redirect=${this.$route.fullPath}`);
  }

  onSaveClick() {
    // EventBus.$emit(EventKeys.UPLOAD_DATA)
    try {
      this.$router.push({
        name: "dashboard",
      });
      this.Loader = Loading.service({
        lock: true,
        text: "uploading data...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      AppPreferencesModule.Upload();

      AuthorizationModule.Save();

      // MyWorkModule.Upload();

      EntitiesModule.Upload();

      // FormsModule.Upload();

      EventBus.$emit(EventKeys.DISABLE_GLOBAL_SAVE);
    } catch (error) {
      console.error("error while uploading data..." + error.toString());
    } finally {
      this.Loader?.close();
    }
  }

  private onReloadSettingsClick() {
    this.$confirm("This will remove unSaved changes. Continue?", "Warning", {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
    })
      .then(async () => {
        await AppCacheModule.getAppCache();
        this.$message({
          type: "success",
          message: "Reloading cache.",
        });
      })
      .catch(() => {
        this.$message({
          type: "error",
          message: "Reload cache cancelled.",
        });
      });
  }

  Loader: ElLoadingComponent = {} as any;
  mounted() {
    EventBus.$on(EventKeys.ENABLE_GLOBAL_SAVE, () => {
      this.saveEnabled = true;
    });
    EventBus.$on(EventKeys.DISABLE_GLOBAL_SAVE, () => {
      this.saveEnabled = false;
    });
    EventBus.$on(EventKeys.SET_APP_BUSY, (state: boolean, message: string) => {
      if (state) {
        this.Loader = Loading.service({
          lock: true,
          text: message + "...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
      } else {
        this.Loader?.close();
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;

    height: 100%;
    line-height: 50px;
    padding-top: 5px;
    padding-right: 20px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 80%;
      font-size: small;

      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    .right-menu-links {
      display: inline-block;
      padding: 0 8px;
      height: 80%;
      vertical-align: center;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
