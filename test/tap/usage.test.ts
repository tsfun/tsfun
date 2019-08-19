import { pass } from '@tsfun/pipe'
import { Result, ok, err, map, mapErr } from '@tsfun/result'
import { tap, tapper } from '@tsfun/tap'

describe('tap: @tsfun/pipe → pass → logging', () => {
  const setup = () => {
    const logs = Array<any>()
    const logger = (id: any) => (value: any) => logs.push({ id, value })
    const result = pass(2)
      .to(tap, logger('begin'))
      .to(x => x + 1)
      .to(tap, logger('inc'))
      .to(x => x * 2)
      .to(tap, logger('double'))
      .to(x => x * x)
      .to(tap, logger('square'))
      .get()
    return { logs, result }
  }

  it('produces logs that matches snapshot', () => {
    const { logs } = setup()
    expect(logs).toMatchSnapshot()
  })

  it('returns value that matches snapshot', () => {
    const { result } = setup()
    expect(result).toMatchSnapshot()
  })
})

describe('tapper: @tsfun/result → map + mapErr → logging', () => {
  const setup = (input: Result<'ok', 'err'>) => {
    const logs = Array<any>()
    const logger = (id: any, key: string) => (value: any) => logs.push({ id, [key]: value })
    const output = pass(input)
      .to(map, tapper(logger('before', 'input.value')))
      .to(mapErr, tapper(logger('before', 'input.error')))
      .to(map, (x: 'ok') => x.toUpperCase())
      .to(map, tapper(logger('after', 'input.value')))
      .to(mapErr, (x: 'err') => x.toUpperCase())
      .to(mapErr, tapper(logger('after', 'input.error')))
      .get()
    return { logs, output }
  }

  describe('ok("ok")', () => {
    it('produces logs that matches snapshot', () => {
      const { logs } = setup(ok('ok'))
      expect(logs).toMatchSnapshot()
    })

    it('returns value that matches snapshot', () => {
      const { output } = setup(ok('ok'))
      expect(output).toMatchSnapshot()
    })
  })

  describe('err("err")', () => {
    it('produces logs that matches snapshot', () => {
      const { logs } = setup(err('err'))
      expect(logs).toMatchSnapshot()
    })

    it('returns value that matches snapshot', () => {
      const { output } = setup(err('err'))
      expect(output).toMatchSnapshot()
    })
  })
})
