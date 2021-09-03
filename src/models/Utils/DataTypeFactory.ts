import { map } from "lodash"
import { KeyValue } from "../KeyValue"
import { BaseProperty, Property } from "../Properties"
import { LanguagesPresentationModel } from "./LanguagesPresentationModel"
import { MSPEmbeddedAssets } from "./MSPEmbeddedAssets"

export class DataType {
  public value: string | undefined;
  public label: string | undefined;
  public previewImage: string | undefined;
  /**
   *
   */
  constructor() {}
}

export enum DataTypeEnum {
  SINGLE_LINE_OF_TEXT = 1,
  TEXT_AREA = 2,
  CHOICE = 3,
  DATE_AND_TIME = 4,
  YES_NO = 5,
  NUMBER = 6,
  LARGE_NUMBER = 7,
  NUMBER_WITH_DECIMAL_POINT = 8,
  LOOKUP = 9,
  TABLE = 10,
  MULTI_LOOKUP = 11,
  WORKFLOW_STEP = 12
}

export class DataTypeFactory {
  public static languagesPresentationModel: LanguagesPresentationModel;

  private static dataTypeIcons: Map<string, string>;
  private static PreviewImages = new Map<string, string>();

  public static FORMULA_DATATYPE_PREFIX = "F";

  public static SINGLE_LINE_OF_TEXT = "1";

  public static TEXT_AREA = "2";

  public static CHOICE = "3";

  public static DATE_AND_TIME = "4";

  public static YES_NO = "5";

  public static NUMBER = "6";

  public static LARGE_NUMBER = "7";

  public static NUMBER_WITH_DECIMAL_POINT = "8";

  public static LOOKUP = "9";

  public static TABLE = "10";

  public static MULTI_LOOKUP = "11";

  public static WORKFLOW_STEP = "12";

  public static publicPath = "";

  private static init(): void {
    DataTypeFactory.dataTypeIcons = new Map<string, string>()

    DataTypeFactory.publicPath =
      process.env.NODE_ENV === "production" ? "/mspd" : "/mspd"
    DataTypeFactory.dataTypeIcons.set(
      DataTypeFactory.SINGLE_LINE_OF_TEXT,
      DataTypeFactory.publicPath + MSPEmbeddedAssets.SINGLE_LINE_OF_TEXT_ICON
    )
    DataTypeFactory.dataTypeIcons.set(
      DataTypeFactory.TEXT_AREA,
      DataTypeFactory.publicPath + MSPEmbeddedAssets.TEXT_AREA_ICON
    )
    DataTypeFactory.dataTypeIcons.set(
      DataTypeFactory.DATE_AND_TIME,
      DataTypeFactory.publicPath + MSPEmbeddedAssets.DATE_AND_TIME_ICON
    )
    DataTypeFactory.dataTypeIcons.set(
      DataTypeFactory.YES_NO,
      DataTypeFactory.publicPath + MSPEmbeddedAssets.YES_NO_ICON
    )
    DataTypeFactory.dataTypeIcons.set(
      DataTypeFactory.NUMBER,
      DataTypeFactory.publicPath + MSPEmbeddedAssets.NUMBER_ICON
    )
    DataTypeFactory.dataTypeIcons.set(
      DataTypeFactory.CHOICE,
      DataTypeFactory.publicPath + MSPEmbeddedAssets.CHOICE_ICON
    )
    DataTypeFactory.dataTypeIcons.set(
      DataTypeFactory.LARGE_NUMBER,
      DataTypeFactory.publicPath + MSPEmbeddedAssets.LARGE_NUMBER_ICON
    )
    DataTypeFactory.dataTypeIcons.set(
      DataTypeFactory.NUMBER_WITH_DECIMAL_POINT,
      DataTypeFactory.publicPath +
        MSPEmbeddedAssets.NUMBER_WITH_DECIMAL_POINT_ICON
    )
    DataTypeFactory.dataTypeIcons.set(
      DataTypeFactory.LOOKUP,
      DataTypeFactory.publicPath + MSPEmbeddedAssets.LOOKUP_ICON
    )
    DataTypeFactory.dataTypeIcons.set(
      DataTypeFactory.TABLE,
      DataTypeFactory.publicPath + MSPEmbeddedAssets.TABLE_ICON
    )
    DataTypeFactory.dataTypeIcons.set(
      DataTypeFactory.MULTI_LOOKUP,
      DataTypeFactory.publicPath + MSPEmbeddedAssets.MULTI_LOOKUP_ICON
    )

    DataTypeFactory.dataTypeIcons.set(
      DataTypeFactory.FORMULA_DATATYPE_PREFIX +
        DataTypeFactory.SINGLE_LINE_OF_TEXT,
      DataTypeFactory.publicPath +
        MSPEmbeddedAssets.SINGLE_LINE_OF_TEXT_FORMULA_ICON
    )
    DataTypeFactory.dataTypeIcons.set(
      DataTypeFactory.FORMULA_DATATYPE_PREFIX + DataTypeFactory.TEXT_AREA,
      DataTypeFactory.publicPath + MSPEmbeddedAssets.TEXT_AREA_FORMULA_ICON
    )
    DataTypeFactory.dataTypeIcons.set(
      DataTypeFactory.FORMULA_DATATYPE_PREFIX + DataTypeFactory.DATE_AND_TIME,
      DataTypeFactory.publicPath + MSPEmbeddedAssets.DATE_AND_TIME_FORMULA_ICON
    )
    DataTypeFactory.dataTypeIcons.set(
      DataTypeFactory.FORMULA_DATATYPE_PREFIX + DataTypeFactory.YES_NO,
      DataTypeFactory.publicPath + MSPEmbeddedAssets.YES_NO_FORMULA_ICON
    )
    DataTypeFactory.dataTypeIcons.set(
      DataTypeFactory.FORMULA_DATATYPE_PREFIX + DataTypeFactory.NUMBER,
      DataTypeFactory.publicPath + MSPEmbeddedAssets.NUMBER_FORMULA_ICON
    )
    DataTypeFactory.dataTypeIcons.set(
      DataTypeFactory.FORMULA_DATATYPE_PREFIX + DataTypeFactory.LARGE_NUMBER,
      DataTypeFactory.publicPath + MSPEmbeddedAssets.LARGE_NUMBER_FORMULA_ICON
    )
    DataTypeFactory.dataTypeIcons.set(
      DataTypeFactory.FORMULA_DATATYPE_PREFIX +
        DataTypeFactory.NUMBER_WITH_DECIMAL_POINT,
      DataTypeFactory.publicPath +
        MSPEmbeddedAssets.NUMBER_WITH_DECIMAL_POINT_FORMULA_ICON
    )
    DataTypeFactory.dataTypeIcons.set(
      DataTypeFactory.FORMULA_DATATYPE_PREFIX + DataTypeFactory.LOOKUP,
      DataTypeFactory.publicPath + MSPEmbeddedAssets.LOOKUP_FORMULA_ICON
    )

    DataTypeFactory.InitPreviewImage()
  }

