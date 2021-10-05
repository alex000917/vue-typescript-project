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
    if (this.operator) {
      str += ' ' + this.operator;
    }

    if (this.secondOperandIsProperty && this.secondaryOperand && this.secondaryOperand.length >= 0) {
      str += `[Workflow(${this.secondaryOperand[0].displayName}): ${this.secondaryOperand[1].displayName}]`;
    } else if (this.secondOperandIsApplicationPreference && this.secondaryOperand) {
      str += ` ${this.secondaryOperand[0].displayName}`;
    } else if (this.secondaryOperand && this.secondaryOperand.length === 1){
      str += ` ${this.secondaryOperand[0]}`;
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
      if (this.secondOperandIsProperty)
        return `Skip if [Form (${this.secondaryOperand[0].displayName}): ${this.secondaryOperand[1].displayName}] is empty`;
      else if (this.secondOperandIsApplicationPreference) {
        return `Skip if [Form (${this.secondaryOperand[0].displayName})] is empty`;
      }
      else {
        return `Skip if [Form (${this.secondaryOperand[0]})] is empty`;
      }
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
export class AttachmentCondition extends PropertyCondition {
  myspType= "AttachmentCondition"
  contains: number = 0
  attachmentType = ''

  getDisplayName() {
    let str = '';
    if (this.mainOperand && this.mainOperand.length > 1) {
      str += `[Workflow(${this.mainOperand[0].displayName}): ${this.mainOperand[1].displayName}]`; 
    }
    str += ' ' + (!this.contains ? 'does not contain' : 'contains');
    if (this.attachmentType) str += ' ' + this.attachmentType;
    return str;
  }
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

export class JavascriptCondition extends PropertyCondition {
  myspType= "JavascriptCondition"
  displayName = ''
  code = ''

  getDisplayName() {
    let str = ''
    if (this.displayName)
      str += this.displayName;
    return str;
  }
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
  step: string | null = null;

  getDisplayName() : string | any {
    let str: string = '';
    if (this.mainOperand && this.mainOperand.length >= 0) {
      str += `[Workflow(${this.mainOperand[0].displayName}): ${this.mainOperand[1].displayName}]`;
    }
    if (this.operator) {
      str += ' ' + this.operator;
    }

    // if (this.secondaryOperand && this.secondaryOperand.length >= 0) {
    //   str += ` ${this.secondaryOperand[0].displayName}`;
    // } 
    if (this.step) {
      str += ' ' + this.step;
    }
    return str;
  }
}

export class WorksheetCondition extends BaseCondition {
  myspType= "WorksheetCondition"
  openWorksheetAfterFinishDate: number | null = null;

  openWorksheetBeforeStartDate: number | null = null;
}
