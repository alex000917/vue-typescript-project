import { AppCacheModule } from "@/store/modules/appCache"
import { EntitiesModule } from "@/store/modules/entitiesMod"
import { ManagementPolicyType } from "../CreationPolicyType"
import { Entity } from "../Entity"
import { EntityRelationship } from "../EntityRelationship"
import { KeyValue } from "../KeyValue"
import { TextAssembly } from "../TextAssembly"
import { ArrayUtils } from "../Utils/ArrayUtils"
import { ConditionUtils } from "../Utils/ConditionUtils"
import { LanguagesPresentationModel } from "../Utils/LanguagesPresentationModel"
import { MyWorkPresentationModel } from "../Utils/MyWorkPresentationModel"
import { PropertyFactory } from "../Utils/PropertyFactory"
import { deepSearch } from "@/utils/helper"
import { Node } from "../Node"
import { BaseProperty } from "../Properties"
import _ from "lodash"
import { DataUtils } from "../Utils/DataUtils"
import { EventBus } from "@/utils/event-bus"
import { EventKeys } from "../Utils/EventKeys"
import { EntityBasedDataType } from "../DataTypes"

export class EntityController {
  public static RECENT_ITEMS_SIZE = 10;

  public static CUSTOMIZED_ENTITIES_NODE_ID = "CustomizedEntities";

  public static MAX_ENTITY_DISPLAY_NAME_LENGTH = 25;

  public static USER_CLASS_NAME = "com.msp.dao.entities.User";

  public static VALIDATION_FAULT_STRING =
    "com.msp.flex.objects.validations.ValidationException";

  private getLanguagesMap() {
    try {
      AppCacheModule.FlexSettings.languages.reduce(
        (total: any, lang: KeyValue) => {
          if (lang.value !== AppCacheModule.FlexSettings.currentLocale) {
            return [
              ...total,
              {
                description: "",
                displayName: "",
                language: lang.key
              }
            ]
          } else return total
        },
        []
      )
    } catch (err) {}
  }

  public createEntityHandler(entityObj: Entity): void {
    const entity = JSON.parse(JSON.stringify(entityObj))
    
    entity.id = `com.msp.dao.entities.cse.custom.${entity.systemName}`
    // entity.entityName = entity.systemName;

    if (!entity.virtual) {
      entity.supportFormConfiguration = true
      // entity.databaseTableName = "Cse" + entity.entityName
      entity.properties = []
      entity.properties.push(...this.getBasicProperties(entity.id))

      if (entity.supportAttachments) {
        entity.properties.push(
          ...this.getSupportAttachmentsProperties(entity.id)
        )

        entity.canChangeAttachmentSupport = false
      }

      if (entity.supportFollowers) {
        entity.properties.push(
          ...this.getSupportFollowersProperties(entity.id)
        )

        entity.canChangeFollowersSupport = false
      }

      if (entity.supportIntegration) {
        entity.properties.push(
          ...this.getSupportIntegrationProperties(entity.id)
        )

        entity.canChangeIntegrationSupport = false
      }

      if (entity.supportTimeTracking) {
        entity.properties.push(
          ...this.getSupportTimeTrackingProperties(entity.id)
        )

        this.addLookupPropertyToMyWorkTask(entity)
      }
      if (entity.supportFormConfiguration) {
        entity.properties.push(
          ...this.getSupportCategorizableProperties(entity.id)
        )
      }

      if (entity.supportWorkflowConfiguration) {
        entity.properties.push(
          ...this.getSupportWorkflowConfigurationProperties(entity.id)
        )
      }

      if (entity.supportTree) {
        entity.properties.push(
          ...PropertyFactory.getSupportTreeProperties(
            entity.databaseTableName,
            entity.id,
            entity.displayName,
            entity.creationPolicyType
          )
        )
      } else if (entity.supportIndexPosition) {
        entity.properties.push(...this.getIndexPositionProperty(entity.id))
      }

      //     // settings defaults

      entity.primaryNamePropertySystemName =
        PropertyFactory.DEFAULT_PNP_PROPERTY_SYSTEM_NAME

      entity.cfgItemUniquePropertySystemName =
        PropertyFactory.DEFAULT_UNP_PROPERTY_SYSTEM_NAME

      entity.lookupDefaultNameFormat = new TextAssembly()

      entity.lookupDefaultNameFormat.parts = [
        [
          new KeyValue(ConditionUtils.TBL, entity.id),
          new KeyValue(PropertyFactory.DEFAULT_PNP_PROPERTY_SYSTEM_NAME, null)
        ]
      ]

      entity.defaultColumns = this.getDefaultEntityColumns(entity)
    }

    // TODO add reverse lookup Property this comes from Form moduule so skip for now.

    // if (obj.reverseLookupProperty != null) {
    //     entity.properties.push((<LookupProperty>obj).reverseLookupProperty)
    //     );
    // }

    this.setEntityUrls(entity)

    if (entity.managementPolicy == ManagementPolicyType.TREE_ROOT) {
      entity.entityRelationship = this.getNewEntityRelationship(entity)
    }

    entity.properties = ArrayUtils.sortArrayCollectionByText(
      "displayName",
      entity.properties
    )

    // this.printColumnsAndProperties(entity);
    // DataUtils.sortPropertiesByNameAndAddedOrOutOfTheBox(entity.properties);

    this.addTreeNodeToCustomizedEntities(entity)

    this.afterCreateOrUpdateEntity(entity)

    
      EventBus.$emit(EventKeys.ENTITY_CREATED, entity)
      EventBus.$notify.info("Entity created.")
  }