  /*
   */
  private static InitPreviewImage() {
    DataTypeFactory.PreviewImages.set(
      DataTypeFactory.SINGLE_LINE_OF_TEXT,
      DataTypeFactory.publicPath +
        MSPEmbeddedAssets.SINGLE_LINE_OF_TEXT_PREVIEW_IMAGE
    )
    DataTypeFactory.PreviewImages.set(
      DataTypeFactory.TEXT_AREA,
      DataTypeFactory.publicPath + MSPEmbeddedAssets.TEXT_AREA_PREVIEW_IMAGE
    )
    DataTypeFactory.PreviewImages.set(
      DataTypeFactory.DATE_AND_TIME,
      DataTypeFactory.publicPath + MSPEmbeddedAssets.DATE_AND_TIME_PREVIEW_IMAGE
    )
    DataTypeFactory.PreviewImages.set(
      DataTypeFactory.YES_NO,
      DataTypeFactory.publicPath + MSPEmbeddedAssets.YES_NO_PREVIEW_IMAGE
    )
    DataTypeFactory.PreviewImages.set(
      DataTypeFactory.NUMBER,
      DataTypeFactory.publicPath + MSPEmbeddedAssets.NUMBER_PREVIEW_IMAGE
    )
    DataTypeFactory.PreviewImages.set(
      DataTypeFactory.CHOICE,
      DataTypeFactory.publicPath + MSPEmbeddedAssets.CHOICE_PREVIEW_IMAGE
    )
    DataTypeFactory.PreviewImages.set(
      DataTypeFactory.LARGE_NUMBER,
      DataTypeFactory.publicPath + MSPEmbeddedAssets.LARGE_NUMBER_PREVIEW_IMAGE
    )
    DataTypeFactory.PreviewImages.set(
      DataTypeFactory.NUMBER_WITH_DECIMAL_POINT,
      DataTypeFactory.publicPath +
        MSPEmbeddedAssets.NUMBER_WITH_DECIMAL_POINT_PREVIEW_IMAGE
    )
    DataTypeFactory.PreviewImages.set(
      DataTypeFactory.LOOKUP,
      DataTypeFactory.publicPath + MSPEmbeddedAssets.LOOKUP_PREVIEW_IMAGE
    )
    DataTypeFactory.PreviewImages.set(
      DataTypeFactory.TABLE,
      DataTypeFactory.publicPath + MSPEmbeddedAssets.TABLE_PREVIEW_IMAGE
    )
    DataTypeFactory.PreviewImages.set(
      DataTypeFactory.MULTI_LOOKUP,
      DataTypeFactory.publicPath + MSPEmbeddedAssets.MULTI_LOOKUP_PREVIEW_IMAGE
    )
  }

