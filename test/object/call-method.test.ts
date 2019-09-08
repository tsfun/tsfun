import { pass } from '@tsfun/pipe'
import { applyMethod, callMethod, getMethod, methodGetter } from '@tsfun/object'

describe('applyMethod', () => {
  function setup () {
    const value = Symbol('value')
    const method = jest.fn((..._: any[]) => value)
    const object = { method }
    const args = [...'args']
    const result = applyMethod(object, 'method', args)
    return { value, method, object, args, result }
  }

  it('calls method once', () => {
    const { method } = setup()
    expect(method).toBeCalledTimes(1)
  })

  it('calls method with this pointing to bound object', () => {
    const { method, object } = setup()
    expect(method.mock.instances[0]).toBe(object)
  })

  it('calls method with expected arguments', () => {
    const { method, args } = setup()
    expect(method).toBeCalledWith(...args)
  })

  it('returns result of method', () => {
    const { value, result } = setup()
    expect(result).toBe(value)
  })
})

describe('callMethod', () => {
  function setup () {
    const value = Symbol('value')
    const method = jest.fn((..._: any[]) => value)
    const object = { method }
    const args = [...'args']
    const result = callMethod(object, 'method', ...args)
    return { value, method, object, args, result }
  }

  it('calls method once', () => {
    const { method } = setup()
    expect(method).toBeCalledTimes(1)
  })

  it('calls method with this pointing to bound object', () => {
    const { method, object } = setup()
    expect(method.mock.instances[0]).toBe(object)
  })

  it('calls method with expected arguments', () => {
    const { method, args } = setup()
    expect(method).toBeCalledWith(...args)
  })

  it('returns result of method', () => {
    const { value, result } = setup()
    expect(result).toBe(value)
  })
})

describe('getMethod', () => {
  function setup () {
    const value = Symbol('value')
    const method = jest.fn((..._: any[]) => value)
    const object = { method }
    const args = [...'args']
    const fn = getMethod(object, 'method')
    const result = fn(...args)
    return { value, method, object, args, fn, result }
  }

  it('calls method once', () => {
    const { method } = setup()
    expect(method).toBeCalledTimes(1)
  })

  it('calls method with this pointing to bound object', () => {
    const { method, object } = setup()
    expect(method.mock.instances[0]).toBe(object)
  })

  it('calls method with expected arguments', () => {
    const { method, args } = setup()
    expect(method).toBeCalledWith(...args)
  })

  it('returns result of method', () => {
    const { value, result } = setup()
    expect(result).toBe(value)
  })
})

describe('methodGetter', () => {
  function setup () {
    const value = Symbol('value')
    const method = jest.fn((..._: any[]) => value)
    const object = { method }
    const getMethod = methodGetter(object)
    const boundMethod = getMethod('method')
    const args = [...'args']
    const result = boundMethod(...args)
    return { value, method, object, getMethod, boundMethod, args, result }
  }

  it('calls method once', () => {
    const { method } = setup()
    expect(method).toBeCalledTimes(1)
  })

  it('calls method with this pointing to bound object', () => {
    const { method, object } = setup()
    expect(method.mock.instances[0]).toBe(object)
  })

  it('calls method with expected arguments', () => {
    const { method, args } = setup()
    expect(method).toBeCalledWith(...args)
  })

  it('returns result of method', () => {
    const { value, result } = setup()
    expect(result).toBe(value)
  })
})

describe('works with @tsfun/pipe', () => {
  const setup = () => ({
    setA: (a: 'a') => ({
      setBC: (b: 'b', c: 'c') => ({
        setDEF: (d: 'd', e: 'e', f: 'f') =>
          [a, b, c, d, e, f] as const
      })
    })
  })

  it('applyMethod', () => {
    expect(
      pass(setup())
        .to(applyMethod, 'setA', ['a'])
        .to(applyMethod, 'setBC', ['b', 'c'])
        .to(applyMethod, 'setDEF', ['d', 'e', 'f'])
        .get()
    ).toEqual(['a', 'b', 'c', 'd', 'e', 'f'])
  })

  it('callMethod', () => {
    expect(
      pass(setup())
        .to(callMethod, 'setA', 'a')
        .to(callMethod, 'setBC', 'b', 'c')
        .to(callMethod, 'setDEF', 'd', 'e', 'f')
        .get()
    ).toEqual(['a', 'b', 'c', 'd', 'e', 'f'])
  })
})
