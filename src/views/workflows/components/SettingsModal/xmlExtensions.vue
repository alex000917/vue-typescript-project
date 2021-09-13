<template>
  <el-container direction="vertical" class="xml-extensions">
    <p class="xml-extensions__description">
      Use the following to add XML attributes and elements to the form XML
      definition file.
    </p>
    <p style="margin-top: 40px;">
      Attributes:
      <span class="require-content"
        >(Will be appended to the workflow element)</span
      >
    </p>
    <el-row style="margin-top: 5px">
      <el-input type="textarea" :rows="4" />
    </el-row>

    <p style="margin-top: 30px;">
      Child Elements:
      <span class="require-content"
        >(Will be added as child elements to the workflow element)</span
      >
    </p>

    <el-row style="margin-top: 5px">
      <el-input type="textarea" :rows="4" />
    </el-row>
  </el-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "",
  components: {}
})
export default class extends Vue {}
</script>

<style lang="scss">
.xml-extensions {
  height: calc(100% - 62px);

  &__description {
    margin-top: 20px;
  }
}
</style>
