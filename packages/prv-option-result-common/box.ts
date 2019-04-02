import { Box } from './types'
export const box = <Value> (value: Value): Box<Value> => ({ tag: true, value })
