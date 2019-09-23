/**
 * Compose two unary functions
 * @param f Outer unary function
 * @param g Inner unary function
 * @returns Composite unary function
 */
export const compose = <X, Y, Z> (
  f: (y: Y) => Z,
  g: (x: X) => Y
) => (x: X) => f(g(x))

/**
 * Compose an n-ary function with an unary function
 * @param f Outer unary function
 * @param g Inner n-ary function
 * @returns Composite n-ary function
 */
export const composeXs = <Xs extends any[], Y, Z> (
  f: (y: Y) => Z,
  g: (...xs: Xs) => Y
) => (...xs: Xs) => f(g(...xs))

/**
 * Compose two unary functions
 * @param f Inner unary function
 * @param g Outer unary function
 * @returns Composite n-ary function
 */
export const composeRight = <X, Y, Z> (
  f: (x: X) => Y,
  g: (y: Y) => Z
) => compose(g, f)

/**
 * Compose an unary function with an n-ary function
 * @param f Inner n-ary function
 * @param g Outer unary function
 * @returns Composite n-ary function
 */
export const composeXsRight = <Xs extends any[], Y, Z> (
  f: (...xs: Xs) => Y,
  g: (y: Y) => Z
) => composeXs(g, f)

export {
  composeUnary as composeFns,
  pipelineUnary as composeFnsRight,
  compose as composeFnsXs,
  pipeline as composeFnsXsRight
} from 'ts-pipe-compose'
