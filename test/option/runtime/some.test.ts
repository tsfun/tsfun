import { some } from '@tsfun/option'

it('works', () => {
  expect(some('value')).toEqual({ tag: true, value: 'value' })
})
