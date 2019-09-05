import assert from 'static-type-assert'
import { pass } from '@tsfun/pipe'
import { curry, uncurry } from '@tsfun/curry'

assert<
  (a: 1, b: 2) => (c: 0) => 3
>(curry(
  (_0: 0, _1: 1, _2: 2) => 3 as const
))

assert<
  <A, B, C> (b: B, c: C) => (a: A) => readonly [A, B, C]
>(curry(
  <A, B, C> (a: A, b: B, c: C) => [a, b, c] as const
))

assert<
  (d: 3) => (c: 2) => (b: 1) => (a: 0) => readonly [0, 1, 2, 3]
>(
  pass((a: 0, b: 1, c: 2, d: 3) => [a, b, c, d] as const)
    .to(curry)
    .to(curry)
    .to(curry)
    .get()
)

assert<
  (a: 0, b: 1, c: 2) => 3
>(uncurry(
  (_1: 1, _2: 2) => (_0: 0) => 3 as const
))

assert<
  (x: any) => 123
>(uncurry(() => () => 123 as const))

assert<
  (d: 3, c: 2, b: 1, a: 0) => readonly [0, 1, 2, 3]
>(
  pass((a: 0) => (b: 1) => (c: 2) => (d: 3) => [a, b, c, d] as const)
    .to(uncurry)
    .to(uncurry)
    .to(uncurry)
    .get()
)
