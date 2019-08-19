import tap from '@tsfun/tap'

const value = Symbol('value')

it('without side-effect functions', () => {
  expect(tap(value)).toBe(value)
})

describe('with one side-effect function', () => {
  const setup = () => {
    const fn = jest.fn()
    const result = tap(value, fn)
    return { fn, result }
  }

  it('calls side-effect function exactly once', () => {
    const { fn } = setup()
    expect(fn).toBeCalledTimes(1)
  })

  it('passes value to side-effect function', () => {
    const { fn } = setup()
    expect(fn).toBeCalledWith(value)
  })

  it('returns the passed value', () => {
    const { result } = setup()
    expect(result).toBe(value)
  })
})

describe('with multiple side-effect functions', () => {
  const setup = () => {
    const first = jest.fn()
    const second = jest.fn()
    const third = jest.fn()
    const result = tap(value, first, second, third)
    return { first, second, third, result }
  }

  describe('calls each side-effect function exactly once', () => {
    it('first', () => {
      const { first } = setup()
      expect(first).toBeCalledTimes(1)
    })

    it('second', () => {
      const { second } = setup()
      expect(second).toBeCalledTimes(1)
    })

    it('third', () => {
      const { third } = setup()
      expect(third).toBeCalledTimes(1)
    })
  })

  describe('passes value to each side-effect function', () => {
    it('first', () => {
      const { first } = setup()
      expect(first).toBeCalledWith(value)
    })

    it('second', () => {
      const { second } = setup()
      expect(second).toBeCalledWith(value)
    })

    it('third', () => {
      const { third } = setup()
      expect(third).toBeCalledWith(value)
    })
  })

  it('returns the passes value', () => {
    const { result } = setup()
    expect(result).toBe(value)
  })
})
