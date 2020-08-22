import { Result } from './result'

/**
 * Return `err(error)` if `left` is `err(error)`,
 * otherwise return `right`
 * @param left Result to match against
 * @param right Result to return when `left` carries an error
 * @returns Either `right` or an `Err`
 */
export const and = <
  Left = never,
  Right = Left,
  Error = never,
>(
  left: Result<Left, Error>,
  right: Result<Right, Error>,
) => left.tag ? right : left

/**
 * Return `err(error)` if `left` is `err(error)`,
 * and return `ok(right(x))` if `left` is `ok(x)`
 * @param left Result to match against
 * @param right Function to call when `left` carries an error
 * @returns Either return value of `right` or an `Err`
 */
export const andThen = <
  Left = never,
  Right = Left,
  Error = never,
>(
  left: Result<Left, Error>,
  right: (payload: Left) => Result<Right, Error>,
) => left.tag ? right(left.value) : left
