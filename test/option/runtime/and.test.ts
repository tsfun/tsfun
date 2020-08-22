import {
  some,
  none,
  and,
  andThen,
} from '@tsfun/option'

describe('and', () => {
  it('between some and some', () => {
    expect(and(some('a'), some('b'))).toEqual(some('b'))
  })

  it('between some and none', () => {
    expect(and(some('a'), none())).toEqual(none())
  })

  it('between none and some', () => {
    expect(and(none(), some('b'))).toEqual(none())
  })

  it('between none and none', () => {
    expect(and(none(), none())).toEqual(none())
  })
})

describe('andThen', () => {
  const mkSomeFn = () => jest.fn((x: any) => some({ x }))
  const mkNoneFn = () => jest.fn(none)

  describe('between some and some', () => {
    const right = mkSomeFn()
    const result = andThen(some('x'), right)

    it('returns expected value', () => {
      expect(result).toEqual(some({ x: 'x' }))
    })

    it('calls right exactly once', () => {
      expect(right).toBeCalledTimes(1)
    })

    it('calls right with contained value of left', () => {
      expect(right).toBeCalledWith('x')
    })
  })

  describe('between some and none', () => {
    const right = mkNoneFn()
    const result = andThen(some('x'), right)

    it('returns expected value', () => {
      expect(result).toEqual(none())
    })

    it('calls right exactly once', () => {
      expect(right).toBeCalledTimes(1)
    })

    it('calls right with contained value of left', () => {
      expect(right).toBeCalledWith('x')
    })
  })

  describe('between none and some', () => {
    const right = mkSomeFn()
    const result = andThen(none(), right)

    it('returns expected value', () => {
      expect(result).toEqual(none())
    })

    it('does not call right', () => {
      expect(right).not.toBeCalled()
    })
  })

  describe('between none and none', () => {
    const right = mkNoneFn()
    const result = andThen(none(), right)

    it('returns expected value', () => {
      expect(result).toEqual(none())
    })

    it('does not call right', () => {
      expect(right).not.toBeCalled()
    })
  })
})
