import { id } from '@tsfun/misc'

it('returns the value it gets', () => {
  const value = Symbol('value')
  expect(id(value)).toBe(value)
})
