import { tail } from '@tsfun/array'

it('when array is not empty', () => {
  expect(tail([0, 1, 2, 3])).toEqual([1, 2, 3])
})
