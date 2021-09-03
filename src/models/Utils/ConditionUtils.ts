import { BaseContent } from "../BaseContent"
import { PropertyCondition } from "@/models/Conditions"
import {
  BaseConditionalContent,
  BaseControl
} from "../Controls/MoreInfoControl"
import { Entity } from "../Entity"
import { EntityBasedDataType } from "../DataTypes"
import { KeyValue } from "../KeyValue"
import { BaseProperty } from "../Properties"
import { LanguagesPresentationModel } from "./LanguagesPresentationModel"
import { ObjectUtils } from "./ObjectUtils"
import { StringUtils } from "./StringUtils"

export class ConditionUtils {
  public static USER_CLASS_NAME = "com.msp.dao.entities.User";

  public static CURRENT_USER = ":CURRENT_USER";

  public static WORKSHEET_USER = ":WORKSHEET_USER";

  public static ID = "ID";
  public static TBL = "tbl";

  public static ENTITY_PROPERTY = "entity.property";

  public static ROW_TBL = "rowTbl";

  public static TBL_REPORT = "tblReport";

  /**
   * creates an array collection of base content for each key-value array input
   */
  public static convertPropertyPathToPropertyParts(
    input: any[],
    cachedEntities: Map<string, any>
  ): any[] | null {
    const result: any[] = []
    let baseContent: BaseContent
    let elem: KeyValue
    let entity: Entity

    if (!input || input.length == 0 || !cachedEntities) {
      return null
    }

    // handle first element
    elem = new KeyValue()
    elem = <KeyValue>input[0]
    entity = cachedEntities.get(elem.key as string)
    baseContent = ConditionUtils.createRoot(elem, entity)
    result.push(baseContent)

    for (let i = 1; i < input.length; i++) {
      baseContent = new BaseContent()
      elem = new KeyValue()
      elem = <KeyValue>input[i]

      baseContent = ConditionUtils.findAndCreateProperty(
        elem,
        entity,
        cachedEntities
      )

      result.push(baseContent)

      // get next entity if needed
      if (!StringUtils.isNullOrEmpty(<string>elem.value)) {
        entity = new Entity()
        entity = cachedEntities.get(<string>elem.value)
      }
    }
    return result
  }

  /**
   * creates every base content in the property path from key-value
   */
  private static findAndCreateProperty(
    elem: KeyValue,
    entity: Entity,
    cachedEntities: Map<string, any>
  ): BaseContent {
    let result: BaseContent = new BaseContent()

    for (const prop of entity.properties) {
      if (prop.systemName == <String>elem.key) {
        result = prop
        break
      }
    }

    return result
  }

  /**
   * creates the root element in the base content array from key-value
   */
  private static createRoot(elem: KeyValue, entity: Entity): BaseContent {
    let result: Entity = new Entity()

    result = ObjectUtils.clone(entity)

    if (elem.key) {
      result.mainEntityPrefix = <string>elem.key
    }

    return result
  }

  /**
   * creates a string from the condition operand base content array - that represents the property path.
   */
  public static getPropertyPathAsLabel(
    baseContentArray: any[],
    entityPrefixText: string | null = null
  ): string {
    let result = "["

    for (const elem of baseContentArray) {
      if (elem instanceof Entity) {
        const entity: Entity = <Entity>elem

        if (!StringUtils.isNullOrEmpty(entity.mainEntityPrefix)) {
          result +=
            ConditionUtils.getCalculatedDisplayName(entity, entityPrefixText) +
            " : "
        }
      } else {
        result += elem.displayName + " : "
      }
    }
    result = result.substring(0, result.length - 3)
    result += "]"

    return result
  }

