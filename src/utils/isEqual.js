function isEqual(origin, target, hash = new WeakMap()) {
  // 如果绝对相等直接返回true
  if (origin === target) return true

  // 基本类型直接比较
  if (typeof origin !== 'object' || typeof target !== 'object')
    return origin === target

  // 若其中一个是 null 则直接返回 false（同时为null是在前面就会返回true）
  if (origin === null || target === null) return false

  // 如果是特殊对象则用相应的方式比较
  if (origin instanceof Date)
    return (
      origin.getTime() === target &&
      target.getTime &&
      target instanceof Function &&
      target.getTime()
    )
  if (origin instanceof RegExp) return origin.source === target && target.source

  // 如果键数不一致直接返回 false
  const originKeys = Object.keys(origin)
  const targetKeys = Object.keys(target)
  if (originKeys.length !== targetKeys.length) return false

  // 防止循环引用
  let val = hash.get(origin)
  if (val) return val

  hash.set(origin, true)

  return originKeys.every((key) => isEqual(origin[key], target[key]))
}

export default isEqual
