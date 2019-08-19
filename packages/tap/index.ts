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

export interface Tapper<Value> {
  <Sub extends Value> (value: Sub): Sub
}

/**
 * Insert a side-effect into function pipeline.
 * This is used in situation where `tap` is not suited,
 * such as `map`
 * @param fns Side effect functions
 * @returns A side-effect function that can be inserted into a pipeline
 *
 * @example
 *   const myResult = pass(result)
 *     .to(tap, result => console.log('result before onOk/onErr', result))
 *     .to(map, tapper(value => console.log('value before onOk', value)))
 *     .to(mapErr, tapper(error => console.log('error before onErr', error)))
 *     .to(map, onOk)
 *     .to(map, tapper(value => console.log('value after onOk', value)))
 *     .to(mapErr, onErr)
 *     .to(mapErr, tapper(error => console.log('error after onErr', error)))
 *     .get()
 */
export function tapper<Value> (...fns: SideEffect<Value>[]): Tapper<Value> {
  return value => tap(value, ...fns)
}
