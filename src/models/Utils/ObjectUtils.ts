export class ObjectUtils {
  /**
     * @private
     */
  constructor() {
  }

  /**
     * Returns whether or not the given object is simple data type.
     *
     * @param the object to check
     * @return true if the given object is a simple data type; false if not
     */
  public static isSimple(object:Object):boolean {
    switch (typeof (object)) {
      case "number":
      case "string":
      case "boolean":
        return true
      case "object":
        return (object instanceof Date) || (object instanceof Array)
    }

    return false
  }

  /**
     * Returns an array with the keys of this object.
     */
  public static getKeys(object:any):any[] {
    const result:any[] = []

    for (const k of object) {
      result.push(k)
    }
    return result
  }

  /**
     * Returns the number of properties in the given object.
     *
     * @param object the object for which to get the number of properties
     * @return the number of properties in the given object
     */
  public static getNumProperties(object:any):number {
    let result = 0

    for (const p in object) {
      result++
    }
    return result
  }

  /**
     * Returns an array with the properties of the given object.
     */
  public static getProperties(object:any):any[] {
    const result:any[] = []

    for (const p of object) {
      result.push(p)
    }
    return result
  }

  /**
     *
     * @param original
     * @param useRecursion - if set to true - deep cloning is performed with full property recursion
     * @param excludedProperties
     * @return
     */
  public static clone(original:Object, useRecursion = false, excludedProperties:any[] = []):any {
    const currentTimeMillis:number = new Date().getMilliseconds()

    const clone:any = JSON.parse(JSON.stringify(original))

    //   if (useRecursion) {

    //     if (original == null) {

    //       clone = null;

    //     }
    //     else if (original instanceof Array) {

    //       clone = ObjectUtils.deepCloningIList(Array(original));

    //     }
    //     else {

    //       clone = ObjectUtils.deepCloning(original, excludedProperties);

    //     }

    //   }
    //   else {

    //     var byteArray:[] = [];
    //     byteArray.writeObject(original);
    //     byteArray.position = 0;
    //     clone = byteArray.readObject();

    //   }

    //   trace("object [" + ObjectUtils.getClass(original) + "] cloned in " + (new Date().getMilliseconds() - currentTimeMillis) + " milliseconds");

    return clone
  }

  /**
     *
     * @param original
     * @param excludedProperties
     * @param endlessRecursionPreventionExclusion
     * @return
     */
  private static deepCloning(original:Object, excludedProperties:any[], endlessRecursionPreventionExclusion:Map<any, any> = new Map<string, any>()):Object {
    const clone:Object = JSON.parse(JSON.stringify(original))

    //   if (endlessRecursionPreventionExclusion == null) {

    //     endlessRecursionPreventionExclusion = new Map<any, any>();

    //   }

    //   var clone:Object = new (ObjectUtils.getClass(original))();

    //   endlessRecursionPreventionExclusion[original] = clone;

    //   var props:any[] = ReflectionUtils.getObjectPropertyNames(original, false, excludedProperties);

    //   // Check if it is Primitive type - and return the original if so
    //   if (props == null || props.length == 0) {
    //     return original;
    //   }

    //   for (let prop of props) {

    //     var originalPropertyValue:any = original[prop.localName];

    //     if (originalPropertyValue instanceof Object && !(originalPropertyValue instanceof Class) && getQualifiedClassName(originalPropertyValue).indexOf("com.msp.") >= 0) {

    //       if (endlessRecursionPreventionExclusion[originalPropertyValue] == undefined) {

    //         clone[prop.localName] = ObjectUtils.deepCloning(originalPropertyValue, null, endlessRecursionPreventionExclusion);

    //       }
    //       else {

    //         clone[prop.localName] = endlessRecursionPreventionExclusion[originalPropertyValue];

    //       }

    //     }
    //     else if (originalPropertyValue instanceof IList) {

    //       clone[prop.localName] = ObjectUtils.deepCloningIList(originalPropertyValue, endlessRecursionPreventionExclusion);

    //     }

    //     else {

    //       clone[prop.localName] = originalPropertyValue;

    //     }

    //   }

    return clone
  }

  /**
     *
     * @param original
     * @param endlessRecursionPreventionExclusion
     * @return
     */
  private static deepCloningIList(original:any, endlessRecursionPreventionExclusion:Map<any, any> = new Map<string, any>()):any {
    const cloneArrayCollection = JSON.parse(JSON.stringify(original))

    //   for  (let item of IList(original)) {

    //     if (item != null) {
    //       cloneArrayCollection.addItem(ObjectUtils.deepCloning(item, null, endlessRecursionPreventionExclusion));
    //     }

    //   }

    return cloneArrayCollection
  }

  /**
     *
     * @param baseContents
     * @return
     */
  public static cloneBaseContentArrayCollection(baseContents:[]):[] {
    const clonedBaseContents = JSON.parse(JSON.stringify(baseContents))

    return clonedBaseContents
  }

  /**
     *
     * @param obj
     * @return
     */
  public static getClass(obj:Object):Object {
    // return Class(getDefinitionByName(getQualifiedClassName(obj)));
    return typeof (obj)
  }

  /**
     *
     * @param a
     * @param b
     * @return
     */
  public static isEquivalent(a:Object, b:Object):boolean {
    // Create arrays of property names
    const aProps = Object.getOwnPropertyNames(a)
    const bProps = Object.getOwnPropertyNames(b)

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
      return false
    }

    for (const propName of aProps) {
      // If values of same property are not equal,
      // objects are not equivalent
      if (a[propName] !== b[propName]) {
        return false
      }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true
  }
}
