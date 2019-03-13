import { Option } from './option'
import { none } from './none'
import { andThen } from './and'

/**
 * Return a `None` if `option` does not contain a value,
 * otherwise call `predicate` and return:
 *   * a `None` if `predicate` returns `false`
 *   * a `Some` if `predicate` returns `true`
 * @param option Option to match against
 * @param predicate Whether should `filter` return a `Some` when `option` contains a value
 * @returns An `Option`
 */
export const filter = <Value = never> (
  option: Option<Value>,
  predicate: (value: Value) => boolean
) => andThen(option, value => predicate(value) ? option : none())
