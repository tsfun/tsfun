import assert from 'static-type-assert'
import { partition, partitionPredicate } from '@tsfun/array'

type Type = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'a' | 'b' | 'c' | 'd'
type Subtype = 0 | 1 | 2 | 3
declare function is0123 (x: Type): x is Subtype

const [a, b] = partitionPredicate([] as Iterable<Type>, is0123)
assert<Subtype[]>(a)
assert<Type[]>(b)
assert<typeof b>(undefined as any as Type[])

const [c, d] = partition([] as Iterable<Type>, is0123)
assert<Type[]>(c)
assert<typeof c>(undefined as any as Type[])
assert<Type[]>(d)
assert<typeof d>(undefined as any as Type[])
