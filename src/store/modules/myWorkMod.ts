import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators"
import store from "@/store"
import { Entity } from "@/models/Entity"
import {
  getMyWorkPolicies,
  getMyWorkCalendars,
  getMyWorkPolicy
} from "@/api/myWorkApi"
import { Node } from "@/models/Node"
import { MyWorkCalendar, MyWorkPolicy } from "@/models/myWork"
import { getWorkflows } from "@/api/workflowApi"
import { KeyValue } from "@/models/KeyValue"
import { EntitiesModule } from "./entitiesMod"
import { Workflow } from "@/models/Workflows/workflow"
import { ItemInstance } from "@/models/ItemInstance"

export interface IMyWorkState {
  treeItems: Node | null
  dirtyPolicies: Map<string, MyWorkPolicy>
  currentPolicy: MyWorkPolicy | null
  calendars: MyWorkCalendar[] | null
  currentPageId: string | null
}

@Module({ dynamic: true, store, name: "mywork" })
class MyWorkMode extends VuexModule implements IMyWorkState {
  public treeItems: Node | null = null;
  public currentPolicy: MyWorkPolicy | null = null;
  public dirtyPolicies = new Map<string, MyWorkPolicy>();
  public calendars: MyWorkCalendar[] = [];
  public currentPageId: string | null = null;
  public workflows: ItemInstance[] | null = null;

  get hasDirtyMyWorkItems() {
    return this.dirtyPolicies
  }

  get dirtyMyWorkPoliciesValues() {
    const items: MyWorkPolicy[] = []
    for (const o of this.dirtyPolicies.values()) {
      items.push(o)
    }
    return items
  }

  @Mutation
  public SET_MYWORK_TREE_ITEMS(payload: Node) {
    this.treeItems = payload
  }

  @Mutation
  public UPDATE_MYWORK_TREE_ITEMS(payload: {
    type: string
    data: MyWorkPolicy
  }) {
    const newNode = new Node()
    newNode.attributes = new Array(
      new KeyValue("SYSTEM_NAME", payload.data.systemName)
    )
    newNode.id = payload.data.systemName
    newNode.name = payload.data.displayName
    newNode.tooltip = payload.data.displayName

    switch (payload.type) {
      case "ADD":
        if (payload.data.outOfTheBox) {
          this.treeItems?.children[1].children.push(newNode)
        } else this.treeItems?.children[0].children.push(newNode)
        this.dirtyPolicies.set(payload.data.systemName, payload.data)
        break
    }
  }

  @Mutation
  public SET_CALENDARS(payload: MyWorkCalendar[]) {
    this.calendars = payload
  }

  @Mutation
  public SET_MYWORK_PAGE_ID(payload: string) {
    this.currentPageId = payload
  }

  @Mutation
  public UPDATE_CALENDARS(payload: {
    index: number
    data: MyWorkCalendar
    type: string
  }) {
    const { index, data, type } = payload
    const state = [...(this.calendars as MyWorkCalendar[])]
    switch (type) {
      case "ADD":
        state?.push(data)
        break
      case "UPDATE":
        state[index] = data
        break
      case "DELETE":
        state?.splice(index, 1)
        break
    }

    this.calendars = state

    console.log(this.calendars, "hey")
  }

  @Mutation
  public SET_CURRENT_POLICY(payload: MyWorkPolicy) {
    if(!payload) return null;
    this.currentPolicy = payload
  }

  @Mutation
  public SET_WORKFLOWS(payload: ItemInstance[]) {
    this.workflows = payload
  }

  @Action
  public async getCurrentPolicy(myPolicySystemName: string) {
    const _policy:any = await getMyWorkPolicy(myPolicySystemName)
    this.context.commit('SET_CURRENT_POLICY', _policy as MyWorkPolicy);
  }

  currentEntity: Entity | null = null
  @Mutation
  SET_CURRENT_ENTITY(entity: Entity) {
    this.currentEntity = entity
  }

  @Action
  async SetCurrentEntity(entityId: string) {
    const rs: Entity = await EntitiesModule.getEntity(entityId)
    this.context.commit('SET_CURRENT_ENTITY', rs)
  }

  @Action
  public async SelectCurrentPolicy(myPolicySystemName: string) {
    let _policy
    try {
      _policy = await getMyWorkPolicy(myPolicySystemName)
    }
    catch (ex) {
      if (!_policy) {
        _policy = this.dirtyPolicies.get(myPolicySystemName)
        console.log(_policy);
      }
    }

    this.context.commit('SET_MYWORK_PAGE_ID', myPolicySystemName)
    this.context.commit('SET_CURRENT_POLICY', _policy as MyWorkPolicy)

    // console.log(this.currentPolicy?.root?.children?.entityId);
    // await this.SetCurrentEntity(this.currentPolicy?.root?.children?.entityId)
  }

  @Mutation
  RESET_SELECTION() {
    this.currentPageId = null
    this.currentPolicy = null
  }

  @Action
  public ResetSelection() {
    this.context.commit('RESET_SELECTION');
  }


  @Action
  public async getMyWrokPoliciesList() {
    const _treeItems:any = await getMyWorkPolicies()
    this.context.commit('SET_MYWORK_TREE_ITEMS', _treeItems as Node);
  }

  @Action
  public async getCalendersList() {
    const _calendars:any = await getMyWorkCalendars();
    this.context.commit('SET_CALENDARS', _calendars as MyWorkCalendar[]);
  }

  @Action
  public async getWorkflowsList() {
    const _workflows = await getWorkflows()
    this.context.commit('SET_WORKFLOWS', _workflows)
  }
}

export const MyWorkModule = getModule(MyWorkMode)