  /**
   *
   * @param entity
   * @param lpm
   * @return
   */
  public static getCalculatedDisplayName(
    entity: Entity,
    entityPrefix: string | null = null
  ): string | null {
    if (entity.mainEntityPrefix == ConditionUtils.CURRENT_USER) {
      return LanguagesPresentationModel.LOGGED_IN_USER
    } else if (entity.mainEntityPrefix == ConditionUtils.WORKSHEET_USER) {
      return LanguagesPresentationModel.WORKSHEET_USER
    } else if (entity.mainEntityPrefix == ConditionUtils.TBL) {
      if (entityPrefix == "") {
        return entity.displayName
      }

      if (entityPrefix) {
        return entityPrefix + " (" + entity.displayName + ")"
      } else {
        // default
        return (
          LanguagesPresentationModel.FORM + " (" + entity.displayName + ")"
        )
      }
    } else if (entity.mainEntityPrefix.indexOf(ConditionUtils.ROW_TBL) >= 0) {
      return LanguagesPresentationModel.ROW
    } else if (entity.mainEntityPrefix == ConditionUtils.TBL_REPORT) {
      return (
        LanguagesPresentationModel.REPORT + " (" + entity.displayName + ")"
      )
    } else if (entity.mainEntityPrefix.indexOf(ConditionUtils.TBL) == 0) {
      return (
        LanguagesPresentationModel.LOOKUP + " (" + entity.displayName + ")"
      )
    } else if (entity.mainEntityPrefix == ConditionUtils.ENTITY_PROPERTY) {
      return entityPrefix + " (" + entity.displayName + ")"
    }

    return null
  }

  /**
   * creates the Skip condition text for condition operands.
   */
  public static getPropertyPathAsLabelbyCondition(
    data: PropertyCondition
  ): string {
    // check if skip first and second condition
    if (
      data.skipConditionIfMainOperandIsEmpty &&
      data.skipConditionIfSecondaryOperandIsEmpty
    ) {
      return (
        LanguagesPresentationModel.SKIP_IF +
        " " +
        ConditionUtils.getPropertyPathAsLabel(data.mainOperandBaseContent) +
        " " +
        LanguagesPresentationModel.IS_EMPTY +
        "\n" +
        LanguagesPresentationModel.SKIP_IF +
        " " +
        ConditionUtils.getPropertyPathAsLabel(
          data.secondaryOperandBaseContent
        ) +
        " " +
        LanguagesPresentationModel.IS_EMPTY
      )
    }

    // only first condition
    else if ((<PropertyCondition>data).skipConditionIfMainOperandIsEmpty) {
      return (
        LanguagesPresentationModel.SKIP_IF +
        " " +
        ConditionUtils.getPropertyPathAsLabel(data.mainOperandBaseContent) +
        " " +
        LanguagesPresentationModel.IS_EMPTY
      )
    }

    // only second condition
    else if ((<PropertyCondition>data).skipConditionIfSecondaryOperandIsEmpty) {
      return (
        LanguagesPresentationModel.SKIP_IF +
        " " +
        ConditionUtils.getPropertyPathAsLabel(
          data.secondaryOperandBaseContent
        ) +
        " " +
        LanguagesPresentationModel.IS_EMPTY
      )
    }
    return ""
  }

  /**
   * creates a keyValue (systemName | className) array from condition operand base content array.
   */
  public static convertPropertyPartsToPropertyPath(
    baseContentArray: []
  ): KeyValue[] {
    const keyValueArray: KeyValue[] = []
    for (let i = 0; i < baseContentArray.length; i++) {
      const baseContent: BaseContent = <BaseContent>baseContentArray[i]
      const keyValue: KeyValue = new KeyValue()

      if (baseContent instanceof BaseProperty) {
        if (
          i == baseContentArray.length - 1 &&
          !((<BaseProperty>baseContent).dataType instanceof EntityBasedDataType)
        ) {
          keyValue.value = null
        } else {
          keyValue.value = (<EntityBasedDataType>(
            (<BaseProperty>baseContent).dataType
          )).lookupClassName
        }

        keyValue.key = baseContent.systemName
      } else if (baseContent instanceof Entity) {
        // the root (entity)

        if (
          !StringUtils.isNullOrEmpty((<Entity>baseContent).mainEntityPrefix)
        ) {
          keyValue.key = (<Entity>baseContent).mainEntityPrefix as string
        } else {
          keyValue.key = ConditionUtils.TBL
        }

        keyValue.value = (<Entity>baseContent).id
      }

      keyValueArray.push(keyValue)
    }
    return keyValueArray
  }

