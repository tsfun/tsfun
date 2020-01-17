/**
 * Creates a shallow clone of an object without certain properties
 * @param object Object to omit properties
 * @param keys Property keys to not include
 * @returns A shallow clone of `object` but without `keys`
 */
export function omit<
  Object,
  Key extends keyof Object
> (object: Object, keys: Iterable<Key>): Omit<Object, Key> & Partial<Pick<Object, Key>> {
  const result = { ...object }

  for (const key of keys) {
    delete result[key]
  }

  return result
}

/**
 * Creates a shallow clone of an object without one property
 * @param object Object to omit property
 * @param key Property key to not include
 * @returns A shallow clone of `object` but without `key`
 */
export function omitOne<
  Object,
  Key extends keyof Object
> (object: Object, key: Key): Omit<Object, Key> {
  const { [key]: _, ...result } = object
  return result
}
