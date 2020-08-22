import {
  Ok,
  Err,
  asyncUnwrap,
  asyncUnwrapOr,
  asyncUnwrapOrElse,
  ok,
  err,
} from '@tsfun/result'

type MaybePromise<X> = X | Promise<X>
type AsyncOk<X> = MaybePromise<Ok<MaybePromise<X>>>
type AsyncErr<X> = MaybePromise<Err<MaybePromise<X>>>

const testCase = (
  ok: <X>(x: X) => AsyncOk<X>,
  err: <X>(x: X) => AsyncErr<X>,
) =>
  () => {
    describe('asyncUnwrap', () => {
      describe('with an Ok', () => {
        it('returns carried payload', async () => {
          expect(await asyncUnwrap(ok('payload'))).toBe('payload')
        })
      })

      describe('with an Err', () => {
        it('throws carried error', async () => {
          await expect(asyncUnwrap(err('error'))).rejects.toBe('error')
        })
      })
    })

    describe('asyncUnwrapOr', () => {
      describe('with an Ok', () => {
        it('returns carried payload', async () => {
          expect(await asyncUnwrapOr(ok('a'), 'b')).toBe('a')
        })
      })

      describe('with an Err', () => {
        it('returns provided default', async () => {
          expect(await asyncUnwrapOr(err('a'), 'b')).toBe('b')
        })
      })
    })

    describe('asyncUnwrapOrElse', () => {
      const def = (error: any) => `ERROR = ${JSON.stringify(error)}`
      const asyncDef = async (error: any) => def(error)
      const mkFn = () => jest.fn(def)
      const mkAsyncFn = () => jest.fn(asyncDef)

      describe('with an Ok', () => {
        const fn = mkFn()
        const res = asyncUnwrapOrElse(ok('payload'), fn)

        it('returns carried payload', async () => {
          expect(await res).toBe('payload')
        })

        it('does not call provided function', async () => {
          await res
          expect(fn).not.toBeCalled()
        })
      })

      describe('with an Err and a sync default', () => {
        const fn = mkFn()
        const res = asyncUnwrapOrElse(err('error'), fn)

        it('returns result of the function', async () => {
          expect(await res).toBe(def('error'))
        })

        it('calls provided function exactly once with carried error', async () => {
          await res
          expect(fn.mock.calls).toEqual([['error']])
        })
      })

      describe('with an Err and an async default', () => {
        const fn = mkAsyncFn()
        const res = asyncUnwrapOrElse(err('error'), fn)

        it('returns result of the function', async () => {
          expect(await res).toBe(def('error'))
        })

        it('calls provided function exactly once with carried error', async () => {
          await res
          expect(fn.mock.calls).toEqual([['error']])
        })
      })
    })
  }

describe('with Result<X>', testCase(ok, err))

describe('with Result<Promise<X>>', testCase(<X>(x: X) => ok(Promise.resolve(x)), <X>(x: X) => err(Promise.resolve(x))))

describe(
  'with Promise<Result<X>>',
  testCase(
    async <X>(x: X) => ok(x),
    async <X>(x: X) => err(x),
  ),
)

describe(
  'with Promise<Result<Promise<X>>>',
  testCase(
    async <X>(x: X) => ok(Promise.resolve(x)),
    async <X>(x: X) => err(Promise.resolve(x)),
  ),
)