  /* [EventHandler(event="MSPEvent.ADD_LOOKUP_PROPERTY_TO_MY_WORK_TASK_ENTITY", properties="attachment.entity")] */
  public async addLookupPropertyToMyWorkTask(
    lookupEntity: Entity
  ): Promise<void> {
    let myWorkTask = EntitiesModule.getDirtyEntity(
      MyWorkPresentationModel.MY_WORK_TASK_CLASS_NAME
    )
    if (myWorkTask) {
      myWorkTask.properties.push(
        PropertyFactory.getMyWorkTaskLookupToEntity(lookupEntity)
      )
    } else {
      myWorkTask = await EntitiesModule.getEntity(
        MyWorkPresentationModel.MY_WORK_TASK_CLASS_NAME
      )

      myWorkTask.properties.push(
        PropertyFactory.getMyWorkTaskLookupToEntity(lookupEntity)
      )
    }
    EntitiesModule.addOrUpdateEntity(myWorkTask)
  }

  // TODO: dirty state managment.
  private afterCreateOrUpdateEntity(entity: Entity) {
    // var entity: Entity = object.entity;
    // Entity from propertylist where property type =Table
    // var tableEntity: Entity = object.tableEntity;
    // for(let property of entity.properties){
    //   if(property.dataType?.value==="11"){
    //     tableEntity = (<EntityBasedDataType>property.dataType).lookupClassName
    //   }
    // }

    // if (tableEntity != null) {
    //     model.entities.put(tableEntity.id, tableEntity);
    //     model.dirtyEntities.put(tableEntity.id, tableEntity);
    // }

    DataUtils.markModificationAndAddToRecentlyEdited(entity)

    // if (tableEntity != null) {
    //     markModificationAndAddToRecentlyEdited(tableEntity);
    // }

    // model.toggleSaveButton();

    // dispatcher.dispatchEvent(new EntitiesEvent(EntitiesEvent.REFRESH_ENTITIES_TREE));

    // dispatch event to update the entities combo boxes in From / Workflow Landing Page
    // dispatcher.dispatchEvent(new MSPEvent(MSPEvent.ENTITIES_LIST_CHANGED));

    EntitiesModule.addOrUpdateEntity(entity)
  
  }

