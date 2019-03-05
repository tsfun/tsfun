import assert from 'static-type-assert'
import { pass, pipe } from '@tsfun/pipe'

declare const x0: 0
declare const f0t1: (x: 0) => 1
declare const f1t2: (x: 1) => 2
declare const f2t3: (x: 2) => 3
declare const f3t4: (x: 3) => 4
declare const ft0: () => 0
declare const f321t0: (a: 3, b: 2, c: 1) => 0

assert<4>(
  pass(x0).to(f0t1).to(f1t2).to(f2t3).to(f3t4).get()
)

assert<() => 4>(
  pipe(ft0).to(f0t1).to(f1t2).to(f2t3).to(f3t4).get
)

assert<(a: 3, b: 2, c: 1) => 4>(
  pipe(f321t0).to(f0t1).to(f1t2).to(f2t3).to(f3t4).get
)
