import { mutObj } from './utils/mut-obj'
import { ObjectExtends } from './utils/types'
export { ObjectExtends }

/**
 * Create an object with `proto` as prototype
 * and `properties` as own properties
 * @param proto Prototype to extends upon
 * @param properties Properties to add
 */
export function objectExtends<
  Proto extends object | null,
  Properties extends object | null
> (
  proto: Proto,
  properties: Properties
): ObjectExtends<Proto, Properties> {
  const object = Object.create(proto)
  if (!properties) return object
  for (const [key, value] of Object.entries(properties as any)) {
    mutObj(object, key, value)
  }
  return object
}

export default objectExtends
