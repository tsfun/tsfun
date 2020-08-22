import { Option } from './option'

/**
 * Return an iterator over the possibly contained value
 * @param option Option to iterate over
 * @returns An iterator that yields contained value
 */
export function* iter<Value = never>(option: Option<Value>) {
  if (option.tag) yield option.value
}

export default iter
