<template>
  <SettingItemWrapper icon-name="display-name-2-32x32" title="Display And Name">
    <el-row class="workflow-display">
      <el-row>
        <el-checkbox v-model="useCustomSettings"
          >Use the following display name instead of the defeault
          settings</el-checkbox
        >

        <el-form
          :model="form"
          :rules="rules"
          ref="form"
          label-width="120px"
          hide-required-asterisk
          :class="[
            'workflow-display__form',
            {'disabled': !useCustomSettings}
          ]"
        >
          <el-row>
            <span class="workflow-display__form-title">English</span>
            <el-divider class="workflow-display__form-divider" />
          </el-row>

          <el-form-item label="Display name" prop="enDisplayName">
            <el-input
              v-model="form.en.displayName"
              :disabled="!useCustomSettings"
            />
          </el-form-item>

          <el-form-item label="Tooltip">
            <el-input
              v-model="form.en.description"
              autocomplete="off"
              type="textarea"
              size="small"
              :rows="2"
              :disabled="!useCustomSettings"
              class="workflow-display__form-textarea"
            />
          </el-form-item>

          <el-row>
            <span class="workflow-display__form-title">Hebrew</span>
            <el-divider class="workflow-display__form-divider" />
          </el-row>

          <el-form-item label="Display name" prop="heDisplayName">
            <el-input
              v-model="form.he.displayName"
              dir="rtl"
              :disabled="!useCustomSettings"
            />
          </el-form-item>

          <el-form-item label="Tooltip">
            <el-input
              v-model="form.he.description"
              dir="rtl"
              autocomplete="off"
              type="textarea"
              size="small"
              :rows="2"
              :disabled="!useCustomSettings"
              class="workflow-display__form-textarea"
            />
          </el-form-item>
        </el-form>
      </el-row>
    </el-row>
  </SettingItemWrapper>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator"
import SettingItemWrapper from "@/components/SettingItemWrapper/index.vue"
import { cloneDeep } from "lodash"

@Component({
  name: "Display",
  components: { SettingItemWrapper }
})
export default class extends Vue {
  @Prop({
    required: true,
    default: () => [{}]
  }) info!: any;

  @Prop({
    required: false,
    default: false
  }) showed!: Boolean;

  useCustomSettings = true;
  form: any = {
    en: {
      displayName: "",
      description: ""
    },
    he: {
      displayName: "",
      description: ""
    }
  }

  rules = {
    "en.displayName": [
      {
        required: true,
        message: "Please input display name in English",
        trigger: "blur"
      }
    ],
    "he.displayName": [
      {
        required: true,
        message: "Please input display name in Hebrew",
        trigger: "blur"
      }
    ]
  };

  @Watch("showed", { deep: true, immediate: true })
  setUp(value: Boolean) {
    console.log("display")
    if (value) {
      this.form = {
        en: {
          displayName: this.info[0]?.displayName,
          description: this.info[0]?.description
        },
        he: {
          displayName: this.info[1]?.displayName,
          description: this.info[1]?.description
        }
      }
    }
  }

  @Watch("form", { deep: true, immediate: true })
  onChangeForm(value: any) {
    const translation = cloneDeep(this.info)

    translation[0].displayName = value.en.displayName
    translation[0].description = value.en.description
    translation[1].displayName = value.he.displayName
    translation[1].description = value.he.description

    this.$emit("update:info", translation)
  }
}
</script>

<style lang="scss">
.workflow-display {
  .el-row {
    margin: 10px 0;
  }
  .el-input--mini {
    width: calc(100% - 120px);
  }

  .el-form-item__label {
    font-weight: 600;
    text-align: left;
    padding-left: 20px;
  }

  &__header {
    margin-top: 0;

    &-title {
      font-size: 18px;
      margin-left: 10px;
    }
  }

  &__form {
    padding: 0px 15px;
    margin-top: 5px;

    &-title {
      font-size: 14px;
      font-weight: 600;
    }

    &-divider {
      margin-top: 5px;
      margin-bottom: 15px;
    }

    &.disabled {
      opacity: 0.5;
    }
  }
}
</style>
