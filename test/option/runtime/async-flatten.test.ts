import { product } from 'iter-tools'

import {
  Some,
  None,
  asyncFlatten,
  some,
  none
} from '@tsfun/option'

type MaybePromise<X> = X | Promise<X>
type AsyncSome<X> = MaybePromise<Some<MaybePromise<X>>>
type AsyncNone = MaybePromise<None>

const testCase = (
  outerSome: <X> (x: MaybePromise<X>) => AsyncSome<X>,
  innerSome: <X> (x: MaybePromise<X>) => AsyncSome<X>,
  outerNone: () => AsyncNone,
  innerNone: () => AsyncNone
) => () => {
  it('works with Some<Some<X>>', async () => {
    expect(await asyncFlatten<string>(outerSome(innerSome('x')))).toEqual(some('x'))
  })

  it('works with Some<None>', async () => {
    expect(await asyncFlatten(outerSome(innerNone()))).toEqual(none())
  })

  it('works with None', async () => {
    expect(await asyncFlatten(outerNone())).toEqual(none())
  })
}

const somePromise = <X> (x: MaybePromise<X>) => some(Promise.resolve(x))
const asyncSome = async <X> (x: MaybePromise<X>) => some(await x)
const asyncSomePromise = async <X> (x: MaybePromise<X>) => some(Promise.resolve(x))
const asyncNone = async () => none()

const tuple = <Args extends any[]> (...args: Args) => args

const params = product(
  tuple(some, somePromise, asyncSome, asyncSomePromise),
  tuple(some, somePromise, asyncSome, asyncSomePromise),
  tuple(none, asyncNone),
  tuple(none, asyncNone)
)

for (const [outerSome, innerSome, outerNone, innerNone] of params) {
  describe(`outerSome = ${outerSome}`, () => {
    describe(`innerSome = ${innerSome}`, () => {
      describe(`outerNone = ${outerNone}`, () => {
        describe(`innerNone = ${innerNone}`, testCase(
          outerSome,
          innerSome,
          outerNone,
          innerNone
        ))
      })
    })
  })
}
