import { BaseContent } from "../BaseContent";
import { Restriction } from "../Restriction";
import { ActionGroup } from "./ActionGroup";

export class ActionWorkflowRule extends BaseContent {
    myspType = "ActionWorkflowRule";
    conditions:Restriction | null = null;
    actionGroup:ActionGroup | null = null;
}