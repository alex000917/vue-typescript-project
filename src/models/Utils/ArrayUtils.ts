import { DataUtils } from "./DataUtils"
import { KeyValue } from "@/models/KeyValue"
import { Node } from "@/models/Node"

export class ArrayUtils {
  // --------------------------------------------------------------------------
  //
  //  Class methods
  //
  // --------------------------------------------------------------------------

  /**
   *  Joins two arrays together
   *  arr2 will be added at the end of arr1 and will returned an unified array
   *
   *  @param arr1
   *  @param arr2
   *
   *  @return An Array. If the original Object is already an Array,
   *  the original Array is returned. Otherwise, a new Array whose
   *  only element is the Object is returned or an empty Array if
   *  the Object was null.
   *
   */
  public static joinArrays(arr1: any[], arr2: any[]): any[] {
    if (arr1 == null || arr2 == null) return []

    return arr1.concat(arr2)
  }

  /**
   * returns an object in a collection by a path value
   *
   * @param collection
   * @param path
   * @param value
   * @return
   */
  public static getElementByValue(
    collection: any[],
    path: string,
    value: any
  ): Object | null {
    if (collection != null) {
      for (const object of collection) {
        if (DataUtils.getNullSafeValueByPath(object, path) === value) {
          return object
        }
      }
    }

    return null
  }

  /**
   * returns true if the given object in is in the collection - searching by path
   *
   * @param collection
   * @param path
   * @param value
   * @return
   */
  public static containsByValue(
    collection: any[],
    path: string,
    value: Object
  ): boolean {
    return ArrayUtils.getElementByValue(collection, path, value) != null
  }

  /**
   *
   * @param sortBy
   * @param sourceArray
   */
  public static sortArrayCollectionByText(sortBy: string, sourceArray: any[]): any[] {
    const resultArray: any[] = sourceArray.sort(ArrayUtils.dynamicSort(sortBy))
    return resultArray
  }

  public static dynamicSort(property: string) {
    let sortOrder = 1

    if (property[0] === "-") {
      sortOrder = -1
      property = property.substr(1)
    }

    return function(a:any, b:any) {
      if (sortOrder === -1) {
        return b[property].localeCompare(a[property])
      } else {
        return a[property].localeCompare(b[property])
      }
    }
  }

  /**
   * returns value at index for Array or IList
   *
   * @param collection - Array / IList
   * @param index
   * @param fieldName
   * @return
   */
  public static getItemAt(
    collection: Object,
    index: number,
    fieldName: string | null = null
  ): any {
    if (collection instanceof Array) {
      const o: any = collection instanceof Array ? collection[index] : null

      return DataUtils.getNullSafeValueByPath(o, fieldName as string)
    } else {
      throw new Error(
        "WRONG_PARAMETER_TYPE" +
          " - collection is not instance of Array or IList"
      )
    }
  }

  /**
   *
   * @param arrayCollection
   * @return
   */
  public static isArrayCollectionNullOrEmpty(arrayCollection: any[]): boolean {
    return arrayCollection == null || arrayCollection.length === 0
  }

  /**
   *
   * @param a
   * @param b
   * @return
   */
  public static isEquals(a: [], b: []): boolean {
    if (a.length !== b.length) return false

    for (let i = 0; i < a.length; i++) {
      const itemA: any = a[i]
      const itemB: any = b[i]
      if (itemA !== itemB) {
        return false
      } else if (itemA instanceof Array && itemB instanceof Array) {
        if (!ArrayUtils.isEquals(itemA as [], itemB as [])) {
          return false
        }
      }
    }

    return true
  }

  /**
   * this function is for unique purposes only!
   * it sorts the array collection and returns a new sorted array collection with the default(!) compare function
   *
   * @param collection
   * @param sortFieldName
   * @return
   */
  public static getSortedCollection(
    collection: [],
    sortFieldName: string,
    sortDescending = false,
    compareFunctions: Function |null = null
  ): [] {
    const tempArrayCollection: [] = []

    // copying the original array so we won't affect it.
    tempArrayCollection.push(...collection)

    // reset collection
    collection = []
    collection.push(...tempArrayCollection.sort(this.dynamicSort(sortFieldName)))

    return collection
  }

  //   /**
  //    * changes the item location from on ecollection to the other
  //    *
  //    *
  //    * @param item
  //    * @param sourceCollection
  //    * @param targetCollection
  //    * @param newIndex
  //    * @return
  //    */
  //   public static switchItemCollection(
  //     item: Object,
  //     sourceCollection: [],
  //     targetCollection: [],
  //     newIndex: number
  //   ): void {
  //     if (
  //       sourceCollection == targetCollection &&
  //       newIndex > sourceCollection.getItemIndex(item)
  //     ) {
  //       newIndex--;
  //     }

  //     sourceCollection.removeItemAt(sourceCollection.getItemIndex(item));

  //     targetCollection.addItemAt(item, newIndex);
  //   }

  /**
   *
   * @param arrayCollection
   * @return
   */
  public static initArrayCollection(
    arrayCollection: [],
    clear = true
  ): [] {
    if (arrayCollection == null) {
      arrayCollection = []
    } else if (clear) {
      arrayCollection = []
    }

    return arrayCollection
  }

  /**
   * returns a new instance of ArrayCollection without the duplicated values
   *
   * @param list
   * @param checkDuplicatedByPath
   * @return
   */
  public static removeDuplicates(
    list: any[],
    checkDuplicatedByPath: string | null = null
  ): any[] | null {
    if (list == null) {
      return null
    }

    const filteredCollection: any[] = []

    const filteredDictionary: Map<any, any> = new Map<any, any>()

    for (let i = 0; i < list.length; i++) {
      if (checkDuplicatedByPath != null) {
        const key = DataUtils.getNullSafeValueByPath(
          list[i],
          checkDuplicatedByPath
        )
        filteredDictionary.set(key, list[i])
      } else {
        filteredDictionary.set(list[i], list[i])
      }
    }

    for (const object of filteredDictionary) {
      filteredCollection.push(object)
    }

    return filteredCollection
  }

  /**
   *
   * @param selectedItems
   * @return
   */
  public static vector2ArrayCollection(selectedItems: any[]): any[] {
    const arrayCollection: any[] = []

    for (const item of selectedItems) {
      arrayCollection.push(item)
    }

    return arrayCollection
  }

  /**
   *
   * @param collection
   * @param value
   */
  public static addUnique(collection: any[], value: any): void {
    if (collection.findIndex(x => x === value) > -1) {
      collection.push(value)
    }
  }

  /**
   *
   * @param list
   * @param item
   */
  public static remove(list: any[], item: any): void {
    list.splice(
      list.findIndex(x => x === item),
      1
    )
  }

  public static getValueListByKey(collection: any, key: string) {
    return collection.reduce((total: [], item: any) => {
      return [...total, item[key]]
    }, [])
  }

  /**
   *
   * @param collection
   * @param item
   */
  public static getIndex(collection: any[], item: any) {
    if (!item) return -1
    return collection.findIndex(x => x.systemName === item.systemName)
  }

  // public static getListFromNode(entityId: string | null = null): KeyValue[] {
  //   const authorizations: KeyValue[] = []
  //   if (!entityId) return authorizations

  //   const getNodesList = (node: Node | null): void => {
  //     if (!node) {
  //       return
  //     }

  //     if (node.branch === false) {
  //       authorizations.push(new KeyValue(node.name, node.id))
  //     }

  //     if (node.children.length > 0) {
  //       node.children.forEach(n => {
  //         getNodesList(n)
  //       })
  //     }
  //   }

  //   return authorizations
  // }
}
