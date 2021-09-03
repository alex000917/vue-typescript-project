import { UserModule } from "@/store/modules/user"
import { CreateUUID } from "@/utils/helper"
import { BaseContent } from "./BaseContent"

export class ApplicationPreference extends BaseContent {
    myspType="ApplicationPreference"
    category: string|null=null;
    clientId: string|null=null;
    createdBy: string|null=null;
    dateCreated: Number|null=null;
    dateModified: Number|null=null;
    lookupValueName: string|null =null;
    modifiedBy: string|null=null;
    value: any|null = null;
    dataType: string|null=null;
    deleted = false;
    id: string|null = null;
    lookupEntityId: string|null = null;
    newInstance = true;
    environmentApplicationPreference = false;

    /**
     *
     */
    constructor() {
      super()
      this.clientId = CreateUUID()
      this.createdBy = UserModule.name
      this.category = "ADDED_APPLICATION_PREFERENCES"
      this.dateCreated = new Number(new Date())
      this.dateModified = new Number(new Date())
      this.modifiedBy = UserModule.name
      this.newInstance = true
    }

    public toTagString():string {
      return this.displayName
    }
}
