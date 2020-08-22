import { Option, some } from '@tsfun/prv-option-result-common'
import { Result } from './result'

/**
 * Transpose a `Result` of `Option` into an `Option` of `Result`
 * @param result `Result` of `Option`
 * @returns `Option` of `Result`
 */
export function transpose<
  Payload = never,
  Error = never,
>(result: Result<Option<Payload>, Error>): Option<Result<Payload, Error>> {
  if (!result.tag) return some(result)
  const option = result.value
  return option.tag ? some(option) : option
}

export default transpose
