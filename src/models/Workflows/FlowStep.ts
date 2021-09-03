import { WorkStep } from "./WorkStep";

export class FlowStep extends WorkStep {
    myspType: string = "FlowStep";
    optionalRestriction: any | null;
    startStep: boolean = true;
}