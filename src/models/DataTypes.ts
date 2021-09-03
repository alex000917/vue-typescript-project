import { ChoiceOption } from "./ChoiceOption"
import { KeyValue } from "./KeyValue"
export class BaseDataType extends KeyValue {
  myspType = "BaseDataType";

  public clone(): BaseDataType {
    return JSON.parse(JSON.stringify(this))
  }
}
export class ChoiceDataType extends BaseDataType {
  myspType = "ChoiceDataType";
  options: ChoiceOption[] = [];
}

export class EntityBasedDataType extends BaseDataType {
  myspType = "EntityBasedDataType";
  lookupClassName!: string;
}
