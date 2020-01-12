type Key = string | symbol | number

const isObject = (object: any): object is object => typeof object === 'object' && object

export function getPropertyPath (object: any, path: readonly Key[]): any {
  if (!path.length) return object
  if (!isObject(object)) return object

  const [key, ...rest] = path

  return key in object
    ? getPropertyPath((object as any)[key], rest)
    : undefined
}

export function setPropertyPath (object: any, path: readonly Key[], value: any): any {
  if (!path.length) return value
  if (!isObject(object)) return setPropertyPath({}, path, value)

  const [key, ...nextPath] = path
  const { [key]: nextTarget, ...cloned } = object as any
  cloned[key] = setPropertyPath(nextTarget, nextPath, value)
  return cloned
}

export function deletePropertyPath (object: any, path: readonly Key[]): any {
  if (!path.length) return undefined
  if (!isObject(object)) return object

  const [key, ...nextPath] = path
  const { [key]: nextTarget, ...cloned } = object as any

  if (!nextPath.length) return cloned

  return {
    ...cloned,
    [key]: deletePropertyPath(nextTarget, nextPath)
  }
}
