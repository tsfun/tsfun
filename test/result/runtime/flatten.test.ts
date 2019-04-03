import { flatten, flattenError, ok, err } from '@ts-fun/result'

describe('flatten', () => {
  it('works with Ok<Ok<X>>', () => {
    expect(flatten(ok(ok('x')))).toEqual(ok('x'))
  })

  it('works with Ok<Err<X>>', () => {
    expect(flatten(ok(err('x')))).toEqual(err('x'))
  })

  it('works with Err<X>', () => {
    expect(flatten(err('x'))).toEqual(err('x'))
  })
})

describe('flattenError', () => {
  it('works with Err<Err<X>>', () => {
    expect(flattenError(err(err('x')))).toEqual(err('x'))
  })

  it('works with Err<Ok<X>>', () => {
    expect(flattenError(err(ok('x')))).toEqual(ok('x'))
  })

  it('works with Ok<X>', () => {
    expect(flattenError(ok('x'))).toEqual(ok('x'))
  })
})
