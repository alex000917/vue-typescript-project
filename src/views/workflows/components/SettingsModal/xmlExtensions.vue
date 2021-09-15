<template>
  <el-container direction="vertical" class="xml-extensions">
    <p class="xml-extensions__description">
      Use the following to add XML attributes and elements to the form XML
      definition file.
    </p>
    <p style="margin-top: 20px;">
      Attributes:
      <span class="require-content"
        >(Will be appended to the workflow element)</span
      >
    </p>
    <el-row style="margin-top: 5px">
      <el-input type="textarea" :rows="4" v-model="attributesValue" />
    </el-row>

    <p style="margin-top: 30px;">
      Child Elements:
      <span class="require-content"
        >(Will be added as child elements to the workflow element)</span
      >
    </p>

    <el-row style="margin-top: 5px">
      <el-input type="textarea" :rows="4" v-model="childrenXmlValue" />
    </el-row>
  </el-container>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "",
  components: {}
})
export default class extends Vue {
  @Prop({
    required: true,
    default: () => [{}]
  }) attributes!: string;

  @Prop({
    required: false,
    default: false
  }) childrenXml!: string;

  get attributesValue() {
    return this.attributes
  }

  set attributesValue(value: string) {
    this.$emit("update:attributes", value)
  }

  get childrenXmlValue() {
    return this.childrenXml
  }

  set childrenXmlValue(value: string) {
    this.$emit("update:childrenXml", value)
  }
}
</script>

<style lang="scss">
.xml-extensions {
  height: calc(100% - 62px);

  &__description {
    margin-top: 20px;
  }
}
</style>
