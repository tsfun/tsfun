import { init } from '@tsfun/array'

it('when array is not empty', () => {
  expect(init([0, 1, 2, 3])).toEqual([0, 1, 2])
})

it('when array is empty', () => {
  expect(init([])).toEqual([])
})
