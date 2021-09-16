function cloneDeep(obj, hash = new WeakMap()) {
  if (obj == null) return obj
  if (typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)

  let val = hash.get(obj)
  if (val) return val

  let cloneObj = new obj.constructor()

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloneObj[key] = cloneDeep(obj[key], hash)
      hash.set(obj, cloneObj)
    }
  }
  return cloneObj
}

export default cloneDeep
