import { dbg } from 'string-template-format-inspect'

class NoError<Value> extends Error {
  constructor (
    public readonly fn: () => Value,
    public readonly value: Value
  ) {
    super(dbg`Expecting execution of ${fn} to throws an error but it returns ${value}`)
  }
}

export function fnError (fn: () => any) {
  let result: any

  try {
    result = fn()
  } catch (error) {
    return error
  }

  throw new NoError(fn, result)
}

export default fnError
