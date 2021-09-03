import { BaseContent } from "../BaseContent";
import { Button } from "./Button";
import { WorkflowRestriction } from "./WorkflowRestriction";

export class Transition extends BaseContent {
  myspType = "Transition";
  allowedUsersRestriction: WorkflowRestriction | null = null;
  button: Button | null = null;
  showInGraph: boolean = true;
  type: number = 1;
  destinationTransitionSystemName: any = null;
  sourceStep:string='';
  destinationStep:string='';
}
