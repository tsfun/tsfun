import { pick, pickOne } from '@tsfun/object'

it('pick', () => {
  expect(pick({
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4
  }, ['b', 'd', 'e'])).toEqual({
    b: 1,
    d: 3,
    e: 4
  })
})

it('pickOne', () => {
  expect(pickOne({ a: 0, b: 1, c: 2 }, 'b')).toEqual({ b: 1 })
})
