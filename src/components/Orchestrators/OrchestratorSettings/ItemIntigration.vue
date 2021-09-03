<template>
  <el-transfer
    v-model="value"
    :data="data">
  </el-transfer>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Orchestrator } from "@/models/orchestrator/Orchestrator";
import { SettingsModule }  from "@/store/modules/settings"
@Component({
  name: "ItemInigration",
  components: {},
})
export default class extends Vue {
  @Prop({ required: true }) private items!: Orchestrator[];
  @Prop({ required: false, default: null }) private formData!: Orchestrator;

}
</script>