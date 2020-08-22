import { Option } from './option'

interface MatchHandlers<Value, SomeReturn, NoneReturn> {
  /**
   * Function to handle when the option contains a value
   * @param value Contained value
   * @returns Response for `Some` case
   */
  readonly some: (value: Value) => SomeReturn

  /**
   * Function to handle when the option does not contain a value
   * @returns Response for `None` case
   */
  readonly none: () => NoneReturn
}

/**
 * Match an option against a pair of functions
 * @param option Option to match against
 * @param handle Functions to handle each case
 */
export const match = <
  Value = never,
  SomeReturn = Value,
  NoneReturn = SomeReturn,
>(
  option: Option<Value>,
  handle: MatchHandlers<Value, SomeReturn, NoneReturn>,
) => option.tag ? handle.some(option.value) : handle.none()

export default match
