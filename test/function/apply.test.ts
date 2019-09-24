import { apply, applyIter } from '@tsfun/function'

it('apply', () => {
  const join = (...args: number[]) => args.join(', ')
  expect(apply(join, [0, 1, 2, 3])).toBe('0, 1, 2, 3')
})

it('applyIter', () => {
  function * gen () {
    yield * 'abcdef'
  }
  const join = (...args: string[]) => args.join(', ')
  expect(applyIter(join, gen())).toBe('a, b, c, d, e, f')
})

it('applyIter is apply', () => {
  expect(applyIter).toBe(apply)
})
