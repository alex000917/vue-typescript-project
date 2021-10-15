import { RoleGroup } from "./RoleGroup"
import { ActionGroup } from "./Workflows/ActionGroup";
export class Restriction {
    myspType="Restriction"
    roleGroups: RoleGroup[]=[];
    actionGroups: ActionGroup[] = [];
}
