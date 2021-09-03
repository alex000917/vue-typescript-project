import { Icon } from "./Icon";
import { KeyValue } from "./KeyValue";
import { MSPEmbeddedAssets } from "./Utils/MSPEmbeddedAssets";

export interface INode {
  attributes: KeyValue[];
  children: Node[];
  icons: Icon[];
  name: string;
  parent: Node | null;
  tooltip: string;
  branch: boolean;
  id: null | string;
}

export class Node implements INode {
  myspType = "Node";
  attributes: KeyValue[];
  children: Node[];
  icons: Icon[];
  name: string;
  parent: Node | null;
  tooltip: string;
  branch: boolean;
  id: string | null;
  softNode:boolean;
  /**
   *
   */
  constructor() {
    this.attributes = [];
    this.children = [];
    this.name = "";
    this.parent = null;
    this.icons = [];
    this.tooltip = "";
    this.softNode= this.branch = false;
    this.id = "";
  }

  /* [Transient] */
  public static PRIMARY_ICON_ID = 0;

  /* [Transient] */
  public static SECONDARY_ICON_ID = 1;

  /* [Transient] */
  public static PRIMARY_ICON: string = MSPEmbeddedAssets.ENTITY_ICON;

  /* [Transient] */
  public static PRIMARY_VIRTUAL_ICON: string =
    MSPEmbeddedAssets.VIRTUAL_ENTITY_ICON;

  /* [Transient] */
  public static SECONDARY_ICON: string = MSPEmbeddedAssets.NOTES_ICON;

  /* [Transient] */
  public static DISCIPLINES_KEY = "DISCIPLINES";

  /* [Transient] */
  public static DISCIPLINE_KEY = "DISCIPLINE";

  /* [Transient] */
  public static SYSTEM_NAME_KEY = "SYSTEM_NAME";

  /* [Transient] */
  public static DB_TABLE_NAME_KEY = "TABLE";

  public get discipline(): KeyValue | null {
    if (!this.branch && this.attributes) {
      const result: Object = this.getValue(
        this.attributes,
        Node.DISCIPLINE_KEY
      );
      if (result != null) {
        return <KeyValue>result;
      }
    }
    return null;
  }

  public set discipline(discipline: KeyValue | null) {
    for (let i = 0; i < this.attributes.length; i++) {
      const keyValue: KeyValue = this.attributes[i];
      if (keyValue != null && Node.DISCIPLINE_KEY == keyValue.key) {
        (<KeyValue>this.attributes[i]).value = discipline;
        break;
      }
    }
  }

  public getValue(collection: KeyValue[], key: string): any {
    for (const keyValue of collection) {
      if (keyValue != null && key == keyValue.key) {
        return keyValue.value;
      }
    }
    return null;
  }
}
