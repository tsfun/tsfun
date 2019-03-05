import { pass, pipe } from '@tsfun/pipe'

const increase = (x: number) => x + 1
const double = (x: number) => x * 2
const square = (x: number) => x * x

it('pass value to a pipeline and get result', () => {
  const result = pass(2)
    .to(increase)
    .to(double)
    .to(square)
    .get()

  expect(result).toBe(square(double(increase(2))))
})

it('start a pipeline with a function', () => {
  const sum = (...args: number[]) => args.reduce((a, b) => a + b, 0)

  const pipeline = pipe(sum)
    .to(increase)
    .to(double)
    .to(square)
    .get

  expect(pipeline(3, -2, 1)).toBe(square(double(increase(sum(3, -2, 1)))))
})
