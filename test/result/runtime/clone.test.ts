import { Result, clone, ok, err } from '@ts-fun/result'

const init = <X = never, E = never> (original: Result<X, E>) => ({ original, copy: clone(original) })

describe('clone(ok(x))', () => {
  const { original, copy } = init(ok('payload'))

  it('original and copy are not the same object', () => {
    expect(copy).not.toBe(original)
  })

  it('original and copy have identical content', () => {
    expect(copy).toEqual(original)
  })
})

describe('clone(err(e))', () => {
  const { original, copy } = init(err('error'))

  it('original and copy are not the same object', () => {
    expect(copy).not.toBe(original)
  })

  it('original and copy have identical content', () => {
    expect(copy).toEqual(original)
  })
})
