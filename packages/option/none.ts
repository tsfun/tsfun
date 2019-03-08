import { Base } from './utils/types'

/**
 * Type of options that does not contain values
 */
export interface None extends Base {
  readonly tag: false
}

/**
 * Create a `None`
 * @returns A `None`
 */
export const none = (): None => ({ tag: false })

export default none
