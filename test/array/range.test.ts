import { range } from '@tsfun/array'

it('range(4)', () => {
  expect(range(4)).toEqual([0, 1, 2, 3])
})

it('range(0)', () => {
  expect(range(0)).toEqual([])
})
