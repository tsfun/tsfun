import { ok, err } from '@tsfun/result'
import { expectOk, some, none } from '@tsfun/option'

it('from Ok to Some', () => {
  expect(expectOk(ok('x'))).toMatchObject(some('x'))
})

it('from Err to None', () => {
  expect(expectOk(err('x'))).toMatchObject(none())
})
