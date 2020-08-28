/**
 * Get all but first items of an array
 * @param array Input array
 * @returns All but first items of `array`
 */
export const tail = <Item>(array: readonly Item[]): Item[] => array.slice(1)

/**
 * Get all but first items of an array
 * @param array Input array
 * @returns All but first items of `array`
 */
export const tailStrict: (<Tail extends any[]>(array: readonly [any, ...Tail]) => Tail) = tail as any
