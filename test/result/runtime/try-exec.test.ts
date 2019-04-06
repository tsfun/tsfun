import { tryExec, ok, err } from '@tsfun/result'
import { pass } from '@tsfun/pipe'

const fnOk = () => jest.fn((...args: number[]) => args.join(', '))
const fnErr = () => jest.fn((msg: string) => { throw new Error(msg) })

describe('standalone', () => {
  describe('when fn returns x', () => {
    const fn = fnOk()
    const result = tryExec(fn, 0, 1, 2, 3)

    it('returns ok(x)', () => {
      expect(result).toEqual(ok('0, 1, 2, 3'))
    })

    it('calls fn exactly once', () => {
      expect(fn).toBeCalledTimes(1)
    })

    it('calls fn with expected arguments', () => {
      expect(fn).toBeCalledWith(0, 1, 2, 3)
    })
  })

  describe('when fn throws error', () => {
    const fn = fnErr()
    const result = tryExec(fn, 'error message')

    it('returns err(error)', () => {
      expect(result).toEqual(err(new Error('error message')))
    })

    it('calls fn exactly once', () => {
      expect(fn).toBeCalledTimes(1)
    })

    it('calls fn with expected arguments', () => {
      expect(fn).toBeCalledWith('error message')
    })
  })
})

describe('@tsfun/pipe', () => {
  describe('pass', () => {
    it('returns ok(x) when fn returns x', () => {
      const fn = fnOk()
      const result = pass(fn).to(tryExec, 0, 1, 2, 3).get()
      expect(result).toEqual(ok('0, 1, 2, 3'))
    })

    it('returns err(error) when fn throws error', () => {
      const fn = fnErr()
      const result = pass(fn).to(tryExec, 'error message').get()
      expect(result).toEqual(err(new Error('error message')))
    })
  })
})
