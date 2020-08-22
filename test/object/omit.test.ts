import { omit, omitOne } from '@tsfun/object'

it('omit', () => {
  expect(omit({
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
  }, ['a', 'c', 'e'])).toEqual({
    b: 1,
    d: 3,
  })
})

it('omitOne', () => {
  expect(omitOne({ a: 0, b: 1, c: 2 }, 'b')).toEqual({ a: 0, c: 2 })
})
