import { Restriction } from "@/models/Restriction"
import { KeyValue } from "./KeyValue"

export class BaseCondition {
  myspType= "BaseCondition"
  public clone() {
    return JSON.parse(JSON.stringify(this))
  }
}
export class PropertyCondition extends BaseCondition {
  myspType= "PropertyCondition"
  mainOperand: KeyValue[] | null = null;
  secondaryOperand: KeyValue[] | null = null;
  operator: string | null = null;
  skipConditionIfMainOperandIsEmpty = false;
  skipConditionIfSecondaryOperandIsEmpty = false;
  secondOperandIsProperty = false;
  secondOperandIsApplicationPreference = false;
  
  getDisplayName() : string | any {
    let str: string = '';
    if (this.mainOperand && this.mainOperand.length >= 0) {
      str += `[Workflow(${this.mainOperand[0].displayName}): ${this.mainOperand[1].displayName}]`;
    }
    if (this.operator && (this.secondOperandIsApplicationPreference || this.secondOperandIsProperty)) {
      str += ' ' + this.operator;

      if (this.secondOperandIsProperty && this.secondaryOperand && this.secondaryOperand.length >= 0) {
        str += `[Workflow(${this.secondaryOperand[0].displayName}): ${this.secondaryOperand[1].displayName}]`;
      } else if (this.secondOperandIsApplicationPreference && this.secondaryOperand) {

      }
    }
    return str;
  }

  getSkipMailOperandAlert(): string | any {
    if (this.skipConditionIfMainOperandIsEmpty && this.mainOperand && this.mainOperand.length >= 0) {
      return `Skip if [Form (${this.mainOperand[0].displayName}): ${this.mainOperand[1].displayName}] is empty`;
    } else 
      return '';
  }

  getSkipSecondOperandAlert(): string | any {
    if (this.skipConditionIfSecondaryOperandIsEmpty && this.secondaryOperand && this.secondaryOperand.length >= 0) {
      return `Skip if [Form (${this.secondaryOperand[0].displayName}): ${this.secondaryOperand[1].displayName}] is empty`;
    } else 
      return '';
  }

}
export class EntityCategoryCondition extends PropertyCondition {
  myspType= "EntityCategoryCondition"
}
export class ItemSetCondition extends BaseCondition {
  myspType= "ItemSetCondition"
  property: any[] | null = null;

  restriction: Restriction | null = null;

  displayName: string | null = null;

  itemSetConditionType: number | null = null;

  skipConditionIfSetIsEmpty = false;
}
export class AttachmentCondition extends ItemSetCondition {
  myspType= "AttachmentCondition"
}
export class FreeTextCondition extends BaseCondition {
  myspType= "FreeTextCondition"
  text: string | null = null;

  displayName: string | null = null;
}

export class PropertyChangeCondition extends BaseCondition {
  myspType= "PropertyChangeCondition"
  property: any[] | null = null;

  newValueCanBeEmpty = false;
}
export class RoleCondition extends PropertyCondition {
  myspType= "RoleCondition"
  loggedInUser = false;
}

export class StateCondition extends PropertyCondition {
  myspType= "StateCondition"
}

export class StatusCondition extends PropertyCondition {
  myspType= "StatusCondition"
}

export class TransitionCondition extends BaseCondition {
  myspType= "TransitionCondition"
  type: number | null = null;

  stepsToIncludeType: number | null = null;

  restrictToPreviousOrLaterStep = false;

  stepSystemName: string | null = null;
}

export class WorkflowCondition extends PropertyCondition {
  myspType= "WorkflowCondition"
  workflowId: string | null = null;
}

export class WorksheetCondition extends BaseCondition {
  myspType= "WorksheetCondition"
  openWorksheetAfterFinishDate: number | null = null;

  openWorksheetBeforeStartDate: number | null = null;
}
