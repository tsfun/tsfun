import {
  Some,
  None,
  asyncUnwrap,
  asyncUnwrapOrErr,
  asyncUnwrapOr,
  asyncUnwrapOrElse,
  some,
  none
} from '@ts-fun/option'

type MaybePromise<X> = X | Promise<X>
type AsyncSome<X> = MaybePromise<Some<MaybePromise<X>>>
type AsyncNone = MaybePromise<None>

const testCase = (
  some: <X> (x: X) => AsyncSome<X>,
  none: () => AsyncNone
) => () => {
  describe('asyncUnwrap', () => {
    describe('with a Some', () => {
      it('returns contained value', async () => {
        expect(await asyncUnwrap(some('value'))).toBe('value')
      })
    })

    describe('with a None', () => {
      it('throws provided error', async () => {
        await expect(asyncUnwrap(none())).rejects.toMatchSnapshot()
      })
    })
  })

  describe('asyncUnwrapOrErr', () => {
    describe('with a Some', () => {
      it('returns contained value', async () => {
        expect(await asyncUnwrapOrErr(some('value'), 'error')).toBe('value')
      })
    })

    describe('with a None', () => {
      it('throws provided error', async () => {
        await expect(asyncUnwrapOrErr(none(), 'reason')).rejects.toBe('reason')
      })
    })
  })

  describe('asyncUnwrapOr', () => {
    describe('with a Some', () => {
      it('returns contained value', async () => {
        expect(await asyncUnwrapOr(some('a'), 'b')).toBe('a')
      })
    })

    describe('with a None', () => {
      it('returns provided default', async () => {
        expect(await asyncUnwrapOr(none(), 'b')).toBe('b')
      })
    })
  })

  describe('asyncUnwrapOrElse', () => {
    const mkfn = () => jest.fn(() => 'default')

    describe('with a Some', () => {
      const fn = mkfn()
      const promise = asyncUnwrapOrElse(some('value'), fn)

      it('returns contained value', async () => {
        expect(await promise).toBe('value')
      })

      it('does not call provided function', async () => {
        await promise
        expect(fn).not.toBeCalled()
      })
    })

    describe('with a None', () => {
      const fn = mkfn()
      const promise = asyncUnwrapOrElse(none(), fn)

      it('returns result of the function', async () => {
        expect(await promise).toBe('default')
      })

      it('calls provided function exactly once with no arguments', async () => {
        await promise
        expect(fn.mock.calls).toEqual([[]])
      })
    })
  })
}

describe('with Option<X>', testCase(some, none))

describe('with Option<Promise<X>>', testCase(
  <X> (x: X) => some(Promise.resolve(x)),
  () => none()
))

describe('with Promise<Option<X>>', testCase(
  async <X> (x: X) => some(x),
  async () => none()
))

describe('with Promise<Option<Promise<X>>>', testCase(
  async <X> (x: X) => some(Promise.resolve(x)),
  async () => none()
))
