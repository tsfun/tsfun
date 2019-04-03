import { ok } from '@tsfun/result'

it('works', () => {
  expect(ok('payload')).toEqual({ tag: true, value: 'payload' })
})
