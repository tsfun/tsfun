/**
 * Create an array of ascending integers
 * @param count Number of integers
 * @returns An array of integers from `0` to under `count`
 */
export const range = (count: number) => Array(count).fill(0).map((_, index) => index)
