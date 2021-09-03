import { BaseContent } from "../BaseContent"
import { IBaseCreatableContent } from "../BaseCreatableContent"
import { IHierarchicalObject } from "../HierarchicalObject"
import { newGuid } from "../Utils"
import { Provider } from "./Provider"

export class Orchestrator extends BaseContent {
  constructor() {
    super()
    this.clientId = newGuid()
  }

    orchestrator2MspPort:string |null = null;

    msp2OrchestratorPort:string |null = null;

    host:string |null = null;

    indexPosition:number|null =null;
    orchestratorIlios: any[] = [];
    orchestratorOlios:any[] = [];
    providers:Provider[]|null =null;
    outOfTheBox=false;
    clientId:string |null= null;
    id:string |null= null;
    newInstance=false;
    deleted =false;
    dateCreated:number|null = null;
    createdBy:string |null = null;
    dateModified:number|null =null;
    modifiedBy:string |null = null;
}
