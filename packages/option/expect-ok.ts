import { Option, Result } from '@tsfun/prv-option-result-common'

/**
 * Convert `ok(x)` to an `some(x)`
 * and convert `err(_)` to `none()`
 * @param result Result to convert
 * @returns Corresponding `Option`
 *
 * In reality, this function merely returns the same object it takes
 * since `Result` interface is compatible with `Option`
 */
export const expectOk = <Payload = never> (result: Result<Payload, any>): Option<Payload> => result

export default expectOk
