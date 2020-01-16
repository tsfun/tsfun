import { err, tryExec } from '@tsfun/result'
import { deepMergeWithoutCollision } from '@tsfun/object'

describe('deepMergeWithoutCollision', () => {
  describe('without collision', () => {
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
              a: 'dcba'
            }
          }
        }
      }

      const B = {
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
        }
      }

      const AB = deepMergeWithoutCollision(A, B)
      return { A, B, AB }
    }

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
          type: deepMergeWithoutCollision.ErrorType.PropertyCollision,
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
          type: deepMergeWithoutCollision.ErrorType.PropertyCollision,
          objects: [expect.any(Object), expect.any(Object)],
          key: expect.any(String),
          values: [expect.anything(), expect.anything()]
        })
      })
    })
  })
})
