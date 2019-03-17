import { Option } from '@tsfun/option'
import { Result } from './result'

/**
 * Convert `ok(x)` to an `some(x)`
 * or `err(_)` to `none()`
 * @param result Result to convert
 * @returns Corresponding `Option`
 *
 * In reality, this function merely returns the same object it takes
 * since `Result` interface is compatible with `Option`
 */
export const option = <Payload = never> (result: Result<Payload, any>): Option<Payload> => result

export default option
