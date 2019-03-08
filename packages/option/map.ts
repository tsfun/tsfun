import { Option } from './option'
import { some } from './some'

/**
 * Apply a function to the contained value (if any)
 * @param option Option to match against
 * @param fn Function to call when `option` contains a value
 * @returns An `Option` of `fn`'s return value
 */
export const map = <Value, Return = Value> (
  option: Option<Value>,
  fn: (value: Value) => Return
) => option.tag ? some(fn(option.value)) : option
