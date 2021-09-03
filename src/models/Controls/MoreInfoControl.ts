import { CreateUUID } from "@/utils/helper"
import { BaseContent } from "../BaseContent"
import { BaseProperty } from "../Properties"

import { Restriction } from "../Restriction"
import { TextAssembly } from "../TextAssembly"

export interface IValueObject {

}

export class BaseExtendedContent extends BaseContent {
    /**
     *
     */
    public attributes:string| undefined;

    /**
     *
     */
    public childrenXml:string| undefined;
}
export class BaseConditionalContent extends BaseExtendedContent {
    /**
     *
     */
    public editRestriction:Restriction={} as any;

    /**
     *
     */
    public viewRestriction:Restriction={} as any;

    /**
     *
     */
    public actionItemCreateRestriction:Restriction={} as any;

    /**
     *
     */
    public actionItemEditRestriction:Restriction={} as any;

    /**
     *
     */
    public actionItemDeleteRestriction:Restriction={} as any;

    /**
     *
     */
    public attachmentsCreateRestriction:Restriction={} as any;

    /**
     *
     */
    public attachmentsEditRestriction:Restriction={} as any;

    /**
     *
     */
    public attachmentsDeleteRestriction:Restriction={} as any;

    /**
     *
     */
    public participantsFilter:Restriction={} as any;
}
export class BaseTranslationalContent extends BaseConditionalContent {
    /**
     *
     */
    public specificTranslation=false;
}

export class BaseControl extends BaseTranslationalContent {
  // ------------------------------ FIELDS ------------------------------

    /**
     *
     */
    public asLabel =false;
    /**
     *
     */
    public showPropertyHistoryInTooltip=false;

    /**
     *
     */
    public colspan:number|undefined;

    /**
     *
     */
    public columnWidth:number|undefined;

    /**
     *
     */
    public property:BaseProperty={} as any;

    /**
     *
     */
    public customLink:TextAssembly ={} as any;

    /**
     *
     */
    public overrideDefaultLinkSettings=false;

    /**
     *
     */
    public mandatoryProperty:MandatoryProperty={} as any;

    /**
     *
     */
    public nestedPropertyPath:[]=[];

    /**
     *
     */
    public linkToTab:string| undefined;

    /**
     *
     */
    public propertySystemName:string| undefined;

    /**
     *
     */
    public cssClass:string| undefined;

    /**
     *
     */
    public graphicalIndicatorName:string| undefined;

    /**
     *
     */
    public suffix:string| undefined;

    /**
     *
     */
    public overrideControlWidth=false;

    /**
     *
     */
    public containerWidth:number|undefined;

    /**
     *
     */
    public container:BaseControlsContainer={} as any;

    /**
     *
     */
    public calculatedPropertyPath:string|undefined
}
export class MandatoryProperty {
  // ----------------------- FIELDS ------------------------------

    /**
     *
     */
    public mandatory=false;

    /**
     *
     */
    mandatoryAtWorkflowTransitions=false;

    /**
     *
     */
    companionControl:[]=[];
}
export class MoreInfoControl extends BaseControl {
    /**
     *
     */
    public moreInfoTab:Tab={} as any;
}

export class Tab extends BaseConditionalContent {
    /**
     *
     */
    controlsContainers:[];

    /**
     *
     */
    table:Table;

    /** ******* Constructor *********/
    constructor() {
      super()
      this.table = new Table()
      this.controlsContainers = []
    }
}

export class BaseControlsContainer extends BaseConditionalContent {
    /**
     *
     */
    public controls:any[];

    /**
     *
     */
    public controlsInARow=0;

    /** ******* Constructor *********/
    constructor() {
      super()
      this.controls = []
      this.clientId = CreateUUID()
    }

    // --------------------- TRANSIENTS ---------------------
    /**
     *
     */
    public clientId:string| undefined;

    /**
     *
     */
    public finalDropIndex = -1;
}
export class Table extends BaseControlsContainer {

}
