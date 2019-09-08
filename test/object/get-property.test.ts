import { pass } from '@tsfun/pipe'
import { getProperty, propertyGetter } from '@tsfun/object'

describe('getProperty', () => {
  it('string', () => {
    const object = { key: 'value' } as const
    expect(getProperty(object, 'key')).toBe('value')
  })

  it('number', () => {
    const object = { 123: 456 } as const
    expect(getProperty(object, 123)).toBe(456)
  })

  it('symbol', () => {
    const key = Symbol('key')
    const value = Symbol('value')
    const object = { [key]: value } as const
    expect(getProperty(object, key)).toBe(value)
  })

  it('works with @tsfun/pipe', () => {
    const object = { a: { b: { c: 'value' } } } as const
    expect(
      pass(object)
        .to(getProperty, 'a')
        .to(getProperty, 'b')
        .to(getProperty, 'c')
        .get()
    ).toBe('value')
  })
})

describe('propertyGetter', () => {
  function setup () {
    const symbolKey = Symbol('symbolKey')
    const symbolVal = Symbol('symbolVal')
    const object = { 'abc': 'def', 123: 456, [symbolKey]: symbolVal } as const
    const get = propertyGetter(object)
    return { symbolKey, symbolVal, object, get } as const
  }

  it('string', () => {
    const { get } = setup()
    expect(get('abc')).toBe('def')
  })

  it('number', () => {
    const { get } = setup()
    expect(get(123)).toBe(456)
  })

  it('symbol', () => {
    const { symbolKey, symbolVal, get } = setup()
    expect(get(symbolKey as any)).toBe(symbolVal)
  })
})
