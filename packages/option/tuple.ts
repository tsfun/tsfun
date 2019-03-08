import { Option } from './option'

/**
 * Return a tuple of the contained value if `option` contains a value,
 * otherwise return an empty tuple
 * @param option Option to get value from
 * @returns An array that may contain contained value
 */
export const tuple =
  <Value> (option: Option<Value>): [Value] | [] =>
    option.tag ? [option.value] : []
