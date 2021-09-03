import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators"
import store from "@/store"

import { Dialog, Loading } from "element-ui"

import { Entity } from "@/models/Entity"
import { ItemInstance } from "@/models/ItemInstance"
import { FlexApplicationPreferences } from "@/models/FlexApplicationPreferences"
import { ApplicationPreference } from "@/models/ApplicationPreference"
import { FormsModule } from "./FormsStore"
import { KeyValue } from "@/models/KeyValue"
import { EntitiesModule } from "./entitiesMod"
import {
  getApplicationPreferences,
  getDialogRoles,
  getDisplayLanguages,
  getEntityDataByQueryString,
  getFlexApplicationPreferences,
  getRecentItems
} from "@/api/mainApi"
// import { getAuthorizableEntities } from "@/api/authorizationApi"
import { getWorkflows } from "@/api/workflowApi"
import { getEntityRelationshipIcons } from "@/api/entitiesApi"
import { Node } from "@/models/Node"
import { AppPreferencesModule } from "@/store/modules/AppPreferencesMod"
import { DisplayLanguages } from "@/models/DisplayLanguages"
import { EventBus } from "@/utils/event-bus"
import { EventKeys } from "@/models/Utils/EventKeys"
import { error } from "console"
import { FlexPreferencesModule } from "./AppFlexPreferencesMod"
import { AuthorizationModule } from "./AuthorizationMod"
import { MyWorkModule } from "./myWorkMod"
import { DialogRole } from "@/models/DialogRole"
import { WorkflowModule } from "./WorkflowMod"

export interface IAppCache {
  FlexSettings: FlexApplicationPreferences
  RecentItems: ItemInstance[]

  AuthorizableEntities: []
}

@Module({ dynamic: true, store, name: "appCache" })
class AppCacheMod extends VuexModule implements IAppCache {
  // /**
  //  *
  //  */
  // constructor() {
  //   super(AppCacheMod);
  //   console.log("AppCacheMod constructor")
  //   EventBus.$on(EventKeys.DIRTY_ITEMS_UPDATED, () => {
  //     console.log("AppCacheMod dirtyItems updated.");
  //     if (this.getDirtyItems() > 0) {
  //       this.enableSaveButton(true);
  //     } else this.enableSaveButton(false);
  //   });
  // }

  // public FlexSettings: FlexApplicationPreferences = {} as any;
  // public Entities: Entity[] = [];
  public RecentItems: ItemInstance[] = [];
  public EntityRelationshipIcons: KeyValue[] = [];

  public AuthorizableEntities = [] as any;

  get getAllEntitiesName() {
    return EntitiesModule.EntitiesTree.children.reduce(
      (total: any, entity: any) => {
        return total.concat(
          entity.children.map((child: any) => child.name.toLowerCase())
        )
      },
      []
    )
  }

  get FlexSettings() {
    return FlexPreferencesModule.FlexPreferences
  }

  get getAllEntitiesHebrewName() {
    return EntitiesModule.EntitiesTree.children.reduce(
      (total: any, entity: Node) => {
        return total.concat(
          entity.children.map((child: Node) => child.name.toLowerCase())
        )
      },
      []
    )
  }

  get getEntities() {
    return EntitiesModule.EntitiesTree
  }

  @Mutation
  private CHANGE_SETTING(payload: { key: string, value: any }) {
    const { key, value } = payload
    if (Object.prototype.hasOwnProperty.call(this, key)) {
      (this as any)[key] = value
    }
  }

  @Action
  public ChangeSetting(payload: { key: string, value: any }) {
    this.CHANGE_SETTING(payload)
  }

  @Action
  public async getPreferences() {
    await AppPreferencesModule.getPreferences()
  }

  @Action
  public async getFlexSettings() {
    await FlexPreferencesModule.getFlexCache()
  }

  @Mutation
  private SET_RECENT(rs: ItemInstance[]) {
    this.RecentItems = rs
  }

  @Action
  public async getRecentItems() {
    const rs:any = await getRecentItems(10)
    this.SET_RECENT(rs)
  }

  @Action
  async InsertRecentItem(item: ItemInstance) {
    if (item) {
      if (this.RecentItems.length > 10) {
        this.RecentItems.pop()
      }
      const index = this.RecentItems.findIndex(
        x => x.uniqueId === item.uniqueId
      )
      if (index > -1) {
        delete this.RecentItems[index]
      }
      this.RecentItems.unshift(item)
    }
  }

  @Mutation
  private SET_AUTH_ENTITIES(rs: any) {
    this.AuthorizableEntities = rs
  }

  // @Action
  // public async getAuthorizableEntities() {
  //   const rs = await getAuthorizableEntities()
  //   this.SET_AUTH_ENTITIES(rs)
  // }

