import { ok } from '@ts-fun/result'

it('works', () => {
  expect(ok('payload')).toEqual({ tag: true, value: 'payload' })
})
