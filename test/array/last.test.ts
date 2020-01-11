import { last, lastOr, lastOrUndefined } from '@tsfun/array'

it('last', () => {
  expect(last(['a', 'b', 'c', 'd'])).toBe('d')
})

describe('lastOr', () => {
  const def = Symbol('default')

  it('when array is not empty', () => {
    expect(lastOr(['a', 'b', 'c', 'd'], def)).toBe('d')
  })

  it('when array is empty', () => {
    expect(lastOr([], def)).toBe(def)
  })
})

describe('lastOrUndefined', () => {
  it('when array is not empty', () => {
    expect(lastOrUndefined(['a', 'b', 'c', 'd'])).toBe('d')
  })

  it('when array is empty', () => {
    expect(lastOrUndefined([])).toBe(undefined)
  })
})
