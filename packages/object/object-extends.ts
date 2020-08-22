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
  Properties extends object,
>(
  proto: Proto,
  properties: Properties,
): ObjectExtends<Proto, Properties> {
  const object = Object.create(proto)
  const makeProp = (key: string | symbol) => mutObj(object, key, (properties as any)[key])
  Object.getOwnPropertyNames(properties).forEach(makeProp)
  Object.getOwnPropertySymbols(properties).forEach(makeProp)
  return object
}

export default objectExtends
