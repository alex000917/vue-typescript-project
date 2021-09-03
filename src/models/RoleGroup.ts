import { BaseCondition } from "./Conditions"

export class RoleGroup {
    myspType="RoleGroup"
    authorizationNodeNames: string[]=[];

    conditions: BaseCondition[] | any[]=[];
    title: string|null =null;
    everyone=false;
}
