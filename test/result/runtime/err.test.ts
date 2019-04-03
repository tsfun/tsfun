import { err } from '@tsfun/result'

it('works', () => {
  expect(err('error')).toEqual({ tag: false, error: 'error' })
})
