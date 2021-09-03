import { BaseCreatableContent } from "./BaseCreatableContent"

export interface IHierarchicalObject {

    // returns the child objects
    children: any[]

    // returns true if value is equals or contained in this object   used to filter data
    // TODO:: match(value:Object, propertyNameToMatch:string ="displayName"):boolean;
    match(value: any, propertyNameToMatch: string): boolean

    // compares the value object with this object used to set the selected item
    equalsTo(value: any): boolean

    // returns the icon class
    displayIcon: Object|null

    // returns true if this object should not be selectable
    selectable: boolean

    // returns true if this object can be filtered
    filterable: boolean

    // returns true if this object can be dragged
    draggable: boolean

    // returns true if this object label is being altered when filtering
    alterLabel: boolean
}

export class HierarchicalObject {
  myspType="HierarchicalObject"
    // returns the child objects
    children: any[]=[];

    // returns true if value is equals or contained in this object   used to filter data
    // TODO:: match(value:Object, propertyNameToMatch:string ="displayName"):boolean;
    match(value: any, propertyNameToMatch: string): boolean {
      const item = this as any
      return item[propertyNameToMatch] === value[propertyNameToMatch]
    }

    // compares the value object with this object used to set the selected item
    equalsTo(value: any): boolean {
      return JSON.stringify(this) === JSON.stringify(value)
    }

    // returns the icon class
    displayIcon: Object|null =null;

    // returns true if this object should not be selectable
    selectable =true;

    // returns true if this object can be filtered
    filterable =true;

    // returns true if this object can be dragged
    draggable =false;

    // returns true if this object label is being altered when filtering
    alterLabel =false;
}

export class HierarchicalBaseObject extends BaseCreatableContent {
    // duplicted to avoide multiple inheritance.
    // returns the child objects
    children: any[] = [];

    // returns true if value is equals or contained in this object   used to filter data
    // TODO:: match(value:Object, propertyNameToMatch:string ="displayName"):boolean;
    match(value: any, propertyNameToMatch: string): boolean {
      const item = this as any
      return item[propertyNameToMatch] === value[propertyNameToMatch]
    }

    // compares the value object with this object used to set the selected item
    equalsTo(value: any): boolean {
      return JSON.stringify(this) === JSON.stringify(value)
    }

    // returns the icon class
    displayIcon: Object | null = null;

    // returns true if this object should not be selectable
    selectable = true;

    // returns true if this object can be filtered
    filterable = true;

    // returns true if this object can be dragged
    draggable = false;

    // returns true if this object label is being altered when filtering
    alterLabel = false;
}
