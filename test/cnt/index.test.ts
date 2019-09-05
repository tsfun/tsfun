import cnt from '@tsfun/cnt'

const value = Symbol('value')

it('returns a function', () => {
  expect(cnt(value)).toEqual(expect.any(Function))
})

it('resulting function returns given value', () => {
  expect(cnt(value)()).toBe(value)
})
