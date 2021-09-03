<template>
  <div>
    <ul>
      <li
        v-for="item in propertyTypes"
        :key="item"
      >
        <span> {{ item }} </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
// import { RSA_PKCS1_PADDING } from "constants"
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import LangInput from "@/components/LangInput/LangInput.vue"
@Component({
  name: "NewPerfrences",
  components: { LangInput }
})
export default class extends Vue {
  get propertyTypes() {
    return this.$store.getters.FlexApplicationPreferences.propertyDataTypes
  }

  onNewDialogClose() {
  // alert('before dialog close')
  }
}
</script>
