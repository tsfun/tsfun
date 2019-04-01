import { option, ok, err } from '@tsfun/result'
import { some, none } from '@tsfun/option'

it('from Ok to Some', () => {
  expect(option(ok('x'))).toMatchObject(some('x'))
})

it('from Err to None', () => {
  expect(option(err('x'))).toMatchObject(none())
})
