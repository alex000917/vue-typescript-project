import { BaseContent } from "../BaseContent";
import { Restriction } from "../Restriction";
import { ConfirmationProperty } from "./ConfirmationProperty";

export class Button extends BaseContent {
  myspType: string = "";
  attributes: any = null;
  childrenXml: any = null;
  confirmationProperty: ConfirmationProperty | null = null;
  icon: string | null = null;
  enforceMandatory: boolean = true;
  fullSize: boolean = true;
  overrideDisplaySettings: boolean = false;
  transitionType: number = 0;
  destinationStep: string | null = null;
  sourceStep:string | null = null;
  viewByRestriction: Restriction | null = null
}
