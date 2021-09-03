import { DialogRole } from "../DialogRole"
import { BaseAuthorizationNodeType } from "./BaseAuthorizationNodeType"

export class DialogRoleAuthorizationNodeType extends BaseAuthorizationNodeType {
    myspType = "DialogRoleAuthorizationNodeType";
    dialogRole: DialogRole | null = null;
}
