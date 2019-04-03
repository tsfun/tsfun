import { filter, some, none } from '@ts-fun/option'

it('works with Some', () => {
  const isEven = (x: number) => x % 2 === 0
  expect(
    [0, 1, 2, 3, 4, 5]
      .map(some)
      .map(x => filter(x, isEven))
  ).toEqual([
    some(0),
    none(),
    some(2),
    none(),
    some(4),
    none()
  ])
})

it('works with None', () => {
  expect(filter(none(), () => true)).toEqual(none())
})
