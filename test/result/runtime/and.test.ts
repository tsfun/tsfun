import {
  and,
  andThen,
  ok,
  err
} from '@tsfun/result'

describe('and', () => {
  it('between ok and ok', () => {
    expect(and(ok('a'), ok('b'))).toEqual(ok('b'))
  })

  it('between ok and err', () => {
    expect(and(ok('a'), err('b'))).toEqual(err('b'))
  })

  it('between err and ok', () => {
    expect(and(err('a'), ok('b'))).toEqual(err('a'))
  })

  it('between err and err', () => {
    expect(and(err('a'), err('b'))).toEqual(err('a'))
  })
})

describe('andThen', () => {
  it('between ok and ok', () => {
    expect(andThen(ok('x'), x => ok({ x }))).toEqual(ok({ x: 'x' }))
  })

  it('between ok and err', () => {
    expect(andThen(ok('x'), x => err({ x }))).toEqual(err({ x: 'x' }))
  })

  it('between err and ok', () => {
    expect(andThen(err('x'), x => ok({ x }))).toEqual(err('x'))
  })

  it('between err and err', () => {
    expect(andThen(err('a'), () => err('b'))).toEqual(err('a'))
  })
})
