import { Input } from "element-ui"
import { ArrayUtils } from "./ArrayUtils"
import { DataUtils } from "./DataUtils"
import { ObjectUtils } from "./ObjectUtils"
import { StringUtil } from "./StringUtil"

export class StringUtils {
  /**
     *
     * @param value
     * @param delim
     * @return
     */
  public static swapString(value:string, delim:any):string {
    const arr:any[] = value.split(delim)
    if (arr[0] && arr[1]) { return arr[1] + delim + arr[0] }
    return value
  }

  /**
     *
     * @param input
     * @param char
     * @return
     *
     */
  public static getStringAfter(input:string, char:any):string {
    let result:string = input
    let index = 0

    if ((index = input.indexOf(char)) != -1) { result = input.substring(index + 1, input.length) }

    return result
  }

  /**
     * Check if the string begins with the pattern
     */
  public static beginsWith(string:string, pattern:string):boolean {
    if (!string) {
      return false
    }

    string = string.toLowerCase()
    pattern = pattern.toLowerCase()

    return pattern == string.substr(0, pattern.length)
  }

  /**
     *
     * @param string
     * @param searchStr
     * @return
     */
  public static contains(string:string, searchStr:string):boolean {
    const regExp = new RegExp(searchStr, "i")

    return regExp.test(string)
  }

  /**
     *
     * @param string
     * @param pattern
     * @return
     */
  public static anyWordBeginsWith(string:string, pattern:string):boolean {
    if (!string) {
      return false
    }

    if (StringUtils.beginsWith(string, pattern)) {
      return true
    }

    // check to see if one of the words in the string is a match
    const words:any[] = string.split(" ")

    for (const word of words) {
      if (StringUtils.beginsWith(word, pattern)) {
        return true
      }
    }

    return false
  }

  /**
     *
     * @param string
     * @return
     */
  public static capitalize(string:string):string {
    return string.charAt(0).toUpperCase() + string.substring(1, string.length)
  }

  /**
     *
     * @param string
     * @return
     */
  public static capitalizeWords(string:string):string {
    const origWords:any[] = string.split(" ")
    const newWords:any[] = []

    for (const word of origWords) {
      newWords.push(StringUtils.capitalize(word))
    }

    return newWords.join(" ")
  }

  /**
     *
     * @param string
     * @return
     */
  public static unCapitalize(string:string):string {
    return string.charAt(0).toLowerCase() + string.substring(1, string.length)
  }

  /**
     * This will convert a string to const upper case (ie, ringGroup becomes RING_GROUP)
     */
  public static toConstUpperCase(string:string):string {
    let newString = ""

    for (let x = 0; x < string.length; x++) {
      const char:string = string.charAt(x)

      // is letter upper case
      if (char.charCodeAt(x) <= 90 && newString.length > 0) {
        newString += "_"
      }

      newString += char
    }

    return newString.toUpperCase()
  }

  /**
     *
     * @param string
     * @return
     */
  public static getFirstWord(string:string):string {
    let newString = ""

    for (let x = 0; x < string.length; x++) {
      const char:string = string.charAt(x)

      // is letter upper case
      if (char.charCodeAt(x) <= 90 && newString.length > 0) {
        return newString
      }

      newString += char
    }

    return newString
  }

  /**
     * This will separate the words in a camel caps string (ie, ringGroup becomes Ring Group)
     */
  public static separateWords(string:string):string {
    let newString = ""

    for (let x = 0; x < string.length; x++) {
      const char:string = string.charAt(x)

      // is letter upper case
      if (char.charCodeAt(x) <= 90 && newString.length > 0) {
        newString += " "
      }

      newString += char
    }

    return StringUtils.capitalizeWords(newString.toLowerCase())
  }

  /**
     *
     * @param string
     * @return
     */
  public static toCamelCaps(string:string):string {
    let returnStr = ""
    const words:any[] = string.split("_")

    for (let index = 0; index < words.length; index++) {
      let word:string = words[index]
      word = word.toLowerCase()

      if (index > 0) {
        word = StringUtils.capitalize(word)
      }

      returnStr += word
    }

    return returnStr
  }

  /* given a string it will return true, iff it is "true", everything else will be false */
  public static toBoolean(value:string):boolean {
    value = value.toLowerCase()

    if (value == "true" || value == "yes") {
      return true
    }

    return false
  }

