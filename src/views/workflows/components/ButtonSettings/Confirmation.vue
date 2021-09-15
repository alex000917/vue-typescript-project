<template>
  <SettingItemWrapper icon-name="confirmation" title="Confirmation">
    <el-row class="workflow-confirmation">
      <el-row
        type="flex"
        align="middle"
        class="workflow-confirmation__description"
      >
        After the user clicks the button, a confirmation message can be
        displayed.:
      </el-row>

      <el-row class="workflow-confirmation__options">
        <el-radio v-model="confirmation" label="are_you_sure">
          Ask the user "Are you sure?"
        </el-radio>
        <el-radio v-model="confirmation" label="allow_add_comments">
          Allow the user to add comments
        </el-radio>
        <el-radio v-model="confirmation" label="mandate_add_comments">
          Mandate the user to add comments
        </el-radio>
        <el-radio v-model="confirmation" label="not_show_message">
          Don't display confirmation message
        </el-radio>
      </el-row>

      <el-row class="workflow-confirmation__message">
        <el-checkbox
          v-model="form.useCustomMessage"
          :disabled="confirmation === 'not_show_message'"
        >
          Use the following message instead of the default
        </el-checkbox>

        <el-form
          :model="form"
          :rules="rules"
          ref="form"
          hide-required-asterisk
          :class="[
            'workflow-confirmation__message_form',
            {'disabled': !form.useCustomMessage || confirmation === 'not_show_message'}
          ]"
        >
          <el-row>
            <span class="workflow-confirmation__message_form-title">English</span>
            <el-divider class="workflow-confirmation__message_form-divider" />
          </el-row>
          <el-form-item prop="enMessage">
            <el-input
              v-model="form.enMessage"
              size="mini"
              :disabled="!form.useCustomMessage || confirmation === 'not_show_message'"
            />
          </el-form-item>

          <el-row>
            <span class="workflow-confirmation__message_form-title">Hebrew</span>
            <el-divider class="workflow-confirmation__message_form-divider" />
          </el-row>
          <el-form-item prop="heMessage">
            <el-input
              v-model="form.heMessage"
              dir="rtl"
              size="mini"
              :disabled="!form.useCustomMessage || confirmation === 'not_show_message'"
            />
          </el-form-item>
        </el-form>
      </el-row>
    </el-row>
  </SettingItemWrapper>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import SettingItemWrapper from "@/components/SettingItemWrapper/index.vue"
import { cloneDeep } from "lodash"
import { LanguageTranslation } from "@/models/LanguageTranslation"

@Component({
  name: "Confirmation",
  components: {
    SettingItemWrapper
  }
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

  confirmation = "are_you_sure";
  form = {
    useCustomMessage: false,
    enMessage: "",
    heMessage: ""
  };

  rules = {
    enMessage: {
      required: true,
      message: "This field should be inputted",
      trigger: "blur"
    },
    heMessage: {
      required: true,
      message: "This field should be inputted",
      trigger: "blur"
    }
  };

  @Watch("showed", { deep: true, immediate: true })
  setUp(value: Boolean) {
    if (value) {
      this.form = {
        useCustomMessage: this.info.specificConfirmationMessage,
        enMessage: this.info.languageTranslations ? this.info.languageTranslations[0].displayName : "",
        heMessage: this.info.languageTranslations ? this.info.languageTranslations[1].displayName : ""
      }
    }
  }

  @Watch("form", { deep: true, immediate: true })
  onChangeForm(value: any) {
    const confirmation = cloneDeep(this.info)

    confirmation.specificConfirmationMessage = value.useCustomMessage
    confirmation.languageTranslations = [
      new LanguageTranslation("en", value.enMessage, ""),
      new LanguageTranslation("he", value.heMessage, "")
    ]

    this.$emit("update:info", confirmation)
  }
}
</script>

<style lang="scss">
.workflow-confirmation {
  .el-radio {
    display: block;
    margin: 10px 0;
  }
  .el-row {
    margin: 10px 0;
  }

  &__header {
    margin-top: 0;

    &-title {
      font-size: 18px;
      margin-left: 10px;
    }
  }

  &__description {
    margin: 20px 0 !important;
  }

  &__message {
    margin-top: 20px !important;

    &_form {
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

      .el-form-item {
        margin-left: 30px;
        max-width: 300px;
      }

      &.disabled {
        opacity: 0.5;
      }
    }
  }
}
</style>
