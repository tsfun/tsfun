import { flip, ok, err } from '@tsfun/result'

it('flips an ok into an err', () => {
  expect(flip(ok('x'))).toEqual(err('x'))
})

it('flips an err into an ok', () => {
  expect(flip(err('x'))).toEqual(ok('x'))
})
