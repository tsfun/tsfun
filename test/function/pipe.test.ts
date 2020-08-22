import { pipe } from '@tsfun/function'

describe('specs', () => {
  it('without function', () => {
    const x = Symbol('x')
    expect(pipe(x)).toEqual(x)
  })

  describe('with one function', () => {
    const setup = () => {
      const x0 = Symbol('x0')
      const x1 = Symbol('x1')
      const fn = jest.fn(() => x1)
      const y = pipe(x0, fn)
      return { x0, x1, fn, y }
    }

    it('calls the function once', () => {
      const { fn } = setup()
      expect(fn).toBeCalledTimes(1)
    })

    it('passes the argument to the function', () => {
      const { x0, fn } = setup()
      expect(fn).toBeCalledWith(x0)
    })

    it('returns what the function returns', () => {
      const { x1, y } = setup()
      expect(y).toBe(x1)
    })
  })

  describe('with multiple functions', () => {
    const setup = () => {
      const x0 = Symbol('x0')
      const x1 = Symbol('x1')
      const x2 = Symbol('x2')
      const x3 = Symbol('x3')
      const f1 = jest.fn(() => x1)
      const f2 = jest.fn(() => x2)
      const f3 = jest.fn(() => x3)
      const y = pipe(x0, f1, f2, f3)
      return { x0, x1, x2, x3, f1, f2, f3, y }
    }

    describe('calls each function once', () => {
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

    describe('passes result of previous function to next function', () => {
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

    it('returns result of last function', () => {
      const { x3, y } = setup()
      expect(y).toBe(x3)
    })
  })
})

describe('usage', () => {
  it('works well with unary functions', async () => {
    const { partial } = await import('@tsfun/function')
    const add = (a: number, b: number) => a + b
    const concat = (a: string, b: string) => a + b
    const upper = (x: string) => x.toUpperCase()

    const result = pipe(
      3,
      partial(add, 7),
      String,
      partial(concat, 'prefix '),
      upper,
    )

    expect(result).toBe(upper(concat('prefix ', String(add(7, 3)))))
  })
})
