/**
 * Get last item of an array
 * @param array Array to get last item from
 * @returns Last item of `array`
 */
export const last = <Body extends any[], Last>(array: readonly [...Body, Last]): Last => array[array.length - 1] as any

/**
 * Get last item of an array
 * @param array Array to get last item from
 * @param def Value to return should `array` is found empty
 * @returns Last item of `array` if it's not empty, or `def` otherwise
 */
export const lastOr = <Item, Default>(
  array: readonly Item[],
  def: Default,
): Item | Default => array.length ? last(array as any) : def

/**
 * Get last item of an array
 * @param array Array to get last item from
 * @returns Last item of `array` if it's not empty, or `undefined` otherwise
 */
export const lastOrUndefined = <Item>(array: readonly Item[]) => lastOr(array, undefined)
