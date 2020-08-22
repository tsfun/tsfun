import { Result, ok } from '@tsfun/prv-option-result-common'
import { Option } from './option'

/**
 * Transposes an `Option` of `Result` into a `Result` of `Option`
 * @param option `Option` of `Result`
 * @returns `Result` of `Option`
 */
export function transpose<
  Payload = never,
  Error = never,
>(option: Option<Result<Payload, Error>>): Result<Option<Payload>, Error> {
  if (!option.tag) return ok(option)
  const result = option.value
  return result.tag ? ok(result) : result
}

export default transpose
