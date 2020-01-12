import { getPropertyPath, setPropertyPath, deletePropertyPath } from '@tsfun/object'

const path = ['a', 'b', 'c'] as const

describe('getPropertyPath', () => {
  describe('object', () => {
    it('that contains only targeted path', () => {
      const value = Symbol('value')
      const object = { a: { b: { c: value } } }
      expect(getPropertyPath(object, path)).toEqual(value)
    })

    it('that also contains other paths', () => {
      const value = Symbol('value')
      const object = { a: { a: value, b: { c: value, a: 123 } } }
      expect(getPropertyPath(object, path)).toEqual(value)
    })

    it('that does not contain targeted path', () => {
      const value = Symbol('value')
      const object = { a: { b: { a: value } } }
      expect(getPropertyPath(object, path)).toEqual(undefined)
    })

    it('that contains part of targeted path', () => {
      const object = { a: { b: 'abc' } }
      expect(getPropertyPath(object, path)).toEqual('abc')
    })
  })

  describe('primitive', () => {
    it('undefined', () => {
      expect(getPropertyPath(undefined, path)).toBe(undefined)
    })

    it('null', () => {
      expect(getPropertyPath(null, path)).toBe(null)
    })

    it('string', () => {
      expect(getPropertyPath('string', path)).toBe('string')
    })

    it('number', () => {
      expect(getPropertyPath(123, path)).toBe(123)
    })

    it('symbol', () => {
      const symbol = Symbol('symbol')
      expect(getPropertyPath(symbol, path)).toBe(symbol)
    })

    it('boolean', () => {
      expect(getPropertyPath(true, path)).toBe(true)
    })
  })
})

describe('setPropertyPath', () => {
  describe('object', () => {
    describe('that contains only targeted path', () => {
      function setup () {
        const oldValue = Symbol('oldValue')
        const newValue = Symbol('newValue')
        const oldObject = { a: { b: { c: oldValue } } }
        const newObject = setPropertyPath(oldObject, path, newValue)
        return { oldValue, newValue, oldObject, newObject }
      }

      it('returns an object with new value', () => {
        const { newValue, newObject } = setup()
        expect(newObject).toEqual({ a: { b: { c: newValue } } })
      })

      it('does not mutate old object', () => {
        const { oldValue, oldObject } = setup()
        expect(oldObject).toEqual({ a: { b: { c: oldValue } } })
      })
    })

    describe('that also contains other paths', () => {
      function setup () {
        const oldValue = Symbol('oldValue')
        const newValue = Symbol('newValue')
        const oldObject = { a: { a: 123, b: { c: oldValue, d: 456 } } }
        const newObject = setPropertyPath(oldObject, path, newValue)
        return { oldValue, newValue, oldObject, newObject }
      }

      it('returns an object with new value', () => {
        const { newValue, newObject } = setup()
        expect(newObject).toEqual({ a: { a: 123, b: { c: newValue, d: 456 } } })
      })

      it('does not mutate old object', () => {
        const { oldValue, oldObject } = setup()
        expect(oldObject).toEqual({ a: { a: 123, b: { c: oldValue, d: 456 } } })
      })
    })

    describe('that does not contains targeted path', () => {
      function setup () {
        const oldValue = Symbol('oldValue')
        const newValue = Symbol('newValue')
        const oldObject = { a: { a: 123, c: { b: oldValue, d: 456 } } }
        const newObject = setPropertyPath(oldObject, path, newValue)
        return { oldValue, newValue, oldObject, newObject }
      }

      it('returns an object with new value', () => {
        const { oldValue, newValue, newObject } = setup()
        expect(newObject).toEqual({ a: { a: 123, b: { c: newValue }, c: { b: oldValue, d: 456 } } })
      })

      it('does not mutate old object', () => {
        const { oldValue, oldObject } = setup()
        expect(oldObject).toEqual({ a: { a: 123, c: { b: oldValue, d: 456 } } })
      })
    })

    describe('that contains part of targeted path', () => {
      function setup () {
        const newValue = Symbol('newValue')
        const oldObject = { a: { b: null } }
        const newObject = setPropertyPath(oldObject, path, newValue)
        return { newValue, oldObject, newObject }
      }

      it('returns an object with new value', () => {
        const { newValue, newObject } = setup()
        expect(newObject).toEqual({ a: { b: { c: newValue } } })
      })

      it('does not mutate old object', () => {
        const { oldObject } = setup()
        expect(oldObject).toEqual({ a: { b: null } })
      })
    })
  })

  describe('primitive', () => {
    const value = Symbol('value')

    it('undefined', () => {
      expect(setPropertyPath(undefined, path, value)).toEqual({ a: { b: { c: value } } })
    })

    it('null', () => {
      expect(setPropertyPath(null, path, value)).toEqual({ a: { b: { c: value } } })
    })

    it('string', () => {
      expect(setPropertyPath('string', path, value)).toEqual({ a: { b: { c: value } } })
    })

    it('number', () => {
      expect(setPropertyPath(123, path, value)).toEqual({ a: { b: { c: value } } })
    })

    it('symbol', () => {
      expect(setPropertyPath(Symbol('symbol'), path, value)).toEqual({ a: { b: { c: value } } })
    })

    it('boolean', () => {
      expect(setPropertyPath(true, path, value)).toEqual({ a: { b: { c: value } } })
    })
  })
})

