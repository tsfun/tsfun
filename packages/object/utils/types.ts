import { Assign } from 'utility-types'

/**
 * Turn `null` into `{}`
 */
type NullObject<X> = X extends null ? {} : X

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
    [key in SoleKey]: Value
  }>
}[Key]
