import { ok, err } from '@ts-fun/result'
import { expectOk, some, none } from '@ts-fun/option'

it('from Ok to Some', () => {
  expect(expectOk(ok('x'))).toMatchObject(some('x'))
})

it('from Err to None', () => {
  expect(expectOk(err('x'))).toMatchObject(none())
})