  /**
     *
     * @param value
     * @return
     */
  public static trimCommas(value:string):string {
    value = StringUtil.trim(value)

    while (value.length > 0 && value.charAt(0) == ",") {
      value = value.substring(1, value.length)
    }

    while (value.length > 0 && value.charAt(value.length - 1) == ",") {
      value = value.substring(0, value.length - 1)
    }

    return value
  }

  /**
     *
     * @param a
     * @return
     */
  private static isNumber(a:string):boolean {
    return (a >= "0" && a <= "9")
  }

  /**
     *
     * @param a
     * @param b
     * @return
     */
  public static stringAndNumericCompare(a:string, b:string):number {
    if (a && !b) return 1
    if (!a && b) return -1
    if (!a && !b) return 0
    if (a == b) { return 0 }

    if (a.length < b.length) { return -1 } else { return 1 }
  }

  /**
     *
     * @param input
     * @return
     */
  public static getTextIfNotNullOrEmpty(input:Input):string|null {
    if (input != null && input.value != "") {
      return input.value as string
    }

    return null
  }

  /*  sprintf(3) implementation in ActionScript 3.0.
     *
     *  http://www.die.net/doc/linux/man/man3/sprintf.3.html
     *
     *  The following flags are supported: '#', '0', '-', '+'
     *
     *  Field widths are fully supported.  '*' is not supported.
     *
     *  Precision is supported except one difference from the standard: for an
     *  explicit precision of 0 and a result string of "0", the output is "0"
     *  instead of an empty string.
     *
     *  Length modifiers are not supported.
     *
     *  The following conversion specifiers are supported: 'd', 'i', 'o', 'u', 'x',
     *  'X', 'f', 'F', 'c', 's', '%'
     *
     *  Report bugs to manish.jethani@gmail.com
     */
  public static sprintf(format:string, ...args: any[]):string {
    let result = ""

    const length:number = format.length
    for (let i = 0; i < length; i++) {
      let c:string = format.charAt(i)

      if (c == "%") {
        let pastFieldWidth = false
        let pastFlags = false

        let flagAlternateForm = false
        let flagZeroPad = false
        let flagLeftJustify = false
        let flagSpace = false
        let flagSign = false

        let fieldWidth = ""
        let precision = ""

        c = format.charAt(++i)

        while (c != "d" &&
                  c != "i" &&
                  c != "o" &&
                  c != "u" &&
                  c != "x" &&
                  c != "X" &&
                  c != "f" &&
                  c != "F" &&
                  c != "c" &&
                  c != "s" &&
                  c != "%") {
          if (!pastFlags) {
            if (!flagAlternateForm && c == "#") { flagAlternateForm = true } else if (!flagZeroPad && c == "0") { flagZeroPad = true } else if (!flagLeftJustify && c == "-") { flagLeftJustify = true } else if (!flagSpace && c == " ") { flagSpace = true } else if (!flagSign && c == "+") { flagSign = true } else { pastFlags = true }
          }

          if (!pastFieldWidth && c == ".") {
            pastFlags = true
            pastFieldWidth = true

            c = format.charAt(++i)
            continue
          }

          if (pastFlags) {
            if (!pastFieldWidth) { fieldWidth += c } else { precision += c }
          }

          c = format.charAt(++i)
        }

        let capitalise = false
        var next:any
        var str:string
        switch (c) {
          case "d":
          case "i":
            next = args.shift()
            str = String(Math.abs(Number(next)))

            if (precision != "") { str = StringUtils.leftPad(str, Number(precision), "0") }

            if (Number(next) < 0) { str = "-" + str } else if (flagSign && Number(next) >= 0) { str = "+" + str }

            if (fieldWidth != "") {
              if (flagLeftJustify) { str = StringUtils.rightPad(str, Number(fieldWidth)) } else if (flagZeroPad && precision == "") { str = StringUtils.leftPad(str, Number(fieldWidth), "0") } else { str = StringUtils.leftPad(str, Number(fieldWidth)) }
            }

            result += str
            break

          case "o":
            next = args.shift()
            str = Number(next).toString(8)

            if (flagAlternateForm && str != "0") { str = "0" + str }

            if (precision != "") { str = StringUtils.leftPad(str, Number(precision), "0") }

            if (fieldWidth != "") {
              if (flagLeftJustify) { str = StringUtils.rightPad(str, Number(fieldWidth)) } else if (flagZeroPad && precision == "") { str = StringUtils.leftPad(str, Number(fieldWidth), "0") } else { str = StringUtils.leftPad(str, Number(fieldWidth)) }
            }

            result += str
            break

          case "u":
            next = args.shift()
            str = Number(next).toString(10)

            if (precision != "") { str = StringUtils.leftPad(str, Number(precision), "0") }

            if (fieldWidth != "") {
              if (flagLeftJustify) { str = StringUtils.rightPad(str, Number(fieldWidth)) } else if (flagZeroPad && precision == "") { str = StringUtils.leftPad(str, Number(fieldWidth), "0") } else { str = StringUtils.leftPad(str, Number(fieldWidth)) }
            }

            result += str
            break

          case "X":
            capitalise = true
          case "x":
            next = args.shift()
            str = Number(next).toString(16)

            if (precision != "") { str = StringUtils.leftPad(str, Number(precision), "0") }

            var prepend:boolean = flagAlternateForm && Number(next) != 0

            if (fieldWidth != "" && !flagLeftJustify &&
                      flagZeroPad && precision == "") {
              str = StringUtils.leftPad(str, prepend
                ? Number(fieldWidth) - 2 : Number(fieldWidth), "0")
            }

            if (prepend) { str = "0x" + str }

            if (fieldWidth != "") {
              if (flagLeftJustify) { str = StringUtils.rightPad(str, Number(fieldWidth)) } else { str = StringUtils.leftPad(str, Number(fieldWidth)) }
            }

            if (capitalise) { str = str.toUpperCase() }

            result += str
            break

          case "f":
          case "F":
            next = args.shift()
            str = Math.abs(Number(next)).toFixed(
              precision != "" ? Number(precision) : 6)

            if (Number(next) < 0) { str = "-" + str } else if (flagSign && Number(next) >= 0) { str = "+" + str }

            if (flagAlternateForm && str.indexOf(".") == -1) { str += "." }

            if (fieldWidth != "") {
              if (flagLeftJustify) { str = StringUtils.rightPad(str, Number(fieldWidth)) } else if (flagZeroPad && precision == "") { str = StringUtils.leftPad(str, Number(fieldWidth), "0") } else { str = StringUtils.leftPad(str, Number(fieldWidth)) }
            }

            result += str
            break

          case "c":
            next = args.shift()
            str = String.fromCharCode(Number(next))

            if (fieldWidth != "") {
              if (flagLeftJustify) { str = StringUtils.rightPad(str, Number(fieldWidth)) } else { str = StringUtils.leftPad(str, Number(fieldWidth)) }
            }

            result += str
            break

          case "s":
            next = args.shift()
            str = String(next)

            if (precision != "") { str = str.substring(0, Number(precision)) }

            if (fieldWidth != "") {
              if (flagLeftJustify) { str = StringUtils.rightPad(str, Number(fieldWidth)) } else { str = StringUtils.leftPad(str, Number(fieldWidth)) }
            }

            result += str
            break

          case "%":
            result += "%"
        }
      } else {
        result += c
      }
    }

    return result
  }

