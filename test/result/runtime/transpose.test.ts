import { Result, transpose, ok, err } from '@tsfun/result'
import { Option, transpose as inverseTranspose, some, none } from '@tsfun/option'

describe('straightforward', () => {
  it('works with Ok<Some<X>>', () => {
    expect(transpose(ok(some('x')))).toEqual(some(ok('x')))
  })

  it('works with Ok<None>', () => {
    expect(transpose(ok(none()))).toEqual(none())
  })

  it('works with Err<X>', () => {
    expect(transpose(err('x'))).toEqual(some(err('x')))
  })
})

describe('inverse: revert to original', () => {
  type X = Result<Option<string>, string>
  const fn = (x: X) => inverseTranspose(transpose(x))

  it('works with Ok<Some<X>>', () => {
    expect(fn(ok(some('x')))).toEqual(ok(some('x')))
  })

  it('works with Ok<None>', () => {
    expect(fn(ok(none()))).toEqual(ok(none()))
  })

  it('works with Err<X>', () => {
    expect(fn(err('x'))).toEqual(err('x'))
  })
})
