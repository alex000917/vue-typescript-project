import { BaseContent } from "./BaseContent"
import { BaseCreatableContent } from "./BaseCreatableContent"
import { CreateUUID } from "@/utils/helper"
import { AuthorizationTree } from "./authorizations/AuthorizationTree"
import { Entity } from "./Entity"
import { Restriction } from "./Restriction"
import { TextAssembly } from "./TextAssembly"
import { MSPEmbeddedAssets } from "./Utils/MSPEmbeddedAssets"
import { IRecentlyEditedContent } from "./IRecentlyEditedContent"
import { ItemInstance } from "@/models/ItemInstance"

export class HierarchicalBaseObject extends BaseCreatableContent {
  myspType="HierarchicalBaseObject"

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
export class MyWorkCalendar extends HierarchicalBaseObject {
  myspType="MyWorkCalendar"
  constructor() {
    super()
    this.clientId = CreateUUID()
  }

  outOfTheBox = false;

  clientId: string | null = null;

  id: string | null = null;

  newInstance = false;

  deleted = false;

  dateCreated: number | null = null;

  createdBy: string | null = null;

  dateModified: number | null = null;

  modifiedBy: string | null = null;

  sunday = false;

  monday = false;

  tuesday = false;

  wednesday = false;

  thursday = false;

  friday = false;

  saturday = false;

  exceptionDays: ExceptionDay[] = [];
}

export class BaseTreeNode extends HierarchicalBaseObject {
  myspType="BaseTreeNode"
  parent: BaseTreeNode | null = null;
}

export class MyWorkTreeNode extends BaseTreeNode {
  myspType="MyWorkTreeNode"
  viewBy: Restriction | null = null;

  filter: Restriction | null = null;
}

export class EntityTreeNode extends MyWorkTreeNode {
  myspType="EntityTreeNode"
  entityId: string | null = null;

  authorizationTreeId: string | null = null;

  entity: Entity | null = null;

  authorizationTree: AuthorizationTree | null = null;

  overrideDisplayFormat = false;

  nameFormat: TextAssembly | null = null;

  customLink: TextAssembly | null = null;

  linkToItem: any[] = [];

  taskFormSystemName: string | null = null;

  taskTimeReportFormSystemName: string | null = null;

  trackingType: number | null = null;

  propertyHoldingPlannedWorkSystemName: string | null = null;

  taskDefaultValues: any[] = [];

  taskTimeReportDefaultValues: any[] = [];

  syncWorkPropertyFromMyWork = false;
}

export class ExceptionDay {
  myspType="ExceptionDay"
  name: string | null = null;

  start: number | null = null;

  finish: number | null = null;
}

export class FolderTreeNode extends BaseTreeNode {
  myspType="FolderTreeNode"
  taskGroups = false;

  public match(
    value: Object,
    propertyNameToMatch = "displayName"
  ): boolean {
    return false
  }

  displayIcon: Object = MSPEmbeddedAssets.FOLDER_ICON;
}

export class MyWorkPolicy extends BaseCreatableContent
  implements IRecentlyEditedContent {
    myspType="MyWorkPolicy"
  constructor() {
    super()
    this.clientId = CreateUUID()
  }

  itemType: number | null = null;
  uniqueId: string | null = null;
  isOutOfTheBox(): boolean {
    return true
  }

  root: BaseTreeNode | EntityTreeNode | null = null;

  autoAddTasksFromPrevious = false;

  calendarSystemName: string | null = null;

  worksheetAuthorizationTreeSystemName: string | null = null;

  worksheetAuthorizationTree: AuthorizationTree | null = null;

  worksheetWorkflowSystemName: string | null = null;

  worksheetFormSystemName: string | null = null;

  adminTimeReportFormSystemName: string | null = null;

  viewFilter: Restriction | null = null;

  workWeekDays: Restriction | null = null;

  nonWorkWeekDays: Restriction | null = null;

  dayExceptions: Restriction | null = null;

  tasks: Restriction | null = null;

  attendance: Restriction | null = null;

  adminTime: Restriction | null = null;

  maxActualWork: number | null = null;

  minActualWork: number | null = null;

  deviationRange: number | null = null;

  defaultValuesOfAdminTimeReports: any[] = [];

  entity: Entity | null = null;

  policyAssignment: Restriction | null = null;

  overrideWorksheetColumns = false;

  worksheetColumns: any[] = [];

  outOfTheBox = false;

  hidePercentWorkCompleteButtons = false;
}

export class TaskGroupTreeNode extends MyWorkTreeNode {
  myspType="TaskGroupTreeNode"
  automaticallyAddTaskGroupToWorksheet = false;
}

export class TaskStyleTreeNode extends MyWorkTreeNode {
  myspType="TaskStyleTreeNode"
  color: string | null = null;
}

