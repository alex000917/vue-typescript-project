export const CreateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0
    const v = c == "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const getUniqueList = (
  inputData: any[],
  keyName: string,
  valueName: string
) => {
  const rs: any[] = []

  inputData
    .filter(
      (thing, i, arr) => arr.findIndex(t => t[keyName] === thing[keyName]) === i
    )
    .forEach(x => {
      rs.push({ key: x[keyName], value: x[valueName] })
    })

  return rs
}

/// example var result = deepSearch(myObject, 'id', (k, v) => v === 1);
export const deepSearch = (object: any, key: any, predicate: any):any => {
  if (object.hasOwnProperty(key) && predicate(key, object[key]) === true) { return object }

  for (let i = 0; i < Object.keys(object).length; i++) {
    const value = object[Object.keys(object)[i]]
    if (typeof value === "object" && value != null) {
      const o = deepSearch(object[Object.keys(object)[i]], key, predicate)
      if (o != null) return o
    }
  }
  return null
}
