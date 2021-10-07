import { KeyValue } from "../KeyValue";
import { Restriction } from "../Restriction";
import { BaseCondition } from "../Conditions";
export class BaseAction extends BaseCondition {
    myspType = "BaseAction";
    restriction:Restriction | null = new Restriction();
}
export class Actions {
    myspType = "XMLAction";
    restriction:Restriction | null = null;
    xml:string | null = null;
    name:string | null = null
}

export class XMLAction extends BaseAction{
    myspType = "XMLAction";
    xml:string | null = '';
    name:string | null = '';

    getDisplayName() {
        let str: string = '';
        if (this.name) str += this.name;
        return this.name;
    }
}

export class MoveWorkflowAction extends BaseAction{
    myspType = "MoveWorkflowAction";
    item: KeyValue[] = [];
    workflowSystemName: string = '';
    stepSystemName: string = '';

    getDisplayName() {
        let str: string = '';
        if (this.item.length > 0) {
            str += 'Move workflow of item [Workflow' + this.item[0].displayName + ']';
        }
        if (this.stepSystemName) 
            str += "to Step ['" + this.stepSystemName + "']";
        return str;
    }
}

export class ServerAction extends BaseAction{
    myspType = "ServerAction";
    leftOperand: KeyValue[] = [];
    rightOperand: KeyValue[] = [];
}

export class IntegrationAction extends BaseAction {
    myspType = "IntegrationAction";
    name = "";
    description = "";
    javascript = "";
    runType = 0;
    custom = {
      workflow: "",
      button: ""
    }

    getDisplayName() {
        let str: string = '';
        if (this.name) str += this.name;
        return str;
    }
}

export class ItemsetAction extends BaseAction {
    myspType = "ItemsetAction"
    actions = [];
    property = [];
    name = '';

    getDisplayName() {
        return this.name;
    }
}

export class AttachmentAction extends BaseAction {
    myspType = "AttachmentAction"
    attachmentType: string = "";
    step: string = "";
    ruleName: string = "";
    systemName: string = "";

    getDisplayName() {
        return this.ruleName;
    }
}

export class StopRuleAction extends BaseAction {
    myspType = "StopRuleAction"

    getDisplayName() {
        return 'stopRuleAction';
    }
}



