export interface Box<Value> {
  readonly tag: true
  readonly value: Value
}

export interface NonBox {
  readonly tag: false
  readonly value?: undefined
}

/**
 * Option type
 */
export type Option<Value> = Some<Value> | None

/**
 * Type of options that contain value
 */
export interface Some<Value> extends Box<Value> {}

/**
 * Type of options that do not contain value
 */
export interface None extends NonBox {}

/**
 * Result type
 */
export type Result<Payload, Error> = Ok<Payload> | Err<Error>

/**
 * Type of results that carry payload
 */
export interface Ok<Payload> extends Box<Payload> {
  readonly error?: undefined
}

/**
 * Type of result that carry error
 */
export interface Err<Error> extends NonBox {
  readonly error: Error
}
