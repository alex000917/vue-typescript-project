import { KeyValue } from "./KeyValue"

export class BaseGeneralApplicationInformation {
  myspType = "BaseGeneralApplicationInformation";
}

export class ApplicationPreferenceCategories
  extends BaseGeneralApplicationInformation {
    myspType="ApplicationPreferenceCategories"
    applicationPreferenceCategories: string[] = [];
}
export class EntityReportOrderApplicationInformation
  extends BaseGeneralApplicationInformation {
    myspType="EntityReportOrderApplicationInformation"
    entityOrder: KeyValue[] = [];
}
export class MyWorkPoliciesAssignmentOrder
  extends BaseGeneralApplicationInformation {
    myspType="MyWorkPoliciesAssignmentOrder"
    myWorkPoliciesOrder: KeyValue[] = [];
}
export class DisplayLanguage extends BaseGeneralApplicationInformation {
  myspType="DisplayLanguage"
    id: number|undefined;
    name: string|undefined;
    active: boolean|undefined;
    defaultLanguage: boolean|undefined;
    disabled = false;

    /**
     *
     */
    constructor() {
      super()
    }
}
export class DisplayLanguages {
    myspType="DisplayLanguage"
    displayLanguages: DisplayLanguage[] = []
}