  public static getPreviewImage(dataTypeId: string) {
    if (!DataTypeFactory.PreviewImages) {
      DataTypeFactory.InitPreviewImage()
    }

    return DataTypeFactory.PreviewImages.get(dataTypeId)
  }

  /**
   *
   * @param dataTypeTranslation
   * @return
   */
  public static getDataTypeObjectCollection(
    dataTypeTranslation: [],
    dataTypesToExclude: DataType[]
  ): DataType[] {
    const dataTypes: DataType[] = []

    if (dataTypesToExclude == null || dataTypesToExclude.length == 0) {
      return DataTypeFactory.getAllDataTypes(dataTypeTranslation)
    }

    for (const dataType of DataTypeFactory.getAllDataTypes(dataTypeTranslation)) {
      if (!dataTypesToExclude.indexOf(dataType)) {
        dataTypes.push(dataType)
      }
    }

    return dataTypes
  }

  /**
   *
   * @param dataTypeId
   * @return
   */
  public static getDataTypeIcon(dataTypeId: string): string | undefined {
    if (!DataTypeFactory.dataTypeIcons) {
      DataTypeFactory.init()
    }
    return DataTypeFactory.dataTypeIcons.get(dataTypeId)
  }

  /**
   *
   * @param baseProperty
   * @return
   */
  public static getBasePropertyDataTypeIcon(
    baseProperty: BaseProperty
  ): string | undefined {
    const isFormula: boolean =
      baseProperty instanceof Property
        ? (<Property>baseProperty).formula
        : false
    const dataTypeId: string = baseProperty?.dataType?.value.toString()

    if (DataTypeFactory.dataTypeIcons == null) {
      DataTypeFactory.init()
    }

    return DataTypeFactory.dataTypeIcons.get(
      isFormula
        ? DataTypeFactory.FORMULA_DATATYPE_PREFIX + dataTypeId
        : dataTypeId
    )
  }

