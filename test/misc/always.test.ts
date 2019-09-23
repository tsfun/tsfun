import { always, nullary } from '@tsfun/misc'

const value = Symbol('value')

it('returns a function', () => {
  expect(always(value)).toEqual(expect.any(Function))
})

it('resulting function returns given value', () => {
  expect(always(value)()).toBe(value)
})

it('nullary is an alias of always', () => {
  expect(nullary).toBe(always)
})
