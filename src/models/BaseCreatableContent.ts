import { BaseContent, IBaseContent } from "./BaseContent"

export interface IBaseCreatableContent extends IBaseContent {
  id: string|null
  clientId: string|null
  newInstance: boolean|null
  deleted: boolean|null
  dateCreated: number|null
  createdBy: string|null
  dateModified: number|null
  modifiedBy: string|null
}

export class BaseCreatableContent extends BaseContent {
         myspType = "BaseCreatableContent";
         id: string | null = null;
         clientId: string | null = null;
         newInstance: boolean | null = null;
         deleted: boolean | null = null;
         dateCreated: number | null = null;
         createdBy: string | null = null;
         dateModified: number | null = null;
         modifiedBy: string | null = null;
}
