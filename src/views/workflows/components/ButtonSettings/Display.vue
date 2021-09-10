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
              v-model="form.enDisplayName"
              :disabled="!useCustomSettings"
            />
          </el-form-item>

          <el-form-item label="Tooltip">
            <el-input
              v-model="form.enTooltip"
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
              v-model="form.heDisplayName"
              dir="rtl"
              :disabled="!useCustomSettings"
            />
          </el-form-item>

          <el-form-item label="Tooltip">
            <el-input
              v-model="form.heTooltip"
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
import { Component, Vue } from "vue-property-decorator"
import { WorkflowModule } from "@/store/modules/WorkflowMod"
import SettingItemWrapper from "@/components/SettingItemWrapper/index.vue"

@Component({
  name: "Display",
  components: { SettingItemWrapper }
})
export default class extends Vue {
  get currentWorkflow() {
    return WorkflowModule.ActiveWorkflow
  }

  useCustomSettings = true;
  form = {
    enDisplayName: "",
    enTooltip: "",
    heDisplayName: "",
    heTooltip: ""
  }

  rules = {
    enDisplayName: [
      {
        required: true,
        message: "Please input display name in English",
        trigger: "blur"
      }
    ],
    heDisplayName: [
      {
        required: true,
        message: "Please input display name in Hebrew",
        trigger: "blur"
      }
    ]
  };

  mounted() {
    console.log("hey")
  }
}
</script>

<style lang="scss">
.workflow-display {
  .el-row {
    margin: 10px 0;
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
