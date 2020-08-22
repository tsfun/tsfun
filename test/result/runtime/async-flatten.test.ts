import { product } from 'iter-tools'

import { pass } from '@tsfun/pipe'

import {
  asyncFlatten,
  asyncFlattenError,
  ok,
  err,
} from '@tsfun/result'

type MaybePromise<X> = X | Promise<X>
type RetFn = <X>(x: MaybePromise<X>) => MaybePromise<X>

const retSync = <X>(x: X) => x
const retAsync = async <X>(x: MaybePromise<X>) => x
const retNames = new WeakMap<RetFn, string>([[retSync, 'sync'], [retAsync, 'async']])

const testCase = (outer: RetFn, middle: RetFn, inner: RetFn) =>
  () => {
    describe('asyncFlatten', () => {
      it('works with Ok<Ok<X>>', async () => {
        expect(
          await asyncFlatten(
            pass('x')
              .to(inner)
              .to(ok)
              .to(middle)
              .to(ok)
              .to(outer)
              .get(),
          ),
        ).toEqual(ok('x'))
      })

      it('works with Ok<Err<X>>', async () => {
        expect(
          await asyncFlatten(
            pass('x')
              .to(inner)
              .to(err)
              .to(middle)
              .to(ok)
              .to(outer)
              .get(),
          ),
        ).toEqual(err('x'))
      })

      it('works with Err<X>', async () => {
        expect(
          await asyncFlatten(
            pass('x')
              .to(inner)
              .to(err)
              .to(middle)
              .get(),
          ),
        ).toEqual(err('x'))
      })
    })

    describe('asyncFlattenError', () => {
      it('works with Err<Err<X>>', async () => {
        expect(
          await asyncFlattenError(
            pass('x')
              .to(inner)
              .to(err)
              .to(middle)
              .to(err)
              .to(outer)
              .get(),
          ),
        ).toEqual(err('x'))
      })

      it('works with Err<Ok<X>>', async () => {
        expect(
          await asyncFlattenError(
            pass('x')
              .to(inner)
              .to(ok)
              .to(middle)
              .to(err)
              .to(outer)
              .get(),
          ),
        ).toEqual(ok('x'))
      })

      it('works with Ok<X>', async () => {
        expect(
          await asyncFlattenError(
            pass('x')
              .to(inner)
              .to(ok)
              .to(middle)
              .get(),
          ),
        ).toEqual(ok('x'))
      })
    })
  }

for (const wrappers of product([retSync, retAsync], [retSync, retAsync], [retSync, retAsync])) {
  const names = wrappers.map(x => retNames.get(x)).join(', ')
  describe(`outer, middle, inner = ${names}`, testCase(...wrappers))
}
