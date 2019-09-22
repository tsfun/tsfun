export type Curriable<X, Xs extends any[], Y> = (x: X, ...xs: Xs) => Y
export type Curried<X, Xs extends any[], Y> = (...xs: Xs) => (x: X) => Y

/**
 * Postpone the first argument of a function
 * @param fn Function to curry
 * @returns Curried function
 */
export const curry =
  <X, Xs extends any[], Y>
    (fn: Curriable<X, Xs, Y>): Curried<X, Xs, Y> =>
      (...xs) => x => fn(x, ...xs)

export default curry
