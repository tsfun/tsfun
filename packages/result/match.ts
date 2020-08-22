import { Result } from './result'

interface MatchHandlers<Payload, Error, OkReturn, ErrReturn> {
  /**
   * Function to handle when the result carries a payload
   * @param payload Carried payload
   * @returns Response for `Ok` case
   */
  readonly ok: (payload: Payload) => OkReturn

  /**
   * Function to handle when the result carries an error
   * @param error Carried error
   * @returns Response for `Err` case
   */
  readonly err: (error: Error) => ErrReturn
}

/**
 * Match a result against a pair of functions
 * @param result Result to match against
 * @param handle Functions to handle each case
 * @returns Return value of either function
 */
export const match = <
  Payload = never,
  Error = never,
  OkReturn = Payload,
  ErrReturn = Error,
>(
  result: Result<Payload, Error>,
  handle: MatchHandlers<Payload, Error, OkReturn, ErrReturn>,
) => result.tag ? handle.ok(result.value) : handle.err(result.error)

export default match
