import { None } from '@tsfun/option'

/**
 * Type of result that carries error
 */
export interface Err<Error> extends None {
  readonly error: Error
}

/**
 * Create an `Err`
 * @param error Error to carry
 * @returns `Err` of `error`
 */
export const err = <Error> (error: Error): Err<Error> => ({ tag: false, error })

export default err
