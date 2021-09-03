import { ItemInstance } from "../ItemInstance"
import { MSPEmbeddedAssets } from "./MSPEmbeddedAssets"

export class ItemInstanceTypeFactory {
    public static ENTITY = 1;
    public static WORKFLOW = 2;
    public static FORM = 3;
    public static AUTHORIZATION_TREE = 4;
    public static MY_WORK_POLICY = 5;

    public static getItemInstanceIcon(instance:ItemInstance):Object|null {
      let result:Object|null = null
      switch (instance.itemType) {
        case ItemInstanceTypeFactory.FORM:
          result = MSPEmbeddedAssets.FORM_ITEM_16x16
          break
        case ItemInstanceTypeFactory.WORKFLOW:
          result = MSPEmbeddedAssets.WORKFLOW_ITEM_16x16
          break
        case ItemInstanceTypeFactory.ENTITY:
          result = MSPEmbeddedAssets.ENTITY_ITEM_16x16
          break
        case ItemInstanceTypeFactory.AUTHORIZATION_TREE:
          result = MSPEmbeddedAssets.AUTHORIZATION_TREE_ITEM_16x16
          break
        case ItemInstanceTypeFactory.MY_WORK_POLICY:
          result = MSPEmbeddedAssets.MY_WORK_TASK_GROUP_16x16
          break
      }

      return result
    }

    public static getItemInstanceBigIcon(instance:ItemInstance):Object|null {
      let result:Object |null = null
      switch (instance.itemType) {
        case ItemInstanceTypeFactory.FORM:
          result = MSPEmbeddedAssets.RECENT_FORM_ITEM
          break
        case ItemInstanceTypeFactory.WORKFLOW:
          result = MSPEmbeddedAssets.RECENT_WORKFLOW_ITEM
          break
        case ItemInstanceTypeFactory.ENTITY:
          result = MSPEmbeddedAssets.RECENT_ENTITY_ITEM
          break
        case ItemInstanceTypeFactory.AUTHORIZATION_TREE:
          result = MSPEmbeddedAssets.RECENT_AUTHORIZATION_TREE_ITEM
          break
        case ItemInstanceTypeFactory.MY_WORK_POLICY:
          result = MSPEmbeddedAssets.RECENT_MY_WORK_POLICY_ITEM
          break
      }

      return result
    }
}
