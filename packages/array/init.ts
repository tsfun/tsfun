/**
 * Get all but last items of an array
 * @param array Input array
 * @returns All but last items of `array`
 */
export const init = <Init extends any[]>(array: readonly [...Init, any]): Init => array.slice(0, -1) as any
