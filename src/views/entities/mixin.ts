import { Component, Vue } from "vue-property-decorator"
import { AppCacheModule } from "@/store/modules/appCache.ts"

import { KeyValue } from "@/models/KeyValue.ts"
import { EntitiesModule } from "@/store/modules/entitiesMod"

@Component({
  name: "EntitiesMixin"
})
export default class extends Vue {
  public modal = {
    show: false,
    type: "",
    data: {}as any
  }

  get dataTypes() {
    return AppCacheModule.FlexSettings.dataTypes
  }

  get disciplines() {
    return AppCacheModule.FlexSettings.disciplines
  }

  get sqlConnections() {
    return AppCacheModule.FlexSettings.sqlConnections
  }

  get languages() {
    if (AppCacheModule.FlexSettings.languages) {
      return AppCacheModule.FlexSettings.languages.filter((l) => {
        return l.value !== AppCacheModule.FlexSettings.currentLocale
      })
    } else return []
  }

  get dateTypes() {
    return AppCacheModule.FlexSettings.periodPickerTypes
  }

  popupModal(type: string, data:any = null) {
    this.modal.show = true
    this.modal.type = type
    switch (type) {
      case "rootIcon":
        // this.modal.data = this.form.admin.rootIconUrl
        break
      case "relationship":
        // this.modal.data = this.form.admin.entityRelationship
        break
      case "tree":
        // this.modal.data = this.form.admin.treeIconUrl
        break
      case "report":
        this.modal.data = EntitiesModule.ReportableEntitiesOrder
        break
      case "reportResult":
        this.modal.data = EntitiesModule.ReportableEntitiesOrder
        break
      case "recipients_item_created":
        this.modal.data = "created"
        break
      case "recipients_item_modified":
        this.modal.data = "modified"
        break
      case "recipients_item_deleted":
        this.modal.data = "deleted"
        break
      case "notification":
      case "selectProperty":
        this.modal.data = ""
        break
      case "selectPreference":
        this.modal.data = null
        break
    }
  }
}
