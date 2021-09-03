import { validateOperationDependency } from "@/api/mainApi"
import { AppPreferencesModule } from "@/store/modules/AppPreferencesMod"
import { AuthorizationModule } from "@/store/modules/AuthorizationMod"
import { EntitiesModule } from "@/store/modules/entitiesMod"
import { FormsModule } from "@/store/modules/FormsStore"
import { MyWorkModule } from "@/store/modules/myWorkMod"
import { WorkflowModule } from "@/store/modules/WorkflowMod"
import { ApplicationPreference } from "./ApplicationPreference"
import { AuthorizationTree } from "./authorizations/AuthorizationTree"
import { BaseContent } from "./BaseContent"
import { DialogRole } from "./DialogRole"
import { Entity } from "./Entity"
import { Form } from "./Forms/Form"
import { MyWorkPolicy} from "./myWork"
import { Workflow } from "./Workflows/workflow"

export class SDData {
  entities: Entity[] = [];
  forms: Form[] = [];
  workflows: Workflow[] = [];
  authorizationTrees: AuthorizationTree[] = [];
  dialogRoles: DialogRole[] = [];
  applicationPreferences: ApplicationPreference[] = [];
  myWorkPolicies: MyWorkPolicy[] = [];
}

export class SDDataFactory {
  public static async CheckDependency(
    baseContent: BaseContent,
    baseContentUID: string,
    operationType = DependencyValidatedOperationType.DELETE
  ) {
    const dirtyData: SDData = new SDData()
    dirtyData.applicationPreferences = AppPreferencesModule.DirtyItemsValues
    dirtyData.dialogRoles = AuthorizationModule.dirtyDialogRolesValues
    dirtyData.entities = EntitiesModule.dirtyEntitiesValues
    dirtyData.forms = FormsModule.dirtyFormsValues
    dirtyData.authorizationTrees =
      AuthorizationModule.dirtyAuthorizationTreesValues
    dirtyData.workflows = WorkflowModule.dirtyWorkFlowValues
    dirtyData.myWorkPolicies = MyWorkModule.dirtyMyWorkPoliciesValues

    return await validateOperationDependency(
      baseContent,
      baseContentUID,
      operationType,
      dirtyData
    )
  }
}

export class DependencyValidatedOperationType {
  public static DELETE = 1;
  public static SHOW = 2;
}
export class SDUniqueIdFactory {
  public ENTITY_SUFFIX = "_entity/";
  public FORM_SUFFIX = "_form/";
  public WORKFLOW_SUFFIX = "_workflow/";
  public STEP_SUFFIX = "_step";
  public AUTH_TREE_SUFFIX = "_auth_tree/";
  public AUTH_NODE_SUFFIX = "_auth_node";
  public APPLICATION_PREFERENCE_SUFFIX = "_application_preferences";
  public DIALOG_ROLE_SUFFIX = "_dialog_role";
  public PROPERTY_SUFFIX = "_property";
  public STATUS_SUFFIX = "_status";
  public TAB_SUFFIX = "_tab/";
  public REPORT_SUFFIX = "_report/";
  public COMPOSITE_TABLE_SUFFIX = "_composite_table/";
  public SECTION_SUFFIX = "_section/";
  public INFO_SECTION_SUFFIX = "_info_section/";
  public INFO_GROUP_SUFFIX = "_info_group/";
  public CONTROL_SUFFIX = "_form_control";
  public TABLE_SUFFIX = "_table/";
  public MY_WORK_CALENDAR_SUFFIX = "_mw_calendar";

