export interface SideEffect<Value> {
  (value: Value): void
}

/**
 * Insert a side-effect into function pipeline
 * @param value Value from pipeline
 * @param fns Side effect functions
 * @returns `value`
 *
 * @example
 *   const result = pass(value)
 *     .to(tap, value => console.log('begin', value))
 *     .to(inc)
 *     .to(tap, value => console.log('after inc', value))
 *     .to(double)
 *     .to(tap, value => console.log('after double', value))
 *     .to(square)
 *     .to(tap, value => console.log('after square', value))
 *     .get()
 */
export function tap<Value> (value: Value, ...fns: SideEffect<Value>[]): Value {
  fns.forEach(fn => fn(value))
  return value
}

export default tap