  /**
   *
   * @param dataTypeTranslation
   * @return
   */
  private static getAllDataTypes(dataTypeTranslation: []): DataType[] {
    const dataTypes: DataType[] = []
    let dataTypeObject: DataType = {} as any

    dataTypeObject.value = DataTypeFactory.SINGLE_LINE_OF_TEXT
    dataTypeObject.previewImage =
      MSPEmbeddedAssets.SINGLE_LINE_OF_TEXT_PREVIEW_IMAGE
    dataTypeObject.label = DataTypeFactory.getDataTypeTranslation(
      dataTypeObject.value,
      dataTypeTranslation
    )
    if (dataTypeObject.label != null) {
      dataTypes.push(dataTypeObject)
    }

    dataTypeObject = new DataType()
    dataTypeObject.value = DataTypeFactory.TEXT_AREA
    dataTypeObject.previewImage = MSPEmbeddedAssets.TEXT_AREA_PREVIEW_IMAGE
    dataTypeObject.label = DataTypeFactory.getDataTypeTranslation(
      dataTypeObject.value,
      dataTypeTranslation
    )
    if (dataTypeObject.label != null) {
      dataTypes.push(dataTypeObject)
    }

    dataTypeObject = new DataType()
    dataTypeObject.value = DataTypeFactory.CHOICE
    dataTypeObject.previewImage = MSPEmbeddedAssets.CHOICE_PREVIEW_IMAGE
    dataTypeObject.label = DataTypeFactory.getDataTypeTranslation(
      dataTypeObject.value,
      dataTypeTranslation
    )
    if (dataTypeObject.label != null) {
      dataTypes.push(dataTypeObject)
    }

    dataTypeObject = new DataType()
    dataTypeObject.value = DataTypeFactory.DATE_AND_TIME
    dataTypeObject.previewImage = MSPEmbeddedAssets.DATE_AND_TIME_PREVIEW_IMAGE
    dataTypeObject.label = DataTypeFactory.getDataTypeTranslation(
      dataTypeObject.value,
      dataTypeTranslation
    )
    if (dataTypeObject.label != null) {
      dataTypes.push(dataTypeObject)
    }

    dataTypeObject = new DataType()
    dataTypeObject.value = DataTypeFactory.YES_NO
    dataTypeObject.previewImage = MSPEmbeddedAssets.YES_NO_PREVIEW_IMAGE
    dataTypeObject.label = DataTypeFactory.getDataTypeTranslation(
      dataTypeObject.value,
      dataTypeTranslation
    )
    if (dataTypeObject.label != null) {
      dataTypes.push(dataTypeObject)
    }

    dataTypeObject = new DataType()
    dataTypeObject.value = DataTypeFactory.NUMBER
    dataTypeObject.previewImage =
      MSPEmbeddedAssets.NUMBER_WITH_DECIMAL_POINT_PREVIEW_IMAGE
    dataTypeObject.label = DataTypeFactory.getDataTypeTranslation(
      dataTypeObject.value,
      dataTypeTranslation
    )
    if (dataTypeObject.label != null) {
      dataTypes.push(dataTypeObject)
    }

    dataTypeObject = new DataType()
    dataTypeObject.value = DataTypeFactory.LARGE_NUMBER
    dataTypeObject.previewImage = MSPEmbeddedAssets.LARGE_NUMBER_PREVIEW_IMAGE
    dataTypeObject.label = DataTypeFactory.getDataTypeTranslation(
      dataTypeObject.value,
      dataTypeTranslation
    )
    if (dataTypeObject.label != null) {
      dataTypes.push(dataTypeObject)
    }

    dataTypeObject = new DataType()
    dataTypeObject.value = DataTypeFactory.NUMBER_WITH_DECIMAL_POINT
    dataTypeObject.previewImage =
      MSPEmbeddedAssets.NUMBER_WITH_DECIMAL_POINT_PREVIEW_IMAGE
    dataTypeObject.label = DataTypeFactory.getDataTypeTranslation(
      dataTypeObject.value,
      dataTypeTranslation
    )
    if (dataTypeObject.label != null) {
      dataTypes.push(dataTypeObject)
    }

    dataTypeObject = new DataType()
    dataTypeObject.value = DataTypeFactory.LOOKUP
    dataTypeObject.previewImage = MSPEmbeddedAssets.LOOKUP_PREVIEW_IMAGE
    dataTypeObject.label = DataTypeFactory.getDataTypeTranslation(
      dataTypeObject.value,
      dataTypeTranslation
    )
    if (dataTypeObject.label != null) {
      dataTypes.push(dataTypeObject)
    }

    dataTypeObject = new DataType()
    dataTypeObject.value = DataTypeFactory.TABLE
    dataTypeObject.previewImage = MSPEmbeddedAssets.TABLE_PREVIEW_IMAGE
    dataTypeObject.label = DataTypeFactory.getDataTypeTranslation(
      dataTypeObject.value,
      dataTypeTranslation
    )
    if (dataTypeObject.label != null) {
      dataTypes.push(dataTypeObject)
    }

    dataTypeObject = new DataType()
    dataTypeObject.value = DataTypeFactory.MULTI_LOOKUP
    dataTypeObject.previewImage = MSPEmbeddedAssets.MULTI_LOOKUP_PREVIEW_IMAGE
    dataTypeObject.label = DataTypeFactory.getDataTypeTranslation(
      dataTypeObject.value,
      dataTypeTranslation
    )
    if (dataTypeObject.label != null) {
      dataTypes.push(dataTypeObject)
    }

    return dataTypes
  }

  /**
   *
   * @param dataTypeValue
   * @param dataTypeTranslation
   * @return
   */
  public static getDataTypeTranslation(
    dataTypeValue: string | null,
    dataTypeTranslation: KeyValue[] | null
  ): string | undefined {
    if (dataTypeTranslation) {
      for (const keyValue of dataTypeTranslation) {
        if (keyValue.value == dataTypeValue) {
          return keyValue.key as string
        }
      }
    }
    return undefined
  }

  /**
   *
   * @param dataTypeValue
   * @param dataTypes
   * @return
   */
  public static getDataTypeObject(
    dataTypeValue: string,
    dataTypes: DataType[]
  ): DataType | undefined {
    for (const dataTypeObject of dataTypes) {
      if (dataTypeObject.value == dataTypeValue) {
        return dataTypeObject
      }
    }

    return !(dataTypes != null && dataTypes.length > 0)
      ? <DataType>dataTypes[0]
      : undefined
  }

  /**
   *
   * @param dataType
   * @return
   */
  public static isDataType(dataType: string): boolean {
    return DataTypeFactory.dataTypeIcons.has(dataType)
  }

  /**
   *
   * @return
   */
  public static buildApplicationPreferenceAllowedDataTypes(): string[] {
    const selector: string[] = []

    selector.push(DataTypeFactory.SINGLE_LINE_OF_TEXT)
    selector.push(DataTypeFactory.DATE_AND_TIME)
    selector.push(DataTypeFactory.YES_NO)
    selector.push(DataTypeFactory.NUMBER)
    selector.push(DataTypeFactory.NUMBER_WITH_DECIMAL_POINT)
    selector.push(DataTypeFactory.LOOKUP)

    return selector
  }
}
