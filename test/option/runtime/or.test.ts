import {
  some,
  none,
  or,
  orElse
} from '@tsfun/option'

describe('and', () => {
  it('between some and some', () => {
    expect(or(some('a'), some('b'))).toEqual(some('a'))
  })

  it('between some and none', () => {
    expect(or(some('a'), none())).toEqual(some('a'))
  })

  it('between none and some', () => {
    expect(or(none(), some('b'))).toEqual(some('b'))
  })

  it('between none and none', () => {
    expect(or(none(), none())).toEqual(none())
  })
})

describe('orElse', () => {
  const mkSomeFn = () => jest.fn(() => some('b'))
  const mkNoneFn = () => jest.fn(none)

  describe('between some and some', () => {
    const right = mkSomeFn()
    const result = orElse(some('a'), right)

    it('returns expected value', () => {
      expect(result).toEqual(some('a'))
    })

    it('does not call right', () => {
      expect(right).not.toBeCalled()
    })
  })

  describe('between some and none', () => {
    const right = mkNoneFn()
    const result = orElse(some('a'), right)

    it('returns expected value', () => {
      expect(result).toEqual(some('a'))
    })

    it('does not call right', () => {
      expect(right).not.toBeCalled()
    })
  })

  describe('between none and some', () => {
    const right = mkSomeFn()
    const result = orElse(none(), right)

    it('returns expected value', () => {
      expect(result).toEqual(some('b'))
    })

    it('calls right exactly once', () => {
      expect(right).toBeCalledTimes(1)
    })

    it('calls right no arguments', () => {
      expect(right).toBeCalledWith()
    })
  })

  describe('between none and none', () => {
    const right = mkNoneFn()
    const result = orElse(none(), right)

    it('returns expected value', () => {
      expect(result).toEqual(none())
    })

    it('calls right exactly once', () => {
      expect(right).toBeCalledTimes(1)
    })

    it('calls right with no arguments', () => {
      expect(right).toBeCalledWith()
    })
  })
})