  private addTreeNodeToCustomizedEntities(
    entity: Entity,
    entityNode: Node | null = null
  ): void {
    for (const node of EntitiesModule.EntitiesTree.children) {
      if (
        node.branch &&
        node.id == EntityController.CUSTOMIZED_ENTITIES_NODE_ID
      ) {
        const existingIndex = node.children.findIndex(
          x => x.id === entityNode?.id
        )
        if (entityNode == null || node.children == null || !existingIndex) {
          if (entityNode == null) {
            entityNode = this.getNewNode(entity)
          }

          this.addChildNodeToParentNode(node, entityNode)
          // if(existingIndex >=0){
          //   node.children.splice(existingIndex,1)
          // }
          // node.children.push(entityNode);

          // const sortedChilds = _.orderBy(node.children,  ['name',  'id'], ['asc', 'desc']);
          const sortedChilds = ArrayUtils.sortArrayCollectionByText(
            "name",
            node.children
          )

          node.children = sortedChilds
        }
      }
    }
  }

  private getNewNode(entity: Entity): Node {
    const node = new Node()
    // the node id is the entity client id
    node.id = entity.id

    EntityController.formatNodeNameAndTooltipFromEntity(entity, node)

    this.addItemAttributes(node, entity)
    DataUtils.addEntityIcon(node, Node.PRIMARY_ICON_ID, null, entity.virtual)
    if (entity.notes != null && entity.notes.length > 0) {
      DataUtils.addEntityIcon(node, Node.SECONDARY_ICON_ID, entity.notes)
    }

    return node
  }

  private addChildNodeToParentNode(parentNode: Node, childNode: Node): void {
    if (parentNode.children == null) {
      parentNode.children = []
    }
    
    const index = parentNode.children.findIndex(x => x.id === childNode.id)
    if (index >= 0) {
      parentNode.children.splice(index, 1)
    }
    parentNode.children.push(childNode)

    childNode.parent = parentNode
  }

  private static formatNodeNameAndTooltipFromEntity(
    entity: Entity,
    node: Node
  ): void {
    node.name =
      entity.displayName.length >
      EntityController.MAX_ENTITY_DISPLAY_NAME_LENGTH
        ? entity.displayName.substr(
          0,
          EntityController.MAX_ENTITY_DISPLAY_NAME_LENGTH
        ) + "..."
        : entity.displayName
    node.tooltip = entity.displayName
  }

  private getNewEntityRelationship(entity: Entity): EntityRelationship {
    const entityRelationship: EntityRelationship = new EntityRelationship()

    entityRelationship.entityId = entity.id
    entityRelationship.children = []

    return entityRelationship
  }

  private addItemAttributes(node: Node, entity: Entity): void {
    const disciplineKey: KeyValue = new KeyValue()
    disciplineKey.key = Node.DISCIPLINE_KEY
    disciplineKey.value = entity.discipline
    node.attributes.push(disciplineKey)

    const tableKeyValue: KeyValue = new KeyValue()
    tableKeyValue.key = PropertyFactory.TABLE_ATTRIBUTE
    tableKeyValue.value = entity.databaseTableName
    node.attributes.push(tableKeyValue)

    const workflowable: KeyValue = new KeyValue()
    workflowable.key = PropertyFactory.WORKFLOWABLE_ATTRIBUTE
    workflowable.value = entity.supportWorkflowConfiguration
    node.attributes.push(workflowable)

    const categorizable: KeyValue = new KeyValue()
    categorizable.key = PropertyFactory.CATEGORIZABLE_ATTRIBUTE
    categorizable.value = entity.supportFormConfiguration
    node.attributes.push(categorizable)

    const timeTracking: KeyValue = new KeyValue()
    // timeTracking.key = MyWorkFactory.TIME_AND_PROGRESS_TRACKING_ATTRIBUTE;
    timeTracking.key = "TIME_AND_PROGRESS_TRACKING_ATTRIBUTE"
    timeTracking.value = entity.supportTimeTracking
    node.attributes.push(timeTracking)
  }

