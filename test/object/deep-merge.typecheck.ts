import assert from 'static-type-assert'
import { deepMergeWithoutCollision, ErrorType } from '@tsfun/object'

const A = {
  a: 0 as const,
  b: 'b' as const,
  c: {
    a: 1 as const
  },
  d: {
    c: {
      b: {
        a: 'dcba' as const
      }
    }
  }
}

const B = {
  c: {
    b: 'a' as const
  },
  d: {
    a: 0 as const,
    c: {
      b: {
        b: 'dcbb' as const
      }
    }
  }
}

const AB = deepMergeWithoutCollision(A, B)
assert<typeof A>(AB)
assert<typeof B>(AB)
assert<'dcba'>(AB.d.c.b.a)
assert<'dcbb'>(AB.d.c.b.b)

const AB2 = deepMergeWithoutCollision(A, B, error => {
  assert<{
    type: ErrorType.PropertyCollision
    objects: [object, object]
    key: symbol | string
    values: [unknown, unknown]
  }>(error)

  return undefined as unknown
})
assert<typeof AB>(AB2)
