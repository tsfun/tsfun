import { pass } from '@tsfun/pipe'
import { err, tryExec } from '@tsfun/result'
import { deepFreeze } from '@tools/test-utils'

import {
  deepMergeWithPreference,
  deepMergeOverwrite,
  deepMergePartial,
  deepMergeWithoutCollision,
  omitOne,
  deletePropertyPath,
  setPropertyPath,
  PropertyPreference,
  DeepPartial,
  ErrorType
} from '@tsfun/object'

describe('deepMergeWithPreference', () => {
  describe('no collision', () => {
    function setup () {
      interface AB {
        readonly a0?: {
          readonly a1?: {
            readonly a2?: string
            readonly b2?: string
          }
          readonly b1?: {
            readonly a2?: string
            readonly b2?: string
          }
        }
        readonly b0?: {
          readonly a1?: {
            readonly a2?: string
            readonly b2?: string
          }
          readonly b1?: {
            readonly a2?: string
            readonly b2?: string
          }
        }
      }

      const A: AB = {
        a0: {
          a1: {
            a2: 'a0.a1.a2'
          },
          b1: {
            a2: 'a0.b1.a2'
          }
        },
        b0: {
          a1: {
            a2: 'b0.a1.a2'
          },
          b1: {
            a2: 'b0.b1.a2'
          }
        }
      }

      const B: AB = {
        a0: {
          a1: {
            b2: 'a0.a1.b2'
          },
          b1: {
            b2: 'a0.b1.b2'
          }
        },
        b0: {
          a1: {
            b2: 'b0.a1.b2'
          },
          b1: {
            b2: 'b0.b1.b2'
          }
        }
      }

      const resolveConflict = jest.fn(() => {
        throw new Error('This function is supposed to not be called')
      })
      const AB = deepMergeWithPreference(A, B, resolveConflict)
      return { A, B, resolveConflict, AB }
    }

    it('does not call resolveConflict', () => {
      expect(setup().resolveConflict).not.toBeCalled()
    })

    it('creates an object that has all properties of A', () => {
      const { A, AB } = setup()
      expect(AB).toMatchObject(A)
    })

    it('creates an object that has all properties of B', () => {
      const { B, AB } = setup()
      expect(AB).toMatchObject(B)
    })

    it('creates an object that matches snapshot', () => {
      expect(setup().AB).toMatchSnapshot()
    })
  })

  describe('with collision but prefer truthy values', () => {
    function setup () {
      interface AB {
        readonly a0?: {
          readonly a1?: {
            readonly a2?: string | null | false | 0
            readonly b2?: string | null | false | 0
          }
          readonly b1?: {
            readonly a2?: string | null | false | 0
            readonly b2?: string | null | false | 0
          }
        }
        readonly b0?: {
          readonly a1?: {
            readonly a2?: string | null | false | 0
            readonly b2?: string | null | false | 0
          }
          readonly b1?: {
            readonly a2?: string | null | false | 0
            readonly b2?: string | null | false | 0
          }
        }
      }

      const A: AB = {
        a0: {
          a1: {
            a2: 'a0.a1.a2',
            b2: undefined
          },
          b1: {
            a2: 'a0.b1.a2',
            b2: null
          }
        },
        b0: {
          a1: {
            a2: 'b0.a1.a2',
            b2: false
          },
          b1: {
            a2: 'b0.b1.a2',
            b2: 0
          }
        }
      }

      const B: AB = {
        a0: {
          a1: undefined,
          b1: undefined
        },
        b0: {
          a1: {
            b2: 'b0.a1.b2'
          },
          b1: {
            b2: 'b0.b1.b2'
          }
        }
      }

      const resolveConflict = jest.fn(([left, right]: [any, any]) => {
        if (left && !right) return PropertyPreference.Left
        if (right && !left) return PropertyPreference.Right
        throw new RangeError(`Cannot decide preference between ${left} and ${right}`)
      })
      const AB = deepMergeWithPreference(A, B, resolveConflict)
      return { A, B, resolveConflict, AB }
    }

    it('calls resolveConflict', () => {
      expect(setup().resolveConflict.mock.calls).toMatchSnapshot()
    })

    it('falsy values from A is overwritten', () => {
      const { AB } = setup()
      expect({
        'a0.a1': AB.a0!.a1,
        'a0.b1': AB.a0!.b1,
        'b0.a1.b2': AB.b0!.a1!.b2,
        'b0.b1.b2': AB.b0!.b1!.b2
      }).toEqual({
        'a0.a1': expect.any(Object),
        'a0.b1': expect.any(Object),
        'b0.a1.b2': expect.any(String),
        'b0.b1.b2': expect.any(String)
      })
    })

    it('creates an object that matches snapshot', () => {
      expect(setup().AB).toMatchSnapshot()
    })
  })

  describe('with collision but prefer falsy values', () => {
    function setup () {
      interface AB {
        readonly a0?: {
          readonly a1?: {
            readonly a2?: string | null | false | 0
            readonly b2?: string | null | false | 0
          }
          readonly b1?: {
            readonly a2?: string | null | false | 0
            readonly b2?: string | null | false | 0
          }
        }
        readonly b0?: {
          readonly a1?: {
            readonly a2?: string | null | false | 0
            readonly b2?: string | null | false | 0
          }
          readonly b1?: {
            readonly a2?: string | null | false | 0
            readonly b2?: string | null | false | 0
          }
        }
      }

      const A: AB = {
        a0: {
          a1: {
            a2: 'a0.a1.a2',
            b2: undefined
          },
          b1: {
            a2: 'a0.b1.a2',
            b2: null
          }
        },
        b0: {
          a1: {
            a2: 'b0.a1.a2',
            b2: false
          },
          b1: {
            a2: 'b0.b1.a2',
            b2: 0
          }
        }
      }

      const B: AB = {
        a0: {
          a1: undefined,
          b1: undefined
        },
        b0: {
          a1: {
            b2: 'b0.a1.b2'
          },
          b1: {
            b2: 'b0.b1.b2'
          }
        }
      }

      const resolveConflict = jest.fn(([left, right]: [any, any]) => {
        if (left && !right) return PropertyPreference.Right
        if (right && !left) return PropertyPreference.Left
        throw new RangeError(`Cannot decide preference between ${left} and ${right}`)
      })
      const AB = deepMergeWithPreference(A, B, resolveConflict)
      return { A, B, resolveConflict, AB }
    }

    it('calls resolveConflict', () => {
      expect(setup().resolveConflict.mock.calls).toMatchSnapshot()
    })

    it('truthy values from A is overwritten', () => {
      const { AB } = setup()
      expect({
        'a0.a1': AB.a0!.a1,
        'a0.b1': AB.a0!.b1,
        'b0.a1.b2': AB.b0!.a1!.b2,
        'b0.b1.b2': AB.b0!.b1!.b2
      }).toEqual({
        'a0.a1': undefined,
        'a0.b1': undefined,
        'b0.a1.b2': false,
        'b0.b1.b2': 0
      })
    })

    it('creates an object that matches snapshot', () => {
      expect(setup().AB).toMatchSnapshot()
    })
  })
})

