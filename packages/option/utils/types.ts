import { Option } from '@tsfun/prv-option-result-common'
import { MaybePromise } from '@tsfun/prv-types'
export { MaybePromise }

export type AsyncOption<Value> = MaybePromise<Option<MaybePromise<Value>>>

export type DeepOption<Value> = Option<Option<Value>>

export type AsyncDeepOption<Value> = MaybePromise<Option<AsyncOption<Value>>>
