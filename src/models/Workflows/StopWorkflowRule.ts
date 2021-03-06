import { BaseContent } from "../BaseContent";
import { Restriction } from "../Restriction";
import { TextAssembly } from "../TextAssembly";

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
export class StopWorkflowRule extends BaseContent {
  myspType = "StopWorkflowRule";
  conditions: Restriction | null = null;
  description: string = "";
  descriptionLanguageKey: string = "";
  displayName: string = "";
  displayNameLanguageKey: string = "";
  languageTranslations: any[] = [];
  systemName: string = "";
  message: TextAssembly[] = [];
}
export class XmlWorkflowRule extends BaseContent {
  myspType = "XmlWorkflowRule";
  conditions = null;
  description = null;
  descriptionLanguageKey = null;
  displayName = "";
  displayNameLanguageKey = null;
  languageTranslations: any[] = [];
  notes = null;
  systemName = "";
  xml = "";
}

export class AttachmentStopWorkflowRule extends BaseContent {
  myspType = "AttachmentStopWorkflowRule";
  conditions: Restriction | null = null;
  description: string = "";
  descriptionLanguageKey: string = "";
  displayName: string = "";
  displayNameLanguageKey: string = "";
  languageTranslations: any[] = [];
  systemName: string = "";
  message: TextAssembly[] = [];
}
