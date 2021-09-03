
import { BaseCreatableContent } from "../BaseCreatableContent"
import { Entity } from "../Entity"
import { IRecentlyEditedContent } from "../IRecentlyEditedContent"
import { newGuid } from "../Utils"
import { ItemInstanceTypeFactory } from "../Utils/ItemInstanceTypeFactory"
import { AuthorizationNode } from "./AuthorizationNode"

export class AuthorizationTree extends BaseCreatableContent
  implements IRecentlyEditedContent {
    myspType = "AuthorizationTree";
    entity: Entity | null = null;
    itemType: number | null = null;
    uniqueId: string | null = null;

    id: string | null = null;
    clientId: string | null = null;
    newInstance: boolean | null = null;
    deleted: boolean | null = null;
    dateCreated: number | null = null;
    createdBy: string | null = null;
    dateModified: number | null = null;
    modifiedBy: string | null = null;

    constructor() {
      super()
      this.clientId = newGuid()
      this.itemType = ItemInstanceTypeFactory.AUTHORIZATION_TREE
    }

    isOutOfTheBox(): boolean {
      return true
    }

    // ------------------------------ FIELDS ------------------------------
    entityId: string | null = null;

    root: AuthorizationNode = new AuthorizationNode();

    outOfTheBox = true;
}