describe('deepMergeOverwrite', () => {
  describe('no shallow collision', () => {
    function setup () {
      interface AB {
        readonly a0?: symbol
        readonly a1?: symbol
        readonly a2?: symbol
        readonly b0?: symbol
        readonly b1?: symbol
        readonly b2?: symbol
      }

      const A: AB = deepFreeze({
        a0: Symbol('a0'),
        a1: Symbol('a1'),
        a2: Symbol('a2')
      })

      const B: AB = deepFreeze({
        b0: Symbol('b0'),
        b1: Symbol('b1'),
        b2: Symbol('b2')
      })

      const AB = deepMergeOverwrite(A, B)
      return { A, B, AB }
    }

    it('creates an object that has all properties of A', () => {
      const { A, AB } = setup()
      expect(AB).toMatchObject(A)
    })

    it('creates an object that has all properties of B', () => {
      const { B, AB } = setup()
      expect(AB).toMatchObject(B)
    })

    it('equivalents to { ...B, ...A }', () => {
      const { A, B, AB } = setup()
      expect(AB).toEqual({ ...B, ...A })
    })

    it('equivalents to { ...A, ...B }', () => {
      const { A, B, AB } = setup()
      expect(AB).toEqual({ ...A, ...B })
    })
  })

  describe('some shallow collisions', () => {
    function setup () {
      interface AB {
        readonly a0?: symbol
        readonly a1?: symbol
        readonly a2?: symbol
        readonly b0?: symbol
        readonly b1?: symbol
        readonly b2?: symbol
        readonly ab: string
        readonly ba: string
      }

      const A: AB = deepFreeze({
        a0: Symbol('a0'),
        a1: Symbol('a1'),
        a2: Symbol('a2'),
        ab: 'from A',
        ba: 'from A'
      })

      const B: AB = deepFreeze({
        b0: Symbol('b0'),
        b1: Symbol('b1'),
        b2: Symbol('b2'),
        ab: 'from B',
        ba: 'from B'
      })

      const AB = deepMergeOverwrite(A, B)
      return { A, B, AB }
    }

    it('creates an object that has all properties of A except shared properties', () => {
      const { A, AB } = setup()
      const { ab, ba, ...newA } = A
      expect(AB).toMatchObject(newA)
    })

    it('creates an object that has all properties of B', () => {
      const { B, AB } = setup()
      expect(AB).toMatchObject(B)
    })

    it('equivalents to { ...A, ...B }', () => {
      const { A, B, AB } = setup()
      expect(AB).toEqual({ ...A, ...B })
    })
  })

  describe('no deep collision', () => {
    function setup () {
      interface AB {
        readonly a0?: symbol
        readonly a1?: symbol
        readonly a2?: symbol
        readonly b0?: symbol
        readonly b1?: symbol
        readonly b2?: symbol
        readonly ab: {
          readonly a0?: string
          readonly a1?: number
          readonly b0?: string
          readonly b1?: number
        }
        readonly ba: {
          readonly a0?: number
          readonly a1?: string
          readonly b0?: number
          readonly b1?: string
        }
      }

      const A: AB = deepFreeze({
        a0: Symbol('a0'),
        a1: Symbol('a1'),
        a2: Symbol('a2'),
        ab: {
          a0: 'ab.a0',
          a1: 123
        },
        ba: {
          a0: 456,
          a1: 'ba.a1'
        }
      })

      const B: AB = deepFreeze({
        b0: Symbol('b0'),
        b1: Symbol('b1'),
        b2: Symbol('b2'),
        ab: {
          b0: 'ab.b0',
          b1: 321
        },
        ba: {
          b0: 654,
          b1: 'ba.b1'
        }
      })

      const AB = deepMergeOverwrite(A, B)
      return { A, B, AB }
    }

    it('creates an object that has all properties of A', () => {
      const { A, AB } = setup()
      expect(AB).toMatchObject(A)
    })

    it('creates an object that has all properties of B', () => {
      const { B, AB } = setup()
      expect(AB).toMatchObject(B)
    })

    it('returns expected object', () => {
      const { A, B, AB } = setup()
      const expected = pass({ ...A, ...B })
        .to(setPropertyPath, ['ab', 'a0'], A.ab.a0)
        .to(setPropertyPath, ['ab', 'a1'], A.ab.a1)
        .to(setPropertyPath, ['ba', 'a0'], A.ba.a0)
        .to(setPropertyPath, ['ba', 'a1'], A.ba.a1)
        .get()
      expect(AB).toEqual(expected)
    })
  })

  describe('some deep collisions', () => {
    function setup () {
      interface AB {
        readonly a0?: symbol
        readonly a1?: symbol
        readonly a2?: symbol
        readonly b0?: symbol
        readonly b1?: symbol
        readonly b2?: symbol
        readonly ab: {
          readonly a0?: string
          readonly a1?: number
          readonly b0?: string
          readonly b1?: number
          readonly ab: string
          readonly ba: number
        }
        readonly ba: {
          readonly a0?: number
          readonly a1?: string
          readonly b0?: number
          readonly b1?: string
          readonly ab: number
          readonly ba: string
        }
      }

      const A: AB = deepFreeze({
        a0: Symbol('a0'),
        a1: Symbol('a1'),
        a2: Symbol('a2'),
        ab: {
          a0: 'ab.a0',
          a1: 123,
          ab: 'from A',
          ba: 135
        },
        ba: {
          a0: 456,
          a1: 'ba.a1',
          ab: 246,
          ba: 'from A'
        }
      })

      const B: AB = deepFreeze({
        b0: Symbol('b0'),
        b1: Symbol('b1'),
        b2: Symbol('b2'),
        ab: {
          b0: 'ab.b0',
          b1: 321,
          ab: 'from B',
          ba: 531
        },
        ba: {
          b0: 654,
          b1: 'ba.b1',
          ab: 642,
          ba: 'from B'
        }
      })

      const AB = deepMergeOverwrite(A, B)
      return { A, B, AB }
    }

    it('creates an object that has all properties of A except shared properties', () => {
      const { A, AB } = setup()
      const newA = pass(A)
        .to(deletePropertyPath, ['ab', 'ab'])
        .to(deletePropertyPath, ['ab', 'ba'])
        .to(deletePropertyPath, ['ba', 'ab'])
        .to(deletePropertyPath, ['ba', 'ba'])
        .get()
      expect(AB).toMatchObject(newA)
    })

    it('creates an object that has all properties of B', () => {
      const { B, AB } = setup()
      expect(AB).toMatchObject(B)
    })

    it('returns expected object', () => {
      const { A, B, AB } = setup()
      const expected = pass({ ...A, ...B })
        .to(setPropertyPath, ['ab', 'a0'], A.ab.a0)
        .to(setPropertyPath, ['ab', 'a1'], A.ab.a1)
        .to(setPropertyPath, ['ba', 'a0'], A.ba.a0)
        .to(setPropertyPath, ['ba', 'a1'], A.ba.a1)
        .get()
      expect(AB).toEqual(expected)
    })
  })

  describe('null is not considered an object', () => {
    function setup () {
      interface AB {
        readonly a0?: symbol
        readonly a1?: symbol
        readonly a2?: symbol
        readonly b0?: symbol
        readonly b1?: symbol
        readonly b2?: symbol
        readonly ab: null | {
          readonly a0?: string
          readonly a1?: number
          readonly b0?: string
          readonly b1?: number
        }
        readonly ba: null | {
          readonly a0?: number
          readonly a1?: string
          readonly b0?: number
          readonly b1?: string
        }
      }

      const A: AB = deepFreeze({
        a0: Symbol('a0'),
        a1: Symbol('a1'),
        a2: Symbol('a2'),
        ab: null,
        ba: {
          a0: 456,
          a1: 'ba.a1'
        }
      })

      const B: AB = deepFreeze({
        b0: Symbol('b0'),
        b1: Symbol('b1'),
        b2: Symbol('b2'),
        ab: {
          b0: 'ab.b0',
          b1: 321
        },
        ba: null
      })

      const AB = deepMergeOverwrite(A, B)
      return { A, B, AB }
    }

    it('creates an object that has all properties of A except shared properties', () => {
      const { A, AB } = setup()
      const newA = pass(A)
        .to(omitOne, 'ab' as const)
        .to(deletePropertyPath, ['ba', 'a0'])
        .to(deletePropertyPath, ['ba', 'a1'])
        .get()
      expect(AB).toMatchObject(newA)
    })

    it('creates an object that has all properties of B', () => {
      const { B, AB } = setup()
      expect(AB).toMatchObject(B)
    })

    it('returns expected object', () => {
      const { A, B, AB } = setup()
      expect(AB).toEqual({ ...A, ...B })
    })
  })

  describe('arrays are not considered objects', () => {
    function setup () {
      interface AB {
        readonly a0?: symbol
        readonly a1?: symbol
        readonly a2?: symbol
        readonly b0?: symbol
        readonly b1?: symbol
        readonly b2?: symbol
        readonly ab: readonly string[] | {
          readonly a0?: string
          readonly a1?: number
          readonly b0?: string
          readonly b1?: number
        }
        readonly ba: readonly string[] | {
          readonly a0?: number
          readonly a1?: string
          readonly b0?: number
          readonly b1?: string
        }
      }

      const A: AB = deepFreeze({
        a0: Symbol('a0'),
        a1: Symbol('a1'),
        a2: Symbol('a2'),
        ab: ['A', 'a', 'b'],
        ba: {
          a0: 456,
          a1: 'ba.a1'
        }
      })

      const B: AB = deepFreeze({
        b0: Symbol('b0'),
        b1: Symbol('b1'),
        b2: Symbol('b2'),
        ab: {
          b0: 'ab.b0',
          b1: 321
        },
        ba: ['B', 'b', 'a']
      })

      const AB = deepMergeOverwrite(A, B)
      return { A, B, AB }
    }

    it('creates an object that has all properties of A except shared properties', () => {
      const { A, AB } = setup()
      const newA = pass(A)
        .to(omitOne, 'ab' as const)
        .to(deletePropertyPath, ['ba', 'a0'])
        .to(deletePropertyPath, ['ba', 'a1'])
        .get()
      expect(AB).toMatchObject(newA)
    })

    it('creates an object that has all properties of B', () => {
      const { B, AB } = setup()
      expect(AB).toMatchObject(B)
    })

    it('returns expected object', () => {
      const { A, B, AB } = setup()
      expect(AB).toEqual({ ...A, ...B })
    })
  })
})

