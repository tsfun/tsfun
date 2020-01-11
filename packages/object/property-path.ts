type Key = string | symbol | number

export function getPropertyPath (object: any, path: readonly Key[]): any {
  if (!path.length) return object
  if (object === undefined || object === null) return undefined

  const [key, ...rest] = path

  return key in object
    ? getPropertyPath(object[key], rest)
    : undefined
}

export function setPropertyPath (object: any, path: readonly Key[], value: any): any {
  if (!path.length) return value
  if (object === undefined || object === null) return setPropertyPath({}, path, value)

  const [key, ...nextPath] = path
  const { [key]: nextTarget, ...cloned } = object
  cloned[key] = setPropertyPath(nextTarget, nextPath, value)
  return cloned
}

export function deletePropertyPath (object: any, path: readonly Key[]): any {
  if (!path.length || object === undefined || object === null) return undefined

  const [key, ...nextPath] = path
  const { [key]: nextTarget, ...cloned } = object

  if (!nextPath.length) return cloned

  return {
    ...cloned,
    [key]: deletePropertyPath(nextTarget, nextPath)
  }
}
