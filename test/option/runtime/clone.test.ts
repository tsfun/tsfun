import { Option, clone, some, none } from '@tsfun/option'

const init = <X = never>(original: Option<X>) => ({ original, copy: clone(original) })

describe('clone(some(x))', () => {
  const { original, copy } = init(some('value'))

  it('original and copy are not the same object', () => {
    expect(copy).not.toBe(original)
  })

  it('original and copy have identical content', () => {
    expect(copy).toEqual(original)
  })
})

describe('clone(none())', () => {
  const { original, copy } = init(none())

  it('original and copy are not the same object', () => {
    expect(copy).not.toBe(original)
  })

  it('original and copy have identical content', () => {
    expect(copy).toEqual(original)
  })
})
