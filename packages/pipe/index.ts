export * from '@tsfun/tap'

class PipeNode<Args extends any[], Return> {
  /**
   * Resulting function of the pipeline
   *
   * @param args It's either
   *   * the same parameters of the first function of the pipeline (when `pipe` is used)
   *   * or empty (when `pass` is used)
   *
   * @returns Result of the last function of the pipeline
   */
  public readonly get: (...args: Args) => Return

  constructor(fn: (...args: Args) => Return) {
    this.get = fn
  }

  /**
   * Add a node to the pipeline
   * @param fn Function of the node
   * @param tailArgs Parameters of `fn` without the first one
   * @returns Another node of the pipeline
   */
  public to<NextReturn, Tail extends any[]>(
    fn: (pipedValue: Return, ...tailArgs: Tail) => NextReturn,
    ...tailArgs: Tail
  ) {
    return pipe(
      (...firstArgs: Args) => fn(this.get(...firstArgs), ...tailArgs),
    )
  }
}

/**
 * Start a pipeline with a value
 * (pass a value to a series of functions in a pipeline)
 *
 * **Example:**
 *
 * ```typescript
 * const increase = (x: number) => x + 1
 * const double = (x: number) => x * 2
 * const square = (x: number) => x * x
 * const result = pass(2) // x0 = 2
 *   .to(increase) // x1 = increase(x0)
 *   .to(double) // x2 = double(x1)
 *   .to(square) // x3 = square(x2)
 *   .to(String) // x4 = String(x3)
 *   .get() // result = x4 = String(square(double(increase(2))))
 * expect(result).toBe(String(square(double(increase(2)))))
 * ```
 *
 * **Example:**
 *
 * ```typescript
 * const sum = (...args: number[]) => args.reduce((a, b) => a + b)
 * const product = (...args: number[]) => args.reduce((a, b) => a * b)
 * const result = pass(2) // x0 = 2
 *   .to(sum, -3, 4) // x1 = sum(x0, -3, 4)
 *   .to(product, 2) // x2 = product(x1, 2)
 *   .to(String) // x3 = String(x2)
 *   .get() // result = x3 = String(product(sum(2, -3, 4), 2))
 * expect(result).toBe(String(product(sum(2, -3, 4), 2)))
 * ```
 *
 * **Usage:**
 *
 * `pass(x).to(f).to(g).to(h).get()` is equivalent to `x |> f |> g |> h`,
 * which in turn is equivalent to `h(g(f(x)))`
 *
 * You can also pass extra arguments to function that takes more than one argument,
 * for example: `pass(x).to(f, y, z).get()` is equivalent to `f(x, y, z)`
 *
 * **Note:**
 *
 * This is a temporary solution to replace yet-to-be-implemented pipeline operator.
 * This function will be deprecated when the proposal get to stage 3
 * and removed when it is implemented
 *
 * Read more about pipeline operator in
 * [the tc39 proposal](https://github.com/tc39/proposal-pipeline-operator)
 *
 * @param x First value in the pipeline
 * @returns First node of the pipeline
 */
export const pass = <X>(x: X) => pipe(() => x)

/**
 * Start a pipeline with a function
 *
 * **Example:**
 *
 * ```typescript
 * const sum = (...args: number[]) => args.reduce((a, b) => a + b, 0)
 * const increase = (x: number) => x + 1
 * const double = (x: number) => x * 2
 * const square = (x: number) => x * x
 * const pipeline = pipe(sum) // x0 = sum(...args)
 *   .to(increase) // x1 = increase(x0)
 *   .to(double) // x2 = double(x1)
 *   .to(square) // x3 = square(x2)
 *   .to(String) // x4 = String(x3)
 *   .get // pipeline(...args) = x4 = String(square(double(increase(sum(...args)))))
 * expect(pipeline(2, 3, -1)).toBe(String(square(double(increase(sum(2, 3, -1))))))
 * ```
 *
 * **Example:**
 *
 * ```typescript
 * const sum = (...args: number[]) => args.reduce((a, b) => a + b)
 * const product = (...args: number[]) => args.reduce((a, b) => a * b)
 * const pipeline = pipe(sum) // x0 = sum(...args)
 *   .to(product, 2) // x1 = product(x0, 2)
 *   .to(String) // x2 = String(x1)
 *   .get // pipeline(...args) = x2 = String(product(sum(2, -3, 4), 2))
 * expect(pipeline(2, -3, 4)).toBe(String(product(sum(2, -3, 4), 2)))
 * ```
 *
 * **Usage:**
 * `pipe(f).to(g).to(h).get(...args)` is equivalent to `f(...args) |> g |> h`,
 * which in turn is equivalent to `h(g(f(...args)))`
 *
 * You can also pass extra arguments to function that takes more than takes more than one arguments,
 * for example: `pipe(f).to(g, a, b).get` is equivalent to `(...args) => g(f(...args), a, b)`
 *
 * **Note:**
 * This is a temporary solution to replace yet-to-be-implemented pipeline operator.
 * This function will be deprecated when the proposal get to stage 3
 * and removed when it is implemented
 *
 * Read more about pipeline operator in
 * [the tc39 proposal](https://github.com/tc39/proposal-pipeline-operator)
 *
 * @param fn First function in the pipeline
 * @returns First node of the pipeline
 */
export const pipe = <Args extends any[], Return>(fn: (...args: Args) => Return) => new PipeNode(fn)
