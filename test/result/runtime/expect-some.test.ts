import {
  expectSome,
  expectSomeOr,
  expectSomeOrElse,
  ok,
  err
} from '@tsfun/result'

import { some, none } from '@tsfun/option'

describe('expectSome', () => {
  it('works with Some', () => {
    expect(expectSome(some('x'))).toEqual(ok('x'))
  })

  describe('works with None', () => {
    const result = expectSome(none())

    it('matches snapshot', () => {
      expect(result).toMatchSnapshot()
    })

    it('has expected structure', () => {
      expect(result).toMatchObject(err(expect.any(Error)))
    })
  })
})

describe('expectSomeOr', () => {
  it('works with Some', () => {
    expect(expectSomeOr(some('a'), 'b')).toEqual(ok('a'))
  })

  it('works with None', () => {
    expect(expectSomeOr(none(), 'b')).toEqual(err('b'))
  })
})

describe('expectSomeOrElse', () => {
  describe('works with Some', () => {
    const error = jest.fn(() => 'b')
    const result = expectSomeOrElse(some('a'), error)

    it('returns expected result', () => {
      expect(result).toEqual(ok('a'))
    })

    it('does not call error function', () => {
      expect(error).not.toBeCalled()
    })
  })

  describe('works with None', () => {
    const error = jest.fn(() => 'b')
    const result = expectSomeOrElse(none(), error)

    it('returns expected result', () => {
      expect(result).toEqual(err('b'))
    })

    it('calls error function exactly once', () => {
      expect(error).toBeCalledTimes(1)
    })

    it('calls error function without any argument', () => {
      expect(error).toBeCalledWith()
    })
  })
})
