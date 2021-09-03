import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators"
import store from "@/store"
import { ItemInstance } from "@/models/ItemInstance"
import { KeyValue } from "@/models/KeyValue"
import { getWorkflows, getIconsInFolder } from "@/api/workflowApi"
import { getWorkflow } from "@/api/mainApi"
import _ from "lodash"
import { Workflow } from "@/models/Workflows/workflow"
export interface IWorkflowData {
  Workflows: ItemInstance[]
  ActiveWorkflow: Workflow | null
}

@Module({ dynamic: true, store, name: "workflowMod" })
class WorkflowMod extends VuexModule implements IWorkflowData {
  ActiveWorkflow: Workflow | null = null;
  Workflows: ItemInstance[] = [];

  private DirtyItems = new Map<String, Workflow>();

  get hasDirtyWorkflowsItems() {
    return this.DirtyItems
  }

  get dirtyWorkFlowValues() {
    const items: Workflow[] = []
    for (const i of this.DirtyItems.values()) {
      items.push(i)
    }
    return items
  }

  get workflowEntityNameList() {
    return _.uniqBy(
      _.map(this.Workflows, workflow => {
        return new KeyValue(workflow.entityName as string, workflow.itemId)
      }),
      "key"
    )
  }

  @Action
  public async getWorkflows() {
    const rs = await getWorkflows()
    this.context.commit('SET_WORKFLOWs', rs);
  }

  @Action
  public async getIcons() {
    const rs = await getIconsInFolder();
    console.log(rs);
  }

  @Mutation
  SET_WORKFLOWs(rs: ItemInstance[]) {
    this.Workflows = rs
  }

  @Mutation
  SET_DIRTYITEMS(rs: {
    data: Workflow
    action: string
  }) {
    const { data, action } = rs
    if (!data) return
    switch (action) {
      case "add":
        this.DirtyItems.set(data.systemName, data)
        break
    }
  }

  @Action
  public async getCache() {
    await this.getWorkflows()
  }

  @Mutation
  private SET_ACTIVE_WORKFLOW(rs: Workflow) {
    this.ActiveWorkflow = rs
  }

  @Mutation
  SET_ACTIVE_WORKFLOW_NULL(){
    this.ActiveWorkflow = null
  }

  @Action({rawError: true})
  public async getActiveWorkFlow(workflowId: string) {
    this.context.commit('SET_ACTIVE_WORKFLOW_NULL');
    const rs = await getWorkflow(workflowId);
    this.context.commit('SET_ACTIVE_WORKFLOW', rs);
    return rs;
  }
  
  @Action
  public setActiveWorkFlowNull(){
    this.SET_ACTIVE_WORKFLOW_NULL()
  }

}

export const WorkflowModule = getModule(WorkflowMod)
