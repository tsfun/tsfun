import { match, some, none } from '@tsfun/option'

const fns = () => ({
  some: jest.fn((x: string) => `Some "${x}"`),
  none: jest.fn(() => 'None'),
})

describe('with Some', () => {
  const handlers = fns()
  const result = match(some('x'), handlers)

  it('returns expected result', () => {
    expect(result).toBe('Some "x"')
  })

  it('calls handlers.some exactly once', () => {
    expect(handlers.some).toBeCalledTimes(1)
  })

  it('calls handlers.some with contained value', () => {
    expect(handlers.some).toBeCalledWith('x')
  })

  it('does not call handlers.none', () => {
    expect(handlers.none).not.toBeCalled()
  })
})

describe('with None', () => {
  const handlers = fns()
  const result = match(none(), handlers)

  it('returns expected result', () => {
    expect(result).toBe('None')
  })

  it('calls handlers.none exactly once', () => {
    expect(handlers.none).toBeCalledTimes(1)
  })

  it('calls handlers.none with no arguments', () => {
    expect(handlers.none).toBeCalledWith()
  })

  it('does not call handlers.some', () => {
    expect(handlers.some).not.toBeCalled()
  })
})
