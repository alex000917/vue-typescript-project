import { AuthorizationTree } from "../authorizations/AuthorizationTree"
import { LanguageTranslation } from "../LanguageTranslation"
import { Entity } from "../Entity"
import { newGuid } from "../Utils"
import { BaseContent } from "../BaseContent"
import { Ribbon } from "./Ribbon"
import { FlowStep } from "./FlowStep"
import { SideStep } from "./SideStep"
import { ActionWorkflowRule } from "./ActionWorkflowRule"

export class Workflow extends BaseContent {
  myspType = "Workflow";
  newInstance = false;
  deleted = false;
  clientId: string | null = null;
  entityId: string | null = null;
  id: string | null = null;
  authorizationTreeId: string | null = null;
  authorizationTree: AuthorizationTree | null = null;
  languageTranslations: LanguageTranslation[] = [];
  ribbons: Ribbon[] | null = null;
  flowSteps: FlowStep[] | null = null;
  sideSteps: SideStep[] | null = null;
  stopWorkflowRules: any[] | null = null;
  actionWorkflowRules: ActionWorkflowRule[] | null = null;
  emptyLanesSystemName: any[] | null = null;
  dateCreated: number | null = null;
  createdBy: string | null = null;
  dateModified: number | null = null;
  modifiedBy: string | null = null;
  outOfTheBox = false;
  cloned = false;

  constructor() {
    super()

    this.clientId = newGuid()
    this.myspType = "Workflow"
  }

  //* *************Transients************//
  entity: Entity | null = null;
  emptyLanes: any[] | null = null;

  //* ****** Transients *********//
}
