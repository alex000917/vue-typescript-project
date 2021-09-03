import { KeyValue } from "../KeyValue"

export class PeriodPickerTypeFactory {
  public static TIME = "1";

  public static DAY = "2";

  public static DAY_AND_TIME = "3";

  public static WEEK = "4";

  public static MONTH = "5";

  public static QUARTER = "6";

  public static YEAR = "7";

  public static getPeriodTypes(): KeyValue[] {
    const result: KeyValue[] = []
    let type: KeyValue = new KeyValue()

    type.key = "Time"
    type.value = PeriodPickerTypeFactory.TIME
    result.push(type)

    type = new KeyValue()
    type.key = "Day"
    type.value = PeriodPickerTypeFactory.DAY
    result.push(type)

    type = new KeyValue()
    type.key = "Day and Time"
    type.value = PeriodPickerTypeFactory.DAY_AND_TIME
    result.push(type)

    type = new KeyValue()
    type.key = "Week"
    type.value = PeriodPickerTypeFactory.WEEK
    result.push(type)

    type = new KeyValue()
    type.key = "Month"
    type.value = PeriodPickerTypeFactory.MONTH
    result.push(type)

    type = new KeyValue()
    type.key = "Quarter"
    type.value = PeriodPickerTypeFactory.QUARTER
    result.push(type)

    type = new KeyValue()
    type.key = "Year"
    type.value = PeriodPickerTypeFactory.YEAR
    result.push(type)

    return result
  }

  public static getSelectedItem(value: string): number {
    const periodTypeList = PeriodPickerTypeFactory.getPeriodTypes()
    for (let i = 0; i < periodTypeList.length; i++) {
      if (periodTypeList[i].value == value) {
        return i
      }
    }
    return -1
  }
}
