import { tuple, some, none } from '@ts-fun/option'

it('tuple(some(x)) should be [x]', () => {
  expect(tuple(some('x'))).toEqual(['x'])
})

it('tuple(none()) should be []', () => {
  expect(tuple(none())).toEqual([])
})
