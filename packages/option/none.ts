import { None } from '@ts-fun/prv-option-result-common'

export { None }

/**
 * Create a `None`
 * @returns A `None`
 */
export const none = (): None => ({ tag: false })

export default none
