<template>
  <el-dialog
    width="350px"
    title="Select Icon"
    append-to-body
    top="200px"
    :visible.sync="showIconModal"
    class="select-icon-modal"
  >
    <el-row class="select-icon-modal__content">
      <el-row class="select-icon-modal__content-title">
        Select an Icon for the button:
      </el-row>

      <div class="select-icon-modal__content-icons">
        <el-button
          v-for="(icon, index) in allIcons"
          :key="index"
          @click="tempIconUrl = icon.key"
        >
          <el-image :src="icon.key" class="select-icon-modal__content-icon" />
        </el-button>
      </div>
    </el-row>

    <div slot="footer" class="select-icon-modal__footer">
      <el-button @click="onOk()" class="select-icon-modal__footer-ok">
        Ok
      </el-button>

      <el-button
        style="text-decoration: underline"
        type="text"
        @click="onCancel()"
        class="select-icon-modal__footer-cancel"
      >
        cancel
      </el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import { AppCacheModule } from "@/store/modules/appCache"
import { MSPEmbeddedAssets } from "@/models/Utils/MSPEmbeddedAssets"
import { FlexPreferencesModule } from "@/store/modules/AppFlexPreferencesMod"

@Component({
  name: "SelectIconModal",
  components: {}
})
export default class extends Vue {
  @Prop({ required: true }) private visible!: boolean;
  @Prop({ required: true }) private value!: string;

  // TODO: might be props or saved in vuex
  private languageKey = "en";
  private tempIconUrl = MSPEmbeddedAssets.PORTFOLIO_ICON;

  get showIconModal(): boolean {
    return this.visible
  }

  set showIconModal(value: boolean) {
    this.$emit("update:visible", value)
  }

  get syncIconUrl() {
    const iconValue = this.tempIconUrl ? this.tempIconUrl : this.value
    const iconKeyValue = AppCacheModule.EntityRelationshipIcons.filter(
      (icon: any) => icon.key === iconValue
    )
    return iconKeyValue.length ? iconKeyValue[0].key : ""
  }

  get allIcons() {
    return AppCacheModule.EntityRelationshipIcons
  }

  get labels() {
    const translations = FlexPreferencesModule.FlexPreferences.translations
    return translations.find(lang => {
      return lang.key === this.languageKey
    })
  }

  onOk() {
    this.showIconModal = false
    this.$emit("input", this.tempIconUrl)
  }

  onCancel() {
    this.showIconModal = false
  }
}
</script>

<style lang="scss">
.select-icon-modal {
  &__content {
    &-title {
      font-size: 18px;
      margin-left: 10px;
    }

    &-icons {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      margin-top: 5px;

      .el-button {
        margin: 10px !important;
      }
    }

    &-icon {
      width: 16px;
      height: 16px;
    }
  }

  &__footer {
    &-ok {
      margin-right: 20px;
    }
  }
}
</style>
