import { pass } from '@tsfun/pipe'
import { setProperty } from '@tsfun/object'

function setup () {
  const original = Object.freeze({
    a: 0,
    b: 1,
    c: 2
  })

  const result = pass(original)
    .to(setProperty, 'b' as const, 'B')
    .to(setProperty, 'd' as const, 'D')
    .get()

  return { original, result }
}

it('returns expected object', () => {
  const { result } = setup()
  expect(result).toEqual({
    a: 0,
    b: 'B',
    c: 2,
    d: 'D'
  })
})

it('returned object is not original', () => {
  const { original, result } = setup()
  expect(result).not.toBe(original)
})

it('original object is not mutated', () => {
  const { original } = setup()
  expect(original).toEqual({
    a: 0,
    b: 1,
    c: 2
  })
})
