import { DeepOption } from './utils/types'

/**
 * Return contained option within `deepOption`
 * @param deepOption Option to be flatten
 * @returns Flattened option
 */
export const flatten =
  <Value = never> (deepOption: DeepOption<Value>) =>
    deepOption.tag ? deepOption.value : deepOption

export default flatten