describe('deepMergePartial', () => {
  interface Left {
    readonly a: {
      readonly a: string
      readonly b?: string
    }
    readonly b?: {
      readonly a: readonly string[]
      readonly b?: readonly string[]
    }
    readonly c: readonly [
      string,
      { readonly a: string },
      { readonly b?: string }
    ]
    readonly d?: readonly [
      string,
      { readonly a: string },
      { readonly b?: string }
    ]
  }

  type Right = DeepPartial<Left>

  describe('no collision', () => {
    function setup () {
      const left: Left = {
        a: {
          a: 'aa'
        },
        c: ['c0', { a: 'c1a' }, { b: 'c1b' }]
      }

      const right: Right = {
        a: {
          b: 'ab'
        },
        b: {
          a: ['b', 'a']
        },
        d: ['d0', { a: 'd1a' }, { b: 'd1b' }]
      }

      const resolveConflict = jest.fn(() => {
        throw new Error('This function is supposed to not be called')
      })
      const result = deepMergePartial(left, right, resolveConflict)
      return { left, right, resolveConflict, result }
    }

    it('creates an object that has all properties of left', () => {
      const { left, result } = setup()
      expect(result).toMatchObject(left)
    })

    it('creates an object that has all properties of right', () => {
      const { right, result } = setup()
      expect(result).toMatchObject(right)
    })

    it('creates object that matches snapshot', () => {
      expect(setup().result).toMatchSnapshot()
    })

    it('does not call resolveConflict', () => {
      expect(setup().resolveConflict).not.toBeCalled()
    })
  })

  describe('collide with undefined from right', () => {
    function setup () {
      const left: Left = {
        a: {
          a: 'aa'
        },
        b: {
          a: ['b', 'a'],
          b: ['b', 'b']
        },
        c: ['c0', { a: 'c1a' }, { b: 'c1b' }]
      }

      const right: Right = {
        a: {
          a: undefined,
          b: 'ab'
        },
        b: {
          a: undefined,
          b: undefined
        },
        c: undefined,
        d: ['d0', { a: 'd1a' }, { b: 'd1b' }]
      }

      const resolveConflict = jest.fn(() => {
        throw new Error('This function is supposed to not be called')
      })
      const result = deepMergePartial(left, right, resolveConflict)
      return { left, right, resolveConflict, result }
    }

    it('creates an object that has all properties of left', () => {
      const { left, result } = setup()
      expect(result).toMatchObject(left)
    })

    it('creates object that matches snapshot', () => {
      expect(setup().result).toMatchSnapshot()
    })

    it('does not call resolveConflict', () => {
      expect(setup().resolveConflict).not.toBeCalled()
    })
  })

  describe('collide with non-undefined from right and have a conflict resolver that prefers right', () => {
    function setup () {
      const left: Left = {
        a: {
          a: 'left aa'
        },
        b: {
          a: ['left', 'b', 'a'],
          b: ['left', 'b', 'b']
        },
        c: ['left c0', { a: 'left c1a' }, { b: 'left c1b' }]
      }

      const right: Right = {
        a: {
          a: 'right aa',
          b: 'right ab'
        },
        b: {
          a: ['right', 'a', 'b'],
          b: ['right', 'b', 'b']
        },
        c: ['right c0', { a: 'right c1a' }, { b: 'right c1b' }],
        d: ['right d0', { a: 'right d1a' }, { b: 'right d1b' }]
      }

      const resolveConflict = jest.fn(() => PropertyPreference.Right)
      const result = deepMergePartial(left, right, resolveConflict)
      return { left, right, resolveConflict, result }
    }

    it('creates an object that has all properties of right', () => {
      const { right, result } = setup()
      expect(result).toMatchObject(right)
    })

    it('creates object that matches snapshot', () => {
      expect(setup().result).toMatchSnapshot()
    })

    it('calls resolveConflict', () => {
      expect(setup().resolveConflict.mock.calls).toMatchSnapshot()
    })
  })
})