describe('deletePropertyPath', () => {
  describe('non-empty path', () => {
    describe('object', () => {
      describe('that contains only targeted path', () => {
        function setup () {
          const value = Symbol('value')
          const oldObject = { a: { b: { c: value } } }
          const newObject = deletePropertyPath(oldObject, path)
          return { value, oldObject, newObject }
        }

        it('returns an object without targeted path', () => {
          const { newObject } = setup()
          expect(newObject).toEqual({ a: { b: {} } })
        })

        it('does not mutate old object', () => {
          const { value, oldObject } = setup()
          expect(oldObject).toEqual({ a: { b: { c: value } } })
        })
      })

      describe('that also contains other paths', () => {
        function setup () {
          const value = Symbol('value')
          const oldObject = { a: { a: value, b: { c: value, d: 123 } } }
          const newObject = deletePropertyPath(oldObject, path)
          return { value, oldObject, newObject }
        }

        it('returns an object without targeted path', () => {
          const { value, newObject } = setup()
          expect(newObject).toEqual({ a: { a: value, b: { d: 123 } } })
        })

        it('does not mutate old object', () => {
          const { value, oldObject } = setup()
          expect(oldObject).toEqual({ a: { a: value, b: { c: value, d: 123 } } })
        })
      })

      describe('that does not contains targeted path', () => {
        function setup () {
          const value = Symbol('value')
          const oldObject = { a: { c: { b: value } } }
          const newObject = deletePropertyPath(oldObject, path)
          return { value, oldObject, newObject }
        }

        it('returns an identical object', () => {
          const { oldObject, newObject } = setup()
          expect(newObject).toEqual(oldObject)
        })

        it('does not mutate old object', () => {
          const { value, oldObject } = setup()
          expect(oldObject).toEqual({ a: { c: { b: value } } })
        })
      })

      describe('that contains part of targeted path', () => {
        function setup () {
          const oldObject = { a: { b: null } }
          const newObject = deletePropertyPath(oldObject, path)
          return { oldObject, newObject }
        }

        it('returns an identical object', () => {
          const { oldObject, newObject } = setup()
          expect(newObject).toEqual(oldObject)
        })

        it('does not mutate old object', () => {
          const { oldObject } = setup()
          expect(oldObject).toEqual({ a: { b: null } })
        })
      })
    })

    describe('primitive', () => {
      it('undefined', () => {
        expect(deletePropertyPath(undefined, path)).toBe(undefined)
      })

      it('null', () => {
        expect(deletePropertyPath(null, path)).toBe(null)
      })

      it('string', () => {
        expect(deletePropertyPath('string', path)).toBe('string')
      })

      it('number', () => {
        expect(deletePropertyPath(123, path)).toBe(123)
      })

      it('symbol', () => {
        const symbol = Symbol('symbol')
        expect(deletePropertyPath(symbol, path)).toBe(symbol)
      })

      it('boolean', () => {
        expect(deletePropertyPath(true, path)).toBe(true)
      })
    })
  })

  describe('empty path', () => {
    it('object', () => {
      expect(deletePropertyPath({ a: 0, b: 1 }, [])).toBe(undefined)
    })

    it('undefined', () => {
      expect(deletePropertyPath(undefined, [])).toBe(undefined)
    })

    it('null', () => {
      expect(deletePropertyPath(null, [])).toBe(undefined)
    })

    it('string', () => {
      expect(deletePropertyPath('string', [])).toBe(undefined)
    })

    it('number', () => {
      expect(deletePropertyPath(123, [])).toBe(undefined)
    })

    it('symbol', () => {
      expect(deletePropertyPath(Symbol('symbol'), [])).toBe(undefined)
    })

    it('boolean', () => {
      expect(deletePropertyPath(true, [])).toBe(undefined)
    })
  })
})
