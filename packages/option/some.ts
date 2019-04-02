import { Some, box } from '@tsfun/prv-option-result-common'

export { Some }

/**
 * Create a `Some`
 * @param value Value to be carried
 * @returns `Some` of `value`
 */
export const some: <Value> (value: Value) => Some<Value> = box

export default some
