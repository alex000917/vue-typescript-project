import { AppCacheModule } from "@/store/modules/appCache";
import { BaseContent } from "../BaseContent";
import { Model } from "../DataModel";
import { IBaseCreatableContent } from "../BaseCreatableContent";
import { Icon } from "../Icon";
import { IRecentlyEditedContent } from "../IRecentlyEditedContent";
import { LanguageTranslation } from "../LanguageTranslation";
import { LanguagesPresentationModel } from "./LanguagesPresentationModel";
import { StringUtils } from "./StringUtils";
import { Node } from "../Node";
import { ArrayUtils } from "@/models/Utils/ArrayUtils";
import { ItemInstance } from "../ItemInstance";
import { GeneralFactory } from "./GenralFactory";
import { Entity } from "../Entity";
import { DataTypeFactory } from "./DataTypeFactory";
import { debug } from "console";
export class NumberFormatter {
  format(value: number): string {
    throw new Error("Method not implemented.");
  }

  // TODO:  needs own implementation.
  precision!: number;
  useThousandsSeparator: boolean | undefined;
  rounding: any;
}
export class DataUtils {
  private static numberFormatter: NumberFormatter = new NumberFormatter();
  public static numberFormatterSimple: NumberFormatter = DataUtils.createSimpleNumberFormatter();

  public static ENTITY_CATEGORY_ID = "com.msp.dao.entities.EntityCategory";

  // TODO
  private static model: Model = {} as any;
  /**
   *
   */
  constructor() {}

  /**
   *
   * @return
   */
  private static createSimpleNumberFormatter(): NumberFormatter {
    const f: NumberFormatter = new NumberFormatter();
    f.precision = 0;
    return f;
  }

  /**
   *
   * @param collection
   * @return
   */
  public static hasEmptyItem(collection: []): boolean {
    for (const item of collection) {
      if (item == null) return true;
    }

    return false;
  }

  /**
   *
   * @param name
   * @return
   */
  public static validateDisplayName(name: string): boolean {
    const nameCopy: string = name;

    // not empty
    if (!nameCopy) {
      return false;
    }
    if (nameCopy.length === 0) {
      return false;
    }

    // contains only english letters and digits
    // if (nameCopy.replace(/\W|_/gg, "") != name) {
    const regExp = new RegExp("^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$");
    if (!regExp.test(nameCopy)) {
      return false;
    }

    // starts with letter
    if (nameCopy.charAt(0) >= "0" && nameCopy.charAt(0) <= "9") {
      return false;
    }

    return true;
  }
  /**
   *
   * @param languages
   * @param currentLocale
   * @return
   */

  public static nonDuplicateFormRule(collection: any[], key: string) {
    return (rule: any, value: string, callback: any) => {
      if (!value) {
        return callback(new Error("Please input the " + key + "."));
      }
      setTimeout(() => {
        const valueAry = ArrayUtils.getValueListByKey(collection, key);
        if (valueAry.includes(value)) {
          callback(new Error("This " + key + " was already registered."));
        } else {
          callback();
        }
      }, 500);
    };
  }

  /**
   *
   * @param languages
   * @param currentLocale
   * @return
   */
  public static getDisplayNameFromLanguages(
    languages: LanguageTranslation[],
    currentLocale: string
  ): string {
    let result = "";

    for (const lang of languages) {
      if (lang.language === currentLocale) {
        result = lang.displayName as string;
        break;
      }
    }
    return result;
  }

  /**
   *
   * @param languages
   * @param currentLocale
   * @return
   */
  public static getDescriptionFromLanguages(
    languages: LanguageTranslation[],
    currentLocale: string
  ): string {
    let result = "";

    for (const lang of languages) {
      if (lang.language === currentLocale) {
        result = lang.description as string;
        break;
      }
    }
    return result;
  }

  /**
   *
   * @param input
   * @param currentLocale
   */
  public static setDisplayNameAndDescription(
    input: BaseContent,
    currentLocale: string
  ): void {
    input.displayName = DataUtils.getDisplayNameFromLanguages(
      input.languageTranslations,
      currentLocale
    );
    input.description = DataUtils.getDescriptionFromLanguages(
      input.languageTranslations,
      currentLocale
    );
  }

  public static updateIBaseCreatableContentProperties(
    baseCreatableContent: IRecentlyEditedContent,
    loggedInUserFullName: string
  ): void {
    if (baseCreatableContent.createdBy == null) {
      baseCreatableContent.createdBy = loggedInUserFullName;
    }

    if (baseCreatableContent.dateCreated == null) {
      baseCreatableContent.dateCreated = new Date().getDate();
    }

    baseCreatableContent.modifiedBy = loggedInUserFullName;
    baseCreatableContent.dateModified = new Date().getDate();
  }

  public static markModificationAndAddToRecentlyEdited(
    recentlyEditedContent: IRecentlyEditedContent
  ): void {
    this.markModification(recentlyEditedContent);
    this.addItemToRecentlyEdited(recentlyEditedContent);
  }

  /**
   * set modification date and modified by
   * @param baseCreatableContent
   */
  /// TODO enable marking ot update and dirty items.
  protected static markModification(
    baseCreatableContent: IBaseCreatableContent
  ): void {
    const currentUser = <string>(
      AppCacheModule.FlexSettings.loggedInUserFullName
    );
    DataUtils.updateIBaseCreatableContentProperties(
      baseCreatableContent as IRecentlyEditedContent,
      currentUser
    );
  }

