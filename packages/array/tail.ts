/**
 * Get all but first items of an array
 * @param array Input array
 * @returns All but first items of `array`
 */
export const tail = <Tail extends any[]>(array: readonly [any, ...Tail]): Tail => array.slice(1) as any
