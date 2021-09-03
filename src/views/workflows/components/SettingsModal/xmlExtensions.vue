<template>
  <el-container direction="vertical">
    <el-row
      type="flex"
      align="middle"
    >
      <el-image
        src="/assets/img/xml32x32.png"
        fit="fill"
      />
      <span style="font-size: 18px; margin-left: 5px">XML Extensions</span>
    </el-row>
    <el-row style="margin-top: 30px; height: calc(100% - 62px)">
      <p style="margin-top: 5px">
        Use the following to add XML attributes and elements to the form XML
        definition file.
      </p>
      <p style="margin-top: 40px;">
        Attributes:
        <span
          class="require-content"
        >(Will be appended to the workflow element)</span>
      </p>
      <el-row style="margin-top: 5px">
        <el-input
          type="textarea"
          :rows="8"
        />
      </el-row>
    </el-row>
    <p style="margin-top: 30px;">
      Child Elements:
      <span
        class="require-content"
      >(Will be added as child elements to the workflow element)</span>
    </p>
    <el-row style="margin-top: 5px">
      <el-input
        type="textarea"
        :rows="8"
      />
    </el-row>
  </el-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({
  name: "",
  components: {}
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
</style>
