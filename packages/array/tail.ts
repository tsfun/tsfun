interface Tail {
  /**
   * Get all but first items of an array
   * @param array Input array
   * @returns All but first items of `array`
   */
  <Tail extends any[]>(array: readonly [any, ...Tail]): Tail

  /**
   * Get all but first items of an array
   * @param array Input array
   * @returns All but first items of `array`
   */
  <Item>(array: readonly Item[]): Item[]
}

/**
 * Get all but first items of an array
 * @param array Input array
 * @returns All but first items of `array`
 */
export const tail: Tail = ((array: any[]) => array.slice(1)) as any
