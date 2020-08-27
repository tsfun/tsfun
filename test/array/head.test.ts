import { head, headOr, headOrUndefined } from '@tsfun/array'

it('head', () => {
  expect(head(['a', 'b', 'c', 'd'])).toBe('a')
})

describe('headOr', () => {
  const def = Symbol('default')

  it('when array is not empty', () => {
    expect(headOr(['a', 'b', 'c', 'd'], def)).toBe('a')
  })

  it('when array is empty', () => {
    expect(headOr([], def)).toBe(def)
  })
})

describe('headOrUndefined', () => {
  it('when array is not empty', () => {
    expect(headOrUndefined(['a', 'b', 'c', 'd'])).toBe('a')
  })

  it('when array is empty', () => {
    expect(headOrUndefined([])).toBe(undefined)
  })
})
