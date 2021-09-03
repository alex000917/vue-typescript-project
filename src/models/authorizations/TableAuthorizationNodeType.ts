import { SetProperty } from "../Properties"
import { PropertyAuthorizationNodeType } from "./PropertyAuthorizationNodeType"

export class TableAuthorizationNodeType extends PropertyAuthorizationNodeType {
    // ------------------------------ FIELDS ------------------------------
    myspType = "TableAuthorizationNodeType";
    tablePropertySystemName: string | null = null;
    tableProperty: SetProperty | null = null;
}
