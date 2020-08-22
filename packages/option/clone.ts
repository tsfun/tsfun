import { Option } from './option'
import { some } from './some'
import { none } from './none'
import { match } from './match'

/**
 * Clone an option
 * @param option Option to clone
 * @returns A new copy of `option`
 */
export const clone = <Value = never>(option: Option<Value>) => match(option, { some, none })

export default clone
