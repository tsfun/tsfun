import {
  compose,
  composeRight,
  composeXs,
  composeXsRight,
  composeFns,
  composeFnsRight,
  composeFnsXs,
  composeFnsXsRight
} from '@tsfun/function'

describe('specs', () => {
  describe('compose', () => {
    function setup () {
      const x = 'x'
      const fImpl = (x: string) => `f ${x}`
      const gImpl = (x: string) => `g ${x}`
      const f = jest.fn(fImpl)
      const g = jest.fn(gImpl)
      const fxg = compose(f, g)
      return { x, fImpl, gImpl, f, g, fxg }
    }

    function setupAndCall () {
      const { x, fxg, ...rest } = setup()
      const y = fxg(x)
      return { ...rest, x, fxg, y }
    }

    describe('when resulting function is not called', () => {
      it('does not call outer function', () => {
        const { f } = setup()
        expect(f).not.toBeCalled()
      })

      it('does not call inner function', () => {
        const { g } = setup()
        expect(g).not.toBeCalled()
      })
    })

    describe('when resulting function is called once', () => {
      it('calls outer function once', () => {
        const { f } = setupAndCall()
        expect(f).toBeCalledTimes(1)
      })

      it('calls outer function with output of inner function', () => {
        const { x, gImpl, f } = setupAndCall()
        expect(f).toBeCalledWith(gImpl(x))
      })

      it('calls inner function once', () => {
        const { g } = setupAndCall()
        expect(g).toBeCalledTimes(1)
      })

      it('calls inner function with received argument', () => {
        const { x, g } = setupAndCall()
        expect(g).toBeCalledWith(x)
      })

      it('returns expected result', () => {
        const { x, fImpl, gImpl, y } = setupAndCall()
        expect(y).toEqual(fImpl(gImpl(x)))
      })
    })
  })

  describe('composeRight', () => {
    function setup () {
      const x = 'x'
      const fImpl = (x: string) => `f ${x}`
      const gImpl = (x: string) => `g ${x}`
      const f = jest.fn(fImpl)
      const g = jest.fn(gImpl)
      const fxg = composeRight(f, g)
      return { x, fImpl, gImpl, f, g, fxg }
    }

    function setupAndCall () {
      const { x, fxg, ...rest } = setup()
      const y = fxg(x)
      return { ...rest, x, fxg, y }
    }

    describe('when resulting function is not called', () => {
      it('does not call inner function', () => {
        const { f } = setup()
        expect(f).not.toBeCalled()
      })

      it('does not call outer function', () => {
        const { g } = setup()
        expect(g).not.toBeCalled()
      })
    })

    describe('when resulting function is called once', () => {
      it('calls inner function once', () => {
        const { f } = setupAndCall()
        expect(f).toBeCalledTimes(1)
      })

      it('calls inner function with received argument', () => {
        const { x, f } = setupAndCall()
        expect(f).toBeCalledWith(x)
      })

      it('calls outer function once', () => {
        const { g } = setupAndCall()
        expect(g).toBeCalledTimes(1)
      })

      it('calls outer function with output of inner function', () => {
        const { x, fImpl, g } = setupAndCall()
        expect(g).toBeCalledWith(fImpl(x))
      })

      it('returns expected result', () => {
        const { x, fImpl, gImpl, y } = setupAndCall()
        expect(y).toEqual(gImpl(fImpl(x)))
      })
    })
  })

  describe('composeXs', () => {
    function setup () {
      const xs = ['a', 'b', 'c', 'd'] as const
      const fImpl = (...xs: string[]) => `f ${xs.join(', ')}`
      const gImpl = (...xs: string[]) => `g ${xs.join(', ')}`
      const f = jest.fn(fImpl)
      const g = jest.fn(gImpl)
      const fxg = composeXs(f, g)
      return { xs, fImpl, gImpl, f, g, fxg }
    }

    function setupAndCall () {
      const { xs, fxg, ...rest } = setup()
      const y = fxg(...xs)
      return { ...rest, xs, fxg, y }
    }

    describe('when resulting function is not called', () => {
      it('does not call outer function', () => {
        const { f } = setup()
        expect(f).not.toBeCalled()
      })

      it('does not call inner function', () => {
        const { g } = setup()
        expect(g).not.toBeCalled()
      })
    })

    describe('when resulting function is called once', () => {
      it('calls outer function once', () => {
        const { f } = setupAndCall()
        expect(f).toBeCalledTimes(1)
      })

      it('calls outer function with output of inner function', () => {
        const { xs, gImpl, f } = setupAndCall()
        expect(f).toBeCalledWith(gImpl(...xs))
      })

      it('calls inner function once', () => {
        const { g } = setupAndCall()
        expect(g).toBeCalledTimes(1)
      })

      it('calls inner function with received argument', () => {
        const { xs, g } = setupAndCall()
        expect(g).toBeCalledWith(...xs)
      })

      it('returns expected result', () => {
        const { xs, fImpl, gImpl, y } = setupAndCall()
        expect(y).toEqual(fImpl(gImpl(...xs)))
      })
    })
  })

  describe('composeXsRight', () => {
    function setup () {
      const xs = ['a', 'b', 'c', 'd'] as const
      const fImpl = (...xs: string[]) => `f ${xs.join(', ')}`
      const gImpl = (...xs: string[]) => `g ${xs.join(', ')}`
      const f = jest.fn(fImpl)
      const g = jest.fn(gImpl)
      const fxg = composeXsRight(f, g)
      return { xs, fImpl, gImpl, f, g, fxg }
    }

    function setupAndCall () {
      const { xs, fxg, ...rest } = setup()
      const y = fxg(...xs)
      return { ...rest, xs, fxg, y }
    }

    describe('when resulting function is not called', () => {
      it('does not call inner function', () => {
        const { f } = setup()
        expect(f).not.toBeCalled()
      })

      it('does not call outer function', () => {
        const { g } = setup()
        expect(g).not.toBeCalled()
      })
    })

    describe('when resulting function is called once', () => {
      it('calls inner function once', () => {
        const { f } = setupAndCall()
        expect(f).toBeCalledTimes(1)
      })

      it('calls inner function with received argument', () => {
        const { xs, f } = setupAndCall()
        expect(f).toBeCalledWith(...xs)
      })

      it('calls outer function once', () => {
        const { g } = setupAndCall()
        expect(g).toBeCalledTimes(1)
      })

      it('calls outer function with output of inner function', () => {
        const { xs, fImpl, g } = setupAndCall()
        expect(g).toBeCalledWith(fImpl(...xs))
      })

      it('returns expected result', () => {
        const { xs, fImpl, gImpl, y } = setupAndCall()
        expect(y).toEqual(gImpl(fImpl(...xs)))
      })
    })
  })

  describe('composeFns', () => {
    describe('with one function', () => {
      const setup = (times = 1) => {
        const x0 = Symbol('x0')
        const x1 = Symbol('x1')
        const f0 = jest.fn(() => x1)
        const fn = composeFns(f0)
        const ys = Array.from({ length: times }).map(() => fn(x0))
        return { x0, x1, f0, fn, ys }
      }

      it('calls provided function once', () => {
        const { f0 } = setup()
        expect(f0).toBeCalledTimes(1)
      })

      it('calls provided function every time the resulting function is called', () => {
        const times = 5
        const { f0 } = setup(times)
        expect(f0).toBeCalledTimes(times)
      })

      it('passes arguments to provided function', () => {
        const { x0, f0 } = setup()
        expect(f0).toBeCalledWith(x0)
      })

      it('returns result of provided function', () => {
        const { x1, ys: [y] } = setup()
        expect(y).toBe(x1)
      })
    })

    describe('with multiple functions', () => {
      const setup = (times = 1) => {
        const x0 = Symbol('x0')
        const x1 = Symbol('x1')
        const x2 = Symbol('x2')
        const x3 = Symbol('x3')
        const x4 = Symbol('x4')
        const f0 = jest.fn(() => x0)
        const f1 = jest.fn(() => x1)
        const f2 = jest.fn(() => x2)
        const f3 = jest.fn(() => x3)
        const fn = composeFns(f0, f1, f2, f3)
        const ys = Array.from({ length: times }).map(() => fn(x4))
        return { x0, x1, x2, x3, x4, f0, f1, f2, f3, fn, ys }
      }

      describe('calls each function once', () => {
        it('f0', () => {
          const { f0 } = setup()
          expect(f0).toBeCalledTimes(1)
        })

        it('f1', () => {
          const { f1 } = setup()
          expect(f1).toBeCalledTimes(1)
        })

        it('f2', () => {
          const { f2 } = setup()
          expect(f2).toBeCalledTimes(1)
        })

        it('f3', () => {
          const { f3 } = setup()
          expect(f3).toBeCalledTimes(1)
        })
      })

      describe('calls each function every time the resulting function is called', () => {
        const times = 5

        it('f0', () => {
          const { f0 } = setup(times)
          expect(f0).toBeCalledTimes(times)
        })

        it('f1', () => {
          const { f1 } = setup(times)
          expect(f1).toBeCalledTimes(times)
        })

        it('f2', () => {
          const { f2 } = setup(times)
          expect(f2).toBeCalledTimes(times)
        })

        it('f3', () => {
          const { f3 } = setup(times)
          expect(f3).toBeCalledTimes(times)
        })
      })

      describe('passes result of previous function to next function', () => {
        it('x1 → f0', () => {
          const { x1, f0 } = setup()
          expect(f0).toBeCalledWith(x1)
        })

        it('x2 → f1', () => {
          const { x2, f1 } = setup()
          expect(f1).toBeCalledWith(x2)
        })

        it('x3 → f2', () => {
          const { x3, f2 } = setup()
          expect(f2).toBeCalledWith(x3)
        })

        it('x4 → f3', () => {
          const { x4, f3 } = setup()
          expect(f3).toBeCalledWith(x4)
        })
      })

      it('returns result of the last function', () => {
        const { x0, ys: [y] } = setup()
        expect(y).toBe(x0)
      })
    })
  })

  describe('composeFnsRight', () => {
    describe('with one function', () => {
      const setup = (times = 1) => {
        const x0 = Symbol('x0')
        const x1 = Symbol('x1')
        const f0 = jest.fn(() => x1)
        const fn = composeFnsRight(f0)
        const ys = Array.from({ length: times }).map(() => fn(x0))
        return { x0, x1, f0, fn, ys }
      }

      it('calls provided function once', () => {
        const { f0 } = setup()
        expect(f0).toBeCalledTimes(1)
      })

      it('calls provided function every time the resulting function is called', () => {
        const times = 5
        const { f0 } = setup(times)
        expect(f0).toBeCalledTimes(times)
      })

      it('passes arguments to provided function', () => {
        const { x0, f0 } = setup()
        expect(f0).toBeCalledWith(x0)
      })

      it('returns result of provided function', () => {
        const { x1, ys: [y] } = setup()
        expect(y).toBe(x1)
      })
    })

    describe('with multiple functions', () => {
      const setup = (times = 1) => {
        const x0 = Symbol('x0')
        const x1 = Symbol('x1')
        const x2 = Symbol('x2')
        const x3 = Symbol('x3')
        const x4 = Symbol('x4')
        const f0 = jest.fn(() => x1)
        const f1 = jest.fn(() => x2)
        const f2 = jest.fn(() => x3)
        const f3 = jest.fn(() => x4)
        const fn = composeFnsRight(f0, f1, f2, f3)
        const ys = Array.from({ length: times }).map(() => fn(x0))
        return { x0, x1, x2, x3, x4, f0, f1, f2, f3, fn, ys }
      }

      describe('calls each function once', () => {
        it('f0', () => {
          const { f0 } = setup()
          expect(f0).toBeCalledTimes(1)
        })

        it('f1', () => {
          const { f1 } = setup()
          expect(f1).toBeCalledTimes(1)
        })

        it('f2', () => {
          const { f2 } = setup()
          expect(f2).toBeCalledTimes(1)
        })

        it('f3', () => {
          const { f3 } = setup()
          expect(f3).toBeCalledTimes(1)
        })
      })

      describe('calls each function every time the resulting function is called', () => {
        const times = 5

        it('f0', () => {
          const { f0 } = setup(times)
          expect(f0).toBeCalledTimes(times)
        })

        it('f1', () => {
          const { f1 } = setup(times)
          expect(f1).toBeCalledTimes(times)
        })

        it('f2', () => {
          const { f2 } = setup(times)
          expect(f2).toBeCalledTimes(times)
        })

        it('f3', () => {
          const { f3 } = setup(times)
          expect(f3).toBeCalledTimes(times)
        })
      })

      describe('passes result of previous function to next function', () => {
        it('x0 → f0', () => {
          const { x0, f0 } = setup()
          expect(f0).toBeCalledWith(x0)
        })

        it('x1 → f1', () => {
          const { x1, f1 } = setup()
          expect(f1).toBeCalledWith(x1)
        })

        it('x2 → f2', () => {
          const { x2, f2 } = setup()
          expect(f2).toBeCalledWith(x2)
        })

        it('x3 → f3', () => {
          const { x3, f3 } = setup()
          expect(f3).toBeCalledWith(x3)
        })
      })

      it('returns result of the last function', () => {
        const { x4, ys: [y] } = setup()
        expect(y).toBe(x4)
      })
    })
  })

  describe('composeFnsXs', () => {
    describe('with one function', () => {
      const setup = (times = 1) => {
        const xs = ['a', 'b', 'c', 'd', 'e', 'f'] as const
        const x0 = Symbol('x0')
        const f0 = jest.fn((..._: string[]) => x0)
        const fn = composeFnsXs(f0)
        const ys = Array.from({ length: times }).map(() => fn(...xs))
        return { xs, x0, f0, fn, ys }
      }

      it('calls provided function once', () => {
        const { f0 } = setup()
        expect(f0).toBeCalledTimes(1)
      })

      it('calls provided function every time the resulting function is called', () => {
        const times = 5
        const { f0 } = setup(times)
        expect(f0).toBeCalledTimes(times)
      })

      it('passes arguments to provided function', () => {
        const { xs, f0 } = setup()
        expect(f0).toBeCalledWith(...xs)
      })

      it('returns result of provided function', () => {
        const { x0, ys: [y] } = setup()
        expect(y).toBe(x0)
      })
    })

    describe('with multiple functions', () => {
      const setup = (times = 1) => {
        const xs = ['a', 'b', 'c', 'd', 'e', 'f'] as const
        const x0 = Symbol('x0')
        const x1 = Symbol('x1')
        const x2 = Symbol('x2')
        const x3 = Symbol('x3')
        const f0 = jest.fn(() => x0)
        const f1 = jest.fn(() => x1)
        const f2 = jest.fn(() => x2)
        const f3 = jest.fn((..._: string[]) => x3)
        const fn = composeFnsXs(f0, f1, f2, f3)
        const ys = Array.from({ length: times }).map(() => fn(...xs))
        return { xs, x0, x1, x2, x3, f0, f1, f2, f3, fn, ys }
      }

      describe('calls each function once', () => {
        it('f0', () => {
          const { f0 } = setup()
          expect(f0).toBeCalledTimes(1)
        })

        it('f1', () => {
          const { f1 } = setup()
          expect(f1).toBeCalledTimes(1)
        })

        it('f2', () => {
          const { f2 } = setup()
          expect(f2).toBeCalledTimes(1)
        })

        it('f3', () => {
          const { f3 } = setup()
          expect(f3).toBeCalledTimes(1)
        })
      })

      describe('calls each function every time the resulting function is called', () => {
        const times = 5

        it('f0', () => {
          const { f0 } = setup(times)
          expect(f0).toBeCalledTimes(times)
        })

        it('f1', () => {
          const { f1 } = setup(times)
          expect(f1).toBeCalledTimes(times)
        })

        it('f2', () => {
          const { f2 } = setup(times)
          expect(f2).toBeCalledTimes(times)
        })

        it('f3', () => {
          const { f3 } = setup(times)
          expect(f3).toBeCalledTimes(times)
        })
      })

      describe('passes result of previous function to next function', () => {
        it('x1 → f0', () => {
          const { x1, f0 } = setup()
          expect(f0).toBeCalledWith(x1)
        })

        it('x2 → f1', () => {
          const { x2, f1 } = setup()
          expect(f1).toBeCalledWith(x2)
        })

        it('x3 → f2', () => {
          const { x3, f2 } = setup()
          expect(f2).toBeCalledWith(x3)
        })

        it('...xs → f3', () => {
          const { xs, f3 } = setup()
          expect(f3).toBeCalledWith(...xs)
        })
      })

      it('returns result of the last function', () => {
        const { x0, ys: [y] } = setup()
        expect(y).toBe(x0)
      })
    })
  })

  describe('composeFnsXsRight', () => {
    describe('with one function', () => {
      const setup = (times = 1) => {
        const xs = ['a', 'b', 'c', 'd', 'e', 'f'] as const
        const x0 = Symbol('x0')
        const f0 = jest.fn((..._: string[]) => x0)
        const fn = composeFnsXsRight(f0)
        const ys = Array.from({ length: times }).map(() => fn(...xs))
        return { xs, x0, f0, fn, ys }
      }

      it('calls provided function once', () => {
        const { f0 } = setup()
        expect(f0).toBeCalledTimes(1)
      })

      it('calls provided function every time the resulting function is called', () => {
        const times = 5
        const { f0 } = setup(times)
        expect(f0).toBeCalledTimes(times)
      })

      it('passes arguments to provided function', () => {
        const { xs, f0 } = setup()
        expect(f0).toBeCalledWith(...xs)
      })

      it('returns result of provided function', () => {
        const { x0, ys: [y] } = setup()
        expect(y).toBe(x0)
      })
    })

    describe('with multiple functions', () => {
      const setup = (times = 1) => {
        const xs = ['a', 'b', 'c', 'd', 'e', 'f'] as const
        const x0 = Symbol('x0')
        const x1 = Symbol('x1')
        const x2 = Symbol('x2')
        const x3 = Symbol('x3')
        const f0 = jest.fn((..._: string[]) => x0)
        const f1 = jest.fn(() => x1)
        const f2 = jest.fn(() => x2)
        const f3 = jest.fn(() => x3)
        const fn = composeFnsXsRight(f0, f1, f2, f3)
        const ys = Array.from({ length: times }).map(() => fn(...xs))
        return { xs, x0, x1, x2, x3, f0, f1, f2, f3, fn, ys }
      }

      describe('calls each function once', () => {
        it('f0', () => {
          const { f0 } = setup()
          expect(f0).toBeCalledTimes(1)
        })

        it('f1', () => {
          const { f1 } = setup()
          expect(f1).toBeCalledTimes(1)
        })

        it('f2', () => {
          const { f2 } = setup()
          expect(f2).toBeCalledTimes(1)
        })

        it('f3', () => {
          const { f3 } = setup()
          expect(f3).toBeCalledTimes(1)
        })
      })

      describe('calls each function every time the resulting function is called', () => {
        const times = 5

        it('f0', () => {
          const { f0 } = setup(times)
          expect(f0).toBeCalledTimes(times)
        })

        it('f1', () => {
          const { f1 } = setup(times)
          expect(f1).toBeCalledTimes(times)
        })

        it('f2', () => {
          const { f2 } = setup(times)
          expect(f2).toBeCalledTimes(times)
        })

        it('f3', () => {
          const { f3 } = setup(times)
          expect(f3).toBeCalledTimes(times)
        })
      })

      describe('passes result of previous function to next function', () => {
        it('...xs → f0', () => {
          const { xs, f0 } = setup()
          expect(f0).toBeCalledWith(...xs)
        })

        it('x0 → f1', () => {
          const { x0, f1 } = setup()
          expect(f1).toBeCalledWith(x0)
        })

        it('x1 → f2', () => {
          const { x1, f2 } = setup()
          expect(f2).toBeCalledWith(x1)
        })

        it('x2 → f3', () => {
          const { x2, f3 } = setup()
          expect(f3).toBeCalledWith(x2)
        })
      })

      it('returns result of the last function', () => {
        const { x3, ys: [y] } = setup()
        expect(y).toBe(x3)
      })
    })
  })
})

