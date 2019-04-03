import { err } from '@ts-fun/result'

it('works', () => {
  expect(err('error')).toEqual({ tag: false, error: 'error' })
})
