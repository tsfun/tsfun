import { Ok } from './ok'
import { Err } from './err'

/**
 * Result type
 */
export type Result<Payload, Error> = Ok<Payload> | Err<Error>
