import { VuexModule, Module, Mutation, Action, getModule } from "vuex-module-decorators"
import store from "@/store"
import elementVariables from "@/styles/element-variables.scss"
import defaultSettings from "@/settings"
import {
  getAvailableOrchestratorIlios,
  getAvailableOrchestratorOlios
} from "@/api/orchestratorApi"
import { OrchestratorIlio } from "@/models/orchestrator/OrchestratorIlio"
import { OrchestratorOlio } from "@/models/orchestrator/OrchestratorOlio"
import { Orchestrator } from "@/models/orchestrator/Orchestrator"
export interface ISettingsState {
  theme: string
  fixedHeader: boolean
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
  sidebarTextTheme: boolean
}

@Module({ dynamic: true, store, name: "settings" })
class Settings extends VuexModule implements ISettingsState {
  public theme = elementVariables.theme
  public fixedHeader = defaultSettings.fixedHeader
  public showSettings = defaultSettings.showSettings
  public showTagsView = defaultSettings.showTagsView
  public showSidebarLogo = defaultSettings.showSidebarLogo
  public sidebarTextTheme = defaultSettings.sidebarTextTheme

  @Action
  public async getOrchestratorIlios() {
    return await getAvailableOrchestratorIlios();
  }

  @Action
  public async getOrchestratorOlios() {
    return await getAvailableOrchestratorOlios();
  }

  @Mutation
  private CHANGE_SETTING(payload: { key: string, value: any }) {
    const { key, value } = payload
    if (Object.prototype.hasOwnProperty.call(this, key)) {
      (this as any)[key] = value
    }
  }

  @Action
  public ChangeSetting(payload: { key: string, value: any}) {
    this.CHANGE_SETTING(payload)
  }
}

export const SettingsModule = getModule(Settings)
