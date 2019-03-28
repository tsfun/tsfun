import * as xjest from 'extra-jest'
const { expectFunction } = xjest.expectFunction

import {
  unwrap,
  unwrapOr,
  unwrapOrElse,
  ok,
  err
} from '@tsfun/result'

describe('unwrap', () => {
  describe('with an Ok', () => {
    it('returns carried payload', () => {
      expect(unwrap(ok('payload'))).toBe('payload')
    })
  })

  describe('with an Err', () => {
    it('throws carried error', () => {
      expectFunction(() => unwrap(err('error'))).throws.toBe('error')
    })
  })
})

describe('unwrapOr', () => {
  describe('with an Ok', () => {
    it('returns carried payload', () => {
      expect(unwrapOr(ok('a'), 'b')).toBe('a')
    })
  })

  describe('with an Err', () => {
    it('returns provided default', () => {
      expect(unwrapOr(err('a'), 'b')).toBe('b')
    })
  })
})

describe('unwrapOrElse', () => {
  const def = (error: any) => `ERROR = ${JSON.stringify(error)}`
  const mkfn = () => jest.fn(def)

  describe('with an Ok', () => {
    const fn = mkfn()
    const res = unwrapOrElse(ok('payload'), fn)

    it('returns carried payload', () => {
      expect(res).toBe('payload')
    })

    it('does not call provided function', () => {
      expect(fn).not.toBeCalled()
    })
  })

  describe('with an Err', () => {
    const fn = mkfn()
    const res = unwrapOrElse(err('error'), fn)

    it('returns result of the function', () => {
      expect(res).toBe(def('error'))
    })

    it('calls provided function exactly once with carried error', () => {
      expect(fn.mock.calls).toEqual([['error']])
    })
  })
})
