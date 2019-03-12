import assert from 'static-type-assert'
import { apply, unapply } from '@tsfun/apply'

declare function f (a: 'a', b: 'b', c: 'c'): 'r'
declare function rf (abc: ['a', 'b', 'c']): 'r'
assert<typeof rf>(apply(f))
assert<typeof f>(unapply(apply(f)))
assert<typeof f>(unapply(rf))
assert<typeof rf>(apply(unapply(rf)))

declare function g (...xs: 'x'[]): 'y'
declare function rg (xs: Iterable<'x'>): 'y'
assert<typeof rg>(apply(g))
assert<typeof g>(unapply(rg))
assert<typeof g>(unapply(rg))
assert<typeof rg>(apply(unapply(rg)))
