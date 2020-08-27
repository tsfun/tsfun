/**
 * Get first item of an array
 * @param array Array to get first item from
 * @returns First item of `array`
 */
export const head = <Head>(array: readonly [Head, ...any[]]) => array[0]

/**
 * Get first item of an array
 * @param array Array to get first item from
 * @param def Value to return should `array` is found empty
 * @returns First item of `array` if it's not empty, or `def` otherwise
 */
export const headOr = <Item, Default>(
  array: readonly Item[],
  def: Default,
) => array.length ? array[0] : def

/**
 * Get first item of an array
 * @param array Array to get first item from
 * @returns First item of `array` if it's not empty, or `undefined` otherwise
 */
export const headOrUndefined = <Item>(array: readonly Item[]) => headOr(array, undefined)
