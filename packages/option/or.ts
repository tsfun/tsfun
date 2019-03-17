import { Option } from './option'

/**
 * Return `left` if it contains a value,
 * otherwise return `right`
 * @param left Option to match against
 * @param right Option to return when `left` does not contain a value
 * @returns Either `left` or `right`
 */
export const or = <Value = never> (
  left: Option<Value>,
  right: Option<Value>
) => left.tag ? left : right

/**
 * Return `left` if it contains a value,
 * otherwise call `right` and return the result
 * @param left Option to match against
 * @param right Function to call when `left` does not contain a value
 * @returns Either `left` or return value of `right`
 */
export const orElse = <Value = never> (
  left: Option<Value>,
  right: () => Option<Value>
) => left.tag ? left : right()
