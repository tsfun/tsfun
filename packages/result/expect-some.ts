import { Option } from '@tsfun/prv-option-result-common'
import { Result } from './result'
import { err } from './err'

/**
 * If `option` is `some(x)`, return `ok(x)`,
 * otherwise return an `Err`
 * @param option Option to match against
 * @returns `Result`
 */
export const expectSome = <Payload = never>(option: Option<Payload>): Result<Payload, Error> =>
  expectSomeOrElse(option, () => new Error('Expecting Some but received None'))

/**
 * If `option` is `some(x)`, return `ok(x)`,
 * otherwise return `err(error)`
 * @param option Option to match against
 * @param error Error to carry should `option` is a `None`
 * @returns `Result`
 */
export const expectSomeOr = <Payload = never, Error = never>(
  option: Option<Payload>,
  error: Error,
): Result<Payload, Error> => option.tag ? option : err(error)

/**
 * If `option` is `some(x)`, return `ok(x)`,
 * otherwise return `err(error())`
 * @param option Result to match against
 * @param error Function to execute should `option` is a `None`
 * @returns `Result`
 */
export const expectSomeOrElse = <Payload = never, Error = never>(
  option: Option<Payload>,
  error: () => Error,
): Result<Payload, Error> => option.tag ? option : err(error())
