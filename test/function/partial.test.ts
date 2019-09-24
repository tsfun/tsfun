import { partial, partialTail, partialTailSpread } from '@tsfun/function'

describe('specs', () => {
  describe('partial', () => {
    function setup () {
      const x0 = 0
      const xs = [1, 2, 3, 4, 5] as const
      const impl = (a: 0, b: 1, c: 2, d: 3, e: 4, f: 5) => [a, b, c, d, e, f] as const
      const cb = jest.fn(impl)
      const fn = partial(cb, x0)
      return { x0, xs, impl, cb, fn } as const
    }

    function setupAndCall () {
      const { xs, fn, ...rest } = setup()
      const y = fn(...xs)
      return { ...rest, xs, fn, y } as const
    }

    describe('when resulting function is not called', () => {
      it('does not call given function', () => {
        const { cb } = setup()
        expect(cb).not.toBeCalled()
      })
    })

    describe('when resulting function is called once', () => {
      it('calls given function once', () => {
        const { cb } = setupAndCall()
        expect(cb).toBeCalledTimes(1)
      })

      it('calls given function with enough arguments', () => {
        const { x0, xs, cb } = setupAndCall()
        expect(cb).toBeCalledWith(x0, ...xs)
      })

      it('returns expected result', () => {
        const { x0, xs, impl, y } = setupAndCall()
        expect(y).toEqual(impl(x0, ...xs))
      })
    })
  })

  describe('partialTail', () => {
    function setup () {
      const x0 = 0
      const xs = [1, 2, 3, 4, 5] as const
      const impl = (a: 0, b: 1, c: 2, d: 3, e: 4, f: 5) => [a, b, c, d, e, f] as const
      const cb = jest.fn(impl)
      const fn = partialTail(cb, xs as any)
      return { x0, xs, impl, cb, fn } as const
    }

    function setupAndCall () {
      const { x0, fn, ...rest } = setup()
      const y = fn(x0)
      return { ...rest, x0, fn, y } as const
    }

    describe('when resulting function is not called', () => {
      it('does not call given function', () => {
        const { cb } = setup()
        expect(cb).not.toBeCalled()
      })
    })

    describe('when resulting function is called once', () => {
      it('calls given function once', () => {
        const { cb } = setupAndCall()
        expect(cb).toBeCalledTimes(1)
      })

      it('calls given function with enough arguments', () => {
        const { x0, xs, cb } = setupAndCall()
        expect(cb).toBeCalledWith(x0, ...xs)
      })

      it('returns expected result', () => {
        const { x0, xs, impl, y } = setupAndCall()
        expect(y).toEqual(impl(x0, ...xs))
      })
    })
  })

  describe('partialTailSpread', () => {
    function setup () {
      const x0 = 0
      const xs = [1, 2, 3, 4, 5] as const
      const impl = (a: 0, b: 1, c: 2, d: 3, e: 4, f: 5) => [a, b, c, d, e, f] as const
      const cb = jest.fn(impl)
      const fn = partialTailSpread(cb, ...xs)
      return { x0, xs, impl, cb, fn } as const
    }

    function setupAndCall () {
      const { x0, fn, ...rest } = setup()
      const y = fn(x0)
      return { ...rest, x0, fn, y } as const
    }

    describe('when resulting function is not called', () => {
      it('does not call given function', () => {
        const { cb } = setup()
        expect(cb).not.toBeCalled()
      })
    })

    describe('when resulting function is called once', () => {
      it('calls given function once', () => {
        const { cb } = setupAndCall()
        expect(cb).toBeCalledTimes(1)
      })

      it('calls given function with enough arguments', () => {
        const { x0, xs, cb } = setupAndCall()
        expect(cb).toBeCalledWith(x0, ...xs)
      })

      it('returns expected result', () => {
        const { x0, xs, impl, y } = setupAndCall()
        expect(y).toEqual(impl(x0, ...xs))
      })
    })
  })
})

describe('usage', () => {
  const add = (a: number, b: number) => a + b
  const multiply = (a: number, b: number) => a * b
  const array = <Xs extends any[]> (...xs: Xs) => xs

  it('works well with @tsfun/function/pipe', async () => {
    const { pipe, nAry } = await import('@tsfun/function')

    const result = pipe(
      3,
      partialTailSpread(nAry(add), 1, 2),
      partial(multiply, 3),
      partialTailSpread(array, 'a' as const, 'b' as const)
    )

    expect(result).toEqual([(3 + 1 + 2) * 3, 'a', 'b'])
  })

  it('works well with @tsfun/function/compose', async () => {
    const { compose } = await import('@tsfun/function')
    const fn = compose(partial(multiply, 2), partial(add, 1))
    expect(fn(3)).toBe((3 + 1) * 2)
  })
})
