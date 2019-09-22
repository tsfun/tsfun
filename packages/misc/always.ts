/**
 * Turn a value into a function that returns the value
 * @param x Value in box
 * @returns A function that takes no arguments and returns `value`
 */
export const always = <X> (x: X) => () => x

export default always
