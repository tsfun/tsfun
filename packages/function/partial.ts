/**
 * Partially apply a function
 * @param fn Function to apply
 * @param x First argument of `fn`
 * @returns Function that provides remaining arguments to `fn`
 */
export const partial = <X, Xs extends any[], Y> (
  fn: (x: X, ...xs: Xs) => Y,
  x: X
) => (...xs: Xs) => fn(x, ...xs)

/**
 * Partially apply a function
 * @param fn Function to apply
 * @param xs Array of all arguments except the first one
 * @returns Function that provides the first argument to `fn`
 */
export const partialTail = <X, Xs extends readonly any[], Y> (
  fn: (x: X, ...xs: Xs) => Y,
  xs: Xs
) => (x: X) => fn(x, ...xs)

/**
 * Partially apply a function
 * @param fn Function to apply
 * @param xs Iterable of all arguments except the first one
 * @returns Function that provides the first argument to `fn`
 */
export const partialTailIter: (
  <X0, X1, Y> (
    fn: (x: X0, ...xs: X1[]) => Y,
    xs: Iterable<X1>
  ) => (x: X0) => Y
) = partialTail as any

/**
 * Partially apply a function
 * @param fn Function to apply
 * @param xs All arguments except the first one
 * @returns Function that provides the first argument to `fn`
 */
export const partialTailSpread = <X, Xs extends readonly any[], Y> (
  fn: (x: X, ...xs: Xs) => Y,
  ...xs: Xs
) => partialTail(fn, xs)