  // Private functions

  /**
     *
     * @param source
     * @param targetLength
     * @param padChar
     * @return
     */
  private static leftPad(source:string, targetLength:number, padChar = " "):string {
    if (source.length < targetLength) {
      let padding = ""

      while (padding.length + source.length < targetLength) { padding += padChar }

      return padding + source
    }

    return source
  }

  /**
     *
     * @param source
     * @param targetLength
     * @param padChar
     * @return
     */
  private static rightPad(source:string, targetLength:number, padChar = " "):string {
    while (source.length < targetLength) { source += padChar }

    return source
  }

  /**
     *
     * @param string
     * @param searchStr
     * @return
     */
  public static highlightMatch(string:string, searchStr:string, includeUnderline = true):string {
    const searchStrPattern:string = "(" + searchStr + ")"
    const regExp = new RegExp(searchStrPattern, "igm")
    const returnStr:string = includeUnderline ? string.replace(regExp, "<b><u>$1</u></b>") : string.replace(regExp, "<b>$1</b>")

    return returnStr
  }

  /**
     * return true if input string is null or == ""
     */
  public static isNullOrEmpty(inputString:string|null):boolean {
    if (!inputString || inputString === null) {
      return true
    }

    if (inputString == "") {
      return true
    }

    return false
  }