describe('usage', () => {
  async function fns () {
    const { partial } = await import('@tsfun/function')
    const add = (a: number, b: number) => a + b
    const multiply = (a: number, b: number) => a * b
    const square = (x: number) => x * x
    const inc = partial(add, 1)
    const dec = partial(add, -1)
    const double = partial(multiply, 2)
    const half = partial(multiply, 0.5)
    return { add, multiply, square, inc, dec, double, half }
  }

  async function fnsXs () {
    const map = <X, Y> (fn: (x: X) => Y, ...xs: readonly X[]) => xs.map(x => fn(x))
    const join = (sep: string, ...xs: readonly string[]) => xs.join(sep)
    const split = (sep: string, str: string) => str.split(sep)
    return { map, join, split, ...await fns() }
  }

  it('compose', async () => {
    const { inc, double } = await fns()
    const incDouble = compose(inc, double)
    expect(incDouble(3)).toBe(3 * 2 + 1)
  })

  it('composeRight', async () => {
    const { inc, double } = await fns()
    const doubleInc = composeRight(inc, double)
    expect(doubleInc(3)).toBe((3 + 1) * 2)
  })

  it('composeFns', async () => {
    const { square, inc, dec, double, half } = await fns()
    const fn = composeFns(half, dec, double, square, inc)
    expect(fn(3)).toBe(((3 + 1) ** 2 * 2 - 1) / 2)
  })

  it('composeFnsRight', async () => {
    const { square, inc, dec, double, half } = await fns()
    const fn = composeFnsRight(half, dec, double, square, inc)
    expect(fn(3)).toBe((((3 / 2 - 1) * 2) ** 2) + 1)
  })

  it('composeFnsXs', async () => {
    const { join, inc, double } = await fnsXs()
    const fn = composeFnsXs(String, double, inc, Number, join)
    expect(fn('0', '1', '2', '3')).toBe(String((10203 + 1) * 2))
  })

  it('composeFnsXsRight', async () => {
    const { join, inc, double } = await fnsXs()
    const fn = composeFnsXsRight(join, Number, inc, double, String)
    expect(fn('0', '1', '2', '3')).toBe(String((10203 + 1) * 2))
  })
})
