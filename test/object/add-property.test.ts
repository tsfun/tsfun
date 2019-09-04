import { pass } from '@tsfun/pipe'
import { addProperty } from '@tsfun/object'

const value = Symbol('value')

describe('with null as proto', () => {
  const proto = null

  describe('with a string as key', () => {
    const key = 'abc'
    const get = () => addProperty(proto, key, value)

    it('returns an object that has null as prototype', () => {
      expect(Object.getPrototypeOf(get())).toBe(null)
    })

    it('returns an object that has [key] set to value', () => {
      expect(get()).toHaveProperty(key, value)
    })
  })

  describe('with a number as key', () => {
    const key = 123
    const get = () => addProperty(proto, key, value)

    it('returns an object that has null as prototype', () => {
      expect(Object.getPrototypeOf(get())).toBe(null)
    })

    it('returns an object that has [key] set to value', () => {
      expect(get()).toHaveProperty(String(key), value)
    })
  })

  describe('with a symbol as key', () => {
    const key = Symbol('key')
    const get = () => addProperty(proto, key, value)

    it('returns an object that has null as prototype', () => {
      expect(Object.getPrototypeOf(get())).toBe(null)
    })

    it('returns an object that has [key] set to value', () => {
      expect(get()[key]).toBe(value)
    })
  })
})

describe('with an object as proto', () => {
  const proto = null

  describe('with a string as key', () => {
    const key = 'abc'
    const get = () => addProperty(proto, key, value)

    it('returns an object that has proto as prototype', () => {
      expect(Object.getPrototypeOf(get())).toBe(proto)
    })

    it('returns an object that has [key] set to value', () => {
      expect(get()).toHaveProperty(key, value)
    })

    it('returns an object that is not proto', () => {
      expect(get()).not.toBe(proto)
    })
  })

  describe('with a number as key', () => {
    const key = 123
    const get = () => addProperty(proto, key, value)

    it('returns an object that has proto as prototype', () => {
      expect(Object.getPrototypeOf(get())).toBe(proto)
    })

    it('returns an object that has [key] set to value', () => {
      expect(get()).toHaveProperty(String(key), value)
    })

    it('returns an object that is not proto', () => {
      expect(get()).not.toBe(proto)
    })
  })

  describe('with a symbol as key', () => {
    const key = Symbol('key')
    const get = () => addProperty(proto, key, value)

    it('returns an object that has proto as prototype', () => {
      expect(Object.getPrototypeOf(get())).toBe(proto)
    })

    it('returns an object that has [key] set to value', () => {
      expect(get()[key]).toBe(value)
    })

    it('returns an object that is not proto', () => {
      expect(get()).not.toBe(proto)
    })
  })
})

describe('works with @tsfun/pipe', () => {
  const symbol = Symbol('symbol')

  const get = () => pass(null)
    .to(addProperty, 'abc' as const, 123 as const)
    .to(addProperty, 456 as const, 'def' as const)
    .to(addProperty, symbol, value)
    .get()

  it('first property', () => {
    expect(get()).toHaveProperty('abc', 123)
  })

  it('second property', () => {
    expect(get()).toHaveProperty(String(456), 'def')
  })

  it('third property', () => {
    expect(get()[symbol]).toBe(value)
  })
})