describe('deepMergeWithoutCollision', () => {
  describe('without collision', () => {
    function setup () {
      const A = deepFreeze({
        a: 0,
        b: 'b',
        c: {
          a: 1
        },
        d: {
          c: {
            b: {
              a: 'dcba'
            }
          }
        },
        f: null
      })

      const B = deepFreeze({
        c: {
          b: 'a'
        },
        d: {
          a: 0,
          c: {
            b: {
              b: 'dcbb'
            }
          }
        },
        e: [0, 1, { a: null }]
      })

      const AB = deepMergeWithoutCollision(A, B)
      return { A, B, AB }
    }

    it('equivalents to deepMergeOverwrite(A, B)', () => {
      const { A, B, AB } = setup()
      expect(AB).toEqual(deepMergeOverwrite<any>(A, B))
    })

    it('returns an object that has all properties of A', () => {
      const { A, AB } = setup()
      expect(AB).toMatchObject(A)
    })

    it('returns an object that has all properties of B', () => {
      const { B, AB } = setup()
      expect(AB).toMatchObject(B)
    })

    it('does not modify A into AB', () => {
      const { A, AB } = setup()
      expect(A).not.toMatchObject(AB)
    })

    it('does not modify B into AB', () => {
      const { B, AB } = setup()
      expect(B).not.toMatchObject(AB)
    })

    it('preserves null', () => {
      const { AB } = setup()
      expect(AB.f).toBe(null)
    })

    it('preserves array', () => {
      const { AB } = setup()
      expect(AB.e).toEqual(expect.any(Array))
    })
  })

  describe('with collision', () => {
    describe('with default error handler', () => {
      function setup () {
        const A = {
          a: 0,
          b: 'b',
          c: {
            a: 1
          },
          d: {
            c: {
              b: {
                a: 44
              }
            }
          }
        }

        const B = {
          c: {
            a: 'a'
          },
          d: {
            a: 0,
            c: {
              b: {
                a: () => 123
              }
            }
          }
        }

        const fAB = () => deepMergeWithoutCollision(A, B)
        const rAB = tryExec(fAB)
        return { A, B, fAB, rAB }
      }

      it('throws a TypeError', () => {
        const { rAB } = setup()
        expect(rAB).toEqual(err(expect.any(TypeError)))
      })

      it('throws an error that matches snapshot', () => {
        const { rAB } = setup()
        expect(rAB).toMatchSnapshot()
      })

      it('throws an object with expected properties', () => {
        const { rAB } = setup()
        expect({
          ...(rAB as any).error
        }).toEqual({
          type: ErrorType.PropertyCollision,
          objects: [expect.any(Object), expect.any(Object)],
          key: expect.any(String),
          values: [expect.anything(), expect.anything()]
        })
      })
    })

    describe('with custom error handler', () => {
      function setup () {
        const A = {
          a: 0,
          b: 'b',
          c: {
            a: 1
          },
          d: {
            c: {
              b: {
                a: 44
              }
            }
          }
        }

        const B = {
          c: {
            a: 'a'
          },
          d: {
            a: 0,
            c: {
              b: {
                a: () => 123
              }
            }
          }
        }

        const errReturn = Symbol('errReturn')
        const onerror = jest.fn(() => errReturn)
        const fAB = () => deepMergeWithoutCollision(A, B, onerror)
        const rAB = tryExec(fAB)
        return { A, B, errReturn, onerror, fAB, rAB }
      }

      it('throws result of error handler', () => {
        const { errReturn, rAB } = setup()
        expect(rAB).toEqual(err(errReturn))
      })

      it('calls error handler once', () => {
        const { onerror } = setup()
        expect(onerror).toBeCalledTimes(1)
      })

      it('calls error handler with expected arguments', () => {
        const { onerror } = setup()
        expect(onerror).toBeCalledWith({
          type: ErrorType.PropertyCollision,
          objects: [expect.any(Object), expect.any(Object)],
          key: expect.any(String),
          values: [expect.anything(), expect.anything()]
        })
      })
    })

    describe('with null in a', () => {
      function setup () {
        const A = {
          a: null
        }

        const B = {
          a: {
            b: 123
          }
        }

        const fAB = () => deepMergeWithoutCollision(A, B)
        const rAB = tryExec(fAB)
        return { A, B, fAB, rAB }
      }

      it('throws a TypeError', () => {
        const { rAB } = setup()
        expect(rAB).toEqual(err(expect.any(TypeError)))
      })

      it('throws an error that matches snapshot', () => {
        const { rAB } = setup()
        expect(rAB).toMatchSnapshot()
      })

      it('throws an object with expected properties', () => {
        const { rAB } = setup()
        expect({
          ...(rAB as any).error
        }).toEqual({
          type: ErrorType.PropertyCollision,
          objects: [expect.any(Object), expect.any(Object)],
          key: expect.any(String),
          values: [null, expect.anything()]
        })
      })
    })

    describe('with null in b', () => {
      function setup () {
        const A = {
          a: {
            b: 123
          }
        }

        const B = {
          a: null
        }

        const fAB = () => deepMergeWithoutCollision(A, B)
        const rAB = tryExec(fAB)
        return { A, B, fAB, rAB }
      }

      it('throws a TypeError', () => {
        const { rAB } = setup()
        expect(rAB).toEqual(err(expect.any(TypeError)))
      })

      it('throws an error that matches snapshot', () => {
        const { rAB } = setup()
        expect(rAB).toMatchSnapshot()
      })

      it('throws an object with expected properties', () => {
        const { rAB } = setup()
        expect({
          ...(rAB as any).error
        }).toEqual({
          type: ErrorType.PropertyCollision,
          objects: [expect.any(Object), expect.any(Object)],
          key: expect.any(String),
          values: [expect.anything(), null]
        })
      })
    })

    describe('with array in a', () => {
      function setup () {
        const A = {
          a: [0, 1, 2]
        }

        const B = {
          a: {
            b: 123
          }
        }

        const fAB = () => deepMergeWithoutCollision(A, B)
        const rAB = tryExec(fAB)
        return { A, B, fAB, rAB }
      }

      it('throws a TypeError', () => {
        const { rAB } = setup()
        expect(rAB).toEqual(err(expect.any(TypeError)))
      })

      it('throws an error that matches snapshot', () => {
        const { rAB } = setup()
        expect(rAB).toMatchSnapshot()
      })

      it('throws an object with expected properties', () => {
        const { rAB } = setup()
        expect({
          ...(rAB as any).error
        }).toEqual({
          type: ErrorType.PropertyCollision,
          objects: [expect.any(Object), expect.any(Object)],
          key: expect.any(String),
          values: [expect.any(Array), expect.anything()]
        })
      })
    })

    describe('with array in b', () => {
      function setup () {
        const A = {
          a: {
            b: 123
          }
        }

        const B = {
          a: [0, 1, 2]
        }

        const fAB = () => deepMergeWithoutCollision(A, B)
        const rAB = tryExec(fAB)
        return { A, B, fAB, rAB }
      }

      it('throws a TypeError', () => {
        const { rAB } = setup()
        expect(rAB).toEqual(err(expect.any(TypeError)))
      })

      it('throws an error that matches snapshot', () => {
        const { rAB } = setup()
        expect(rAB).toMatchSnapshot()
      })

      it('throws an object with expected properties', () => {
        const { rAB } = setup()
        expect({
          ...(rAB as any).error
        }).toEqual({
          type: ErrorType.PropertyCollision,
          objects: [expect.any(Object), expect.any(Object)],
          key: expect.any(String),
          values: [expect.anything(), expect.any(Array)]
        })
      })
    })
  })
})
