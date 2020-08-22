import { Result } from '@tsfun/prv-option-result-common'
import { MaybePromise } from '@tsfun/prv-types'
export { MaybePromise }

export type AsyncResult<Payload, Error> = MaybePromise<
  Result<
    MaybePromise<Payload>,
    MaybePromise<Error>
  >
>

export type DeepPayloadResult<Payload, InnerError, OuterError> = Result<Result<Payload, InnerError>, OuterError>

export type DeepErrorResult<OuterPayload, Error, InnerPayload> = Result<OuterPayload, Result<InnerPayload, Error>>

export type AsyncDeepPayloadResult<Payload, InnerError, OuterError> = MaybePromise<
  Result<
    AsyncResult<Payload, InnerError>,
    MaybePromise<OuterError>
  >
>

export type AsyncDeepErrorResult<OuterPayload, Error, InnerPayload> = MaybePromise<
  Result<
    MaybePromise<OuterPayload>,
    AsyncResult<InnerPayload, Error>
  >
>
