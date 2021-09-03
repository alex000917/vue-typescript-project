import { ApplicationPreference } from "@/models/ApplicationPreference"
import { KeyValue } from "../KeyValue"
import { DataUtils } from "./DataUtils"
import { StringUtils } from "./StringUtils"

export class ApplicationPreferenceFactory {
    public static MY_WORK = "MY_WORK";
  public static DIALOG = "DIALOG";
    public static APERIO_DASHBOARD = "APERIO_DASHBOARD";
    public static GENERAL = "GENERAL";
    public static ADDED_APPLICATION_PREFERENCES = "ADDED_APPLICATION_PREFERENCES";
    public static APP_PROP_PREFIX = "APP_PROP";

    // ------------------------------ METHODS ------------------------------

    public static getApplicationPreference(dataTypeValue:string, value:string, displayName:string, description:string
      , systemName:string
      , lookupEntityId:string
      , lookupValueName:string|null = null):ApplicationPreference {
      const applicationPreference:ApplicationPreference = new ApplicationPreference()
      applicationPreference.value = value
      applicationPreference.dataType = dataTypeValue
      applicationPreference.displayName = displayName
      applicationPreference.description = description
      applicationPreference.systemName = DataUtils.convertToSystemName(systemName)
      applicationPreference.lookupEntityId = lookupEntityId
      applicationPreference.lookupValueName = lookupValueName
      applicationPreference.newInstance = true
      return applicationPreference
    }

    /**
     *
     * @return (Used only in Mock)
     */
    public static getAllApplicationPreferenceCategories():string[] {
      const categories = []

      categories.push(ApplicationPreferenceFactory.MY_WORK)
      categories.push(ApplicationPreferenceFactory.DIALOG)
      categories.push(ApplicationPreferenceFactory.APERIO_DASHBOARD)
      categories.push(ApplicationPreferenceFactory.GENERAL)
      categories.push(ApplicationPreferenceFactory.ADDED_APPLICATION_PREFERENCES)

      return categories
    }

    public static isKeyValueArrayApplicationPreference(keyValues:KeyValue[]):boolean {
      // an array collection representing application preference will be of length 2

      if (keyValues == null || keyValues.length < 2) {
        return false
      }
      const keyValue:KeyValue = keyValues[0]
      return keyValue && !StringUtils.isNullOrEmpty(keyValue.key) && keyValue?.key?.indexOf(ApplicationPreferenceFactory.APP_PROP_PREFIX) != -1
    }

    public static getApplicationPreferenceFromKeyValueArray(keyValues:any[]
      , applicationPreferences:Map<string, ApplicationPreference>):ApplicationPreference|null {
      if (!ApplicationPreferenceFactory.isKeyValueArrayApplicationPreference(keyValues)) {
        return null
      }
      const pair:KeyValue = <KeyValue><unknown>keyValues[1]
      return (<ApplicationPreference>applicationPreferences.get(pair.key as any))
    }

    public static createKeyValueArrayFromApplicationPreference(applicationPreference:ApplicationPreference, prefix = "%"):KeyValue[] {
      const keyValues:KeyValue[] = []

      let keyValue:KeyValue = new KeyValue(prefix + ApplicationPreferenceFactory.APP_PROP_PREFIX, null)
      keyValues.push(keyValue)
      keyValue = new KeyValue(applicationPreference.systemName, null)
      keyValues.push(keyValue)
      return keyValues
    }
}
