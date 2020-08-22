import { Result } from './result'
import { ok } from './ok'
import { err } from './err'

/**
 * Return `ok(x)` if executing `fn` returns `x`,
 * and return `err(error)` if executing `fn` throws `error`
 * @param fn Function to execute
 * @param args Arguments to pass to function
 * @returns `Result` of function execution
 */
export function tryExec<Args extends any[], Return>(
  fn: (...args: Args) => Return,
  ...args: Args
): Result<Return, any> {
  try {
    return ok(fn(...args))
  } catch (error) {
    return err(error)
  }
}

export default tryExec
