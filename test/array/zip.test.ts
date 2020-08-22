import { zip } from '@tsfun/array'

it('when two arrays are of same length', () => {
  expect(zip(
    [0, 1, 2, 3],
    ['a', 'b', 'c', 'd'],
  )).toEqual([
    [0, 'a'],
    [1, 'b'],
    [2, 'c'],
    [3, 'd'],
  ])
})

it('when left array is longer', () => {
  expect(zip(
    [0, 1, 2, 3, 4, 5, 6],
    ['a', 'b', 'c', 'd'],
  )).toEqual([
    [0, 'a'],
    [1, 'b'],
    [2, 'c'],
    [3, 'd'],
  ])
})

it('when right array is longer', () => {
  expect(zip(
    [0, 1, 2, 3],
    ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  )).toEqual([
    [0, 'a'],
    [1, 'b'],
    [2, 'c'],
    [3, 'd'],
  ])
})
