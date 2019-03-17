import { Result } from './result'
import { match } from './match'
import { ok } from './ok'
import { err } from './err'

/**
 * Return `err(x)` if `result` is `ok(x)`
 * and return `ok(x)` if `result` is `err(x)`
 * @param result Result to flip
 * @returns Flipped result
 */
export const flip =
  <A = never, B = never>
    (result: Result<A, B>): Result<B, A> =>
      match(result, { ok: err, err: ok })

export default flip
