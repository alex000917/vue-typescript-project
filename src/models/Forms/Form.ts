
import { AuthorizationTree } from "../authorizations/AuthorizationTree"
import { BaseConditionalContent } from "../Controls/MoreInfoControl"
import { Entity } from "../Entity"
import { BaseProperty, Property } from "../Properties"
import { newGuid } from "../Utils"

export class Form extends BaseConditionalContent {
    clientId:string|null = null
    id:string|null = null
    newInstance:Boolean =false;
    deleted:Boolean =false;
    usedProperties:Property[]|null=[];
    tabs:any[] = [];
    entityId:string|null = null
    entity:Entity|null =null;
    header:any[]=[];
    authorizationTreeId:string|null = null
    authorizationTree:AuthorizationTree|null =null;
    dateCreated:Number=new Number(new Date());
    createdBy:string|null = null
    dateModified:Number=new Number(new Date());
    modifiedBy:string|null = null
    outOfTheBox:Boolean=false;
    cloned:Boolean=false;
    excludeButtons:Boolean=false;
    hideListButton:Boolean=false;
    property:BaseProperty|any|null=null;

    public constructor() {
      super()
      this.tabs = []
      this.clientId = newGuid()
      this.usedProperties = []
    }
}
