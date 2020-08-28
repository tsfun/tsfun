import { tail, tailStrict } from '@tsfun/array'

describe('tail', () => {
  it('when array is not empty', () => {
    expect(tail([0, 1, 2, 3])).toEqual([1, 2, 3])
  })

  it('when array is empty', () => {
    expect(tail([])).toEqual([])
  })
})

describe('tailStrict', () => {
  it('when array is not empty', () => {
    expect(tailStrict([0, 1, 2, 3])).toEqual([1, 2, 3])
  })
})
