import assert from 'static-type-assert'
import { pass } from '@tsfun/pipe'

import {
  methodApplierOf,
  methodCallerOf,
  applyMethod,
  callMethod,
  getMethod,
  methodGetter
} from '@tsfun/object'

const symbolKey = Symbol('symbolKey')

const object = {
  a: 0,
  b: 1,
  foo (this) {
    return 123 as const
  },
  bar (this, a: 0, b: 1) {
    return [a, b] as const
  },
  baz: (a: 0, b: 1, c: 2) => [a, b, c] as const,
  [symbolKey] (this) {
    return this
  }
} as const

const ANY: any = null

{
  const applyBar = methodApplierOf('bar')
  const applyBarResult = applyBar(object, [0, 1])
  expect<readonly [0, 1]>(applyBarResult)

  const callBar = methodCallerOf('bar')
  const callBarResult = callBar(object, 0, 1)
  expect<readonly [0, 1]>(callBarResult)
}

assert<123>(applyMethod(object, 'foo', []))
assert<123>(applyMethod(object, 'foo', [] as const))
assert<readonly [0, 1]>(applyMethod(object, 'bar', [0, 1]))
assert<readonly [0, 1]>(applyMethod(object, 'bar', [0, 1] as const))
assert<readonly [0, 1, 2]>(applyMethod(object, 'baz', [0, 1, 2]))
assert<readonly [0, 1, 2]>(applyMethod(object, 'baz', [0, 1, 2] as const))
assert<typeof object>(applyMethod(object, symbolKey, []))
assert<typeof object>(applyMethod(object, symbolKey, [] as const))

assert<123>(callMethod(object, 'foo'))
assert<readonly [0, 1]>(callMethod(object, 'bar', 0, 1))
assert<readonly [0, 1, 2]>(callMethod(object, 'baz', 0, 1, 2))
assert<typeof object>(callMethod(object, symbolKey))

{
  const foo = getMethod(object, 'foo')
  assert<() => 123>(foo)
  assert<123>(foo())

  const bar = getMethod(object, 'bar')
  assert<(a: 0, b: 1) => readonly [0, 1]>(bar)
  assert<readonly [0, 1]>(bar(0, 1))

  const baz = getMethod(object, 'baz')
  assert<(a: 0, b: 1, c: 2) => readonly [0, 1, 2]>(baz)
  assert<readonly [0, 1, 2]>(baz(0, 1, 2))

  const bySymbol = getMethod(object, symbolKey)
  assert<() => typeof object>(bySymbol)
  assert<typeof object>(bySymbol())

  assert<typeof foo | typeof bar>(getMethod(object, ANY as 'foo' | 'bar'))
  assert<typeof bar | typeof baz>(getMethod(object, ANY as 'bar' | 'baz'))
  assert<typeof foo | typeof baz>(getMethod(object, ANY as 'foo' | 'baz'))
  assert<typeof foo | typeof bar | typeof baz>(getMethod(object, ANY as 'foo' | 'bar' | 'baz'))
}

{
  const method = methodGetter(object)

  const foo = method('foo')
  assert<() => 123>(foo)
  assert<123>(foo())

  const bar = method('bar')
  assert<(a: 0, b: 1) => readonly [0, 1]>(bar)
  assert<readonly [0, 1]>(bar(0, 1))

  const baz = method('baz')
  assert<(a: 0, b: 1, c: 2) => readonly [0, 1, 2]>(baz)
  assert<readonly [0, 1, 2]>(baz(0, 1, 2))

  const bySymbol = method(symbolKey)
  assert<() => typeof object>(bySymbol)
  assert<typeof object>(bySymbol())

  assert<typeof foo | typeof bar>(method(ANY as 'foo' | 'bar'))
  assert<typeof bar | typeof baz>(method(ANY as 'bar' | 'baz'))
  assert<typeof foo | typeof baz>(method(ANY as 'foo' | 'baz'))
  assert<typeof foo | typeof bar | typeof baz>(method(ANY as 'foo' | 'bar' | 'baz'))
}

assert<123>(
  pass(object)
    .to(applyMethod, 'foo' as const, [])
    .get()
)

assert<123>(
  pass(object)
    .to(applyMethod, 'foo' as const, [] as const)
    .get()
)

assert<readonly [0, 1]>(
  pass(object)
    .to(applyMethod, 'bar' as const, [0, 1])
    .get()
)

assert<readonly [0, 1]>(
  pass(object)
    .to(applyMethod, 'bar' as const, [0, 1] as const)
    .get()
)

assert<readonly [0, 1, 2]>(
  pass(object)
    .to(applyMethod, 'baz' as const, [0, 1, 2])
    .get()
)

assert<readonly [0, 1, 2]>(
  pass(object)
    .to(applyMethod, 'baz' as const, [0, 1, 2] as const)
    .get()
)

assert<typeof object>(
  pass(object)
    .to(applyMethod, symbolKey, [])
    .get()
)

assert<typeof object>(
  pass(object)
    .to(applyMethod, symbolKey, [] as const)
    .get()
)

assert<123>(
  pass(object)
    .to(callMethod, 'foo' as const)
    .get()
)

assert<readonly [0, 1]>(
  pass(object)
    .to(callMethod, 'bar' as const, 0, 1)
    .get()
)

assert<readonly [0, 1, 2]>(
  pass(object)
    .to(callMethod, 'baz' as const, 0, 1, 2)
    .get()
)

assert<() => 123>(
  pass(object)
    .to(getMethod, 'foo' as const)
    .get()
)

assert<(a: 0, b: 1) => readonly [0, 1]>(
  pass(object)
    .to(getMethod, 'bar' as const)
    .get()
)

assert<(a: 0, b: 1, c: 2) => readonly [0, 1, 2]>(
  pass(object)
    .to(getMethod, 'baz' as const)
    .get()
)

assert(
  pass(object)
    .to(callMethod, symbolKey)
    .get()
)
