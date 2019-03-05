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

  constructor (fn: (...args: Args) => Return) {
    this.get = fn
  }

  /**
   * Add a node to the pipeline
   * @param fn Function of the node
   * @returns Another node of the pipeline
   */
  public to<NextReturn> (fn: (firstArg: Return) => NextReturn) {
    return pipe(
      (...firstArgs: Args) => fn(this.get(...firstArgs))
    )
  }
}

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
 *   const increase = (x: number) => x + 1
 *   const double = (x: number) => x * 2
 *   const square = (x: number) => x * x
 *   const result = pass(2) // x0 = 2
 *     .to(increase) // x1 = increase(x0)
 *     .to(double) // x2 = double(x1)
 *     .to(square) // x3 = square(x2)
 *     .to(String) // x4 = String(x3)
 *     .get() // result = x4 = String(square(double(increase(2))))
 *   expect(result).toBe(String(square(double(increase(2)))))
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
 *   const sum = (...args: number[]) => args.reduce((a, b) => a + b, 0)
 *   const increase = (x: number) => x + 1
 *   const double = (x: number) => x * 2
 *   const square = (x: number) => x * x
 *   const pipeline = pipe(sum) // x0 = sum(...args)
 *     .to(increase) // x1 = increase(x0)
 *     .to(double) // x2 = double(x1)
 *     .to(square) // x3 = square(x2)
 *     .to(String) // x4 = String(x3)
 *     .get // pipeline(...args) = x4 = String(square(double(increase(sum(...args)))))
 *   expect(pipeline(2, 3, -1)).toBe(String(square(double(increase(sum(2, 3, -1))))))
 */
export const pipe =
  <Args extends any[], Return>
    (fn: (...args: Args) => Return) =>
      new PipeNode(fn)
