import { Option } from './option'
import { match } from './match'

/**
 * Return contained value of a `Some`
 * or throw a `TypeError`
 * @param option Option to unwrap
 * @returns Contained value
 */
export const unwrap = <Value = never> (option: Option<Value>) => unwrapOrElse(option, () => {
  throw new TypeError('Cannot unwrap a None')
})

/**
 * Unwrap contained value of a `Some`,
 * or throws an error
 * @param option Option to unwrap
 * @param message Error to throw when `option` does not contain a value
 * @returns Contained value
 */
export const unwrapOrErr = <
  Value = never,
  Message = Error
> (option: Option<Value>, message: Message) =>
  unwrapOrElse(option, () => { throw message })

/**
 * Return contained value of a `Some`
 * or default value
 * @param option Option to unwrap
 * @param def Value to return when `option` does not contain a value
 * @returns Either contained value or `def`
 */
export const unwrapOr = <Value, Default> (
  option: Option<Value>,
  def: Default
) => unwrapOrElse(option, () => def)

/**
 * Return contained value of a `Some`
 * or call a function
 * @param option Option to unwrap
 * @param def Function to be called when option does not contain a value
 * @returns Either contained value or returning value of `none`
 */
export const unwrapOrElse = <Value, Default = Value> (
  option: Option<Value>,
  def: () => Default
) => match(option, { some: x => x, none: def })
