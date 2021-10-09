import { BaseContent } from "../BaseContent";
import { Restriction } from "../Restriction";
import { ActionGroup } from "./ActionGroup";

export class StopWorkflowRule extends BaseContent {
  myspType = "StopWorkflowRule";
  conditions: Restriction | null = null;
  description: string = "";
  descriptionLanguageKey: string = "";
  displayName: string = "";
  displayNameLanguageKey: string = "";
  languageTranslations: any[] = [];
  message: any[] = [];
  systemName: string = "";
}

// conditions:Object
// description:null
// descriptionLanguageKey:null
// displayName:"Pending approval please resolve"
// displayNameLanguageKey:null
// languageTranslations:Array[0]
// message:Array[2]
// myspType:"StopWorkflowRule"
// notes:null
// systemName:"cse_pendingapprovalpleaseresolve"
