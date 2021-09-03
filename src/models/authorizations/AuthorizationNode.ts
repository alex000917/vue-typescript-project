import { BaseContent } from "../BaseContent"
import { HierarchicalBaseObject } from "../HierarchicalObject"
import { BaseAuthorizationNodeType } from "./BaseAuthorizationNodeType"

export class AuthorizationNode extends HierarchicalBaseObject {
    // ------------------------------ FIELDS ------------------------------
    myspType = "AuthorizationNode";
    type: BaseAuthorizationNodeType | null = null

    parent: AuthorizationNode | null = null;

    children: AuthorizationNode[] = [];

    authorizationTreeId: string | null = null;

    highlight = false;

    customDisplayName: string | null = null;

    checkBoxDisabled = false;

    checkBoxSelected = false;

    icon=""
    // --------------------- CONSTRUCTOR ---------------------
    constructor() {
      super()
      this.children = []
    }
}
