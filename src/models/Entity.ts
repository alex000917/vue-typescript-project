import { BaseContent } from "./BaseContent"
import { LanguageTranslation } from "./LanguageTranslation"
import { KeyValue } from "./KeyValue"
import { Status } from "./Status"
import { Restriction } from "./Restriction"
import { TextAssembly } from "./TextAssembly"
import { EntityRelationship } from "./EntityRelationship"
import { CreateUUID } from "@/utils/helper"
import { UserModule } from "@/store/modules/user"
import { Notification } from "./Notification"
import { AppCacheModule } from "@/store/modules/appCache"
import { BaseProperty } from "./Properties"
import { IRecentlyEditedContent } from "./IRecentlyEditedContent"
import { ItemInstanceTypeFactory } from "./Utils/ItemInstanceTypeFactory"

export class Entity extends BaseContent implements IRecentlyEditedContent {
  myspType = "Entity";

  constructor() {
    super()
    this.clientId = CreateUUID()
    this.newInstance = true

    this.defaultColumns = []
    this.createdBy = UserModule.name
    this.modifiedBy = UserModule.name
    const num = new Number(new Date())
    this.dateCreated = num.valueOf()
    this.dateModified = num.valueOf()
    this.outOfTheBox = false
    this.appearInRecentVisit = true

    this.creationPolicyType = 1
    this.managementPolicy = 0
    // select General by default
    const generalDiscipline = AppCacheModule.FlexSettings.disciplines
      .filter((data: any) => data.value === "29")
      .pop()
    if (generalDiscipline) this.discipline = generalDiscipline

    // select first db connection.
    this.sqlConnection = AppCacheModule.FlexSettings.sqlConnections[0]

    if (this.languageTranslations.length === 0) {
      const hetrans = new LanguageTranslation("he", "", "")
      this.languageTranslations = []
      this.languageTranslations.push(hetrans)
    }

    // Specific to new entity as per flex app.
    this.description = ""
    this.notes = ""
    this.milestonesTableDescriptionProperty = ""
    this.milestonesTableDueDateProperty = ""
    this.milestonesTableOwnerProperty = null
    this.milestonesTableProperty = ""
    this.milestonesTableStatusDeliverableStatusProperty = ""
    this.milestonesTableStatusProperty = ""
    this.activityOwnerProperty = ""
    this.goalsProperty = ""
    this.canChangeAttachmentSupport = true
    this.managementGenericUrl = ""
  }

  /// IRecentlyEditedContent
  // entity: Entity | null = null;
  // uniqueId: string | null = null;
  // itemType: number = 0;
  // isOutOfTheBox(): boolean {
  //   return false;
  // }

  clientId!: string;
  newInstance = false;

  createNotification: Notification | null = null;
  createdBy: string = UserModule.name;
  dateCreated: number|null = null;
  dateModified: number|null =null;
  defaultColumns: KeyValue[] = [];
  deleteNotification: Notification | null = null;
  discipline: KeyValue = {} as KeyValue;
  entityRelationship: EntityRelationship | null = null;
  lookupDefaultNameFormat: TextAssembly | null = null;
  modifiedBy: string = UserModule.name;
  modifyNotification: Notification | null = null;
  reportFilter: Restriction | null = null;
  properties: BaseProperty[] = [];
  sql: string | null = null;
  sqlConnection: KeyValue | null = null;
  status: Status[] = [];
  milestonesTableProperty: string | null = null;
  milestonesTableDueDateProperty: string | null = null;
  milestonesTableStatusProperty: string | null = null;
  milestonesTableStatusDeliverableStatusProperty: string | null = null;
  milestonesTableDescriptionProperty: string | null = null;
  milestonesTableOwnerProperty: string | null = null;
  activityOwnerProperty: string | null = null;
  goalsProperty: string | null = null;
  enableForExecutionCenter = false;
  allowCreatingReport = false;
  canChangeAttachmentSupport = false;
  canChangeFollowersSupport = false;
  canChangeIntegrationSupport = false;
  creationPolicyType = 0;
  createUrl: string | null = null;
  databaseTableName: string | null = null;
  defaultUrl: string | null = null;
  deleted = false;
  editUrl: string | null = null;
  icon: string | null = null;
  id!: string;
  listUrl: string | null = null;
  managementPolicy = 0;
  managementGenericUrl: string | null = null;
  outOfTheBox = true;
  supportAttachments = false;
  supportIntegration = false;
  appearInRecentVisit = true;
  primaryNamePropertySystemName: string | null = null;
  cfgItemUniquePropertySystemName: string | null = null;
  reportDisplayIndexPosition = 0;
  supportFollowers = false;
  supportTimeTracking = false;
  supportIndexPosition = false;
  supportTree = false;
  supportWorkflowConfiguration = false;
  virtual = false;
  supportFormConfiguration = false;
  // entityName:string  | null = null;

  languageTranslations: LanguageTranslation[] = [];

  // --------------------- TRANSIENTS ---------------------
  /* [Transient] */
  public get entityId(): string {
    return this.id
  }

  public get entity(): Entity {
    return this
  }

  public get itemType(): number {
    return ItemInstanceTypeFactory.ENTITY
  }

  public get uniqueId(): string {
    return this.itemType + "_" + this.id
  }

  public isOutOfTheBox(): boolean {
    return this.outOfTheBox
  }
}
