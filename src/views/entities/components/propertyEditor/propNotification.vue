<template>
  <el-form :model="currentProperty" style="padding: 10px" label-position="left">
    <div class="collapse-content">
      <div style="padding-left: 30px; padding-top: 5px">
        <div style="display: flex; margin: 20px 0">
          <el-checkbox v-model="enableNotificaton" @change="onEnableChanged">
            Send the e-mail notification when then property's value was changed:
          </el-checkbox>
          <el-button
            size="mini"
            style="margin-left: 10px"
            :disabled="!enableNotificaton"
            @click="showNotificatondialog = true"
          >
            Recipients
          </el-button>
        </div>
      </div>
    </div>
    <recipients
      :key="currentProperty.valueChangedNotification"
      :title="'Notification'"
      :is-open.sync="showNotificatondialog"
      :data="currentProperty.valueChangedNotification"
      @onOkRecipients="onNotificationOkClick"
      @onCancelRecipients="onNotificationCancelClick"
    />
  </el-form>
</template>

<script lang="ts">
import { BaseProperty } from "@/models/Properties";
import { Component, Prop, Vue } from "vue-property-decorator";
import SelectPropertyModal from "@/components/PropertySelector/index.vue";
import prefModel from "@/components/Preferences/prefModel.vue";
import Recipients from "@/components/Recipients/index.vue";
import { Notification } from "@/models/Notification";
@Component({
  name: "PropNotification",
  components: { SelectPropertyModal, prefModel, Recipients },
})
export default class extends Vue {
  @Prop({ required: true }) private property!: BaseProperty;
  enableNotificaton = false;
  currentProperty: BaseProperty = new BaseProperty();
  showNotificatondialog = false;
  onEnableChanged(value: boolean) {
    if (!value) {
      this.currentProperty.valueChangedNotification = null;
    }
  }
  onNotificationOkClick(value: Notification) {
    this.currentProperty.valueChangedNotification = value;
    this.showNotificatondialog = false;
  }

  onNotificationCancelClick(value: any) {
    console.log("noficiation canceled");
    this.showNotificatondialog = false;
  }

  created() {
    if (this.property) {
      this.currentProperty = this.property;
      this.enableNotificaton = !!this.property.valueChangedNotification;
    }
  }
}
</script>
