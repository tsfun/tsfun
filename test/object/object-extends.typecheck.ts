import assert from 'static-type-assert'
import { objectExtends } from '@tsfun/object'

const foo = Symbol('foo')
const bar = Symbol('bar')

const proto = {
  abc: 123,
  456: 'def',
  [foo]: bar
} as const

const properties = {
  abc: 123,
  456: 'def',
  [bar]: foo
} as const

const withNull = objectExtends(null, properties)
assert<typeof properties>(withNull)
assert<typeof withNull>(properties)

const withNonNull = objectExtends(proto, properties)
assert<typeof proto>(withNonNull)
assert<typeof properties>(withNonNull)
assert<typeof withNonNull>({ ...proto, ...properties })

const withMaybeNull = objectExtends(proto as null | typeof proto, properties)
assert<typeof properties>(withMaybeNull)
assert<Partial<typeof proto>>(withMaybeNull)
assert<typeof withNonNull>({ ...proto, ...properties })

const sharedA = {
  prvA: 'prvA',
  shared: 'sharedA'
} as const
const sharedB = {
  prvB: 'prvB',
  shared: 'sharedB'
} as const
const mergeShared = objectExtends(sharedA, sharedB)
assert<{
  readonly prvA: 'prvA'
  readonly prvB: 'prvB'
  readonly shared: 'sharedB'
}>(mergeShared)
assert<typeof mergeShared>({
  prvA: 'prvA',
  prvB: 'prvB',
  shared: 'sharedB'
} as const)
