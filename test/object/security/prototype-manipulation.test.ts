import {
  PropertyPreference,
  objectExtends,
  setProperty,
  setPropertyPath,
  deletePropertyPath,
  omit,
  omitOne,
  pick,
  pickOne,
  deepMergeWithPreference,
  deepMergePartial,
  deepMergeOverwrite,
  deepMergeWithoutCollision
} from '@tsfun/object'

describe('objectExtends', () => {
  function setup () {
    const original = { a: 0 }
    const extension = JSON.parse(`{
      "b": 1,
      "__proto__": {
        "evil": true
      }
    }`)
    const result = objectExtends(original, extension)
    return { original, extension, result }
  }

  it('does not change prototype to "__proto__"', () => {
    const { original, result } = setup()
    expect(Object.getPrototypeOf(result)).toBe(original)
  })

  it('makes own property "__proto__"', () => {
    const { result } = setup()
    expect(Object.getOwnPropertyDescriptor(result, '__proto__')).toHaveProperty('value')
  })

  it('does not inherits properties from extension.__proto__', () => {
    const { result } = setup()
    expect(result.evil).toBe(undefined)
  })
})

describe('setProperty', () => {
  function setup () {
    const object = { a: 0 }
    const value = { not: 'prototype' }
    const result = setProperty(object, '__proto__', value)
    return { object, value, result }
  }

  it('does not change prototype', () => {
    const { result } = setup()
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype)
  })

  it('makes own property "__proto__"', () => {
    const { value, result } = setup()
    expect(Object.getOwnPropertyDescriptor(result, '__proto__')!.value).toBe(value)
  })

  it('returns expected result', () => {
    const { result } = setup()
    expect(result).toEqual(JSON.parse(`{
      "a": 0,
      "__proto__": {
        "not": "prototype"
      }
    }`))
  })
})

describe('setPropertyPath', () => {
  function setup () {
    const object = { a: 0 }
    const value = { not: 'prototype' }
    const result = setPropertyPath(object, ['__proto__', '__proto__'], value)
    return { object, value, result }
  }

  it('does not change prototype', () => {
    const { result } = setup()
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype)
  })

  it('returns expected result', () => {
    const { result } = setup()
    expect(result).toEqual(JSON.parse(`{
      "a": 0,
      "__proto__": {
        "__proto__": {
          "not": "prototype"
        }
      }
    }`))
  })
})

describe('deletePropertyPath', () => {
  function setup () {
    const object = JSON.parse(`{
      "a": 0,
      "__proto__": {
        "b": 1,
        "__proto__": {
          "c": 2,
          "__proto__": null
        }
      }
    }`)
    const result = deletePropertyPath(object, ['__proto__', '__proto__', '__proto__'])
    return { object, result }
  }

  it('does not change prototype', () => {
    const { result } = setup()
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype)
  })

  it('returns expected result', () => {
    const { result } = setup()
    expect(result).toEqual(JSON.parse(`{
      "a": 0,
      "__proto__": {
        "b": 1,
        "__proto__": {
          "c": 2
        }
      }
    }`))
  })
})

describe('omit', () => {
  function setup () {
    const object = JSON.parse(`{
      "a": 0,
      "b": 1,
      "__proto__": null
    }`)
    const result = omit(object, ['b'])
    return { object, result }
  }

  it('does not change prototype', () => {
    const { result } = setup()
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype)
  })

  it('makes own property "__proto__"', () => {
    const { result } = setup()
    expect(Object.getOwnPropertyDescriptor(result, '__proto__')!.value).toBe(null)
  })

  it('returns expected result', () => {
    const { result } = setup()
    expect(result).toEqual(JSON.parse(`{
      "a": 0,
      "__proto__": null
    }`))
  })
})

describe('omitOne', () => {
  function setup () {
    const object = JSON.parse(`{
      "a": 0,
      "b": 1,
      "__proto__": null
    }`)
    const result = omitOne(object, 'b')
    return { object, result }
  }

  it('does not change prototype', () => {
    const { result } = setup()
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype)
  })

  it('makes own property "__proto__"', () => {
    const { result } = setup()
    expect(Object.getOwnPropertyDescriptor(result, '__proto__')!.value).toBe(null)
  })

  it('returns expected result', () => {
    const { result } = setup()
    expect(result).toEqual(JSON.parse(`{
      "a": 0,
      "__proto__": null
    }`))
  })
})

