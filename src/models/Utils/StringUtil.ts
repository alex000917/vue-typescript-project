export class StringUtil {
  // --------------------------------------------------------------------------
  //
  //  Class methods
  //
  // --------------------------------------------------------------------------

  /**
     *  Removes all whitespace characters from the beginning and end
     *  of the specified string.
     *
     *  param str The string whose whitespace should be trimmed.
     *
     *  return Updated string where whitespace was removed from the
     *  beginning and end.

     */
  public static trim(str:string):string {
    if (str == null) return ""

    let startIndex = 0
    while (StringUtil.isWhitespace(str.charAt(startIndex))) { ++startIndex }

    let endIndex:number = str.length - 1
    while (StringUtil.isWhitespace(str.charAt(endIndex))) { --endIndex }

    if (endIndex >= startIndex) { return str.slice(startIndex, endIndex + 1) } else { return "" }
  }

  /**
     *  Removes all whitespace characters from the beginning and end
     *  of each element in an Array, where the Array is stored as a string.
     *
     *  param value The string whose whitespace should be trimmed.
     *
     *  param separator The string that delimits each Array element in the string.
     *
     *  return Updated string where whitespace was removed from the
     *  beginning and end of each element.
     *

     */
  public static trimArrayElements(value:string, delimiter:string):string {
    if (value != "" && value != null) {
      const items = value.split(delimiter)

      const len:number = items.length
      for (let i = 0; i < len; i++) {
        items[i] = StringUtil.trim(items[i])
      }

      if (len > 0) {
        value = items.join(delimiter)
      }
    }

    return value
  }

  /**
     *  Returns <code>true</code> if the specified string is
     *  a single space, tab, carriage return, newline, or formfeed character.
     *
     *  param str The string that is is being queried.
     *
     *  return <code>true</code> if the specified string is
     *  a single space, tab, carriage return, newline, or formfeed character.

     */
  public static isWhitespace(character:string):Boolean {
    switch (character) {
      case " ":
      case "\t":
      case "\r":
      case "\n":
      case "\f":
        return true

      default:
        return false
    }
  }

  /**
     *  Substitutes "{n}" tokens within the specified string
     *  with the respective arguments passed in.
     *
     *  param str The string to make substitutions in.
     *  This string can contain special tokens of the form
     *  <code>{n}</code>, where <code>n</code> is a zero based index,
     *  that will be replaced with the additional parameters
     *  found at that index if specified.
     *
     *  param rest Additional parameters that can be substituted
     *  in the <code>str</code> parameter at each <code>{n}</code>
     *  location, where <code>n</code> is an integer (zero based)
     *  index value into the array of values specified.
     *  If the first parameter is an array this array will be used as
     *  a parameter list.
     *  This allows reuse of this routine in other methods that want to
     *  use the ... rest signature.
     *  For example <pre>
     *     public  myTracer(str:string, ... rest):void
     *     {
     *         label.text += stringUtil.substitute(str, rest) + "\n";
     *     } </pre>
     *
     *  return New string with all of the <code>{n}</code> tokens
     *  replaced with the respective arguments specified.
     *
     *  example
     *
     *  var str:string = "here is some info '{0}' and {1}";
     *  trace(stringUtil.substitute(str, 15.4, true));
     *
     *  // this will output the following string:
     *  // "here is some info '15.4' and true"

     */
  public static substitute(str:string, ...rest:any):string {
    if (str == null) return ""

    // Replace all of the parameters in the msg string.
    let len:number = rest.length
    let args:[]
    if (len == 1 && rest[0] instanceof Array) {
      args = rest[0] as []
      len = args.length
    } else {
      args = rest
    }

    for (let i = 0; i < len; i++) {
      str = str.replace(new RegExp("\\{" + i + "\\}", "g"), args[i])
    }

    return str
  }

  /**
     *  Returns a string consisting of a specified string
     *  concatenated with itself a specified number of times.
     *
     *  param str The string to be repeated.
     *
     *  param n The repeat count.
     *
     *  return The repeated string.

     */
  public static repeat(str:string, n:number):string {
    if (n == 0) { return "" }

    let s:string = str
    for (let i = 1; i < n; i++) {
      s += str
    }
    return s
  }

  /**
     *  Removes "unallowed" characters from a string.
     *  A "restriction string" such as <code>"A-Z0-9"</code>
     *  is used to specify which characters are allowed.
     *  This method uses the same logic as the <code>restrict</code>
     *  property of TextField.
     *
     *  param str The input string.
     *
     *  param restrict The restriction string.
     *
     *  return The input string, minus any characters
     *  that are not allowed by the restriction string.

     */
  public static restrict(str:string, restrict:string):string {
    // A null 'restrict' string means all characters are allowed.
    if (restrict == null) { return str }

    // An empty 'restrict' string means no characters are allowed.
    if (restrict == "" || restrict === undefined) { return "" }

    // Otherwise, we need to test each character in 'str'
    // to determine whether the 'restrict' string allows it.
    const charCodes = []

    const n:number = str.length
    for (let i = 0; i < n; i++) {
      const charCode:number = str.charCodeAt(i)
      if (StringUtil.testCharacter(charCode, restrict)) { charCodes.push(charCode) }
    }

    return String.fromCharCode.apply(null, charCodes)
  }

  /**
     *  private
     *  Helper method used by restrict() to test each character
     *  in the input string against the restriction string.
     *  The logic in this method implements the same algorithm
     *  as in TextField's 'restrict' property (which is quirky,
     *  such as how it handles a '-' at the beginning of the
     *  restriction string).
     */
  private static testCharacter(charCode:number,
    restrict:string):Boolean {
    let allowIt:Boolean = false

    let inBackSlash:Boolean = false
    let inRange:Boolean = false
    let setFlag:Boolean = true
    let lastCode = 0

    const n:number = restrict.length
    let code:number

    if (n > 0) {
      code = restrict.charCodeAt(0)
      if (code == 94) // caret
      { allowIt = true }
    }

    for (let i = 0; i < n; i++) {
      code = restrict.charCodeAt(i)

      let acceptCode:Boolean = false
      if (!inBackSlash) {
        if (code == 45) // hyphen
        { inRange = true } else if (code == 94) // caret
        { setFlag = !setFlag } else if (code == 92) // backslash
        { inBackSlash = true } else { acceptCode = true }
      } else {
        acceptCode = true
        inBackSlash = false
      }

      if (acceptCode) {
        if (inRange) {
          if (lastCode <= charCode && charCode <= code) { allowIt = setFlag }
          inRange = false
          lastCode = 0
        } else {
          if (charCode == code) { allowIt = setFlag }
          lastCode = code
        }
      }
    }

    return allowIt
  }
}
