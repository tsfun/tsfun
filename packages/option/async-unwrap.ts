import { AsyncOption } from './utils/types'
import { unwrap, unwrapOrElse } from './unwrap'

/**
 * Turn a `Some` into a `Promise` that resolves
 * or turn a `None` into a `Promise` that rejects
 * @param option Option to unwrap
 * @returns A `Promise` that may resolve contained value
 */
export const asyncUnwrap =
  async <Value> (option: AsyncOption<Value>) => unwrap(await option)

/**
 * Return contained value of a `Some`
 * or default value
 * @param option Option to unwrap
 * @param def Value to return when `option` does not contain a value
 * @returns Promise that resolves contained value or `def`
 */
export const asyncUnwrapOr = async <Value, Default = Value> (
  option: AsyncOption<Value>,
  def: Default
) => asyncUnwrapOrElse(option, () => def)

/**
 * Return contained value of a `Some`
 * or call a function
 * @param option Option to unwrap
 * @param def Function to be called when `option` does not contain a value
 * @returns Promise that resolves to either contained value or returning value of `none`
 */
export const asyncUnwrapOrElse = async <Value, Default = Value> (
  option: AsyncOption<Value>,
  def: () => Default | Promise<Default>
) => unwrapOrElse(await option, def)