  setEntityUrls(entity: Entity): void {
    entity.createUrl =
      "generated_create.jsp?entityCategoryId=$entityCategory.id"
    entity.defaultUrl =
      "generated_edit.jsp?entityCategoryId=$entityCategory.id&id=$id&current_tab_object=@@CURRENT_TAB_OBJECT@@"
    entity.editUrl =
      "generated_edit.jsp?entityCategoryId=$entityCategory.id&id=$id&current_tab_object=@@CURRENT_TAB_OBJECT@@"
    entity.listUrl =
      "generated_manage_entity.jsp?entityCategoryId=$entityCategory.id"
  }

  getSupportWorkflowConfigurationProperties(entityId: string): any[] {
    return PropertyFactory.getSupportWorkflowConfigurationProperties(entityId)
  }

  getIndexPositionProperty(entityId: string): any[] {
    return PropertyFactory.getIndexPositionProperty(entityId)
  }

  getSupportCategorizableProperties(entityId: string) {
    return PropertyFactory.getSupportCategorizableProperties(entityId)
  }

  getSupportTimeTrackingProperties(entityId: string): any[] {
    return PropertyFactory.getSupportTimeTrackingProperties(entityId)
  }

  getSupportIntegrationProperties(entityId: string): any[] {
    return PropertyFactory.getSupportIntegrationProperties(entityId)
  }

  getSupportFollowersProperties(entityId: string): any[] {
    return PropertyFactory.getSupportFollowersProperties(entityId)
  }

  getSupportAttachmentsProperties(entityId: string): any[] {
    return PropertyFactory.getSupportAttachmentsProperties(entityId)
  }

  private getDefaultEntityColumns(entity: Entity): KeyValue[] {
    const defaultColumns: KeyValue[] = []
    const lpm = LanguagesPresentationModel.getInstance()

    defaultColumns.push(
      new KeyValue(lpm.getLocalizedString(ConditionUtils.ID), [
        new KeyValue(ConditionUtils.TBL, entity.id),
        new KeyValue(PropertyFactory.ID_PROPERTY_SYSTEM_NAME, null)
      ])
    )

    defaultColumns.push(
      new KeyValue(lpm.getLocalizedString(LanguagesPresentationModel.NAME), [
        new KeyValue(ConditionUtils.TBL, entity.id),
        new KeyValue(PropertyFactory.NAME_PROPERTY_SYSTEM_NAME, null)
      ])
    )

    defaultColumns.push(
      new KeyValue(
        lpm.getLocalizedString(LanguagesPresentationModel.TIME_CREATED),

        [
          new KeyValue(ConditionUtils.TBL, entity.id),
          new KeyValue(PropertyFactory.TIME_CREATED_PROPERTY_SYSTEM_NAME, null)
        ]
      )
    )

    defaultColumns.push(
      new KeyValue(
        lpm.getLocalizedString(LanguagesPresentationModel.TIME_UPDATED),
        [
          new KeyValue(ConditionUtils.TBL, entity.id),
          new KeyValue(PropertyFactory.TIME_UPDATED_PROPERTY_SYSTEM_NAME, null)
        ]
      )
    )

    defaultColumns.push(
      new KeyValue(
        lpm.getLocalizedString(LanguagesPresentationModel.UPDATED_BY),
        [
          new KeyValue(ConditionUtils.TBL, entity.id),
          new KeyValue(
            PropertyFactory.UPDATE_USER_PROPERTY_SYSTEM_NAME,
            EntityController.USER_CLASS_NAME
          )
        ]
      )
    )

    return defaultColumns
  }

  getBasicProperties(entityId: string): any[] {
    return PropertyFactory.getBasicProperties(entityId)
  }

