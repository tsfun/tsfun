import assert from 'static-type-assert'
import { initStrict } from '@tsfun/array'

assert<[0, 1, 2]>(initStrict([0, 1, 2, 3] as const))
assert<[]>(initStrict(['anything'] as const))
