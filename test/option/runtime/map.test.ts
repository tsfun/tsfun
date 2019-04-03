import { Option, map, some, none } from '@tsfun/option'
import { pass, pipe } from '@tsfun/pipe'

describe('standalone', () => {
  const fn = <X> (x: X) => [x]

  it('works with Some', () => {
    expect(map(some('x'), fn)).toEqual(some(['x']))
  })

  it('works with None', () => {
    expect(map(none(), fn)).toEqual(none())
  })
})

describe('@tsfun/pipe', () => {
  describe('pass', () => {
    it('from Some to Some', () => {
      const result = pass(some(3))
        .to(map, (x: number) => x + 1)
        .to(map, (x: number) => x * 2)
        .get()
      expect(result).toEqual(some((3 + 1) * 2))
    })

    it('from None to None', () => {
      const result = pass(none())
        .to(map, (x: number) => x + 1)
        .to(map, (x: number) => x * 2)
        .get()
      expect(result).toEqual(none())
    })
  })

  describe('pipe', () => {
    const pipeline = pipe((fn: (x: number) => Option<number>, x: number) => fn(x))
      .to(map, (x: number) => x + 1)
      .to(map, (x: number) => x * 2)
      .get

    it('from Some to Some', () => {
      expect(pipeline(some, 3)).toEqual(some((3 + 1) * 2))
    })

    it('from None to None', () => {
      expect(pipeline(none, 3)).toEqual(none())
    })
  })
})
