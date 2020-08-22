/**
 * Classify a set of items into 2 groups
 * @param iterable List of items
 * @param predicate Function that classifies item
 * @returns A tuple of 2 item groups
 *   - First group includes items that `predicate` returns `true`
 *   - Second group includes items that `predicate` returns `false`
 */
export function partition<Item>(
  iterable: Iterable<Item>,
  predicate: (item: Item) => boolean,
): [Item[], Item[]] {
  const a = Array<Item>()
  const b = Array<Item>()

  for (const item of iterable) {
    ;(predicate(item) ? a : b).push(item)
  }

  return [a, b]
}

/**
 * Like `partition` but with type predicate
 */
export const partitionPredicate: {
  /**
   * Classify a set of items into 2 groups
   * @param iterable List of items
   * @param predicate Function that classifies item
   * @returns A tuple of 2 item groups
   *   - First group includes items that `predicate` returns `true`
   *   - Second group includes items that `predicate` returns `false`
   */
  <Type, Subtype extends Type>(
    iterable: Iterable<Type>,
    predicate: (item: Type) => item is Subtype,
  ): [Subtype[], Type[]]
} = partition as any
