import { Result } from './result'
import { match } from './match'

/**
 * Return `x` if `result` is `ok(x)`,
 * and throw `error` if `result` is `err(error)`
 * @param result Result to unwrap
 * @returns Carried payload
 */
export const unwrap = <
  Payload = never
> (result: Result<Payload, any>) => unwrapOrElse(result, error => { throw error })

/**
 * Return `x` if `result` is `ok(x)`,
 * otherwise return `def`
 * @param result Result to unwrap
 * @param def Value to return when `result` carries an error
 * @returns Either carried payload or `def`
 */
export const unwrapOr = <
  Payload = never,
  Default = Payload
> (
  result: Result<Payload, any>,
  def: Default
) => unwrapOrElse(result, () => def)

/**
 * Return `x` if `result` is `ok(x)`,
 * and return `def(error)` if `result` is `err(error)`
 * @param result Result to unwrap
 * @param def Function to call when `result` carries an error
 * @returns Either carried payload of `result` or returning value of `def`
 */
export const unwrapOrElse = <
  Payload = never,
  Error = never,
  Default = Payload
> (
  result: Result<Payload, Error>,
  def: (error: Error) => Default
) => match(result, { ok: x => x, err: def })
