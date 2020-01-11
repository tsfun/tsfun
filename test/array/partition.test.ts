import { partition, partitionPredicate } from '@tsfun/array'

it('partitionPredicate is partition', () => {
  expect(partitionPredicate).toBe(partition)
})

describe('array', () => {
  const getArray = () => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

  it('mod 2', () => {
    expect(partition(
      getArray(),
      x => x % 2 === 0
    )).toEqual([
      [0, 2, 4, 6, 8, 10, 12, 14],
      [1, 3, 5, 7, 9, 11, 13, 15]
    ])
  })

  it('mod 3', () => {
    expect(partition(
      getArray(),
      x => x % 3 === 0
    )).toEqual([
      [0, 3, 6, 9, 12, 15],
      [1, 2, 4, 5, 7, 8, 10, 11, 13, 14]
    ])
  })

  it('mod 4', () => {
    expect(partition(
      getArray(),
      x => x % 4 === 0
    )).toEqual([
      [0, 4, 8, 12],
      [1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15]
    ])
  })
})

describe('iterator', () => {
  function * iterate () {
    for (let i = 0; i !== 16; ++i) {
      yield i
    }
  }

  it('mod 2', () => {
    expect(partition(
      iterate(),
      x => x % 2 === 0
    )).toEqual([
      [0, 2, 4, 6, 8, 10, 12, 14],
      [1, 3, 5, 7, 9, 11, 13, 15]
    ])
  })

  it('mod 3', () => {
    expect(partition(
      iterate(),
      x => x % 3 === 0
    )).toEqual([
      [0, 3, 6, 9, 12, 15],
      [1, 2, 4, 5, 7, 8, 10, 11, 13, 14]
    ])
  })

  it('mod 4', () => {
    expect(partition(
      iterate(),
      x => x % 4 === 0
    )).toEqual([
      [0, 4, 8, 12],
      [1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15]
    ])
  })
})
