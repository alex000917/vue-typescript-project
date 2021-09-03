import { BaseContent } from "../BaseContent";
import { WorkflowRestriction } from "./WorkflowRestriction";
import { InstructionLine } from "./InstructionLine";
import { Transition } from "./Transition";
import { StepNotification } from "./StepNotification";

export class WorkStep extends BaseContent {
  attributes = null;
  childrenXml = null;
  approveByRestriction: WorkflowRestriction | null = null;
  assigneeAuthorizationNodeSystemName: string | null = null;
  enteringServerActionGroup: any | null;
  exitingServerActionGroup = null;
  instructionLine: InstructionLine[] = [];
  saveButtonRestriction:WorkflowRestriction | null = null;
  stepNotification: StepNotification | null  = null;;
  transitions: Transition[] = [];
  overrideDisplaySettings: boolean = false;
  overrideInstructionLineSettings: boolean = false;
  statusSystemName: string | null = null;;
  updateEntityStatusWhenEnteringStep: boolean = true;
}
