class PipeNodeInstance<Args extends any[], Return> {
  constructor (
    /**
     * Resulting function of the pipeline
     *
     * **Parameters:** It's either
     *   * the same parameters of the first function of the pipeline (when `pipe` is used)
     *   * or empty (when `pass` is used)
     *
     * **Returns:** Result of the last function of the pipeline
     */
    public readonly get: (...args: Args) => Return
  ) {}

  /**
   * Add a node to the pipeline
   * @param fn Function of the node
   * @param args Parameters of `fn` without the first
   * @returns Another node of the pipeline
   */
  public to<NextArgs extends any[], NextReturn> (
    fn: (firstArg: Return, ...rest: NextArgs) => NextReturn,
    ...args: NextArgs
  ) {
    return pipe(
      (...firstArgs: Args) => fn(this.get(...firstArgs), ...args)
    )
  }
}

export interface PipeNode<Args extends any[], Return> extends PipeNodeInstance<Args, Return> {}

/**
 * Start a pipeline with a value
 * (pass a value to a series of functions in a pipeline)
 * @param x First value in the pipeline
 * @returns First node of the pipeline
 *
 * @usage
 *   `pass(x).to(f).to(g).to(h).get()` is equivalent to `x |> f |> g |> h`,
 *   which in turn is equivalent to `h(g(f(x)))`
 *
 * @example
 *   const add = (...args: number[]) => args.reduce((a, b) => a + b, 0)
 *   const mul = (...args: number[]) => args.reduce((a, b) => a * b, 1)
 *   const pow = (x: number, n: number) => x ** n
 *   const arr = (...args: number[]) => args
 *   const result = pass(3) // x0 = 3
 *     .to(add, -2, 1) // x1 = add(...args)
 *     .to(mul, 2, 3) // x2 = mul(x1, 2, 3)
 *     .to(pow, 2) // x3 = pow(x2, 2)
 *     .to(arr, 0, 1, 2) // x4 = arr(x3, 0, 1, 2)
 *     .get() // result = x4 = arr(pow(mul(add(3, -2, 1), 2, 3), 2), 0, 1, 2)
 *   expect(result).toEqual(arr(pow(mul(add(3, -2, 1), 2, 3), 2), 0, 1, 2))
 */
export const pass = <X> (x: X) => pipe(() => x)

/**
 * Start a pipeline with a function
 * @param fn First function in the pipeline
 * @returns First node of the pipeline
 *
 * @usage
 *   `pipe(f).to(g).to(h).get(...args)` is equivalent to `f(...args) |> g |> h`,
 *   which in turn is equivalent to `h(g(f(...args)))`
 *
 * @example
 *   const add = (...args: number[]) => args.reduce((a, b) => a + b, 0)
 *   const mul = (...args: number[]) => args.reduce((a, b) => a * b, 1)
 *   const pow = (x: number, n: number) => x ** n
 *   const arr = (...args: number[]) => args
 *   const pipeline = pipe(add) // x0 = add(...args)
 *     .to(mul, 2, 3) // x1 = mul(x0, 2, 3)
 *     .to(pow, 2) // x2 = pow(x1, 2)
 *     .to(arr, 0, 1, 2) // x3 = arr(x2, 0, 1, 2)
 *   const result = pipeline(3, -2, 1) // result = x3 = arr(pow(mul(add(3, -2, 1), 2, 3), 2), 0, 1, 2)
 *   expect(result).toEqual(arr(pow(mul(add(3, -2, 1), 2, 3), 2), 0, 1, 2))
 */
export const pipe =
  <Args extends any[], Return>
    (fn: (...args: Args) => Return): PipeNode<Args, Return> =>
      new PipeNodeInstance(fn)
