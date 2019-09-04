import assert from 'static-type-assert'
import { pass } from '@tsfun/pipe'
import { addProperty } from '@tsfun/object'

assert<{
  readonly abc: 123
}>(addProperty(null, 'abc', 123 as const))

assert<{
  readonly a: 0
  readonly b: 1
  readonly c: 2
}>(addProperty({ a: 0, b: 1 } as const, 'c', 2 as const))

assert<{
  readonly a: 'b'
  readonly b: 1
}>(addProperty({ a: 0, b: 1 } as const, 'a', 'b' as const))

const ANY = null as any

const unionObject = addProperty(null, ANY as 'a' | 'b' | 0 | 1, 'value' as const)
assert<
  { readonly a: 'value' } |
  { readonly b: 'value' } |
  { readonly 0: 'value' } |
  { readonly 1: 'value' }
>(unionObject)
assert<typeof unionObject>({ a: 'value' } as const)
assert<typeof unionObject>({ b: 'value' } as const)
assert<typeof unionObject>({ 0: 'value' } as const)
assert<typeof unionObject>({ 1: 'value' } as const)

const unionProto = { abc: 123, def: 456 } as const
const unionMergedObject = addProperty(unionProto, ANY as 'a' | 'b' | 0 | 1, 'value' as const)
assert<
  {
    readonly abc: 123,
    readonly def: 456,
    readonly a: 'value'
  } |
  {
    readonly abc: 123,
    readonly def: 456,
    readonly b: 'value'
  } |
  {
    readonly abc: 123,
    readonly def: 456,
    readonly 0: 'value'
  } |
  {
    readonly abc: 123,
    readonly def: 456,
    readonly 1: 'value'
  }
>(unionMergedObject)
assert<typeof unionMergedObject>({ a: 'value', abc: 123, def: 456 } as const)
assert<typeof unionMergedObject>({ b: 'value', abc: 123, def: 456 } as const)
assert<typeof unionMergedObject>({ 0: 'value', abc: 123, def: 456 } as const)
assert<typeof unionMergedObject>({ 1: 'value', abc: 123, def: 456 } as const)

const key = Symbol('key')
const value = Symbol('value')
assert<{
  readonly abc: 123
  readonly 456: 'def'
  readonly [key]: typeof value
}>(
  pass(null)
    .to(addProperty, 'abc' as const, 123 as const)
    .to(addProperty, 456 as const, 'def' as const)
    .to(addProperty, key, value)
    .get()
)
