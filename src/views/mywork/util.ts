import { AppCacheModule } from "@/store/modules/appCache.ts"
import { DataUtils } from "@/models/Utils/DataUtils.ts"

export const displayNameRule = (rule:any, value:string, callback:any) => {
  if (!value) {
    return callback(new Error("Please input the displayName."))
  }
  if (!DataUtils.validateDisplayName(value)) {
    return callback(new Error("DisplayName must have only English letters, numbers, and space."))
  }
  setTimeout(() => {
    // ------***TODO***------- Getting all Policies and check being duplicate
    if (AppCacheModule.getAllEntitiesName.includes(value.toLowerCase())) {
      callback(new Error("This name was already registered."))
    } else {
      callback()
    }
  }, 500)
}