  /**
   * return a string representation for the key values separated with OR
   */
  public static getOperandValuesAsLabel(keyValueArray: KeyValue[]): string {
    let result = ""

    for (const keyVal of keyValueArray) {
      result += keyVal.key
      result += " " + LanguagesPresentationModel.OR + " "
    }

    result = result.substring(
      0,
      result.length - (2 + LanguagesPresentationModel.OR.length)
    )
    return result
  }

  /**
   * updates the condition options keys according to the most updated keys and removes deleted items
   */
  public static updateChoiceOptions(
    updatedOptions: any[],
    conditionOptions: any[]
  ): any[] {
    const newConditionOptions: any[] = []

    for (const conditionOption of conditionOptions) {
      for (const option of updatedOptions) {
        if (conditionOption.value == option.systemName) {
          const keyVal: KeyValue = new KeyValue()

          keyVal.value = option.systemName
          keyVal.key = option.displayName
          newConditionOptions.push(keyVal)
          break
        }
      }
    }
    return newConditionOptions
  }

  /**
   *
   * @param entity
   * @return
   */
  public static isRootEntitySupportWorkflow(entity: Entity): boolean {
    return entity && entity.supportWorkflowConfiguration
  }

  /**
   *
   * @param entity
   * @return
   */
  public static isRootEntitySupportCategorizable(entity: Entity): boolean {
    return entity && entity.supportFormConfiguration
  }

  // TODO::
  // public static isLookupOrSetEntitySupportWorkflow(control:BaseConditionalContent, cachedEntities:HashMap):boolean {
  //   var entityId:string;

  //   if (!control) return false;

  //   if (control instanceof MoreInfoControl) return false;

  //   if (control instanceof BaseControl) {
  //     if((<BaseControl>control).property.dataType instanceof EntityBasedDataType) {
  //       entityId = ((<EntityBasedDataType>(<BaseControl>control).property.dataType )).lookupClassName;
  //     }
  //     else {
  //       return false;
  //     }
  //   }

  //   else if (control instanceof CompositeTable) {
  //     entityId = CompositeTable(control).entityId;
  //   }

  //   else if (control instanceof Report) {
  //     entityId = Report(control).entityId;
  //   }

  //   var entity:Entity = cachedEntities.getValue(entityId);
  //   var properties:[] = entity.properties;
  //   for (let property of properties) {
  //     if (property.systemName == "status") {
  //       return true;
  //     }
  //   }

  //   return false;
  // }

  // /**
  //  *
  //  * @param control
  //  * @param cachedEntities
  //  * @return
  //  */
  // public static isLookupOrSetEntitySupportCategorizable(control:BaseConditionalContent, cachedEntities:HashMap):boolean {
  //   var entityId:string;

  //   if (!control) return false;

  //   if (control instanceof MoreInfoControl) return false;

  //   if (control instanceof BaseControl) {
  //     if (BaseControl(control).property.dataType instanceof EntityBasedDataType) {
  //       entityId = ((<EntityBasedDataType>BaseControl(control).property.dataType )).lookupClassName;
  //     }
  //     else {
  //       return false;
  //     }
  //   }

  //   else if (control instanceof CompositeTable) {
  //     entityId = CompositeTable(control).entityId;
  //   }

  //   else if (control instanceof Report) {
  //     entityId = Report(control).entityId;
  //   }

  //   var entity:Entity = cachedEntities.getValue(entityId);
  //   var properties:[] = entity.properties;
  //   for (let property of properties) {
  //     if (property.systemName == "entityCategory") {
  //       return true;
  //     }
  //   }

  //   return false;
  // }