  copyFromAnother(entity: Entity): Entity {
    return JSON.parse(JSON.stringify(entity)) as Entity
  }

  public updateEntityHandler(object: Entity): void {
    const entity: Entity = object
    console.log("updateEntityHandler")

    // var tableEntity:Entity = object.tableEntity;

    // if (this.model.currentWorkflow != null && this.model.currentWorkflow.entity != null && this.model.currentWorkflow.entity.systemName == entity.systemName) {

    //   this.model.currentWorkflow.entity.status = entity.status;

    // }

    if (!entity.virtual) {
      if (entity.supportAttachments) {
        this.mergeEntityProperties(
          entity.properties,
          PropertyFactory.getSupportAttachmentsProperties(entity.id)
        )

        entity.canChangeAttachmentSupport = false
      }

      if (entity.supportIntegration) {
        this.mergeEntityProperties(
          entity.properties,
          PropertyFactory.getSupportIntegrationProperties(entity.id)
        )

        entity.canChangeIntegrationSupport = false
      }

      if (entity.supportFollowers) {
        this.mergeEntityProperties(
          entity.properties,
          PropertyFactory.getSupportFollowersProperties(entity.id)
        )

        entity.canChangeFollowersSupport = false
      }

      if (entity.supportTimeTracking) {
        const existing = entity.properties.find(
          x => x.systemName == PropertyFactory.MY_WORK_TASK_PROPERTY_SYSTEM_NAME
        )
        if (!existing) {
          entity.properties.push(
            ...PropertyFactory.getSupportTimeTrackingProperties(entity.id)
          )
        }
        this.addLookupPropertyToMyWorkTask(entity)
      }

      if (entity.supportFormConfiguration) {
        this.mergeEntityProperties(
          entity.properties,
          PropertyFactory.getSupportCategorizableProperties(entity.id)
        )
      }

      if (entity.supportWorkflowConfiguration) {
        this.mergeEntityProperties(
          entity.properties,
          PropertyFactory.getSupportWorkflowConfigurationProperties(entity.id)
        )
      }

      if (entity.supportTree) {
        this.mergeEntityProperties(
          entity.properties,
          PropertyFactory.getSupportTreeProperties(
            entity.databaseTableName as string,
            entity.id,
            entity.displayName,
            entity.creationPolicyType
          )
        )
      } else if (entity.supportIndexPosition) {
        this.mergeEntityProperties(
          entity.properties,
          PropertyFactory.getIndexPositionProperty(entity.id)
        )
      }
    }

    // this.printColumnsAndProperties(entity);

    // if (object.moveToCustomizedEntities) {
    //   this.moveTreeNodeToCustomizedEntities(entity);

    //   if (tableEntity != null) {
    //     this.moveTreeNodeToCustomizedEntities(tableEntity);
    //   }
    // }

    this.moveTreeNodeToCustomizedEntities(entity)

    this.reorderEntityNodes(entity)
    this.updateNodeValues(entity)

    // update the display name in the reportable entities list
    if (entity.allowCreatingReport) {
      EventBus.$emit(EventKeys.UPDATE_REPORTABLE_ENTITY_DISPLAY_NAME, entity)
    }

    this.afterCreateOrUpdateEntity(object)
    
    EventBus.$emit(EventKeys.ENTITY_UPDATED, entity)
    EventBus.$notify.info("Entity updated.")
  }

  private printColumnsAndProperties(entity: Entity) {
    entity.defaultColumns.forEach(prop => {
      console.log(entity.displayName + " > Column : " + prop.key)
    })

    entity.properties.forEach(prop => {
      console.log(entity.displayName + " > Prop: " + prop.displayName)
    })
  }

