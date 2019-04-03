import * as xjest from 'extra-jest'
const { expectFunction } = xjest.expectFunction

import {
  unwrap,
  unwrapOrErr,
  unwrapOr,
  unwrapOrElse,
  some,
  none
} from '@ts-fun/option'

describe('unwrap', () => {
  describe('with a Some', () => {
    it('returns contained value', () => {
      expect(unwrap(some('value'))).toBe('value')
    })
  })

  describe('with a None', () => {
    it('throws provided error', () => {
      expectFunction(() => unwrap(none())).throws.toMatchSnapshot()
    })
  })
})

describe('unwrapOrErr', () => {
  describe('with a Some', () => {
    it('returns contained value', () => {
      expect(unwrapOrErr(some('value'), 'error')).toBe('value')
    })
  })

  describe('with a None', () => {
    it('throws provided error', () => {
      expectFunction(() => unwrapOrErr(none(), 'error')).throws.toBe('error')
    })
  })
})

describe('unwrapOr', () => {
  describe('with a Some', () => {
    it('returns contained value', () => {
      expect(unwrapOr(some('a'), 'b')).toBe('a')
    })
  })

  describe('with a None', () => {
    it('returns provided default', () => {
      expect(unwrapOr(none(), 'b')).toBe('b')
    })
  })
})

describe('unwrapOrElse', () => {
  const mkfn = () => jest.fn(() => 'default')

  describe('with a Some', () => {
    const fn = mkfn()
    const res = unwrapOrElse(some('value'), fn)

    it('returns contained value', () => {
      expect(res).toBe('value')
    })

    it('does not call provided function', () => {
      expect(fn).not.toBeCalled()
    })
  })

  describe('with a None', () => {
    const fn = mkfn()
    const res = unwrapOrElse(none(), fn)

    it('returns result of the function', () => {
      expect(res).toBe('default')
    })

    it('calls provided function exactly once with no arguments', () => {
      expect(fn.mock.calls).toEqual([[]])
    })
  })
})
