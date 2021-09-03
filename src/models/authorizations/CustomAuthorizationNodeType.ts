import { BaseAuthorizationNodeType } from "./BaseAuthorizationNodeType"

export class CustomAuthorizationNodeType extends BaseAuthorizationNodeType {
    // ------------------------------ FIELDS ------------------------------
    myspType = "CustomAuthorizationNodeType";
    nodeName: string | null = null;
    criteria: string | null = null;
    whereClause: string | null = null;

    preWhereClause: string | null = null;
}