  private mergeEntityProperties(
    entityProperties: BaseProperty[],
    newProperties: BaseProperty[]
  ): void {
    console.log("mergeEntityProperties")
    const properties = []

    for (const baseProperty of newProperties) {
      const existingProp = entityProperties.find(
        x => x.systemName == baseProperty.systemName
      )
      if (!existingProp) {
        properties.push(baseProperty)
      }
    }
    entityProperties.push(...properties)
  }

  private reorderEntityNodes(entity: Entity): void {
    for (const branch of EntitiesModule.EntitiesTree.children) {
      if (branch.branch) {
        const childIndex = branch.children.findIndex(x => x.name === entity.id)
        if (childIndex >= 0) {
          branch.children = _.sortBy(branch.children, "name")
        }
      }
    }
  }

  private entityNodeSearch(items: Node[], nodeId: string): Node | null {
    console.log("entityNodeSearch " + nodeId)
    let rs: Node | null = null
    for (const node of items) {
      
      if (node.id === nodeId) {
        rs = node
        return rs
      }
      if (node.children && node.children.length > 0) {
        rs = this.entityNodeSearch(node.children, nodeId)
        if (rs != null) {
          return rs
        }
      }
    }
    return rs
  }

  private moveTreeNodeToCustomizedEntities(entity: Entity): void {
    
    const node = this.entityNodeSearch(
      EntitiesModule.EntitiesTree.children,
      entity.id
    )

    if (!node) return

    const customizedIndex = EntitiesModule.EntitiesTree.children.findIndex(
      x => x.id == EntityController.CUSTOMIZED_ENTITIES_NODE_ID
    )
    if (customizedIndex) {
      const entityIndex = EntitiesModule.EntitiesTree.children[
        customizedIndex
      ].children.findIndex(x => x.id == entity.id)
      const customizedNode = EntitiesModule.EntitiesTree.children[
        customizedIndex
      ]
      if (entityIndex) {
        EntitiesModule.EntitiesTree.children[customizedIndex].children.splice(
          entityIndex,
          1
        )
        // this.addTreeNodeToCustomizedEntities(entity, node);
      }
      const entityNode = this.getNewNode(entity)
      const parentNode = node.parent ? node.parent as Node : customizedNode
      this.addChildNodeToParentNode(parentNode, entityNode)
      const sortedChilds = ArrayUtils.sortArrayCollectionByText(
        "name",
        parentNode.children
      )
      parentNode.children = sortedChilds
    }
  }

  /**
   *
   * @param value
   */
  private updateNodeValues(value: Entity): void {
    const node = this.entityNodeSearch(
      EntitiesModule.EntitiesTree.children,
      value.id
    )

    if (node == null) return

    EntityController.formatNodeNameAndTooltipFromEntity(value, node)

    if (value.notes) {
      if (node.icons.length > 1) {
        if (value.notes.length > 0) {
          node.icons[1].tooltip = value.notes
        } else {
          node.icons.splice(1, 1)
        }
      } else {
        DataUtils.addEntityIcon(node, Node.SECONDARY_ICON_ID, value.notes)
      }
    } else {
      if (node.icons.length > 1) {
        node.icons.splice(1, 1)
      }
    }

    // update discipline
    if (
      node.discipline &&
      value.discipline &&
      node.discipline.value != value.discipline.value
    ) {
      node.discipline = value.discipline
    }

    // update attributes
    for (const keyValue of node.attributes) {
      // workflow entity
      if (keyValue.key == PropertyFactory.WORKFLOWABLE_ATTRIBUTE) {
        keyValue.value = value.supportWorkflowConfiguration
      }

      // form entity
      if (keyValue.key == PropertyFactory.CATEGORIZABLE_ATTRIBUTE) {
        keyValue.value = value.supportFormConfiguration
      }

      // my work support
      if (keyValue.key == "TIME_AND_PROGRESS_TRACKING_ATTRIBUTE") {
        keyValue.value = value.supportTimeTracking
      }
    }
    EventBus.$emit(EventKeys.AFTER_ENTITIES_LOADED)
  }
}
