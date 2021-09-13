import { Component, Vue } from "vue-property-decorator"

@Component({
  name: "ModalMixin"
})
export default class extends Vue {
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
