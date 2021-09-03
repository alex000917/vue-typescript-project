import { BaseContent } from "../BaseContent";
import { IRecentlyEditedContent } from "../IRecentlyEditedContent";
import { ItemInstance } from "../ItemInstance";
import { ItemInstanceTypeFactory } from "./ItemInstanceTypeFactory";

export class GeneralFactory {
  public static getItemInstance(
    editingContent: IRecentlyEditedContent
  ): ItemInstance | null {
    
    let result: ItemInstance | null = new ItemInstance();
    try {
      //const obj = (<BaseContent>editingContent);
      const obj = editingContent;
      result.displayName = obj.displayName;
      result.createdBy = obj.createdBy;
      result.modifiedBy = obj.modifiedBy;
      result.dateModified = obj.dateModified;
      result.itemType = GeneralFactory.resolveType(obj.myspType);
      // itemInstance.outOfTheBox = recentlyEditedContent.isOutOfTheBox();
      result.itemId = obj.id;
      //itemInstance.uniqueId = editingContent.uniqueId
      result.uniqueId = obj.itemType + "_" + obj.id;
      if (editingContent.entity != null) {
        result.entityName = editingContent.entity.displayName;
        result.entitySystemName = editingContent.entity.systemName;
      }
    } catch (err) {
      console.error("error while creating new Item instance for recent view");
      result = null;
    }
    return result;
  }

  public static resolveType(myspType: string): number {
    switch (myspType) {
      case "Entity":
        return ItemInstanceTypeFactory.ENTITY;
        break;
      case "Form":
        return ItemInstanceTypeFactory.FORM;
        break;
      case "Workflow":
        return ItemInstanceTypeFactory.WORKFLOW;
        break;
      case "MyWork":
        return ItemInstanceTypeFactory.MY_WORK_POLICY;
        break;
      default:
        return 0;
        break;
    }
  }
}
