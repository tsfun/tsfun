/**
 * Split an array into 2 parts
 * @param array Array to split
 * @param index Where to split
 * @returns A tuple of two parts
 */
export const splitAt = <Item>(
  array: readonly Item[],
  index: number,
): [Item[], Item[]] => [
  array.slice(0, index),
  array.slice(index),
]
