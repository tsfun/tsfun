export type Uncurriable<Head, Tail extends any[], Return> = (...tail: Tail) => (head: Head) => Return
export type Uncurried<Head, Tail extends any[], Return> = (head: Head, ...tail: Tail) => Return

/**
 * Uncurry a function that is result of `curry`
 * @param fn Function to uncurry
 * @returns Uncurried function
 */
export const uncurry =
  <Head, Tail extends any[], Return>
    (fn: Uncurriable<Head, Tail, Return>): Uncurried<Head, Tail, Return> =>
      (head, ...tail) => fn(...tail)(head)

export default uncurry
