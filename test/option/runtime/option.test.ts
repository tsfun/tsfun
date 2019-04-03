import { option, some, none } from '@ts-fun/option'

it('null and undefined', () => {
  expect({
    null: option(null),
    undefined: option(undefined)
  }).toEqual({
    null: none(),
    undefined: none()
  })
})

it('non nullables', () => {
  expect(
    [0, 1, 2, '', 'a', 'b', true, false].map(option)
  ).toEqual(
    [0, 1, 2, '', 'a', 'b', true, false].map(some)
  )
})
