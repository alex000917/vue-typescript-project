<template>
  <transition name="el-zoom-in-center">
    <span
      :class="classes"
      :style="{backgroundColor: this.color}"
      @click="handleClick"
    >
      {{ this.text }}

      <i
        v-show="this.closable"
        class="el-tag__close el-icon-close"
        @click="handleClose"
      />
    </span>
  </transition>
</template>
<script lang="ts">
import { ApplicationPreferenceFactory } from "@/models/Utils/ApplicationPreferenceFactory"
import { PropertyFactory } from "@/models/Utils/PropertyFactory"
import { AppPreferencesModule } from "@/store/modules/AppPreferencesMod"
import { stringify } from "querystring"
import { Component, Prop, Vue, Watch } from "vue-property-decorator"

@Component({
  name: "MyTag",
  components: {}
})
export default class extends Vue {
//   @Prop({ required: false }) text!: String;
  @Prop({ required: true }) value!: any;
  @Prop({ required: false }) closable!: Boolean;
  @Prop({ required: false, default: () => "" }) type!: String;
  @Prop({ required: false }) hit!: Boolean;
  @Prop({ required: false }) disableTransitions!: Boolean;
  @Prop({ required: false }) color!: String;
  @Prop({ required: false }) size!: String;
  @Prop({ required: false, default: () => "light" }) effect!: String;

  text:String="loading."
  handleClose(event: Event) {
    event.stopPropagation()
    this.$emit("close", event)
  }

  handleClick(event: Event) {
    this.$emit("click", event)
  }

  mounted() {
    console.log("creating Tag " + this.text)
    // this.text = "loading"
    this.displayText()
  }

  private _innerText = "loading...";
  get innerText() {
    return this.text
  }

  async displayText() {
    const data = this.value
    if (data.key) {
      this.text = data.key
    } else if (typeof (data) === "string") {
      this.text = data
    } else if (Array.isArray(data)) {
      if (
        ApplicationPreferenceFactory.isKeyValueArrayApplicationPreference(data)
      ) {
        const pref = await AppPreferencesModule.Preferences.find(
          (x) => x.systemName === data[data.length - 1].key
        )
        this.text = ("[" + pref
          ? pref?.displayName
          : data[data.length - 1].key + "]") as string
      } else {
        const name = await PropertyFactory.getPropertyNameFromPropertyPath(
          data
        )

        this.text = ("[ " + name ? name : "loading..." + " ]") as string
      }
    }
  }

  get tagSize() {
    return this.size || (this.$ELEMENT || {}).size
  }

  classes = [
    "el-tag",
    this.type ? `el-tag--${this.type}` : "",
    this.tagSize ? `el-tag--${this.tagSize}` : "",
    this.effect ? `el-tag--${this.effect}` : "",
    this.hit && "is-hit"
  ];
}
</script>
