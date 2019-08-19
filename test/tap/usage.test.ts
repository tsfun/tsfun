import { pass } from '@tsfun/pipe'
import tap from '@tsfun/tap'

describe('@tsfun/pipe → pass → logging', () => {
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
