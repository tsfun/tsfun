import assert from 'static-type-assert'
import { pass } from '@tsfun/pipe'
import { propertyOf, getProperty, propertyGetter } from '@tsfun/object'

const symbolKey = Symbol('symbolKey')
const symbolVal = Symbol('symbolVal')
const ANY: any = null

const object = {
  a: 0,
  b: 1,
  c: 'string',
  123: 456,
  [symbolKey]: symbolVal
} as const

const getA = propertyOf('a')
const get123 = propertyOf(123)
const getSymbol = propertyOf(symbolKey)
assert<0>(getA(object))
assert<456>(get123(object))
assert<typeof symbolVal>(getSymbol(object))

assert<0>(getProperty(object, 'a'))
assert<1>(getProperty(object, 'b'))
assert<'string'>(getProperty(object, 'c'))
assert<456>(getProperty(object, 123))
assert<typeof symbolVal>(getProperty(object, symbolKey))
assert<0 | 1>(getProperty(object, ANY as 'a' | 'b'))
assert<1 | 'string'>(getProperty(object, ANY as 'b' | 'c'))
assert<0 | 1 | 'string'>(getProperty(object, ANY as 'a' | 'b' | 'c'))
assert<456 | typeof symbolVal>(getProperty(object, ANY as 123 | typeof symbolKey))

assert<0>(
  pass(object)
    .to(getProperty, 'a' as const)
    .get()
)

assert<1>(
  pass(object)
    .to(getProperty, 'b' as const)
    .get()
)

assert<'string'>(
  pass(object)
    .to(getProperty, 'c' as const)
    .get()
)

const fn = propertyGetter(object)

assert<(x: 'a') => 0>(fn)
assert<(x: 'b') => 1>(fn)
assert<(x: 'c') => 'string'>(fn)
assert<(x: 'a' | 'b') => 0 | 1>(fn)
assert<(x: 'b' | 'c') => 1 | 'string'>(fn)
assert<(x: 'a' | 'c') => 0 | 'string'>(fn)
assert<(x: 'a' | 'b' | 'c') => 0 | 1 | 'string'>(fn)
assert<0>(fn('a'))
assert<1>(fn('b'))
assert<'string'>(fn('c'))
assert<0 | 1>(fn(ANY as 'a' | 'b'))
assert<1 | 'string'>(fn(ANY as 'b' | 'c'))
assert<0 | 1 | 'string'>(fn(ANY as 'a' | 'b' | 'c'))
assert<456 | typeof symbolVal>(fn(ANY as 123 | typeof symbolKey))
