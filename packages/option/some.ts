import { Base } from './utils/types'

/**
 * Type of options that contain values
 */
export interface Some<Value> extends Base {
  readonly tag: true
  readonly value: Value
}

/**
 * Create a `Some`
 * @param value Value to be carried
 * @returns `Some` of `value`
 */
export const some = <Value> (value: Value): Some<Value> => ({ tag: true, value })

export default some
