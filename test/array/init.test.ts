import { init, initStrict } from '@tsfun/array'

describe('init', () => {
  it('when array is not empty', () => {
    expect(init([0, 1, 2, 3])).toEqual([0, 1, 2])
  })

  it('when array is empty', () => {
    expect(init([])).toEqual([])
  })
})

describe('initStrict', () => {
  it('when array is not empty', () => {
    expect(initStrict([0, 1, 2, 3])).toEqual([0, 1, 2])
  })
})
