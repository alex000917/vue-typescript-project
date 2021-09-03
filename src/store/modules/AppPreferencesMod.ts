import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators"

import store from "@/store"
import { ApplicationPreference } from "@/models/ApplicationPreference"
import {
  getApplicationPreferences,

  saveApplicationPreferences
} from "@/api/mainApi"
import { EventBus } from "@/utils/event-bus";
import { EventKeys } from "@/models/Utils/EventKeys";

@Module({ dynamic: true, store, name: "appPreferences", namespaced: true })
class AppPreferencesMod extends VuexModule {
  public Preferences: ApplicationPreference[] = [];

  private dirtyItems = new Map<string, ApplicationPreference>();

  get hasDirtyPrefrencesItems() {
    return this.dirtyItems
  }

  get DirtyItemsValues() {
    const p: ApplicationPreference[] = []
    for (const item of this.dirtyItems.values()) {
      p.push(item)
    }
    return p
  }

  get DirtyItemsCount() {
    return this.dirtyItems.size
  }

  @Mutation
  private async SET_DIRTY(record: ApplicationPreference) {
    this.dirtyItems.set(record.systemName, record)
  }

  @Mutation
  private SET_DATA(pref: ApplicationPreference[] | any[]) {
    // const pref = AppDataModule.getApiData(ApiEndpoints.APPLICATIONPREFERENCES)
    this.Preferences = pref
  }

  @Action
  public async getPreferences() {
    const data = await getApplicationPreferences()
    this.context.commit("SET_DATA", data)
    // this.SET_DATA(data )
  }

  @Action
  public async Upload() {
    const prefs: ApplicationPreference[] = []
    this.dirtyItems.forEach(pref => prefs.push(pref))
    if (prefs.length > 0) {
      await saveApplicationPreferences(prefs).then(rs => {
        EventBus.$message("Application Preferences Saved ")
        this.Reset()
      })
      .catch(error => {
        EventBus.$alert("Unable to save Application Preferences. " + error)
      })
      .finally(() => {
        EventBus.$emit(EventKeys.SET_APP_BUSY, false, "Application Preferences Saved")
      })}
  }

  @Mutation
  private UP_SERT(value: ApplicationPreference) {
    this.dirtyItems.set(value.systemName, value)

    this.Preferences.push(value)
    EventBus.$emit(EventKeys.ENABLE_GLOBAL_SAVE)
  }

  @Action
  public async upSert(record: ApplicationPreference) {
    this.context.commit("UP_SERT", record)
    // this.savePreferences()
  }

  @Mutation
  private DELETE(record: ApplicationPreference) {
    const index = this.Preferences.findIndex(
      x => x.systemName.toLowerCase() === record.systemName.toLowerCase()
    )

    if (index > -1) {
      record.deleted = true
      // this.context.commit('SET_DIRTY', record)
      // do not have newly created and deleted instaces.
      if (record.newInstance) {
        this.dirtyItems.delete(record.systemName)
      } else {
        this.dirtyItems.set(record.systemName, record)
      }
      // this.Preferences.slice(index, 1);
      delete this.Preferences[index]
    }
  }

  @Action
  public async delete(record: ApplicationPreference) {
    // check and update item if item is already in list.
    this.context.commit("DELETE", record)
  }

  @Action
  private async Reset(){
    this.dirtyItems.clear()
    this.getPreferences()
  }
}

export const AppPreferencesModule = getModule(AppPreferencesMod)
