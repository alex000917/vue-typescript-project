import { WorkStep } from "./WorkStep";

export class SideStep extends WorkStep {
    myspType: string = "SideStep";
    resumeButton:any | null;
    displayResumeMainFlowButton: boolean = false;
}