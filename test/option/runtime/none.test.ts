import { none } from '@ts-fun/option'

it('works', () => {
  expect(none()).toEqual({ tag: false })
})