  @Action
  public async getFormsCache() {
    const rs = await FormsModule.getForms()
  }

  @Action
  public async getEntityCache() {
    await EntitiesModule.getEntitiesTree()
    await EntitiesModule.getReportableEntitiesOrderData()
  }

  @Action
  public async getMyWorkCache() {
    await MyWorkModule.getCalendersList()
    await MyWorkModule.getWorkflowsList()
    await MyWorkModule.getMyWrokPoliciesList()
  }

  @Action
  public async getWorkFlowCache() {
    await WorkflowModule.getWorkflows()
  }

  @Action
  public async getAuthCache() {
    await AuthorizationModule.getAuthorizableEntities()
    await AuthorizationModule.getDialogRolesList()
    await AuthorizationModule.getProductsList()
  }

  loadingCache = false;
  public CacheLoaded = false;
  @Mutation
  private setLoadingState(state: boolean) {
    this.loadingCache = state
  }

  @Mutation
  private SET_CACHE_STATE(status: boolean) {
    this.CacheLoaded = status
  }

  @Action
  public async getAppCache() {
    this.setLoadingState(true)
    const indicator = Loading.service({
      lock: true,
      text: "Loading Application Cache...",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    })
    try {
      this.SET_CACHE_STATE(false)
      console.log("getFlexSettings")
      await this.getFlexSettings()

      console.log("getRecentItems")
      await this.getRecentItems()

      console.log("getEntityCache")
      await this.getEntityCache()

      console.log("getFormsCAche")
      await this.getFormsCache()

      console.log("getRelationshipIcons")
      await this.getEntityRelationshipIcons()

      console.log("get roles")
      await this.getRoles()

      console.log("getOperators")
      await this.getoperators()

      console.log("getAuthCAche")
      await this.getAuthCache()

      console.log("getmyWorkCache")
      await this.getMyWorkCache()

      console.log("getWorkFlowCache")
      await this.getWorkFlowCache()

      // Add more cache calls
      console.log("getPreferences")
      await this.getPreferences()

      this.subscribeSaveEvents()
      this.SET_CACHE_STATE(true)
    } catch (err) {
      throw new Error("unable to load cache. ")
    } finally {
      this.setLoadingState(false)
      indicator.close()
    }
  }

  @Action
  private subscribeSaveEvents() {
    console.log("AppCacheMod constructor")
    EventBus.$on(EventKeys.DIRTY_ITEMS_UPDATED, () => {
      console.log("AppCacheMod dirtyItems updated.")
      if (this.getDirtyItems() > 0) {
        this.enableSaveButton(true)
      } else this.enableSaveButton(false)
    })
  }

  @Action
  public async getoperators() {
    const rs = FormsModule.getFormsApplicationPreferences()
  }

  @Action
  public async getDisplayLanguages() {
    const rs:any = await getDisplayLanguages()

    return (rs as DisplayLanguages).displayLanguages
  }

  @Action
  public async getWorkflows() {
    const rs = await getWorkflows()
    return rs
  }

  @Action
  public async getEntityByQueryString(
    entityId: string,
    queryString: string,
    pageSize: number
  ) {
    const rs = await getEntityDataByQueryString({
      entityId,
      queryString,
      pageSize
    })

    return rs
  }

  @Mutation
  SET_ENTITYRELATIONSHIPICONS(rs: any) {
    this.EntityRelationshipIcons = rs
  }

  @Action
  public async getEntityRelationshipIcons() {
    const rs = await getEntityRelationshipIcons()
    this.SET_ENTITYRELATIONSHIPICONS(rs)
  }

  @Action
  public getDirtyItems() {
    // get all dirtyitems counts.
    let size = 0
    size += EntitiesModule.getDirtyEntities().size
    size += AppPreferencesModule.DirtyItemsCount
    size += AuthorizationModule.dirtyAuthorizations.size
    // TODO Add More modules

    return size
  }

  private saveButtonEnabled = false;
  @Mutation
  private enableSaveButton(state: boolean) {
    this.saveButtonEnabled = state
  }

  get saveEnabled() {
    return this.saveButtonEnabled
  }

  dialogRoles: DialogRole[] = [];
  @Mutation
  private SET_ROLES(rs: DialogRole[]) {
    this.dialogRoles = rs
  }

  @Action
  public async getRoles() {
    const rs = await getDialogRoles()
    this.context.commit("SET_ROLES", rs)
  }

  get hasDirtyItems() {
    return (
      EntitiesModule.hasDirtyEntityItems ||
      MyWorkModule.hasDirtyMyWorkItems ||
      AuthorizationModule.hasDirtyAuthItems ||
      FormsModule.hasDirtyFormsItems ||
      WorkflowModule.hasDirtyWorkflowsItems
    )
  }
}

export const AppCacheModule = getModule(AppCacheMod)
