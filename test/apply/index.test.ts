import { apply, unapply } from '@tsfun/apply'

it('apply works as expected', () => {
  const join = (...args: number[]) => args.join(', ')
  const applied = apply(join)
  expect(applied([0, 1, 2, 3])).toBe('0, 1, 2, 3')
})

it('unapply works as expected', () => {
  const join = (args: number[]) => args.join(', ')
  const unapplied = unapply(join)
  expect(unapplied(0, 1, 2, 3)).toBe('0, 1, 2, 3')
})
