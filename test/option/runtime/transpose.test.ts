import { Option, transpose, some, none } from '@tsfun/option'
import { Result, transpose as inverseTranspose, ok, err } from '@tsfun/result'

describe('straightforward', () => {
  it('works with Some<Ok<X>>', () => {
    expect(transpose(some(ok('x')))).toEqual(ok(some('x')))
  })

  it('works with Some<Err<X>>', () => {
    expect(transpose(some(err('x')))).toEqual(err('x'))
  })

  it('works with None', () => {
    expect(transpose(none())).toEqual(ok(none()))
  })
})

describe('inverse: revert to original', () => {
  type X = Option<Result<string, string>>
  const fn = (x: X) => inverseTranspose(transpose(x))

  it('works with Some<Ok<X>>', () => {
    expect(fn(some(ok('x')))).toEqual(some(ok('x')))
  })

  it('works with Some<Err<X>>', () => {
    expect(fn(some(err('x')))).toEqual(some(err('x')))
  })

  it('works with None', () => {
    expect(fn(none())).toEqual(none())
  })
})