  getUniqueId(prefix: string, instance: BaseContent | any): string {
    let result: string = instance.systemName != null ? instance.systemName : ""

    if (instance.myspType === "Entity") {
      result = this.buildUID(prefix, instance.systemName, this.ENTITY_SUFFIX)
    } else if (instance.myspType === "BaseProperty") {
      result = this.buildUID(prefix, instance.systemName, this.PROPERTY_SUFFIX)
    } else if (instance.myspType === "Status") {
      result = this.buildUID(prefix, instance.systemName, this.STATUS_SUFFIX)
    } else if (instance.myspType === "Form") {
      if (prefix == null) {
        const form: Form = new Form()
        Object.assign(form, instance)

        prefix = this.getEntityUniqueIdFromClassName(form.entityId as string)

        prefix = prefix.concat(
          this.buildUID(null, form.authorizationTreeId as string, this.AUTH_TREE_SUFFIX)
        )
      }

      result = this.buildUID(prefix, instance.systemName, this.FORM_SUFFIX)
    } else if (instance.myspType === "Tab") {
      result = this.buildUID(prefix, instance.systemName, this.TAB_SUFFIX)
    } else if (instance.myspType === "Workflow") {
      if (prefix == null) {
        const workflow = new Workflow()
        Object.assign(Workflow, instance)

        prefix = this.getEntityUniqueIdFromClassName(workflow.entityId as string)

        prefix = this.buildUID(
          prefix,
          workflow.authorizationTreeId as string,
          this.AUTH_TREE_SUFFIX
        )
      }

      result = this.buildUID(prefix, instance.systemName, this.WORKFLOW_SUFFIX)
    } else if (instance.myspType === "AuthorizationTree") {
      if (prefix == null) {
        prefix = this.getEntityUniqueIdFromClassName(
          //HACK get entityId from auth tree instance 
          //AuthorizationTree(instance).entityId
          instance.itemId
        )
      }

      result = this.buildUID(
        prefix,
        instance.systemName,
        this.AUTH_TREE_SUFFIX
      )
    } else if (instance.myspType === "AuthorizationNode") {
      result = this.buildUID(
        prefix,
        instance.systemName,
        this.AUTH_NODE_SUFFIX
      )
    } else if (instance.myspType === "DialogRole") {
      result = this.buildUID(
        prefix,
        instance.systemName,
        this.DIALOG_ROLE_SUFFIX
      )
    } else if (instance.myspType === "Report") {
      result = this.buildUID(prefix, instance.systemName, this.REPORT_SUFFIX)
    } else if (instance.myspType === "CompositeTable") {
      result = this.buildUID(
        prefix,
        instance.systemName,
        this.COMPOSITE_TABLE_SUFFIX
      )
    } else if (instance.myspType === "Section") {
      result = this.buildUID(prefix, instance.systemName, this.SECTION_SUFFIX)
    } else if (instance.myspType === "InformationSection") {
      result = this.buildUID(
        prefix,
        instance.systemName,
        this.INFO_SECTION_SUFFIX
      )
    } else if (instance.myspType === "InformationGroup") {
      result = this.buildUID(
        prefix,
        instance.systemName,
        this.INFO_GROUP_SUFFIX
      )
    } else if (instance.myspType === "BaseControl") {
      result = this.buildUID(prefix, instance.systemName, this.CONTROL_SUFFIX)
    } else if (instance.myspType === "BaseStep") {
      result = this.buildUID(prefix, instance.systemName, this.STEP_SUFFIX)
    } else if (instance.myspType === "ApplicationPreference") {
      result = this.buildUID(
        prefix,
        instance.systemName,
        this.APPLICATION_PREFERENCE_SUFFIX
      )
    } else if (instance.myspType === "Table") {
      result = this.buildUID(prefix, instance.systemName, this.TABLE_SUFFIX)
    } else if (instance.myspType === "MyWorkCalendar") {
      result = this.buildUID(
        prefix,
        instance.systemName,
        this.MY_WORK_CALENDAR_SUFFIX
      )
    }

    return result
  }

  getEntityUniqueIdFromClassName(className: string): string {
    let result: string = className

    if (className.indexOf(".") >= 0) {
      const entitySystemName: string = className.substring(
        className.lastIndexOf(".") + 1
      )
      result = this.buildUID(null, entitySystemName, this.ENTITY_SUFFIX)
    } else if (className.indexOf(this.ENTITY_SUFFIX) >= 0) {
      result = className.concat(this.ENTITY_SUFFIX)
    }

    return result
  }

  buildUID(prefix: string|null, objectSystemName: string, suffix: string|null): string {
    let result: string = objectSystemName

    if (objectSystemName != null) {
      if (objectSystemName.indexOf(suffix as string) >= 0) {
        // if we already changed it

        if (
          objectSystemName.indexOf(".") >= 0 &&
          (suffix as string).indexOf(this.ENTITY_SUFFIX) >= 0
        ) {
          // if its an entity fullClassName
          return this.getEntityUniqueIdFromClassName(objectSystemName)
        }

        let aPrefix = ""

        if (prefix != null) {
          aPrefix = prefix
        }

        const uniqueId: string = aPrefix.concat(objectSystemName)

        result = uniqueId.concat(suffix as string)
      } else if (prefix != null && objectSystemName.indexOf(prefix) >= 0) {
        result = prefix.concat(objectSystemName)
      }
    } else {
      // in case of form.tab.table
      result = prefix?.concat(suffix as string) as string
    }

    return result
  }
}
