import assert from 'static-type-assert'
import { tailStrict } from '@tsfun/array'

assert<[1, 2, 3]>(tailStrict([0, 1, 2, 3] as const))
assert<[]>(tailStrict(['anything'] as const))
