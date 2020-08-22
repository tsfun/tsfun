import { match, ok, err } from '@tsfun/result'

const fns = () => ({
  ok: jest.fn((x: string) => `Ok "${x}"`),
  err: jest.fn((x: string) => `Err "${x}"`),
})

describe('with Ok', () => {
  const handlers = fns()
  const result = match(ok('x'), handlers)

  it('returns expected result', () => {
    expect(result).toEqual('Ok "x"')
  })

  it('calls handlers.ok exactly once', () => {
    expect(handlers.ok).toBeCalledTimes(1)
  })

  it('calls handlers.ok with carried payload', () => {
    expect(handlers.ok).toBeCalledWith('x')
  })

  it('does not call handlers.err', () => {
    expect(handlers.err).not.toBeCalled()
  })
})

describe('with Err', () => {
  const handlers = fns()
  const result = match(err('x'), handlers)

  it('returns expected result', () => {
    expect(result).toEqual('Err "x"')
  })

  it('calls handlers.err exactly once', () => {
    expect(handlers.err).toBeCalledTimes(1)
  })

  it('calls handlers.err with carried payload', () => {
    expect(handlers.err).toBeCalledWith('x')
  })

  it('does not call handlers.ok', () => {
    expect(handlers.ok).not.toBeCalled()
  })
})
