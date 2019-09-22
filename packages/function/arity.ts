/**
 * Swap arguments of a binary function
 * @param fn Function to swap arguments
 * @returns Function that calls `fn`
 */
export const flip =
  <X0, X1, Y> (fn: (x0: X0, x1: X1) => Y) =>
    (x1: X1, x0: X0) => fn(x0, x1)

/**
 * Swap the first 2 arguments of an n-ary function
 * @param fn Function to swap arguments
 * @returns Function that calls `fn`
 */
export const flipXs =
  <X0, X1, Xs extends any[], Y>
    (fn: (x0: X0, x1: X1, ...xs: Xs) => Y) =>
      (x1: X1, x0: X0, ...xs: Xs) => fn(x0, x1, ...xs)

/**
 * Turn a binary function into n-ary
 * by calling that function multiple times
 * @param fn Function to apply
 * @returns Function that calls `fn` multiple times
 */
export const nAry =
  <X> (fn: (x0: X, x1: X) => X) =>
    (...xs: [X, X, ...X[]]) => xs.reduce((x0, x1) => fn(x0, x1))

/**
 * Turn a binary function into n-ary
 * by calling that function multiple times
 * @param fn Function to apply
 * @returns Function that calls `fn` multiple times
 */
export const nAryRight =
  <X> (fn: (x0: X, x1: X) => X) =>
    (...xs: [X, X, ...X[]]) => xs.reduceRight((x0, x1) => fn(x0, x1))
