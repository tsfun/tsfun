import { Err } from '@tsfun/prv-option-result-common'

/**
 * Create an `Err`
 * @param error Error to carry
 * @returns `Err` of `error`
 */
export const err = <Error> (error: Error): Err<Error> => ({ tag: false, error })

export default err
