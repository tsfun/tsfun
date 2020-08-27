import assert from 'static-type-assert'
import { tail } from '@tsfun/array'

assert<[1, 2, 3]>(tail([0, 1, 2, 3] as const))
assert<[]>(tail(['anything'] as const))
assert<never[]>(tail([]))
