import { Result } from '../result'

export type MaybePromise<Value> = Promise<Value> | Value

export type AsyncResult<Payload, Error> =
  MaybePromise<Result<
    MaybePromise<Payload>,
    MaybePromise<Error>
  >>