  /**
   * add the data to recently edited mechanism
   * @param recentlyEditedContent
   */
  protected static addItemToRecentlyEdited(
    recentlyEditedContent: IRecentlyEditedContent
  ): void {
    // TODO update model cache data.
    // model.recentlyEditedItems.put(recentlyEditedContent.uniqueId,         GeneralFactory.getItemInstance(recentlyEditedContent));
    const item: ItemInstance|null = GeneralFactory.getItemInstance(
      recentlyEditedContent
    );
    if (item) {
      const existing = AppCacheModule.RecentItems.findIndex(x=> x.itemId === item.itemId)
      if(existing >-1){
        AppCacheModule.RecentItems.splice(existing,1)
      }
      AppCacheModule.InsertRecentItem(item);
    }
  }

  public static getNullSafeValueByPath(o: any, path: string): any {
    if (StringUtils.isNullOrEmpty(path)) {
      return o;
    }

    if (o != null && o instanceof Object) {
      if (path.split(".").length > 1) {
        const currentField: string = path.substr(0, path.indexOf("."));

        if (o.hasOwnProperty(currentField)) {
          const nextPath: string = path.substring(
            path.indexOf(".") + 1,
            path.length
          );

          return DataUtils.getNullSafeValueByPath(o[currentField], nextPath);
        }
      }

      return o.hasOwnProperty(path) ? o[path] : null;
    }

    return null;
  }

  public static convertToSystemName(
    name: string,
    suffix: string | null = null,
    doNotAddCsePrefix = false,
    prefix: string | null = null
  ): string {
    if(StringUtils.isNullOrEmpty(name)) {
      return '';
    }

    if (!StringUtils.isNullOrEmpty(suffix)) {
      name += "_" + suffix;
    }

    if (!StringUtils.isNullOrEmpty(prefix)) {
      name = prefix + "_" + name;
    }

    return DataUtils.convertToSystemOrClassName(name, false, doNotAddCsePrefix);
  }

  private static convertToSystemOrClassName(
    name: string,
    isClass: boolean,
    doNotAddCsePrefix = false
  ): string {
    let result = "";
    
    if (!name || name == "") {
      return result;
    }

    result = name.replace(/\W|/g, "");

    if (isClass) {
      result =
        result.charAt(0).toUpperCase() + result.substring(1, result.length);
    } else {
      // check if two upper case letters in a row
      if (
        result.length > 1 &&
        result.charAt(0).toUpperCase() === result.charAt(0) &&
        result.charAt(1).toUpperCase() === result.charAt(1)
      ) {
        result = result.charAt(0) + result.substring(1, result.length);
      } else {
        result =
          result.charAt(0).toLowerCase() + result.substring(1, result.length);
      }
    }

    return isClass || result.indexOf("cse_") >= 0 || doNotAddCsePrefix
      ? result
      : "cse_" + result;
  }

  public static addEntityIcon(
    node: Node,
    iconType: number,
    secondaryTooltip: string | null = null,
    isVirtual = false
  ): void {
    const icon: Icon = new Icon();
    switch (iconType) {
      case Node.SECONDARY_ICON_ID:
        icon.source = Node.SECONDARY_ICON;
        icon.tooltip = secondaryTooltip;
        break;
      default:
        icon.source = isVirtual ? Node.PRIMARY_VIRTUAL_ICON : Node.PRIMARY_ICON;
        icon.tooltip = node.tooltip;
        break;
    }
    node.icons.push(icon);
  }

  public static getRowFilter(
    tableName: string | null,
    cseTable: boolean
  ): string {
    if (cseTable) {
      return (
        "(select tbl.state from " +
        tableName +
        " tbl where tbl.id = refObjectId) = 1"
      );
    } else {
      return "State = 1";
    }
  }

  public static convertToRefColumnManyToMany(
    name: string,
    type: string,
    entity: Entity,
    propertyDisplayName: string,
    isLookupEntityOutOfTheBox: boolean
  ): string {
    // This is used to avoid having the same column name for both column in the refTable in the DB
    // when creating a multi lookup property of a certain entity on the same entity.
    
    let fixedName: string = name;

    if (entity != null && name == entity.displayName) {
      fixedName = propertyDisplayName + " " + name;
    }

    return DataUtils.convertToColumnName(
      fixedName,
      type,
      entity.outOfTheBox && !isLookupEntityOutOfTheBox
    );
  }

  public static convertToColumnName(
    name: string,
    type: string,
    outOfTheBox = false
  ): string {
    if (type == DataTypeFactory.YES_NO) {
      return "Is" + DataUtils.convertToClassName(name);
    } else if (
      type == DataTypeFactory.LOOKUP ||
      type == DataTypeFactory.TABLE ||
      type == DataTypeFactory.MULTI_LOOKUP
    ) {
      if (
        (type == DataTypeFactory.TABLE ||
          type == DataTypeFactory.MULTI_LOOKUP) &&
        outOfTheBox
      ) {
        return "refCse" + DataUtils.convertToClassName(name) + "id";
      } else {
        return "ref" + DataUtils.convertToClassName(name) + "id";
      }
    } else {
      return DataUtils.convertToClassName(name);
    }
  }

  public static convertToClassName(name: string): string {
    return DataUtils.convertToSystemOrClassName(name, true);
  }

  public static convertToRefTable(
    first: string,
    second: string,
    propertyDisplayName: string
  ): string {
    
    return (
      "CseRef" +
      DataUtils.convertToClassName(first) +
      "s" +
      DataUtils.convertToClassName(second) +
      "s" +
      DataUtils.convertToSystemName(propertyDisplayName)
    );
  }
}