  // //TODO::
  // // public static shouldDisplayStatusCondition(entity:Entity, control:BaseConditionalContent, cachedEntities:HashMap):boolean {
  // //   return (ConditionUtils.isRootEntitySupportWorkflow(entity) || ConditionUtils.isLookupOrSetEntitySupportWorkflow(control, cachedEntities));
  // // }

  // /**
  //  *
  //  * @param entity
  //  * @param control
  //  * @param cachedEntities
  //  * @return
  //  */
  // public static shouldDisplayEntityCondition(entity:Entity, control:BaseConditionalContent, cachedEntities:HashMap):boolean {
  //   return (ConditionUtils.isRootEntitySupportCategorizable(entity) || ConditionUtils.isLookupOrSetEntitySupportCategorizable(control, cachedEntities));
  // }

  // /**
  //  *
  //  * @param entity
  //  * @param control
  //  * @param cachedEntities
  //  * @return
  //  */
  // public static shouldDisplayWorkflowCondition(entity:Entity, control:BaseConditionalContent, cachedEntities:HashMap):boolean {
  //   return ConditionUtils.shouldDisplayStatusCondition(entity, control, cachedEntities);
  // }

  // /**
  //  *
  //  * @param control
  //  * @return
  //  */
  // public static isLookupOrSetEntityToUser(control:BaseConditionalContent):boolean {

  //   var userEntityId:string = "com.msp.dao.entities.User";

  //   if (control instanceof BaseControl) {
  //     return ((BaseControl(control).property.dataType instanceof EntityBasedDataType) &&
  //             (EntityBasedDataType(BaseControl(control).property.dataType).lookupClassName == userEntityId));
  //   }
  //   else if (control instanceof CompositeTable) {
  //     return (CompositeTable(control).entityId == userEntityId)
  //   }

  //   return false;

  // }

  // /**
  //  * return a string representation of a state filter (State is X or Y or Z)
  //  */
  // public static getStateFilterAsString(statesArray:[], lpm:LanguagesPresentationModel, states:[]):string {
  //   var result:string = lpm.getLocalizedString(LanguagesPresentationModel.STATE_IS) + " ";

  //   for  (let state of statesArray) {
  //     result += ConditionUtils.getTranslatedFilterValue((<String>state.value ), states);
  //     result += " " + lpm.getLocalizedString(LanguagesPresentationModel.OR) + " ";
  //   }

  //   result = result.substring(0, result.length - (2 + lpm.getLocalizedString(LanguagesPresentationModel.OR).length));

  //   return result;
  // }

  // /**
  //  *
  //  * @param value
  //  * @param options
  //  * @return
  //  */
  // private static getTranslatedFilterValue(value:string, options:[]):string {

  //   for  (let keyValue of options) {
  //     if (keyValue.value == value) {
  //       return keyValue.key;
  //     }
  //   }

  //   return null;

  // }

  // /**
  //  * Creates a string that represents the role types
  //  */
  // public static getRoleFilterAsString(rolesArray:[], lpm:LanguagesPresentationModel, roles:HashMap, loggedInUser:boolean = false):string {

  //   var result:string = loggedInUser ?
  //           lpm.getLocalizedString(LanguagesPresentationModel.LOGGED_IN_USER_IS_ASSIGNED_TO_ROLE) :
  //           lpm.getLocalizedString(LanguagesPresentationModel.USER_IS_ASSIGNED_TO_ROLE);

  //   result += " ";

  //   for  (let role of rolesArray) {
  //     var translatedFilterValue:string = "";
  //     for  (let dialogRole of roles.getValues()) {
  //       if (dialogRole.systemName == role.value) {
  //         translatedFilterValue = dialogRole.displayName;
  //         break;
  //       }
  //     }
  //     result += translatedFilterValue;
  //     result += " " + lpm.getLocalizedString(LanguagesPresentationModel.OR) + " ";
  //   }

  //   result = result.substring(0, result.length - (2 + lpm.getLocalizedString(LanguagesPresentationModel.OR).length));

  //   return result;
  // }

