/**
 * Get all but last items of an array
 * @param array Input array
 * @returns All but last items of `array`
 */
export const initStrict = <Init extends any[]>(array: readonly [...Init, any]): Init => array.slice(0, -1) as any

/**
 * Get all but last items of an array
 * @param array Input array
 * @returns All but last items of `array`
 */
export const init: (<Item>(array: readonly Item[]) => Item[]) = initStrict
