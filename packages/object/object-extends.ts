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
  return Object.assign(
    Object.create(proto),
    properties
  )
}

export default objectExtends
