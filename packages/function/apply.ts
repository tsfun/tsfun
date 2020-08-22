/**
 * Apply a function with an array of arguments
 * @param fn Function to be applied
 * @param xs Arguments to be passed to `fn`
 * @returns Result of function application
 */
export const apply = <Xs extends readonly any[], Y>(
  fn: (...xs: Xs) => Y,
  xs: Xs,
) => fn(...xs)

/**
 * Apply a function with an iterable of arguments
 * @param fn Function to be applied
 * @param xs Arguments to be passed to `fn`
 * @returns Result of function application
 */
export const applyIter: (
  <X, Y>(
    fn: (...xs: X[]) => Y,
    xs: Iterable<X>,
  ) => Y
) = apply as any
