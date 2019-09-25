import assert from 'static-type-assert'
import { apply, applyIter } from '@tsfun/function'

function foo (a: 0, b: 1, c: 2) {
  return [a, b, c] as const
}

function bar (a: 'x', b: 'x', c: 'x') {
  return [a, b, c] as const
}

function baz (...xs: 'x'[]) {
  return xs
}

function * xs () {
  while (true) {
    yield 'x' as const
  }
}

assert<readonly [0, 1, 2]>(apply(foo, [0, 1, 2]))
assert<readonly ['x', 'x', 'x']>(apply(bar, ['x', 'x', 'x']))
assert<readonly 'x'[]>(apply(baz, [...xs()]))

assert<readonly ['x', 'x', 'x']>(applyIter(bar, xs()))
assert<readonly 'x'[]>(applyIter(baz, xs()))
