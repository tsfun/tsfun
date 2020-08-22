import { SingleDict } from './utils/types'

/**
 * Create a function that accesses a particular key from an object
 * @param key Property key
 * @returns Function that accesses `[key]` of an object
 */
export const propertyOf = <Key extends string | number | symbol>(key: Key) =>
  <Value>(object: SingleDict<Key, Value>): Value => object[key]

/**
 * Access a property from an object
 * @param object Object to get property from
 * @param key Property key
 * @returns Property value
 */
export const getProperty = <
  Object extends object,
  Key extends keyof Object = keyof Object,
>(object: Object, key: Key) => object[key]

export interface PropertyGetter<Object> {
  /**
   * Access a property
   * @param key Property key
   * @returns Property value
   */
  <Key extends keyof Object>(key: Key): Object[Key]
}

/**
 * Create a function that lookups properties of an object
 * @param object Object to get properties from
 * @returns A function that lookup an object property
 */
export const propertyGetter = <Object extends object>(object: Object): PropertyGetter<Object> =>
  <Key extends keyof Object>(key: Key) => object[key]
