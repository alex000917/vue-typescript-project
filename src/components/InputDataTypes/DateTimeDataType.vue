<template>
  <div>
    <el-date-picker
      v-model="selectedDate"
      type="datetime"
      placeholder="Select date and time"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
@Component({
  name: "DateTimeDataType"
})
export default class extends Vue {
  @Prop({ required: false }) private selectedDate:any
}
</script>
