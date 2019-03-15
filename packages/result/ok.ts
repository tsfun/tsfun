import { Some, some } from '@tsfun/option'

/**
 * Type of result that carries payload
 */
export interface Ok<Payload> extends Some<Payload> {}

/**
 * Create an `Ok`
 * @param payload Payload to carry
 * @returns `Ok` of `payload`
 */
export const ok: <Payload> (payload: Payload) => Ok<Payload> = some
