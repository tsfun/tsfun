import { DeepPayloadResult, DeepErrorResult } from './utils/types'
import { Result } from './result'

/**
 * Return a result that is carried as a payload by `deepResult`
 * @param deepResult Result to flatten
 * @returns Result with a flattened payload
 */
export const flatten = <
  Payload = never,
  InnerError = never,
  OuterError = InnerError
> (
  deepResult: DeepPayloadResult<Payload, InnerError, OuterError>
): Result<Payload, InnerError | OuterError> => deepResult.tag ? deepResult.value : deepResult

/**
 * Return a result that is carried as an error by `deepResult`
 * @param deepResult Result to flatten
 * @returns Result with a flattened error
 */
export const flattenError = <
  OuterPayload = never,
  Error = never,
  InnerPayload = OuterPayload
> (
  deepResult: DeepErrorResult<OuterPayload, Error, InnerPayload>
): Result<OuterPayload | InnerPayload, Error> => deepResult.tag ? deepResult : deepResult.error
