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
          <el-radio v-model="isFullSize" label="half_size">
            <el-image
              src="/assets/img/icon.png"
              class="workflow-icon__size-half-image"
            />
            <span>Half size</span>
          </el-radio>
        </el-row>
        <el-row type="flex" align="middle">
          <el-radio v-model="isFullSize" label="full_size">
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
import { Component, Prop, Vue } from "vue-property-decorator"
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
  @Prop({ default: "icon.png", required: false }) private icon!: string;
  @Prop({ default: true, required: false }) private fullSize!: Boolean;

  showSelectIconModal = false;
  iconSizeType = "full_size";

  get imageUrl() {
    return `/MSP/resources/images/entityRelationship/${this.icon}`
  }

  set imageUrl(value: string) {
    const iconStrAry = value.split("/")
    this.$emit("update:icon", iconStrAry[iconStrAry.length - 1])
  }

  get isFullSize(): string {
    return this.fullSize ? "full_size" : "half_size"
  }

  set isFullSize(value: string) {
    if (value === "full_size") {
      this.$emit("update:fullSize", true)
    } else {
      this.$emit("update:fullSize", false)
    }
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
