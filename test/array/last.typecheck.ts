import assert from 'static-type-assert'
import { last } from '@tsfun/array'

assert<4>(last([0, 1, 2, 3, 4] as const))
assert<number>(last([0, 1, 2, 3, 4] as [0, 1, ...number[]]))
assert<number>(last([0, 1, 2, 3, 4] as number[]))
