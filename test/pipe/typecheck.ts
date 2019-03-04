import assert from 'static-type-assert'
import { pass, pipe } from '@tsfun/pipe'

declare const x0: 'fa'
declare const e: () => 'fa'
declare const f: (a: 'fa', b: 'fb', c: 'fc') => 'ga'
declare const g: (a: 'ga', b: 'gb') => 'ha'
declare const h: (a: 'ha') => 'R'

const x1 = pass(x0).get()
assert<'fa'>(x1)

const x2 = pass(x0).to(f, 'fb', 'fc').get()
assert<'ga'>(x2)

const x3 = pass(x0).to(f, 'fb', 'fc').to(g, 'gb').get()
assert<'ha'>(x3)

const x4 = pass(x0).to(f, 'fb', 'fc').to(g, 'gb').to(h).get()
assert<'R'>(x4)

const fgh = pipe(f).to(g, 'gb').to(h).get
assert<
  (...args: Parameters<typeof f>) => ReturnType<typeof h>
>(fgh)

const efgh = pipe(e).to(f, 'fb', 'fc').to(g, 'gb').to(h).get
assert<() => 'R'>(efgh)
