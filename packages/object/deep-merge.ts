import { SimpleDeepMerge } from './utils/types'

const DMWOC_DEF_ERR_HDLR: deepMergeWithoutCollision.ErrorProcessor = param => {
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
      if (typeof aValue === 'object' && typeof bValue === 'object') {
        result[key] = deepMergeWithoutCollision(aValue, bValue, onerror)
      } else {
        console.log(onerror)
        throw onerror({
          type: deepMergeWithoutCollision.ErrorType.PropertyCollision,
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

/* istanbul ignore next */
export namespace deepMergeWithoutCollision {
  export interface ErrorProcessor {
    (param: ErrorProcessorParam): unknown
  }

  export type ErrorProcessorParam =
    PropertyCollision

  export const enum ErrorType {
    PropertyCollision = 1
  }

  export interface PropertyCollision {
    type: ErrorType.PropertyCollision
    objects: [object, object]
    key: string | symbol
    values: [unknown, unknown]
  }
}
