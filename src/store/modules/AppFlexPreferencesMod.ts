import { VuexModule, Module, Mutation, Action, getModule } from "vuex-module-decorators"

import store from "@/store"

import { FlexApplicationPreferences } from "@/models/FlexApplicationPreferences"
import { getFlexApplicationPreferences } from "@/api/mainApi"
import { EventBus } from "@/utils/event-bus"

@Module({ dynamic: true, store, name: "flexPreferences" })
class AppFlexPreferencesMod extends VuexModule {
    public FlexPreferences: FlexApplicationPreferences = {} as any;

    @Mutation
    private SET_DATA(data: FlexApplicationPreferences) {
      this.FlexPreferences = data
    }

    @Action
    public async getFlexCache() {
      const rs:any = await getFlexApplicationPreferences()
      this.SET_DATA(rs)
    }

    get propertyDataTypes() {
      return this.FlexPreferences.propertyDataTypes
    }
}

export const FlexPreferencesModule = getModule(AppFlexPreferencesMod)
