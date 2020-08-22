import { AsyncOption } from './utils/types'
import { unwrap, unwrapOrElse } from './unwrap'

/**
 * Turn a `Some` into a `Promise` that resolves
 * or turn a `None` into a `Promise` that rejects
 * @param option Option to unwrap
 * @returns A `Promise` that may resolve contained value
 */
export const asyncUnwrap = async <Value = never>(option: AsyncOption<Value>) => unwrap(await option)

/**
 * Unwrap contained value of a `Some`,
 * or throws an error
 * @param option Option to unwrap
 * @param message Error to throw when `option` does not contain a value
 * @returns Contained value
 */
export const asyncUnwrapOrErr = <
  Value = never,
  Message = Error,
>(option: AsyncOption<Value>, message: Message) =>
  asyncUnwrapOrElse(option, () => {
    throw message
  })

/**
 * Return contained value of a `Some`
 * or default value
 * @param option Option to unwrap
 * @param def Value to return when `option` does not contain a value
 * @returns Promise that resolves contained value or `def`
 */
export const asyncUnwrapOr = <Value = never, Default = Value>(
  option: AsyncOption<Value>,
  def: Default,
) => asyncUnwrapOrElse(option, () => def)

/**
 * Return contained value of a `Some`
 * or call a function
 * @param option Option to unwrap
 * @param def Function to be called when `option` does not contain a value
 * @returns Promise that resolves to either contained value or returning value of `none`
 */
export const asyncUnwrapOrElse = async <Value = never, Default = Value>(
  option: AsyncOption<Value>,
  def: () => Default | Promise<Default>,
) => unwrapOrElse(await option, def)
