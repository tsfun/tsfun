import {
  some,
  none,
  or,
  orElse
} from '@tsfun/option'

describe('and', () => {
  it('between none and none', () => {
    expect(or(some('a'), some('b'))).toEqual(some('a'))
  })

  it('between some and none', () => {
    expect(or(some('a'), none())).toEqual(some('a'))
  })

  it('between none and some', () => {
    expect(or(none(), some('b'))).toEqual(some('b'))
  })

  it('between none and none', () => {
    expect(or(none(), none())).toEqual(none())
  })
})

describe('orElse', () => {
  it('between none and none', () => {
    expect(orElse(some('a'), () => some('b'))).toEqual(some('a'))
  })

  it('between some and none', () => {
    expect(orElse(some('a'), none)).toEqual(some('a'))
  })

  it('between none and some', () => {
    expect(orElse(none(), () => some('b'))).toEqual(some('b'))
  })

  it('between none and none', () => {
    expect(orElse(none(), none)).toEqual(none())
  })
})
