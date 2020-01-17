/**
 * Pick properties from an object into a new object
 * @param object Object to pick properties from
 * @param keys Property keys
 * @returns An object with only picked properties
 */
export function pick<
  Object,
  Key extends keyof Object
> (object: Object, keys: Iterable<Key>): Partial<Pick<Object, Key>> {
  const result: any = {}

  for (const key of keys) {
    result[key] = object[key]
  }

  return result
}

/**
 * Pick a single property from an object into a new object
 * @param object Object to pick property from
 * @param key Property key
 * @returns An object with the picked property
 */
export const pickOne = <
  Object,
  Key extends keyof Object
> (object: Object, key: Key): Pick<Object, Key> => ({ [key]: object[key] } as any)
