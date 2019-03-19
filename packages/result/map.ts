import { Result } from './result'
import { ok } from './ok'
import { err } from './err'

/**
 * Apply a function to the carried payload (if any)
 * @param result Result to match against
 * @param fn Function to call when `result` carries a payload
 * @returns Result that may carry `fn`'s return value as a payload
 */
export const map = <
  Payload = never,
  Error = never,
  Return = Payload
> (
  result: Result<Payload, Error>,
  fn: (payload: Payload) => Return
): Result<Return, Error> => result.tag ? ok(fn(result.value)) : result

/**
 * Apply a function to the carried error (if any)
 * @param result Result to match against
 * @param fn Function to call when `result` carries an error
 * @returns Result that may carry `fn`'s return value as an error
 */
export const mapErr = <
  Error = never,
  Payload = never,
  Return = Error
> (
  result: Result<Payload, Error>,
  fn: (error: Error) => Return
): Result<Payload, Return> => result.tag ? result : err(fn(result.error))

/**
 * Apply `handleErr` to a carried error or `handleOk` to a carried payload
 * @param result Result to match against
 * @param handleErr Function to call when `result` carries an error
 * @param handleOk Function to call when `result` carries a payload
 * @returns Result that may carry `handleErr`'s return value as an error or `handleOk`'s as a payload
 */
export const mapOrElse = <
  Payload = never,
  Error = never,
  OkReturn = Payload,
  ErrReturn = Error
> (
  result: Result<Payload, Error>,
  handleErr: (error: Error) => ErrReturn,
  handleOk: (payload: Payload) => OkReturn
): Result<OkReturn, ErrReturn> => result.tag
  ? ok(handleOk(result.value))
  : err(handleErr(result.error))
