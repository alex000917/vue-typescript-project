import { Restriction } from "../Restriction";

export class WorkflowRestriction {
    myspType = "WorkflowRestriction";
    restriction: Restriction | null = null;
    assignee: boolean = false;
    restrictionType: number | null = null;
}