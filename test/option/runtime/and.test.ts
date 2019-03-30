import {
  some,
  none,
  and,
  andThen
} from '@tsfun/option'

describe('and', () => {
  it('between some and some', () => {
    expect(and(some('a'), some('b'))).toEqual(some('b'))
  })

  it('between some and none', () => {
    expect(and(some('a'), none())).toEqual(none())
  })

  it('between none and some', () => {
    expect(and(none(), some('b'))).toEqual(none())
  })

  it('between none and none', () => {
    expect(and(none(), none())).toEqual(none())
  })
})

describe('andThen', () => {
  it('between some and some', () => {
    expect(andThen(some('x'), x => some({ x }))).toEqual(some({ x: 'x' }))
  })

  it('between some and none', () => {
    expect(andThen(some('x'), none)).toEqual(none())
  })

  it('between none and some', () => {
    expect(andThen(none(), x => some({ x }))).toEqual(none())
  })

  it('between none and none', () => {
    expect(andThen(none(), none)).toEqual(none())
  })
})
