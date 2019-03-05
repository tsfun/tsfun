/**
 * Turn a function that takes an iterable as first argument
 * into a function that takes multiple arguments
 * @param fn Function to be unapplied
 * @returns Function that executes given functions with multiple arguments
 */
export function unapply<Args extends Iterable<any>, R> (fn: (args: Args) => R): Unapplied<Args, R> {
  return ((...args: any[]) => fn(args as any)) as any
}

/**
 * Resulting function of `unapply`
 */
export type Unapplied<Args extends Iterable<any>, R> = TupleUnapplied<
  Args extends any[] ? Args :
  Args extends Iterable<infer X> ? X[] :
  never,
  R
>

interface TupleUnapplied<Args extends any[], R> {
  /**
   * Call the function
   * @param args Elements of the iterable
   * @returns Result when given function is called
   */
  (...args: Args): R
}

export default unapply
