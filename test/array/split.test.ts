import { splitAt } from '@tsfun/array'

describe('splitAt', () => {
  it('-4', () => {
    expect(splitAt([0, 1, 2, 3], -4)).toEqual([[], [0, 1, 2, 3]])
  })

  it('-3', () => {
    expect(splitAt([0, 1, 2, 3], -3)).toEqual([[0], [1, 2, 3]])
  })

  it('-2', () => {
    expect(splitAt([0, 1, 2, 3], -2)).toEqual([[0, 1], [2, 3]])
  })

  it('-1', () => {
    expect(splitAt([0, 1, 2, 3], -1)).toEqual([[0, 1, 2], [3]])
  })

  it(' 0', () => {
    expect(splitAt([0, 1, 2, 3], 0)).toEqual([[], [0, 1, 2, 3]])
  })

  it(' 1', () => {
    expect(splitAt([0, 1, 2, 3], 1)).toEqual([[0], [1, 2, 3]])
  })

  it(' 2', () => {
    expect(splitAt([0, 1, 2, 3], 2)).toEqual([[0, 1], [2, 3]])
  })

  it(' 3', () => {
    expect(splitAt([0, 1, 2, 3], 3)).toEqual([[0, 1, 2], [3]])
  })

  it(' 4', () => {
    expect(splitAt([0, 1, 2, 3], 4)).toEqual([[0, 1, 2, 3], []])
  })
})
