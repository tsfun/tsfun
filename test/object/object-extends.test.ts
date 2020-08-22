import { objectExtends } from '@tsfun/object'

const foo = Symbol('foo')
const bar = Symbol('bar')

describe('with null as proto', () => {
  function setup() {
    const proto = null
    const properties = { abc: 123, 0: 'zero', [foo]: 'foo' } as const
    const result = objectExtends(proto, properties)
    return { proto, properties, result }
  }

  it('returns an object that has null as prototype', () => {
    const { result } = setup()
    expect(Object.getPrototypeOf(result)).toBe(null)
  })

  it('returns an object that matches properties', () => {
    const { properties, result } = setup()
    expect(result).toEqual(properties)
  })

  it('returns an object that is not properties', () => {
    const { properties, result } = setup()
    expect(result).not.toBe(properties)
  })
})

describe('with an object as proto', () => {
  function setup() {
    const proto = { abc: 123, 0: 'zero', [foo]: 'foo' } as const
    const properties = { def: 456, 1: 'one', [bar]: 'bar' } as const
    const result = objectExtends(proto, properties)
    return { proto, properties, result }
  }

  it('returns an object that has proto as prototype', () => {
    const { proto, result } = setup()
    expect(Object.getPrototypeOf(result)).toBe(proto)
  })

  it('returns an object that is not proto', () => {
    const { proto, result } = setup()
    expect(result).not.toBe(proto)
  })

  it('returns an object that matches properties', () => {
    const { properties, result } = setup()
    expect(result).toEqual(properties)
  })

  it('returns an object that is not properties', () => {
    const { properties, result } = setup()
    expect(result).not.toBe(properties)
  })
})
