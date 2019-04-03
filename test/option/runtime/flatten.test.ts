import { flatten, some, none } from '@ts-fun/option'

it('works with Some<Some<X>>', () => {
  expect(flatten(some(some('x')))).toEqual(some('x'))
})

it('works with Some<None>', () => {
  expect(flatten(some(none()))).toEqual(none())
})

it('works with None', () => {
  expect(flatten(none())).toEqual(none())
})
