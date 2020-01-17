import assert from 'static-type-assert'
import { Option, Some, None, option, none } from '@tsfun/option'

const ANY: any = null

assert<undefined>(none().value)

assert<Some<'x'>>(option('x' as 'x'))
assert<Some<0>>(option(0 as 0))
assert<Some<false>>(option(false as false))

assert<None>(option(undefined))
assert<None>(option(null))
assert<None>(option(ANY as undefined | null))

assert<Option<any>>(option(0 as any))
assert<Option<0>>(option(0 as 0 | undefined))
assert<Option<false>>(option(false as false | null))

const opt = ANY as Option<'value'>
assert<'value' | undefined>(opt.value)
if (opt.tag) {
  assert<'value'>(opt.value)
} else {
  assert<undefined>(opt.value)
}
