type Callee<Args, R> =
  Args extends any[] ? (...args: Args) => R :
  Args extends Iterable<infer X> ? (...args: X[]) => R :
  never

/**
 * Create a function that applies given function to an iterable of arguments
 * @param fn Function to be applied
 * @returns Function that executes given function with an iterable of arguments
 */
export function apply<Args extends Iterable<any>, R> (fn: Callee<Args, R>): Applied<Args, R> {
  return ((args: Args): R => fn(...args)) as any
}

/**
 * Resulting function of `apply`
 */
export type Applied<
  Args extends Iterable<any>,
  R,
  ByTuple = AppliedMain<Args, R>
> =
  Args extends Array<infer X> ?
    X[] extends Args ?
      AppliedMain<Iterable<X>, R>
    : ByTuple :
  Args extends Iterable<infer X> ?
    Iterable<X> extends Args ?
      AppliedMain<Iterable<X>, R>
    : ByTuple :
  ByTuple

interface AppliedMain<Args, R> {
  /**
   * Call the function
   * @param args Iterable of arguments
   * @returns Result when given function is called
   */
  (args: Args): R
}

export default apply
