import { Some, some } from './some'
import { None, none } from './none'

/**
 * Option type
 */
export type Option<Value> = Some<Value> | None

/**
 * Turn `null` or `undefined` into a `None`
 * and others into a `Some`
 * @param value Nullable value
 * @returns An `Option`
 */
export const option =
  <Value> (value: Value): MakeReturn<Value> =>
    (value === null || value === undefined ? none() : some(value)) as any

type MakeReturn<Value> =
  Value extends null ? None :
  Value extends undefined ? None :
  null extends Value ? Option<Value> :
  undefined extends Value ? Option<Value> :
  Some<Value>

export default option
