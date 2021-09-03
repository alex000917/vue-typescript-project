import { BaseContent } from "../BaseContent"
import { newGuid } from "../Utils"

export class Product extends BaseContent {
  myspType = "Product";
  outOfTheBox = false;
  clientId: string | null = null;
  id: string | null = null;
  color: string | null = null;
  icon: string | null = null;
  newInstance = false;
  deleted = false;
  dateCreated: Number = new Number(new Date());
  createdBy: string | null = null;
  dateModified: Number = new Number(new Date());
  modifiedBy: string | null = null;

  constructor() {
    super()
    this.clientId = newGuid()
  }
}
