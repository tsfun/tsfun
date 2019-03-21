import { AsyncDeepOption } from './utils/types'
import { Option } from './option'
import { some } from './some'

/**
 * Flatten `deepOptionPromise`
 * @param deepOptionPromise Option to be flatten
 * @returns Promise that resolves flattened option
 */
export async function asyncFlatten <Value = never> (
  deepOptionPromise: AsyncDeepOption<Value>
): Promise<Option<Value>> {
  const deepOption = await deepOptionPromise
  if (!deepOption.tag) return deepOption

  const flatOption = await deepOption.value
  if (!flatOption.tag) return flatOption

  return some(await flatOption.value)
}

export default asyncFlatten
