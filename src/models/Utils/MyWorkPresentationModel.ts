import { Entity } from "../Entity"
import { Node } from "../Node"
export class MyWorkPresentationModel {
  public static MY_WORK_TIME_REPORT_SYSTEM_NAME = "MyWorkTimeReport";
  public static WORKSHEET_CLASS_NAME = "com.msp.dao.entities.Worksheet";
  public static MY_WORK_TIME_REPORT_CLASS_NAME =
    "com.msp.dao.entities.MyWorkTimeReport";

  public static MY_WORK_TASK_CLASS_NAME =
    "com.msp.dao.entities.MyWorkTask";

  public static WORKSHEET_SYSTEM_NAME = "Worksheet";

  treeDataProvider: Node | null = null;

  selectedItem: any | null = null;

  treeSelectedNode: Node | null = null;

  // TODO::[Inject(source="myWorkModel.allPolicies", bind="true", twoWay="true")]*/
  myWorkCalendars: Map<string, object> = new Map<string, object>();

  createEntityTreeNodeSelectedEntity: Entity | null = null;
}
