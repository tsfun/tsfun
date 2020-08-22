import { Result } from './result'

/**
 * Return `left` if it carries a payload,
 * otherwise return `right`
 * @param left Result to match against
 * @param right Result to return when `left` carries an error
 * @returns Either `left` or `right`
 */
export const or = <
  Payload = never,
  Left = never,
  Right = Left,
>(
  left: Result<Payload, Left>,
  right: Result<Payload, Right>,
) => left.tag ? left : right

/**
 * Return `left` if it carries a payload,
 * otherwise execute `right` with error of `left` and return the result
 * @param left Result to match against
 * @param right Function to call when `left` carries an error
 * @returns Either `left` or return value of `right`
 */
export const orElse = <
  Payload = never,
  Left = never,
  Right = Left,
>(
  left: Result<Payload, Left>,
  right: (error: Left) => Result<Payload, Right>,
) => left.tag ? left : right(left.error)
