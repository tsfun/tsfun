import { Option } from '@tsfun/prv-option-result-common'

export type MaybePromise<Value> = PromiseLike<Value> | Value

export type AsyncOption<Value> = MaybePromise<Option<MaybePromise<Value>>>

export type DeepOption<Value> = Option<Option<Value>>

export type AsyncDeepOption<Value> = MaybePromise<Option<AsyncOption<Value>>>
