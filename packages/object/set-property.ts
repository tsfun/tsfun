import { AddProperty as SetProperty } from './utils/types'
export { SetProperty }

/**
 * Shallow clone an object and alter one property
 * @hint If you don't need remaining properties to be own properties, consider `addProperty` instead
 * @param object Object to get remaining properties from
 * @param key Property key
 * @param value Property value
 */
export const setProperty = <
  Object extends object,
  Key extends string | number | symbol,
  Value,
>(
  object: Object,
  key: Key,
  value: Value,
): SetProperty<Object, Key, Value> => ({
  ...object,
  [key]: value,
} as any)

export default setProperty
