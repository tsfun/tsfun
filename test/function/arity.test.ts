import { flip, flipXs, nAry, nAryRight } from '@tsfun/function'

describe('flip', () => {
  function setup () {
    const impl = (a: any, b: any) => [a, b]
    const fn = jest.fn(impl)
    const flipped = flip(fn)
    return { impl, fn, flipped }
  }

  function setupAndCall () {
    const { flipped, ...rest } = setup()
    const xs = ['left', 'right'] as const
    const y = flipped(...xs)
    return { ...rest, flipped, xs, y }
  }

  describe('when resulting function is not called', () => {
    it('does not call given function', () => {
      const { fn } = setup()
      expect(fn).not.toBeCalled()
    })
  })

  describe('when resulting function is called once', () => {
    it('calls given function once', () => {
      const { fn } = setupAndCall()
      expect(fn).toBeCalledTimes(1)
    })

    it('calls given function with swapped argument', () => {
      const { fn, xs: [left, right] } = setupAndCall()
      expect(fn).toBeCalledWith(right, left)
    })

    it('returns expected result', () => {
      const { impl, xs: [left, right], y } = setupAndCall()
      expect(y).toEqual(impl(right, left))
    })
  })
})

describe('flipXs', () => {
  function setup () {
    const impl = (...xs: any[]) => xs.join(', ')
    const fn = jest.fn(impl)
    const flipped = flipXs(fn)
    return { impl, fn, flipped }
  }

  function setupAndCall () {
    const { flipped, ...rest } = setup()
    const xs = ['a', 'b', 'c', 'd'] as const
    const y = flipped(...xs)
    return { ...rest, flipped, xs, y }
  }

  describe('when resulting function is not called', () => {
    it('does not call given function', () => {
      const { fn } = setup()
      expect(fn).not.toBeCalled()
    })
  })

  describe('when resulting function is called once', () => {
    it('calls given function once', () => {
      const { fn } = setupAndCall()
      expect(fn).toBeCalledTimes(1)
    })

    it('calls given function with swapped argument', () => {
      const { fn, xs: [left, right, ...rest] } = setupAndCall()
      expect(fn).toBeCalledWith(right, left, ...rest)
    })

    it('returns expected result', () => {
      const { impl, xs: [left, right, ...rest], y } = setupAndCall()
      expect(y).toEqual(impl(right, left, ...rest))
    })
  })
})

describe('nAry', () => {
  function setup () {
    const impl = (a: string, b: string) => `fn(${a}, ${b})`
    const fn = jest.fn(impl)
    const fnXs = nAry(fn)
    return { impl, fn, fnXs }
  }

  function setupAndCall () {
    const { fnXs, ...rest } = setup()
    const xs = ['a', 'b', 'c', 'd', 'e', 'f'] as const
    const y = fnXs(...xs)
    return { ...rest, fnXs, xs, y }
  }

  describe('when resulting function is not called', () => {
    it('does not call given function', () => {
      const { fn } = setup()
      expect(fn).not.toBeCalled()
    })
  })

  describe('when resulting function is called', () => {
    it('calls given function', () => {
      const { fn } = setupAndCall()
      expect(fn).toBeCalled()
    })

    it('calls given function multiple times', () => {
      const { fn } = setupAndCall()
      expect(fn.mock.calls).toMatchSnapshot()
    })

    it('returns expected result', () => {
      const { impl, xs, y } = setupAndCall()
      const [a, b, c, d, e, f] = xs
      expect(y).toBe(impl(impl(impl(impl(impl(a, b), c), d), e), f))
    })
  })
})

describe('nAryRight', () => {
  function setup () {
    const impl = (a: string, b: string) => `fn(${a}, ${b})`
    const fn = jest.fn(impl)
    const fnXs = nAryRight(fn)
    return { impl, fn, fnXs }
  }

  function setupAndCall () {
    const { fnXs, ...rest } = setup()
    const xs = ['a', 'b', 'c', 'd', 'e', 'f'] as const
    const y = fnXs(...xs)
    return { ...rest, fnXs, xs, y }
  }

  describe('when resulting function is not called', () => {
    it('does not call given function', () => {
      const { fn } = setup()
      expect(fn).not.toBeCalled()
    })
  })

  describe('when resulting function is called', () => {
    it('calls given function', () => {
      const { fn } = setupAndCall()
      expect(fn).toBeCalled()
    })

    it('calls given function multiple times', () => {
      const { fn } = setupAndCall()
      expect(fn.mock.calls).toMatchSnapshot()
    })

    it('returns expected result', () => {
      const { impl, xs, y } = setupAndCall()
      const [a, b, c, d, e, f] = xs
      expect(y).toBe(impl(impl(impl(impl(impl(f, e), d), c), b), a))
    })
  })
})
