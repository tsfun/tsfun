import { pass } from '@tsfun/pipe'
import { curry } from '@tsfun/curry'

function setup () {
  const impl = (a: 0, b: 1, c: 2) => [a, b, c] as const
  const curriable = jest.fn(impl)
  const curried = curry(curriable)
  return { impl, curriable, curried }
}

describe('curried :: (1, 2) -> _', () => {
  function init () {
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
  function init () {
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
  const curried = curry(curry(curry(<X> (x: X) => x)))
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