  // /**
  //  * receives a keyValue array that represents a property path, and creates a "tbl.systemName..." path
  //  */
  // public static createDottedPath(input:[]):string {
  //   var result:string = "tbl";
  //   var isBaseContent:boolean = (input.getItemAt(0) instanceof BaseContent);

  //   if (isBaseContent) {
  //     for (var i:number = 1; i < input.length; i++) {
  //       result += "." + input.getItemAt(i).systemName;
  //     }
  //   }

  //   else {
  //     for (var j:number = 1; j < input.length; j++) {
  //       result += "." + input.getItemAt(j).key;
  //     }
  //   }

  //   return result;
  // }

  // /**
  //  *
  //  * @param propertyCondition
  //  * @param formsPresentationModel
  //  * @return
  //  */
  // public static isConditionCompareControlOnTheForm(propertyCondition:PropertyCondition, formsPresentationModel:FormsPresentationModel, additionalTestFunction:Function):boolean {

  //   var isConditionCompareControlOnTheForm:boolean;

  //   isConditionCompareControlOnTheForm = ConditionUtils.isOperandCompareControlOnTheForm(propertyCondition.mainOperandBaseContent, formsPresentationModel)
  //           && (additionalTestFunction == null || additionalTestFunction(propertyCondition.mainOperandBaseContent, propertyCondition.skipConditionIfMainOperandIsEmpty));

  //   isConditionCompareControlOnTheForm = isConditionCompareControlOnTheForm || ConditionUtils.isOperandCompareControlOnTheForm(propertyCondition.secondaryOperandBaseContent, formsPresentationModel)
  //           && (additionalTestFunction == null || additionalTestFunction(propertyCondition.secondaryOperand, propertyCondition.skipConditionIfSecondaryOperandIsEmpty));

  //   return isConditionCompareControlOnTheForm;

  // }

  // /**
  //  *
  //  * @param operand
  //  * @return
  //  */
  // private static isOperandCompareControlOnTheForm(operand:[], formsPresentationModel:FormsPresentationModel):boolean {

  //   return operand != null && operand.length == 2 && operand.getItemAt(0) instanceof Entity && Entity(operand.getItemAt(0)).mainEntityPrefix == ConditionUtils.TBL && formsPresentationModel.isControlInTheForm(BaseProperty(operand.getItemAt(1)));
  // }

  // /**
  //  *
  //  * @param input - array collection of key-value that reflects a property path
  //  * @return - concatenated string of system names
  //  */
  // public static getNestedPropertyCalculatedSystemName(input:[]):string {

  //   return StringUtils.collectionToString(input, "key", "_", 1);

  // }

  // /**
  //  *
  //  * @param keyValuesArray
  //  * @return
  //  */
  // public static getClassNamesArrayFromKeyValuesArray(keyValuesArray:[], hashMapHelper:HashMap):void {

  //   if (keyValuesArray && keyValuesArray.length > 0) {

  //     for  (let keyValue of keyValuesArray) {

  //       if (keyValue.value && !StringUtils.isNullOrEmpty((<String>keyValue.value ))) {
  //         var entityId:string = (<String>keyValue.value );
  //         hashMapHelper.put(entityId, entityId);
  //       }
  //     }
  //   }
  // }

  // /**
  //  * returns the last property from the base content array.
  //  * returns null if no property was found
  //  *
  //  * @param baseContentArray
  //  * @param propertyClass
  //  * @return
  //  */
  // public static getLastPropertyFromPropertySelectorResult(baseContentArray:[], propertyClass:Object = null):BaseProperty {

  //   var baseContent:BaseContent = (<BaseContent>baseContentArray.getItemAt(baseContentArray.length - 1) );

  //   if (baseContent instanceof BaseProperty && (propertyClass == null || baseContent instanceof propertyClass)) {

  //     return (<BaseProperty>baseContent );

  //   }

  //   return null;
  // }

  // /**
  //  *
  //  * @return
  //  */
  // public static setEntitiesForPropertySelectorByKeyValue(key:string, value:string, currentEntity:Entity):[] {

  //   var result:[] = new []();
  //   var item:KeyValue;

