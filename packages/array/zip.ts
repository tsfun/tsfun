/**
 * Create a list of pairs from two lists
 * @param a Array of left items
 * @param b Array of right items
 * @returns An array of pairs
 */
export function zip<A, B> (a: readonly A[], b: readonly B[]): [A, B][] {
  const length = Math.min(a.length, b.length)
  const result = Array<[A, B]>()
  for (let i = 0; i !== length; ++i) {
    result.push([a[i], b[i]])
  }
  return result
}
