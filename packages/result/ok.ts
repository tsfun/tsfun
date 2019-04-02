import { Ok, box } from '@tsfun/prv-option-result-common'

export { Ok }

/**
 * Create an `Ok`
 * @param payload Payload to carry
 * @returns `Ok` of `payload`
 */
export const ok: <Payload> (payload: Payload) => Ok<Payload> = box

export default ok
