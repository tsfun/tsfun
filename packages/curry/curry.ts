export type Curriable<Head, Tail extends any[], Return> = (head: Head, ...tail: Tail) => Return
export type Curried<Head, Tail extends any[], Return> = (...tail: Tail) => (head: Head) => Return

/**
 * Postpone the first argument of a function
 * @param fn Function to curry
 * @returns Curried function
 */
export const curry =
  <Head, Tail extends any[], Return>
    (fn: Curriable<Head, Tail, Return>): Curried<Head, Tail, Return> =>
      (...tail) => head => fn(head, ...tail)

export default curry
