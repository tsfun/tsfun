import { AsyncResult, MaybePromise } from './utils/types'
import { unwrapOrElse } from './unwrap'

/**
 * Return a promise that
 * resolves `x` if `await result` is `ok(x)`
 * and rejects with `reason` if `await result` is `err(reason)`
 * @param result Result to unwrap
 * @returns Promise that resolves carried payload
 */
export const asyncUnwrap =
  async <Payload = never> (result: AsyncResult<Payload, any>) =>
    unwrapOrElse(await result, async error => Promise.reject(await error))

/**
 * Return a promise that
 * resolves `x` if `await result` is `ok(x)`
 * and resolves `def` otherwise
 * @param result Result to unwrap
 * @param def Value to resolve when `await result` carries an error
 * @returns Promise that resolves either carried payload or `def`
 */
export const asyncUnwrapOr = async <Payload = never, Default = Payload> (
  result: AsyncResult<Payload, any>,
  def: MaybePromise<Default>
) => unwrapOrElse(await result, () => def)

/**
 * Return a promise that
 * resolves `x` if `await result` is `ok(x)`
 * and resolves `def(await error)` if `await result` is `err(error)`
 * @param result Result to unwrap
 * @param def Function to execute when `await result` carries an error
 * @returns Promise that resolves either carried payload or return value of `def`
 */
export const asyncUnwrapOrElse = async <
  Payload = never,
  Error = never,
  Default = Payload
> (
  result: AsyncResult<Payload, Error>,
  def: (error: Error) => MaybePromise<Default>
) => unwrapOrElse(await result, async error => def(await error))
