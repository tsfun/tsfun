import assert from 'static-type-assert'
import { init } from '@tsfun/array'

assert<[0, 1, 2]>(init([0, 1, 2, 3] as const))
assert<[]>(init(['anything'] as const))
assert<any[]>(init([])) // when user knows that input type is `[]`, precise return type is not that useful
