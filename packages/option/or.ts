import { Option } from './option'

/**
 * Return `left` if it contains a value,
 * otherwise return `right`
 * @param left Option to match against
 * @param right Option to return when `left` does not contain a value
 * @returns Either `left` or `right`
 */
export const or = <Left = never, Right = Left> (
  left: Option<Left>,
  right: Option<Right>
) => left.tag ? left : right

/**
 * Return `left` if it contains a value,
 * otherwise call `right` and return the result
 * @param left Option to match against
 * @param right Function to call when `left` does not contain a value
 * @returns Either `left` or `right`
 */
export const orElse = <Left, Right = Left> (
  left: Option<Left>,
  right: () => Option<Right>
) => left.tag ? left : right()
