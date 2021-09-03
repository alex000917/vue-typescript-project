import { Component, Vue, Watch, Prop } from "vue-property-decorator"

@Component({
  name: "ModalMixin"
})
export default class extends Vue {
  @Prop({ required: true, default: false }) visible!: boolean;

  get showMe() {
    return this.visible
  }

  set showMe(val: boolean) {
    this.$emit("update:visible", val)
  }

  handleClose(done: any) {
    this.$confirm("Are you sure to close this dialog?")
      .then((_) => {
        done()
      })
      .catch((_) => {
        console.log("")
      })
  }
}
