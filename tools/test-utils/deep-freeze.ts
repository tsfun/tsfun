function actualDeepFreeze<Value> (object: Value, visited: any[]): Value {
  Object.freeze(object)

  if (
    !object ||
    (typeof object !== 'object' && typeof object !== 'function') ||
    visited.includes(object)
  ) return object

  for (const value of Object.values(object)) {
    actualDeepFreeze(value, [...visited, object])
  }

  return object
}

export const deepFreeze = <Value> (object: Value) => actualDeepFreeze(object, [])
