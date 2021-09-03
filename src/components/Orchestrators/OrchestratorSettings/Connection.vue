<template>
<div class="panel-container">
  <el-form label-position="left" label-width="200px" :model="formData">
    <el-row>
      <el-col :span="16">
        <el-form-item label="Orchestrator Host Name: ">
          <el-input v-model="formData.Host"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <el-form-item label="MSP to Orchestrator Port: ">
          <el-input v-model="formData.msp2OrchestratorPort"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <el-form-item label="Orchestrator to MSP Port: ">
          <el-input v-model="formData.orchestrator2MspPort"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Orchestrator } from "@/models/orchestrator/Orchestrator";

@Component({
  name: "connection",
  components: {},
})
export default class extends Vue {
  @Prop({ required: true }) private items!: Orchestrator[];
  @Prop({ required: false, default: null }) private formData!: Orchestrator;
}
</script>