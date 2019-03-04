import { pass, pipe } from '@tsfun/pipe'

const add = (...args: number[]) => args.reduce((a, b) => a + b, 0)
const mul = (...args: number[]) => args.reduce((a, b) => a * b, 1)
const pow = (x: number, n: number) => x ** n

it('pass value to a pipeline and get result', () => {
  const result = pass(3)
    .to(add, -2, 1)
    .to(mul, 2, 3)
    .to(pow, 2)
    .get()

  expect(result).toBe(pow(mul(add(3, -2, 1), 2, 3), 2))
})

it('start a pipeline with a function', () => {
  const pipeline = pipe(add)
    .to(mul, 2, 3)
    .to(pow, 2)
    .get

  expect(pipeline(3, -2, 1)).toBe(pow(mul(add(3, -2, 1), 2, 3), 2))
})
