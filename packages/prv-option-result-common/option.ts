import { Some, None } from './types'
import { box } from './box'

/**
 * Create a `Some`
 * @param value Value to be carried
 * @returns `Some` of `value`
 */
export const some: <Value> (value: Value) => Some<Value> = box

/**
 * Create a `None`
 * @returns A `None`
 */
export const none = (): None => ({ tag: false })
