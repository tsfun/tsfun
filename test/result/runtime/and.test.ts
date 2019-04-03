import {
  Result,
  and,
  andThen,
  ok,
  err
} from '@ts-fun/result'

describe('and', () => {
  it('between ok and ok', () => {
    expect(and(ok('a'), ok('b'))).toEqual(ok('b'))
  })

  it('between ok and err', () => {
    expect(and(ok('a'), err('b'))).toEqual(err('b'))
  })

  it('between err and ok', () => {
    expect(and(err('a'), ok('b'))).toEqual(err('a'))
  })

  it('between err and err', () => {
    expect(and(err('a'), err('b'))).toEqual(err('a'))
  })
})

describe('andThen', () => {
  const mkfn = (fn: (x: any) => Result<any, any>) => jest.fn((x: any) => fn({ x }))

  describe('between ok and ok', () => {
    const right = mkfn(ok)
    const result = andThen(ok('x'), right)

    it('returns expected value', () => {
      expect(result).toEqual(ok({ x: 'x' }))
    })

    it('calls right exactly once', () => {
      expect(right).toBeCalledTimes(1)
    })

    it('calls right with carried payload of left', () => {
      expect(right).toBeCalledWith('x')
    })
  })

  describe('between ok and err', () => {
    const right = mkfn(err)
    const result = andThen(ok('x'), right)

    it('returns expected value', () => {
      expect(result).toEqual(err({ x: 'x' }))
    })

    it('calls right exactly once', () => {
      expect(right).toBeCalledTimes(1)
    })

    it('calls right with carried payload of left', () => {
      expect(right).toBeCalledWith('x')
    })
  })

  describe('between err and ok', () => {
    const right = mkfn(ok)
    const result = andThen(err('x'), right)

    it('returns expected value', () => {
      expect(result).toEqual(err('x'))
    })

    it('does not call right', () => {
      expect(right).not.toBeCalled()
    })
  })

  describe('between err and err', () => {
    const right = mkfn(err)
    const result = andThen(err('x'), right)

    it('returns expected value', () => {
      expect(result).toEqual(err('x'))
    })

    it('does not call right', () => {
      expect(right).not.toBeCalled()
    })
  })
})
