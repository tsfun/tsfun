import { pass } from '@tsfun/pipe'
import { curry, uncurry } from '@tsfun/function'

describe('curry', () => {
  function setup() {
    const impl = (a: 0, b: 1, c: 2) => [a, b, c] as const
    const curriable = jest.fn(impl)
    const curried = curry(curriable)
    return { impl, curriable, curried }
  }

  describe('curried :: (1, 2) -> _', () => {
    function init() {
      const { curried, ...rest } = setup()
      const result = curried(1, 2)
      return { ...rest, curried, result }
    }

    it('returns a function', () => {
      const { result } = init()
      expect(result).toEqual(expect.any(Function))
    })

    it('does not call input function yet', () => {
      const { curriable } = init()
      expect(curriable).not.toBeCalled()
    })
  })

  describe('curried :: (1, 2) -> (0) -> [0, 1, 2]', () => {
    function init() {
      const { curried, ...rest } = setup()
      const result = curried(1, 2)(0)
      return { ...rest, curried, result }
    }

    it('returns a value that equals to result of input function', () => {
      const { result, impl } = init()
      expect(result).toEqual(impl(0, 1, 2))
    })

    it('calls input function once', () => {
      const { curriable } = init()
      expect(curriable).toBeCalledTimes(1)
    })

    it('calls input function with expected arguments', () => {
      const { curriable } = init()
      expect(curriable).toBeCalledWith(0, 1, 2)
    })
  })

  it('over-curry', () => {
    const expected = Symbol('value')
    const curried = curry(curry(curry(<X>(x: X) => x)))
    const received = curried()(null)(null)(expected)
    expect(received).toBe(expected)
  })

  it('works with @tsfun/pipe', () => {
    const curried = pass((a: 0, b: 1, c: 2, d: 3) => [a, b, c, d] as const)
      .to(curry)
      .to(curry)
      .to(curry)
      .get()

    const result = curried(3)(2)(1)(0)

    expect(result).toEqual([0, 1, 2, 3])
  })
})

describe('uncurry', () => {
  describe('generic use', () => {
    function setup() {
      const impl = (b: 1, c: 2) => (a: 0) => [a, b, c] as const
      const uncurriable = jest.fn(impl)
      const uncurried = uncurry(uncurriable)
      return { impl, uncurriable, uncurried }
    }

    describe('uncurried :: _', () => {
      it('is a function', () => {
        const { uncurried } = setup()
        expect(uncurried).toEqual(expect.any(Function))
      })

      it('does not call input function yet', () => {
        const { uncurriable } = setup()
        expect(uncurriable).not.toBeCalled()
      })
    })

    describe('uncurried :: (0, 1, 2) -> [0, 1, 2]', () => {
      function init() {
        const { uncurried, ...rest } = setup()
        const result = uncurried(0, 1, 2)
        return { ...rest, uncurried, result }
      }

      it('returns a value that equals to result of input function', () => {
        const { result, impl } = init()
        expect(result).toEqual(impl(1, 2)(0))
      })

      it('calls input function once', () => {
        const { uncurriable } = init()
        expect(uncurriable).toBeCalledTimes(1)
      })

      it('calls input function with expected arguments', () => {
        const { uncurriable } = init()
        expect(uncurriable).toBeCalledWith(1, 2)
      })
    })
  })

  describe('under the hook', () => {
    function setup() {
      const value = Symbol('value')
      const inner = jest.fn(() => value)
      const outer = jest.fn(() => inner)
      const uncurried = uncurry(outer)
      return { value, inner, outer, uncurried }
    }

    describe('when uncurried is not called', () => {
      it('does not call outer function', () => {
        const { outer } = setup()
        expect(outer).not.toBeCalled()
      })

      it('does not call inner function', () => {
        const { inner } = setup()
        expect(inner).not.toBeCalled()
      })
    })

    describe('when uncurried is called', () => {
      function init() {
        const { uncurried, ...rest } = setup()
        const arg = Symbol('arg')
        const result = uncurried(arg)
        return { ...rest, uncurried, arg, result }
      }

      it('returns expected result', () => {
        const { result, value } = init()
        expect(result).toBe(value)
      })

      it('calls outer function once', () => {
        const { outer } = init()
        expect(outer).toBeCalledTimes(1)
      })

      it('calls outer function without head argument', () => {
        const { outer } = init()
        expect(outer).toBeCalledWith()
      })

      it('calls inner function once', () => {
        const { inner } = init()
        expect(inner).toBeCalledTimes(1)
      })

      it('calls inner function with head argument', () => {
        const { inner, arg } = init()
        expect(inner).toBeCalledWith(arg)
      })
    })
  })

  it('works with @tsfun/pipe', () => {
    const uncurried = pass((a: 0) => (b: 1) => (c: 2) => (d: 3) => [a, b, c, d] as const)
      .to(uncurry)
      .to(uncurry)
      .to(uncurry)
      .get()

    const result = uncurried(3, 2, 1, 0)

    expect(result).toEqual([0, 1, 2, 3])
  })
})
