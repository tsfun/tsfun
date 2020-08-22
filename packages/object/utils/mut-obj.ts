const { defineProperty } = Object
export function mutObj<Object, Key extends string | number | symbol, Value>(
  object: Object,
  key: Key,
  value: Value,
): asserts object is Object & Record<Key, Value> {
  defineProperty(object, key, {
    enumerable: true,
    writable: true,
    configurable: true,
    value,
  })
}
