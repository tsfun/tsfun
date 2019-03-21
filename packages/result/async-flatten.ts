import { AsyncDeepPayloadResult, AsyncDeepErrorResult } from './utils/types'
import { Result } from './result'
import { ok } from './ok'
import { err } from './err'

/**
 * Flatten (a promise of) a result that carries
 * another (promise of a) result as a payload
 * @param deepResultPromise Result to flatten
 * @returns Promise that resolves flattened result
 */
export async function asyncFlatten <
  Payload = never,
  InnerError = never,
  OuterError = InnerError
> (
  deepResultPromise: AsyncDeepPayloadResult<Payload, InnerError, OuterError>
): Promise<Result<Payload, InnerError | OuterError>> {
  const deepResult = await deepResultPromise
  if (!deepResult.tag) return err(await deepResult.error)

  const flatResult = await deepResult.value
  if (!flatResult.tag) return err(await flatResult.error)

  return ok(await flatResult.value)
}

/**
 * Flatten (a promise of) a result that carries
 * another (promise of a) result as an error
 * @param deepResultPromise Result to flatten
 * @returns Promise that resolves flattened result
 */
export async function asyncFlattenError <
  OuterPayload = never,
  Error = never,
  InnerPayload = OuterPayload
> (
  deepResultPromise: AsyncDeepErrorResult<OuterPayload, Error, InnerPayload>
): Promise<Result<OuterPayload | InnerPayload, Error>> {
  const deepResult = await deepResultPromise
  if (deepResult.tag) return ok(await deepResult.value)

  const flatResult = await deepResult.error
  if (flatResult.tag) return ok(await flatResult.value)

  return err(await flatResult.error)
}
