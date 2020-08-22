export type Curriable<X, Xs extends any[], Y> = (x: X, ...xs: Xs) => Y
export type Curried<X, Xs extends any[], Y> = (...xs: Xs) => (x: X) => Y
export type Uncurriable<X, Xs extends any[], Y> = (...xs: Xs) => (x: X) => Y
export type Uncurried<X, Xs extends any[], Y> = (x: X, ...xs: Xs) => Y

/**
 * Postpone the first argument of a function
 * @param fn Function to curry
 * @returns Curried function
 */
export const curry = <X, Xs extends any[], Y>(fn: Curriable<X, Xs, Y>): Curried<X, Xs, Y> =>
  (...xs) => x => fn(x, ...xs)

/**
 * Uncurry a function that is result of `curry`
 * @param fn Function to uncurry
 * @returns Uncurried function
 */
export const uncurry = <X, Xs extends any[], Y>(fn: Uncurriable<X, Xs, Y>): Uncurried<X, Xs, Y> =>
  (x, ...xs) => fn(...xs)(x)
