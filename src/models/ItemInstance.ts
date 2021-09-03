
import { HierarchicalObject, IHierarchicalObject } from "./HierarchicalObject"
import { newGuid } from "./Utils"

export class ItemInstance implements IHierarchicalObject {
    uniqueId:string|null=null;
    displayName:string|null=null;
    entityName:string |null=null;
    entitySystemName:string|null=null;
    itemType:number|null=null;
    itemId:string|null=null;
    dateCreated:number|null=null;
    createdBy:string|null=null;
    dateModified:number|null=null;
    modifiedBy:string|null=null;
    outOfTheBox:boolean|null=true;

    // Transients & IHierarchicalObject
    children:any[]=[];
    alterLabel =false;

    // IHierarchicalObject
    displayIcon: Object={} as any;
    selectable =false;
    filterable =false;
    draggable =false;

    constructor() {
      this.uniqueId = newGuid()
      this.dateCreated = new Date()
      this.dateModified = new Date()
      this.outOfTheBox = true
    }

    public match(value:Object, propertyNameToMatch = "displayName"):boolean {
      let result = false
      const item = this
      if (propertyNameToMatch === "displayName") {
        // @ts-ignore
        result = item[propertyNameToMatch].toLowerCase() === value.toString().toLowerCase()
        this.alterLabel = true
      } else if (propertyNameToMatch === "entityName") {
        this.alterLabel = false
        // @ts-ignore
        result = item[propertyNameToMatch].toLowerCase() == value.toString().toLowerCase()
      }

      return result
    }

    public equalsTo(value:Object):boolean {
      return this == value
    }
}
