import { Option } from './option'
import { none } from './none'

/**
 * Return a `None` if `left` does not contain a value,
 * otherwise return `right`
 * @param left Option to match against
 * @param right Option to return when `left` contains a value
 * @returns Either `right` or a `None`
 */
export const and = <Left, Right = Left> (
  left: Option<Left>,
  right: Option<Right>
) => left.tag ? right : left

/**
 * Return `None` if `left` does not contain a value,
 * otherwise call `right` with the wrapped value and return the result
 * @param left Option to match against
 * @param right Function to call when `left` contains a value
 * @returns Either returning value of `right` or a `None`
 */
export const andThen = <Left, Right = Left> (
  left: Option<Left>,
  right: (value: Left) => Option<Right>
) => left.tag ? right(left.value) : none()
