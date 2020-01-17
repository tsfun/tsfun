import assert from 'static-type-assert'
import { Result } from '@tsfun/result'

const res = undefined! as Result<'value', 'error'>
assert<'value' | undefined>(res.value)
assert<'error' | undefined>(res.error)
if (res.tag) {
  assert<'value'>(res.value)
  assert<undefined>(res.error)
} else {
  assert<undefined>(res.value)
  assert<'error'>(res.error)
}
