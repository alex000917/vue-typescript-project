<template>
  <SettingItemWrapper icon-name="icon" title="Icon">
    <el-row class="workflow-icon">
      <el-row type="flex" align="top" class="workflow-icon__icon">
        <span>Icon:</span>
        <el-image
          class="workflow-icon__icon-preview"
          :src="imageUrl"
          fit="fill"
        />
        <el-button
          @click="showSelectIconModal = true"
          class="workflow-icon__icon-button"
        >
          select
        </el-button>
      </el-row>

      <el-row class="workflow-icon__size">
        <el-row>Size:</el-row>
        <el-row type="flex" align="middle">
          <el-radio v-model="iconSizeType" label="half_size">
            <el-image
              src="/assets/img/icon.png"
              class="workflow-icon__size-half-image"
            />
            <span>Half size</span>
          </el-radio>
        </el-row>
        <el-row type="flex" align="middle">
          <el-radio v-model="iconSizeType" label="full_size">
            <el-image
              src="/assets/img/icon.png"
              class="workflow-icon__size-full-image"
            />
            <span>Full size</span>
          </el-radio>
        </el-row>
      </el-row>

      <el-row class="workflow-icon__note">
        Note: the first button will always be displayed in full size.
      </el-row>
    </el-row>

    <select-icon-modal
      v-model="imageUrl"
      :visible.sync="showSelectIconModal"
    />
  </SettingItemWrapper>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { FlexPreferencesModule } from "@/store/modules/AppFlexPreferencesMod"
import selectIconModal from "@/components/selectIcon/index.vue"
import SettingItemWrapper from "@/components/SettingItemWrapper/index.vue"

@Component({
  name: "Icon",
  components: {
    selectIconModal,
    SettingItemWrapper
  }
})
export default class extends Vue {
  @Prop({ default: "en" }) private languageKey!: string;

  imageUrl = "/assets/img/icon.png";
  showSelectIconModal = false;
  iconSizeType = "full_size";

  get labels() {
    const translations = FlexPreferencesModule.FlexPreferences.translations
    return translations.find(lang => {
      return lang.key === this.languageKey
    })
  }

  selectIcon(payload: string) {
    console.log("select Image", payload)
  }
}
</script>

<style lang="scss">
.workflow-icon {
  .el-row {
    margin: 10px 0;
  }

  .el-radio {
    margin-right: 0;
    display: flex;
    align-items: center;

    &__label {
      display: flex;
      align-items: center;
    }

    &__input {
      margin-right: 10px;
    }
  }

  &__header {
    margin-top: 0;

    &-title {
      font-size: 18px;
      margin-left: 10px;
    }
  }

  &__icon {
    margin-top: 40px !important;
    margin-bottom: 20px !important;

    &-preview {
      margin-left: 10px;
    }

    &-button {
      margin-left: 5px;
    }
  }

  &__size {
    margin: 20px 0;

    .el-image {
      margin-right: 10px;
    }

    &-half-image {
      width: 16px;
      height: 16px;
    }
  }

  &__note {
    margin-top: 20px;
  }
}
</style>
