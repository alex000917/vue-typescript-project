<template>
  <div>
    Work flow data type to be here.
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
@Component({
  name: "WorkflowStepDataType"
})
export default class extends Vue {
    @Prop({ required: true }) private showConfig =false
  @Prop({ required: true }) private showInputs =true
}
</script>
