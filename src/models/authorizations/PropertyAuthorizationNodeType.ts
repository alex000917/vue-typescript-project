import { BaseAuthorizationNodeType } from "./BaseAuthorizationNodeType"

export class PropertyAuthorizationNodeType extends BaseAuthorizationNodeType {
    // ------------------------------ FIELDS ------------------------------
    myspType = "PropertyAuthorizationNodeType";
    path: [] = [];
    userSingleLookup = false;
}
