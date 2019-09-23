/**
 * Call a nullary function
 * @param fn Function to call
 * @returns Result of function execution
 */
export const call0 = <Y> (fn: () => Y) => fn()

/**
 * Call a unary function
 * @param fn Function to call
 * @param x Argument to pass to `fn`
 * @returns Result of function execution
 */
export const call1 = <X, Y> (
  fn: (x: X) => Y,
  x: X
) => fn(x)

/**
 * Call a binary function
 * @param fn Function to call
 * @param x0 First argument to pass to `fn`
 * @param x1 Second argument to pass to `fn`
 * @returns Result of function execution
 */
export const call2 = <X0, X1, Y> (
  fn: (x0: X0, x1: X1) => Y,
  x0: X0,
  x1: X1
) => fn(x0, x1)

/**
 * Call a ternary function
 * @param fn Function to call
 * @param x0 First argument to pass to `fn`
 * @param x1 Second argument to pass to `fn`
 * @param x2 Third argument to pass to `fn`
 * @returns Result of function execution
 */
export const call3 = <X0, X1, X2, Y> (
  fn: (x0: X0, x1: X1, x2: X2) => Y,
  x0: X0,
  x1: X1,
  x2: X2
) => fn(x0, x1, x2)

/**
 * Call a n-ary function
 * @param fn Function to call
 * @param args Arguments to pass to `fn`
 * @returns Result of function execution
 */
export const callXs = <Xs extends any[], Y> (
  fn: (...args: Xs) => Y,
  ...args: Xs
) => fn(...args)

export const exec = call0
export const call = call1
