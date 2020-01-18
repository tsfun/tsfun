import { SimpleDeepMerge } from './utils/types'

const isObject = (value: any): value is object =>
  value && typeof value === 'object' && !Array.isArray(value)

/**
 * Merge two objects of the same interface
 *
 * `b` is prioritized for overlapping non-object properties
 *
 * @param a Object or value to merge
 * @param b Object or value to merge
 * @returns Result of the merge
 */
export function deepMergeOverwrite<Value> (a: Value, b: Value): Value {
  if (!isObject(a) || !isObject(b)) return b

  const result: any = {}

  for (const [key, aValue] of Object.entries(a)) {
    if (key in b) {
      const bValue = (b as any)[key]
      result[key] = deepMergeOverwrite(aValue, bValue)
    } else {
      result[key] = aValue
    }
  }

  for (const [key, bValue] of Object.entries(b)) {
    if (key in a) continue
    result[key] = bValue
  }

  return result
}

const DMWOC_DEF_ERR_HDLR: ErrorProcessor = param => {
  throw Object.assign(new TypeError(`Property collision`), param)
}

/**
 * Merge two objects
 *
 * The two objects are expected to not have overlapping non-object properties
 *
 * @param a Object to merge
 * @param b Object to merge
 * @param onerror Function to handle should error occurs
 * @returns A merged object of `a` and `b`
 */
export function deepMergeWithoutCollision<
  A extends object,
  B extends object
> (a: A, b: B, onerror = DMWOC_DEF_ERR_HDLR): SimpleDeepMerge<A, B> {
  const result: any = {}

  for (const [key, aValue] of Object.entries(a)) {
    if (key in b) {
      const bValue = (b as any)[key]
      if (isObject(aValue) && isObject(bValue)) {
        result[key] = deepMergeWithoutCollision(aValue, bValue, onerror)
      } else {
        throw onerror({
          type: ErrorType.PropertyCollision,
          objects: [a, b],
          key,
          values: [aValue, bValue]
        })
      }
    } else {
      result[key] = aValue
    }
  }

  for (const [key, bValue] of Object.entries(b)) {
    if (key in a) continue
    result[key] = bValue
  }

  return result
}

/**
 * Process and transform errors of `deepMergeWithoutCollision`
 */
export interface ErrorProcessor {
  /**
   * @param param Error information
   * @returns An error object
   */
  (param: ErrorProcessorParam): unknown
}

/**
 * Param to pass to `ErrorProcessor` should `deepMergeWithoutCollision` fails
 */
export type ErrorProcessorParam =
  PropertyCollision

/**
 * Code of errors that `deepMergeWithoutCollision may cause
 */
export const enum ErrorType {
  /**
   * Indicates that two merging objects possess properties of same name
   */
  PropertyCollision = 1
}

/**
 * Param to pass to `ErrorProcess` should two merging objects possess properties of same name
 */
export interface PropertyCollision {
  /**
   * Type of error
   * @discriminator
   */
  type: ErrorType.PropertyCollision
  /**
   * Two merging object
   */
  objects: [object, object]
  /**
   * Name of conflicting properties
   */
  key: string | symbol
  /**
   * Values of conflicting properties
   */
  values: [unknown, unknown]
}
