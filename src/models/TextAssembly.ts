import { AppPreferencesModule } from "@/store/modules/AppPreferencesMod"
import { EntitiesModule } from "@/store/modules/entitiesMod"
import { debug } from "console"
import { ApplicationPreference } from "./ApplicationPreference"
import { Entity } from "./Entity"
import { ApplicationPreferenceFactory } from "./Utils/ApplicationPreferenceFactory"
import { ConditionUtils } from "./Utils/ConditionUtils"

export class TextAssembly {
  myspType="TextAssembly"
  parts: any[] = [];

  constructor() {
    this.parts = []
  }

  public get displayName() {
    return this.toString()
  }

  private async toString() {
    let str = ""
    if (!this.parts) return

    const data = this.parts
    if (Array.isArray(data)) {
      if (
        ApplicationPreferenceFactory.isKeyValueArrayApplicationPreference(data)
      ) {
        const list = AppPreferencesModule.Preferences
        const pref = list.find(x => {
          return x.systemName === data[1].key
        })

        return pref?.displayName
      }

      let entity: Entity | null = null
      for (const item of data) {
        if (item.value) {
          entity = await EntitiesModule.getEntity(item.value)

          str += entity?.displayName + " : "
        } else {
          const prop = entity?.properties.find(x => x.systemName === item.key)
          str += prop?.displayName
        }
      }
      return str
    } else {
      str = data
    }

    return str
  }

  public async getDataType() {
    let dataType = 1
    if (!this.parts) return

    const data = this.parts
    if (Array.isArray(data)) {
      if (
        ApplicationPreferenceFactory.isKeyValueArrayApplicationPreference(data)
      ) {
        const list = AppPreferencesModule.Preferences
        const pref = list.find(x => {
          return x.systemName === data[1].key
        })

        dataType = parseInt(pref?.dataType as string)
      }

      let entity: Entity | null = null
      for (const item of data) {
        if (item.value) {
          entity = await EntitiesModule.getEntity(item.value)
        } else {
          const prop = entity?.properties.find(x => x.systemName === item.key)
          dataType += parseInt(prop?.dataType.value)
        }
      }
    }

    return Number.isNaN(dataType) ? 1 : dataType
  }

  public clone(): TextAssembly {
    const textAssembly: TextAssembly = new TextAssembly()
    textAssembly.parts = this.parts ? Object.assign({}, this.parts) : []
    return textAssembly
  }
}
