import {
  Result,
  or,
  orElse,
  ok,
  err,
} from '@tsfun/result'

describe('or', () => {
  it('between ok or ok', () => {
    expect(or(ok('a'), ok('b'))).toEqual(ok('a'))
  })

  it('between ok or err', () => {
    expect(or(ok('a'), err('b'))).toEqual(ok('a'))
  })

  it('between err or ok', () => {
    expect(or(err('a'), ok('b'))).toEqual(ok('b'))
  })

  it('between err or err', () => {
    expect(or(err('a'), err('b'))).toEqual(err('b'))
  })
})

describe('orElse', () => {
  const mkfn = (fn: (x: any) => Result<any, any>) => jest.fn((x: any) => fn({ x }))

  describe('between ok and ok', () => {
    const right = mkfn(ok)
    const result = orElse(ok('x'), right)

    it('returns expected value', () => {
      expect(result).toEqual(ok('x'))
    })

    it('does not call right', () => {
      expect(right).not.toBeCalled()
    })
  })

  describe('between ok and err', () => {
    const right = mkfn(err)
    const result = orElse(ok('x'), right)

    it('returns expected value', () => {
      expect(result).toEqual(ok('x'))
    })

    it('does not call right', () => {
      expect(right).not.toBeCalled()
    })
  })

  describe('between err and ok', () => {
    const right = mkfn(ok)
    const result = orElse(err('x'), right)

    it('returns expected value', () => {
      expect(result).toEqual(ok({ x: 'x' }))
    })

    it('calls right exactly once', () => {
      expect(right).toBeCalledTimes(1)
    })

    it('calls right with carried error of left', () => {
      expect(right).toBeCalledWith('x')
    })
  })

  describe('between err and err', () => {
    const right = mkfn(err)
    const result = orElse(err('x'), right)

    it('returns expected value', () => {
      expect(result).toEqual(err({ x: 'x' }))
    })

    it('calls right exactly once', () => {
      expect(right).toBeCalledTimes(1)
    })

    it('calls right with carried error of left', () => {
      expect(right).toBeCalledWith('x')
    })
  })
})
