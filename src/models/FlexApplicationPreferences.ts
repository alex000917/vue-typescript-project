import { KeyValue } from "./KeyValue"

export class FlexApplicationPreferences {
    myspType="FlexApplicationPreferences"
    baseRoles: KeyValue[] =[];
    dataTypes: KeyValue[]=[];
    dateFormat:string | undefined;
    dateTimeFormat:string | undefined;
    systemDateFormat:string | undefined;
    systemDateTimeFormat:string | undefined;
    disciplines: KeyValue[]=[];
    languages: KeyValue[] = [];
    logo:string | undefined;
    periodPickerTypes: KeyValue[] = [];
    scoreboards: KeyValue[] = [];
    skins: KeyValue[] = [];
    sqlConnections: KeyValue[] = [];
    states: KeyValue[] = [];
    textFormatting: KeyValue[] = [];
    translations: KeyValue[] = [];
    virtualEntityDataTypes: KeyValue[] = [];
    workflowButtonsRelativePath: KeyValue[] = [];
    propertyDataTypes: KeyValue[] = [];
    providerTypes: KeyValue[] = [];
    currentLocale:string | undefined;
    loggedInUserFullName:string | undefined;
}
