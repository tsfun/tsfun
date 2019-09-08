/**
 * Access a property from an object
 * @param object Object to get property from
 * @param key Property key
 * @returns Property value
 */
export const getProperty = <
  Object extends object,
  Key extends keyof Object = keyof Object
> (object: Object, key: Key) => object[key]

export interface PropertyGetter<Object> {
  /**
   * Access a property
   * @param key Property key
   * @returns Property value
   */
  <Key extends keyof Object> (key: Key): Object[Key]
}

/**
 * Create a function that lookups properties of an object
 * @param object Object to get properties from
 * @returns A function that lookup an object property
 */
export const propertyGetter =
  <Object extends object> (object: Object): PropertyGetter<Object> =>
    <Key extends keyof Object> (key: Key) => object[key]
