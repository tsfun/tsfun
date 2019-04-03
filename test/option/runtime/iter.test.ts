import { iter, some, none } from '@tsfun/option'

describe('iter(some(x)) should return iterator that only yields x once', () => {
  it('.next()', () => {
    const iterator = iter(some('x'))
    const first = iterator.next()
    const second = iterator.next()
    const third = iterator.next()
    expect([first, second, third]).toEqual([
      { done: false, value: 'x' },
      { done: true },
      { done: true }
    ])
  })

  it('Array.from', () => {
    expect(Array.from(iter(some('x')))).toEqual(['x'])
  })
})

describe('iter(none()) should return iterator that does not yield anything', () => {
  it('.next()', () => {
    const iterator = iter(none())
    const first = iterator.next()
    const second = iterator.next()
    const third = iterator.next()
    expect([first, second, third]).toEqual([
      { done: true },
      { done: true },
      { done: true }
    ])
  })

  it('Array.from', () => {
    expect(Array.from(iter(none()))).toEqual([])
  })
})
