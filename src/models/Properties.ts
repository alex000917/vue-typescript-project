import { TextAssembly } from "./TextAssembly"
import { Notification } from "./Notification"
import { BaseContent } from "./BaseContent"
import { BaseDataType, ChoiceDataType, EntityBasedDataType } from "./DataTypes"
import { KeyValue } from "./KeyValue"

export class BaseProperty extends BaseContent {
  myspType = "BaseProperty";
  customLink: TextAssembly | null = null;
  dataType: BaseDataType |ChoiceDataType|EntityBasedDataType| null = null;
  entityId:string | null = null;
  valueChangedNotification: Notification | null = null;
  tabularReportsCategory: string | null = null;
  databaseColumnName: string | null = null;
  outOfTheBox: Boolean = false;
  translated: Boolean = false;
  excludePropertyFromReportGenerator: Boolean = false;
  excludePropertyFromEventsGenerator: Boolean = false;
  defaultWidth = 0;

  // public setPropertyValue(propertyKey:string, value:any) {
  //   const local = this
  //   local[propertyKey] = value
  // }
}
export class BaseValueObject {
  myspType = "BaseValueObject";
  property: KeyValue[]= [];
  blank = false;
}
export class SimpleValueObject extends BaseValueObject {
  myspType = "SimpleValueObject";
  value: string |null=null;
}

export class Property extends BaseProperty {
  myspType = "Property";
  databaseColumnType: string | null = null;
  identity = false;
  virtualProperty = false;
  formula = false;
  sql: string | null = null;
}
export class NumericProperty extends Property {
  myspType = "NumericProperty";
  databaseColumnType = "int (10)"
  useThousandSeparator = false;
  defaultValue: SimpleValueObject | null = null;
  defaultMinValue: SimpleValueObject | null = null;
  defaultMaxValue: SimpleValueObject | null = null;
}
export class CheckBoxProperty extends Property {
  myspType = "CheckBoxProperty";
  databaseColumnType= "bit (1)"
  defaultValue: SimpleValueObject | null = null;
}
export class ChoiceProperty extends Property {
  myspType = "ChoiceProperty";
  includeBlank = false;
  blankOptionText: string | null = null;
  defaultValue: string | null = null;
  displayAsAutoCompleteInReports = false;
}
export class DateProperty extends Property {
  myspType = "DateProperty";
  periodPickerType = "3";
  databaseColumnType = "datetime (23)"
  defaultValue: DateValueObject | null = null;
  defaultMinValue: DateValueObject | null = null;
  defaultMaxValue: DateValueObject | null = null;
}
export class DateValueObject extends BaseValueObject {
  myspType = "DateValueProperty";
  today = false;
}
export class DecimalProperty extends NumericProperty {
  myspType = "DecimalProperty";
  databaseColumnType= "float (15)"
  numberOfDecimalPlaces!: number;
}
export class EntityBaseProperty extends Property {
  myspType = "EntityBaseProperty";
  linkToEntity = false;
  displayAsAutoCompleteInReports = false;
}
export class LookupProperty extends EntityBaseProperty {
  myspType = "LookupProperty";
  databaseColumnType = "bigint (19)"
  defaultValue!: BaseValueObject;
  canBeUseAsReferenceInReports = false;
  lookupToExtension = false;
}

export class SetProperty extends EntityBaseProperty {
  myspType = "SetProperty";
  databaseColumnType= null
  table: string | null = null;
  filter: string | null = null;
  orderByColumnName: string | null = null;
  usingVanillaReference = false;
}
export class ManyToManyProperty extends SetProperty {
  myspType = "ManyToManyProperty";
  databaseColumnType= null
  referenceColumn: string | null = null;
}

export class StringProperty extends Property {
  myspType = "StringProperty";
  databaseColumnType = "varchar (250)"
  maximumTextLength: string | null = null;
  defaultValue: SimpleValueObject | null = null;
}

export class TextProperty extends StringProperty {
  myspType = "TextProperty";
  databaseColumnType ="text (max)"

}
