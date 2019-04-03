import { some } from '@ts-fun/option'

it('works', () => {
  expect(some('value')).toEqual({ tag: true, value: 'value' })
})
