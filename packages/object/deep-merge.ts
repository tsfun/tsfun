import { SimpleDeepMerge } from './utils/types'

const isObject = (value: any): value is object =>
  value && typeof value === 'object' && !Array.isArray(value)

/**
 * Merge two objects of the same interface
 * @param left Object or value to merge
 * @param right Object or value to merge
 * @param resolveConflict Function that resolves property conflict
 * @returns Result of the merge
 */
export function deepMergeWithPreference<Value> (
  left: Value,
  right: Value,
  resolveConflict: PropertyConflictResolver
): Value {
  if (!isObject(left) || !isObject(right)) {
    return resolveConflict([left, right]) ? right : left
  }

  const result: any = {}

  for (const [key, leftValue] of Object.entries(left)) {
    if (key in right) {
      const rightValue = (right as any)[key]
      result[key] = deepMergeWithPreference(leftValue, rightValue, resolveConflict)
    } else {
      result[key] = leftValue
    }
  }

  for (const [key, bValue] of Object.entries(right)) {
    if (key in left) continue
    result[key] = bValue
  }

  return result
}

/**
 * Decides which property should make it to the merged object
 */
export interface PropertyConflictResolver {
  /**
   * @param values Pair of conflicting properties
   * @returns Property choice
   */
  (values: [unknown, unknown]): PropertyPreference
}

/**
 * Choice to be made
 */
export const enum PropertyPreference {
  /**
   * Choose the left value (`values[0]`)
   */
  Left = 0,
  /**
   * Choose the right value (`values[1]`)
   */
  Right = 1
}

const PREFER_RIGHT = () => PropertyPreference.Right

/**
 * Merge two objects of the same interface
 *
 * `left` is prioritized for overlapping non-object properties
 *
 * @param left Object or value to merge
 * @param right Object or value to merge
 * @returns Result of the merge
 */
export function deepMergeOverwrite<Value> (left: Value, right: Value): Value {
  return deepMergeWithPreference(left, right, PREFER_RIGHT)
}

const DMWOC_DEF_ERR_HDLR: ErrorProcessor = param => {
  throw Object.assign(new TypeError(`Property collision`), param)
}

/**
 * Merge two objects
 *
 * The two objects are expected to not have overlapping non-object properties
 *
 * @param left Object to merge
 * @param right Object to merge
 * @param onerror Function to handle should error occurs
 * @returns A merged object of `a` and `b`
 */
export function deepMergeWithoutCollision<
  Left extends object,
  Right extends object
> (left: Left, right: Right, onerror = DMWOC_DEF_ERR_HDLR): SimpleDeepMerge<Left, Right> {
  const result: any = {}

  for (const [key, leftValue] of Object.entries(left)) {
    if (key in right) {
      const rightValue = (right as any)[key]
      if (isObject(leftValue) && isObject(rightValue)) {
        result[key] = deepMergeWithoutCollision(leftValue, rightValue, onerror)
      } else {
        throw onerror({
          type: ErrorType.PropertyCollision,
          objects: [left, right],
          key,
          values: [leftValue, rightValue]
        })
      }
    } else {
      result[key] = leftValue
    }
  }

  for (const [key, bValue] of Object.entries(right)) {
    if (key in left) continue
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
