
<template>
  <el-dialog
    width="65%"
    ref="settingdialog"
    title="Orchestrator Settings"
    :visible.sync="showMeSettings"
    :before-close="handleClose"
    append-to-body
  >
    <el-tabs tab-position="left" @tab-click="handleTabClick">
      <el-tab-pane label="Display">
        <display :items="items" :form-data="record"> </display>
      </el-tab-pane>
      <el-tab-pane label="Connection">
        <connection :items="items" :form-data="record"> </connection>
      </el-tab-pane>
      <el-tab-pane label="Item Intergation">
        <item-inigration :items="items" :form-data="record"> </item-inigration>
      </el-tab-pane>
      <el-tab-pane label="General Settings">
        <general-intigration :items="items" :form-data="record">
        </general-intigration>
      </el-tab-pane>
      <el-tab-pane label="Providers">
        <providers :items="items" :form-data="record"> </providers>
      </el-tab-pane>
      <el-tab-pane label="Notes">
        <notes :items="items" :form-data="record"> </notes>
      </el-tab-pane>
      <el-tab-pane label="Advanced">
        <advanced :items="items" :form-data="record"> </advanced>
      </el-tab-pane>
    </el-tabs>
    <el-main> </el-main>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Orchestrator } from "@/models/orchestrator/Orchestrator";
import GeneralIntigration from "./GeneralIntigration.vue";
import ItemInigration from "./ItemIntigration.vue";
import Notes from "./Notes.vue";
import Providers from "./Providers.vue";
import Display from "./Display.vue";
import Connection from "./Connection.vue";
import Advanced from "./Advanced.vue";

@Component({
  name: "LeftSideNav",
  components: {
    Display,
    Advanced,
    Connection,
    GeneralIntigration,
    ItemInigration,
    Notes,
    Providers,
  },
})
export default class extends Vue {
  @Prop({ required: true, default: false }) private isOpen!: boolean;
  @Prop({ required: true }) private items!: Orchestrator[];
  @Prop({ required: false, default: null }) private record!: Orchestrator;

  // private form: Orchestrator = {} as any;
  // get orchestratorList() {
  //   return this.items;
  // }

  get showMeSettings() {
    return this.isOpen;
  }

  set showMeSettings(value: boolean) {
    this.$emit("update:isOpen", value);
  }

  handleClose() {
    this.showMeSettings = false;
  }

  handleTabClick() {
    console.log(this.record);
  }
}
</script>
<style lang="scss">
.panel-container {
  margin-left: 15px;
  margin-right: 15px;
}
.lang-heading {
  font-weight: bold;
  font-size: 15px;
}

.lang-divider {
  margin-bottom: 20px;
  background-color: #000;
}
</style>

