import { none } from '@tsfun/option'

it('works', () => {
  expect(none()).toEqual({ tag: false })
})
