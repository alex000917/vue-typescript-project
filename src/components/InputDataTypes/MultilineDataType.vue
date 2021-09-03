<template>
  <div>
    <el-row v-if="dataType=1">
      <el-col>
        <el-input
          type="textarea"
          placeholder="input your text here."
        />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
@Component({
  name: "MultiLineDataType"
})
export default class extends Vue {
  @Prop({ default: "1", required: true }) private dataType!: Number;
}
</script>
