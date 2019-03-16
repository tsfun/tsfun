import { Result } from './result'
import { ok } from './ok'
import { err } from './err'
import { match } from './match'

/**
 * Clone a result
 * @param result Result to clone
 * @returns A new copy of `result`
 */
export const clone =
  <Value = never, Error = never> (result: Result<Value, Error>) =>
    match(result, { ok, err })

export default clone
