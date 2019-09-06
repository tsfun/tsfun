import id from '@tsfun/id'

it('works', () => {
  const value = Symbol('value')
  expect(id(value)).toBe(value)
})