  //   item = new KeyValue();
  //   item.key = key;
  //   item.value = value;
  //   result.addItem(item);

  //   if (currentEntity.id != value) {
  //     item = new KeyValue();
  //     item.key = "currentModelEntity";
  //     item.value = String(currentEntity.id);
  //     result.addItem(item);
  //   }

  //   if (String(ConditionUtils.USER_CLASS_NAME) != value) {
  //     item = new KeyValue();
  //     item.key = "loggedInUser";
  //     item.value = String(ConditionUtils.USER_CLASS_NAME);
  //     result.addItem(item);
  //   }

  //   return result;

  // }

  // /**
  //  *
  //  * @return
  //  */
  // public static setEntitiesForPropertySelector(baseContent:BaseContent, currentEntity:Entity, firstKeyValueArrayKey:string, includeWorksheetUser:boolean = false, formsPresentationModel:FormsPresentationModel = null):[] {

  //   var result:[] = new []();
  //   var item:KeyValue;

  //   if (baseContent instanceof BaseControl) {

  //     if (BaseControl(baseContent).property && BaseControl(baseContent).property.dataType instanceof EntityBasedDataType) {
  //       item = new KeyValue();
  //       item.key = "lookup";
  //       item.value = ((<EntityBasedDataType>BaseControl(baseContent).property.dataType )).lookupClassName;
  //       result.addItem(item);
  //     }

  //     var container:BaseControlsContainer;

  //     if (formsPresentationModel != null) {

  //       container = formsPresentationModel.findTrueContainer(BaseControl(baseContent));

  //     }
  //     else {

  //       container = BaseControl(baseContent).container;

  //     }

  //     if (container instanceof CompositeTable) {
  //       item = new KeyValue();
  //       item.key = "row";
  //       item.value = CompositeTable(container).entityId;
  //       result.addItem(item);
  //     }

  //   }

  //   else if (baseContent instanceof CompositeTable) {
  //     item = new KeyValue();
  //     item.key = "row";
  //     item.value = CompositeTable(baseContent).entityId;
  //     result.addItem(item);
  //   }

  //   else if (baseContent instanceof Report) {
  //     item = new KeyValue();
  //     item.init("report", ((<Report>baseContent )).entityId);
  //     result.addItem(item);
  //   }

  //   if (currentEntity != null) {
  //     item = new KeyValue();

  //     if (!StringUtils.isNullOrEmpty(firstKeyValueArrayKey)) {
  //       item.key = firstKeyValueArrayKey;
  //     }

  //     else {
  //       item.key = "currentModelEntity";
  //     }

  //     item.value = String(currentEntity.id);
  //     result.addItem(item);
  //   }

  //   if (includeWorksheetUser) {

  //     item = new KeyValue();
  //     item.key = "worksheetUser";
  //     item.value = String(ConditionUtils.USER_CLASS_NAME);
  //     result.addItem(item);

  //   }

  //   item = new KeyValue();
  //   item.key = "loggedInUser";
  //   item.value = String(ConditionUtils.USER_CLASS_NAME);
  //   result.addItem(item);

  //   return result;
  // }

  // /**
  //  *
  //  * @param restriction
  //  * @param languagesPresentationModel
  //  * @param defaultConditions
  //  */
  // public static createEveryoneRoleGroup(restriction:Restriction, languagesPresentationModel:LanguagesPresentationModel, defaultConditions:any[] = null, defaultTitle:string = null):void {

  //   var everyoneRoleGroup:RoleGroup = new RoleGroup();

  //   everyoneRoleGroup.title = (languagesPresentationModel != null) ? languagesPresentationModel.getLocalizedString(LanguagesPresentationModel.EVERYONE) : defaultTitle;
  //   everyoneRoleGroup.everyone = true;
  //   everyoneRoleGroup.conditions = new [](defaultConditions);

  //   if (restriction.roleGroups == null) {
  //     restriction.roleGroups = new []();
  //   }

  //   restriction.roleGroups.addItem(everyoneRoleGroup);
  // }
}
