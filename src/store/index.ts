import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import { IAppState } from "./modules/app"
import { IUserState } from "./modules/user"
import { ITagsViewState } from "./modules/tags-view"
import { IErrorLogState } from "./modules/error-log"
import { IPermissionState } from "./modules/permission"
import { ISettingsState } from "./modules/settings"
import { IEntitiesState } from "./modules/entitiesMod"
import { FlexPreferencesModule } from "./modules/AppFlexPreferencesMod"
import { ApplicationPreference } from "@/models/ApplicationPreference"
import { FlexApplicationPreferences } from "@/models/FlexApplicationPreferences"
import { IAppCache } from "./modules/appCache"
import { IFormsData } from "./modules/FormsStore"
import { IimportExport } from "./modules/AppImportExportMod"
import { IWorkflowData } from "./modules/WorkflowMod"
Vue.use(Vuex)

export interface IRootState {
  entities: IEntitiesState
  app: IAppState
  user: IUserState
  // tagsView: ITagsViewState
  // errorLog: IErrorLogState
  // permission: IPermissionState
  // settings: ISettingsState
  appCache: IAppCache
  formsMod: IFormsData
  importExportMod:IimportExport
  workflowMod:IWorkflowData
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({})
