/**
 * Compose two function
 * @param f Function that takes `y` and returns `z`
 * @param g Function that takes `x` and returns `y`
 * @returns Function that takes `x` and returns `z = f(g(x))`
 */
export const compose = <X, Y, Z> (
  f: (y: Y) => Z,
  g: (x: X) => Y
) => (x: X) => f(g(x))

/**
 * Compose two function
 * @param f Function that takes `x` and returns `y`
 * @param g Function that takes `y` and returns `x`
 * @returns Function that takes `x` and returns `z = g(f(x))`
 */
export const composeRight = <X, Y, Z> (
  f: (x: X) => Y,
  g: (y: Y) => Z
) => compose(g, f)

export {
  compose as composeFns,
  pipeline as composeFnsRight
} from 'ts-pipe-compose'
