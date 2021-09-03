import { VuexModule, Module, Mutation, Action, getModule } from "vuex-module-decorators"

import store from "@/store"
import { ApplicationPreference } from "@/models/ApplicationPreference"
import { getApplicationPreferences, reloadSettings, saveApplicationPreferences, startExport, startImportPostRestart, startImportPreRestart } from "@/api/mainApi"

export interface IimportExport {

  logs: string[]
}
@Module({ dynamic: true, store, name: "appImportExport", namespaced: true })
class AppImportExportMod extends VuexModule {
  @Action
  public async importDbSchema(backupconfig: boolean) {
    return await startImportPreRestart(backupconfig)
  }

  @Action
  public async importSolutionConfigs(importEnvAppPref: boolean) {
    return await startImportPostRestart(importEnvAppPref)
  }

  @Action
  public async reloadSettingsClick() {
    return await reloadSettings()
  }

  @Action
  public async export(exportEnvAppPref:boolean) {
    return await startExport(exportEnvAppPref)
  }
}

export const AppImportExportModule = getModule(AppImportExportMod)
