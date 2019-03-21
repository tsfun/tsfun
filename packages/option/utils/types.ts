import { Option } from '../option'

export interface Base {
  readonly tag: boolean
}

export type MaybePromise<Value> = Promise<Value> | Value

export type AsyncOption<Value> = MaybePromise<Option<MaybePromise<Value>>>

export type DeepOption<Value> = Option<Option<Value>>

export type AsyncDeepOption<Value> = MaybePromise<Option<AsyncOption<Value>>>
