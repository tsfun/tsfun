import { first, firstOr, firstOrUndefined } from '@tsfun/array'

it('first', () => {
  expect(first(['a', 'b', 'c', 'd'])).toBe('a')
})

describe('firstOr', () => {
  const def = Symbol('default')

  it('when array is not empty', () => {
    expect(firstOr(['a', 'b', 'c', 'd'], def)).toBe('a')
  })

  it('when array is empty', () => {
    expect(firstOr([], def)).toBe(def)
  })
})

describe('firstOrUndefined', () => {
  it('when array is not empty', () => {
    expect(firstOrUndefined(['a', 'b', 'c', 'd'])).toBe('a')
  })

  it('when array is empty', () => {
    expect(firstOrUndefined([])).toBe(undefined)
  })
})
