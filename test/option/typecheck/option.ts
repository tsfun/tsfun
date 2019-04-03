import assert from 'static-type-assert'
import { Option, Some, None, option } from '@ts-fun/option'

assert<Some<'x'>>(option('x' as 'x'))
assert<Some<0>>(option(0 as 0))
assert<Some<false>>(option(false as false))

assert<None>(option(undefined))
assert<None>(option(null))

assert<Option<any>>(option(0 as any))
assert<Option<0>>(option(0 as 0 | undefined))
assert<Option<false>>(option(false as false | null))
