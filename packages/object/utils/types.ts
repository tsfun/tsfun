import { Assign } from 'utility-types'

/**
 * Turn `null` into `{}`
 */
type NullObject<X> = X extends null ? {} : X

/**
 * Create a dict of one key-value pair
 */
export type SingleDict<Key extends string | number | symbol, Value> = {
  readonly [_ in Key]: Value
}

/**
 * Return type of `objectExtends`
 */
export type ObjectExtends<
  Proto extends object | null,
  Properties extends object | null
> = Assign<
  NullObject<Proto>,
  NullObject<Properties>
>

/**
 * Return type of `addProperty`
 */
export type AddProperty<
  Proto extends object | null,
  Key extends string | number | symbol,
  Value
> = {
  [SoleKey in Key]: ObjectExtends<Proto, {
    [_ in SoleKey]: Value
  }>
}[Key]

/**
 * Extract parameter types from `Fn` if it is a function
 */
export type MaybeParam<Fn> = Fn extends (...args: any[]) => any ? Parameters<Fn> : never

/**
 * Extract return type from `Fn` if it is a function
 */
export type MaybeReturn<Fn> = Fn extends (...args: any[]) => any ? ReturnType<Fn> : never
