import { assert, compare } from 'static-type-assert'
import { deepMergePartial, deepMergeWithoutCollision, DeepPartial, ErrorType } from '@tsfun/object'

const nonPartial = {
  a: 0,
  b: {
    c: 1,
    d: {
      e: 2
    }
  },
  f: {
    g: 3,
    h: [0, 1, 2],
    i: [{ j: 4 }]
  }
} as const

type NonPartialObject = typeof nonPartial
type PartialObject = DeepPartial<NonPartialObject>
compare<PartialObject, {
  readonly a?: 0,
  readonly b?: {
    readonly c?: 1,
    readonly d?: {
      readonly e?: 2
    }
  },
  readonly f?: {
    readonly g?: 3,
    readonly h?: readonly [0, 1, 2], // spec: does not make array elements partial
    readonly i?: readonly [{
      readonly j: 4 // spec: does not make objects inside array partial
    }]
  }
}>('equal')
assert<PartialObject>(nonPartial)
assert<PartialObject>({})
assert<PartialObject>({
  a: undefined,
  b: undefined,
  f: undefined
})
assert<PartialObject>({
  a: 0,
  b: {
    c: 1,
    d: undefined
  },
  f: undefined
})
assert<PartialObject>({
  a: 0,
  b: {
    c: 1,
    d: undefined
  },
  f: {
    g: 3,
    h: undefined
  }
})
assert<PartialObject>({
  a: 0,
  b: {
    c: 1,
    d: undefined
  },
  f: {
    g: 3,
    h: [0, 1, 2]
  }
})
assert<NonPartialObject>(deepMergePartial(nonPartial, {}, () => undefined!))
assert<NonPartialObject>(deepMergePartial(nonPartial, nonPartial, () => undefined!))
assert<NonPartialObject>(deepMergePartial(nonPartial, {
  a: 0,
  b: {
    c: 1,
    d: undefined
  },
  f: undefined
}, () => undefined!))

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
