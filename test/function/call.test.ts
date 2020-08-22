import { pass } from '@tsfun/pipe'
import { exec, call, call0, call1, call2, call3, callXs } from '@tsfun/function'

describe('specs', () => {
  describe('call0', () => {
    function setup() {
      const value = Symbol('value')
      const fn = jest.fn(() => value)
      const y = call0(fn)
      return { value, fn, y }
    }

    it('calls given function once', () => {
      const { fn } = setup()
      expect(fn).toBeCalledTimes(1)
    })

    it('calls given function with no arguments', () => {
      const { fn } = setup()
      expect(fn).toBeCalledWith()
    })

    it('returns expected result', () => {
      const { value, y } = setup()
      expect(y).toBe(value)
    })
  })

  describe('call1', () => {
    function setup() {
      const x = Symbol('x')
      const impl = (x: symbol) => [x] as const
      const fn = jest.fn(impl)
      const y = call1(fn, x)
      return { x, impl, fn, y }
    }

    it('calls given function once', () => {
      const { fn } = setup()
      expect(fn).toBeCalledTimes(1)
    })

    it('calls given function with no arguments', () => {
      const { x, fn } = setup()
      expect(fn).toBeCalledWith(x)
    })

    it('returns expected result', () => {
      const { x, impl, y } = setup()
      expect(y).toEqual(impl(x))
    })
  })

  describe('call2', () => {
    function setup() {
      const x0 = Symbol('x0')
      const x1 = Symbol('x1')
      const impl = (x0: symbol, x1: symbol) => [x0, x1] as const
      const fn = jest.fn(impl)
      const y = call2(fn, x0, x1)
      return { x0, x1, impl, fn, y }
    }

    it('calls given function once', () => {
      const { fn } = setup()
      expect(fn).toBeCalledTimes(1)
    })

    it('calls given function with no arguments', () => {
      const { x0, x1, fn } = setup()
      expect(fn).toBeCalledWith(x0, x1)
    })

    it('returns expected result', () => {
      const { x0, x1, impl, y } = setup()
      expect(y).toEqual(impl(x0, x1))
    })
  })

  describe('call3', () => {
    function setup() {
      const x0 = Symbol('x0')
      const x1 = Symbol('x1')
      const x2 = Symbol('x2')
      const impl = (x0: symbol, x1: symbol, x2: symbol) => [x0, x1, x2] as const
      const fn = jest.fn(impl)
      const y = call3(fn, x0, x1, x2)
      return { x0, x1, x2, impl, fn, y }
    }

    it('calls given function once', () => {
      const { fn } = setup()
      expect(fn).toBeCalledTimes(1)
    })

    it('calls given function with no arguments', () => {
      const { x0, x1, x2, fn } = setup()
      expect(fn).toBeCalledWith(x0, x1, x2)
    })

    it('returns expected result', () => {
      const { x0, x1, x2, impl, y } = setup()
      expect(y).toEqual(impl(x0, x1, x2))
    })
  })

  describe('callXs', () => {
    function setup() {
      const xs = [0, 1, 2, 3, 4, 5, 6, 7] as const
      const impl = <Xs extends typeof xs>(...xs: Xs) => xs
      const fn = jest.fn(impl)
      const y = callXs(fn, ...xs)
      return { xs, impl, fn, y }
    }

    it('calls given function once', () => {
      const { fn } = setup()
      expect(fn).toBeCalledTimes(1)
    })

    it('calls given function with no arguments', () => {
      const { xs, fn } = setup()
      expect(fn).toBeCalledWith(...xs)
    })

    it('returns expected result', () => {
      const { xs, impl, y } = setup()
      expect(y).toEqual(impl(...xs))
    })
  })
})

describe('usage', () => {
  it('works well with @tsfun/pipe', () => {
    const fn = () => <A>(a: A) => <B, C>(b: B, c: C) => <D, E, F>(d: D, e: E, f: F) => [a, b, c, d, e, f] as const

    const result = pass(fn)
      .to(call0)
      .to(call1, 'a')
      .to(call2, 'b', 'c')
      .to(call3, 'd', 'e', 'f')
      .get()

    expect(result).toEqual([...'abcdef'])
  })
})

describe('aliases', () => {
  it('exec → call0', () => {
    expect(exec).toBe(call0)
  })

  it('call → call1', () => {
    expect(call).toBe(call1)
  })
})
