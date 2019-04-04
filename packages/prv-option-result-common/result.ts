import { Ok, Err } from './types'
import { box } from './box'

/**
 * Create an `Ok`
 * @param payload Payload to carry
 * @returns `Ok` of `payload`
 */
export const ok: <Payload> (payload: Payload) => Ok<Payload> = box

/**
 * Create an `Err`
 * @param error Error to carry
 * @returns `Err` of `error`
 */
export const err = <Error> (error: Error): Err<Error> => ({ tag: false, error })