  /**
     * <p>Abbreviates a String using ellipses. This will turn
     * "Now is the time for all good men" into "...is the time for..."</p>
     *
     * <p>Works like <code>abbreviate(String, int)</code>, but allows you to specify
     * a "left edge" offset.  Note that this left edge is not necessarily going to
     * be the leftmost character in the result, or the first character following the
     * ellipses, but it will appear somewhere in the result.</p>
     *
     * <p>In no case will it return a String of length greater than
     * <code>maxWidth</code>.</p>
     *
     * <pre>
     * StringUtils.abbreviate(null, *, *)                = null
     * StringUtils.abbreviate("", 0, 4)                  = ""
     * StringUtils.abbreviate("abcdefghijklmno", -1, 10) = "abcdefg..."
     * StringUtils.abbreviate("abcdefghijklmno", 0, 10)  = "abcdefg..."
     * StringUtils.abbreviate("abcdefghijklmno", 1, 10)  = "abcdefg..."
     * StringUtils.abbreviate("abcdefghijklmno", 4, 10)  = "abcdefg..."
     * StringUtils.abbreviate("abcdefghijklmno", 5, 10)  = "...fghi..."
     * StringUtils.abbreviate("abcdefghijklmno", 6, 10)  = "...ghij..."
     * StringUtils.abbreviate("abcdefghijklmno", 8, 10)  = "...ijklmno"
     * StringUtils.abbreviate("abcdefghijklmno", 10, 10) = "...ijklmno"
     * StringUtils.abbreviate("abcdefghijklmno", 12, 10) = "...ijklmno"
     * StringUtils.abbreviate("abcdefghij", 0, 3)        = IllegalArgumentException
     * StringUtils.abbreviate("abcdefghij", 5, 6)        = IllegalArgumentException
     * </pre>
     *
     * @param str  the String to check, may be null
     * @param offset  left edge of source String
     * @param maxWidth  maximum length of result String, must be at least 4
     * @return abbreviated String, <code>null</code> if null String input
     * @throws IllegalArgumentException if the width is too small
     */
  public static abbreviate(str:string, offset:number, maxWidth:number):string {
    if (str == null) {
      return str
    }

    if (maxWidth < 4) {
      throw new Error("Minimum abbreviation width is 4")
    }

    if (str.length <= maxWidth) {
      return str
    }

    if (offset > str.length) {
      offset = str.length
    }

    if ((str.length - offset) < (maxWidth - 3)) {
      offset = str.length - (maxWidth - 3)
    }

    if (offset <= 4) {
      return str.substring(0, maxWidth - 3) + "..."
    }

    if (maxWidth < 7) {
      throw new Error("Minimum abbreviation width with offset is 7")
    }

    if ((offset + (maxWidth - 3)) < str.length) {
      return "..." + StringUtils.abbreviate(str.substring(offset), 0, maxWidth - 3)
    }
    return "..." + str.substring(str.length - (maxWidth - 3))
  }

  /**
     *
     * @param collection
     * @param fieldName
     * @param delimiter
     * @param offset
     * @return
     */
  public static collectionToString(collection:any, fieldName:string|null = null
    , delimiter = "", offset = 0):string|null {
    if (collection == null || collection.length == 0) {
      return null
    }

    let value:string = DataUtils.getNullSafeValueByPath(ArrayUtils.getItemAt(collection, offset)
      , fieldName as string)

    for (let i:number = offset + 1; i < collection.length; i++) {
      const o:Object = collection[i]

      value += delimiter + DataUtils.getNullSafeValueByPath(o, fieldName as string)
    }
    return value
  }

  /**
     * Counts the number of upper-case letters in the given string.
     *
     * @param input - string to count
     * @return
     */
  public static countUpperCaseLetters(input:string):number {
    let upperCaseCount = 0

    for (let i = 0; i < input.length; i++) {
      const char:string = input.charAt(i)

      if (StringUtils.isUpperCase(char)) {
        upperCaseCount++
      }
    }

    return upperCaseCount
  }

  /**
     Determines if String is only comprised of lower case letters.

     @param source: String to check.
     @return Returns <code>true</code> if String is only lower case characters; otherwise <code>false</code>.
     @usageNote This function counts numbers, spaces, punctuation and special characters as lower case.
     */
  public static isLowerCase(source:string):boolean {
    if (source != source.toLowerCase()) { return false }

    return true
  }

  /**
     Determines if String is only comprised of upper case letters.

     @param source: String to check.
     @return Returns <code>true</code> if String is only upper case characters; otherwise <code>false</code>.
     @usageNote This function counts numbers, spaces, punctuation and special characters as upper case.
     */
  public static isUpperCase(source:string):boolean {
    if (source != source.toUpperCase()) { return false }

    return true
  }

  /**
     * @param str
     * @return
     */
  public static convertStringToHtmlChars(str:string):string {
    if (str == null) return ""

    return str.replace(/&/g, "&amp;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
  }
}
