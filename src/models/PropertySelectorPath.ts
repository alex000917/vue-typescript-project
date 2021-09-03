import { AppCacheModule } from "@/store/modules/appCache"
import { AppPreferencesModule } from "@/store/modules/AppPreferencesMod"
import { ApplicationPreference } from "./ApplicationPreference"

import { BaseDataType } from "./DataTypes"
import { KeyValue } from "./KeyValue"
import { TextAssembly } from "./TextAssembly"
import { ApplicationPreferenceFactory } from "./Utils/ApplicationPreferenceFactory"
import { myspTypes } from "./Utils/myspTypes"

export class PropertyPath {
    displayName: string
    systemName: string
    lookupTo: string|null
    dataType:BaseDataType|null

    constructor(displayName: string, systemName: string, lookupTo?: string|null, obj?: object | null, dataType:BaseDataType|null = null) {
      this.displayName = displayName
      this.systemName = systemName
      this.lookupTo = lookupTo || null
      this.dataType = dataType
    }
}

export class PropertySelectorPath {
    paths: PropertyPath[] | any;
    displayName:string|null=null

    constructor() {
      this.paths = []
      this.toString()
    }

    public toString() {
      let text = ""
      this.paths.forEach((element: PropertyPath) => {
        text += element.displayName + " : "
      })

      return text.substring(0, text.length - 2)
    }

    public toTextAssemblyParts() {
      const parts :KeyValue[] = []
      this.paths.forEach((element: PropertyPath) => {
        parts.push(new KeyValue(element.systemName, element.lookupTo))
      })
      return parts
    }

    setData(data:any[]) {
      data.forEach((item: any) => {
        if (typeof (item) === "object") {
          if (item?.myspType === myspTypes.ApplicationPreference) {
            const pref = AppPreferencesModule.Preferences.find(x => x.displayName == item.displayName)

            this.displayName = pref?.displayName as string
            this.paths?.push(pref)
          }

          // if item.parts then its PropertyPaths
          if (item.parts) {
            this.paths?.push((item as PropertySelectorPath).toTextAssemblyParts())
          }
        } else {
          this.paths?.push(item)
        }
      })
    }
}