describe('pick', () => {
  function setup () {
    const object = JSON.parse(`{
      "a": 0,
      "b": 1,
      "__proto__": null
    }`)
    const result = pick(object, ['a', '__proto__'])
    return { object, result }
  }

  it('does not change prototype', () => {
    const { result } = setup()
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype)
  })

  it('makes own property "__proto__"', () => {
    const { result } = setup()
    expect(Object.getOwnPropertyDescriptor(result, '__proto__')!.value).toBe(null)
  })

  it('returns expected result', () => {
    const { result } = setup()
    expect(result).toEqual(JSON.parse(`{
      "a": 0,
      "__proto__": null
    }`))
  })
})

describe('pickOne', () => {
  function setup () {
    const object = JSON.parse(`{
      "a": 0,
      "b": 1,
      "__proto__": null
    }`)
    const result = pickOne(object, '__proto__')
    return { object, result }
  }

  it('does not change prototype', () => {
    const { result } = setup()
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype)
  })

  it('makes own property "__proto__"', () => {
    const { result } = setup()
    expect(Object.getOwnPropertyDescriptor(result, '__proto__')!.value).toBe(null)
  })

  it('returns expected result', () => {
    const { result } = setup()
    expect(result).toEqual(JSON.parse(`{
      "__proto__": null
    }`))
  })
})

describe('deepMergeWithPreference', () => {
  function setup () {
    const left = JSON.parse(`{
      "a": 0,
      "__proto__": null
    }`)
    const right = JSON.parse(`{
      "b": 1
    }`)
    const result = deepMergeWithPreference(left, right, () => PropertyPreference.Left)
    return { left, right, result }
  }

  it('does not change prototype', () => {
    const { result } = setup()
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype)
  })

  it('has own property "__proto__"', () => {
    const { result } = setup()
    expect(Object.getOwnPropertyDescriptor(result, '__proto__')!.value).toBe(null)
  })

  it('returns expected result', () => {
    const { result } = setup()
    expect(result).toEqual(JSON.parse(`{
      "a": 0,
      "b": 1,
      "__proto__": null
    }`))
  })
})

describe('deepMergePartial', () => {
  function setup () {
    const left = JSON.parse(`{
      "a": 0,
      "__proto__": null
    }`)
    const right = JSON.parse(`{
      "b": 1
    }`)
    const result = deepMergePartial(left, right, () => PropertyPreference.Left)
    return { left, right, result }
  }

  it('does not change prototype', () => {
    const { result } = setup()
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype)
  })

  it('has own property "__proto__"', () => {
    const { result } = setup()
    expect(Object.getOwnPropertyDescriptor(result, '__proto__')!.value).toBe(null)
  })

  it('returns expected result', () => {
    const { result } = setup()
    expect(result).toEqual(JSON.parse(`{
      "a": 0,
      "b": 1,
      "__proto__": null
    }`))
  })
})

describe('deepMergeOverwrite', () => {
  function setup () {
    const left = JSON.parse(`{
      "a": 0
    }`)
    const right = JSON.parse(`{
      "b": 1,
      "__proto__": null
    }`)
    const result = deepMergeOverwrite(left, right)
    return { left, right, result }
  }

  it('does not change prototype', () => {
    const { result } = setup()
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype)
  })

  it('returns expected result', () => {
    const { result } = setup()
    expect(result).toEqual(JSON.parse(`{
      "a": 0,
      "b": 1
    }`))
  })
})

describe('deepMergeWithoutCollision', () => {
  function setup () {
    const left = JSON.parse(`{
      "a": 0
    }`)
    const right = JSON.parse(`{
      "b": 1,
      "__proto__": null
    }`)
    const result = deepMergeWithoutCollision(left, right)
    return { left, right, result }
  }

  it('does not change prototype', () => {
    const { result } = setup()
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype)
  })

  it('returns expected result', () => {
    const { result } = setup()
    expect(result).toEqual(JSON.parse(`{
      "a": 0,
      "b": 1
    }`))
  })
})
