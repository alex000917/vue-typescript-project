import { IHierarchicalObject } from "./HierarchicalObject"
import { IBaseCreatableContent } from "./BaseCreatableContent"
import { newGuid } from "./Utils"
import { BaseContent } from "./BaseContent"
import { KeyValue } from "./KeyValue"

export class DialogRole extends BaseContent implements IBaseCreatableContent {
  myspType = "DialogRole";
  baseRole: KeyValue | null = null;
  clientId: string | null = null;
  dateCreated: number | null = null;
  createdBy: string | null = null;
  dateModified: number | null = null;
  modifiedBy: string | null = null;
  workspaceId: string | null = null;
  color: string | null = null;
  icon: string | null = null;
  productSN: string | null = null;
  deleted = false;

  licenseRole: number | null = null;

  id: string | null = null;

  helixRole: number | null = null;
  newInstance = false;
  outOfTheBox = true;

  public equalsTo(value: Object): boolean {
    return this == value
  }

  constructor() {
    super()
    this.clientId = newGuid()
  }
}
