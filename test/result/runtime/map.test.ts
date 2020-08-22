import { Result, map, mapErr, mapOrElse, ok, err } from '@tsfun/result'
import { pass, pipe } from '@tsfun/pipe'

describe('map', () => {
  describe('standalone', () => {
    const fn = <X>(x: X) => [x]

    it('works with Ok', () => {
      expect(map(ok('x'), fn)).toEqual(ok(['x']))
    })

    it('works with Err', () => {
      expect(map(err('x'), fn)).toEqual(err('x'))
    })
  })

  describe('@tsfun/pipe', () => {
    describe('pass', () => {
      it('from Ok to Ok', () => {
        const result = pass(ok(3))
          .to(map, (x: number) => x + 1)
          .to(map, (x: number) => x * 2)
          .get()
        expect(result).toEqual(ok((3 + 1) * 2))
      })

      it('from Err to Err', () => {
        const result = pass(err(3))
          .to(map, (x: number) => x + 1)
          .to(map, (x: number) => x * 2)
          .get()
        expect(result).toEqual(err(3))
      })
    })

    describe('pipe', () => {
      const pipeline = pipe((fn: (x: number) => Result<number, number>, x: number) => fn(x))
        .to(map, (x: number) => x + 1)
        .to(map, (x: number) => x * 2)
        .get

      it('from Ok to Ok', () => {
        expect(pipeline(ok, 3)).toEqual(ok((3 + 1) * 2))
      })

      it('from Err to Err', () => {
        expect(pipeline(err, 3)).toEqual(err(3))
      })
    })
  })
})

describe('mapErr', () => {
  describe('standalone', () => {
    const fn = <X>(x: X) => [x]

    it('works with Ok', () => {
      expect(mapErr(ok('x'), fn)).toEqual(ok('x'))
    })

    it('works with Err', () => {
      expect(mapErr(err('x'), fn)).toEqual(err(['x']))
    })
  })

  describe('@tsfun/pipe', () => {
    describe('pass', () => {
      it('from Ok to Ok', () => {
        const result = pass(ok(3))
          .to(mapErr, (x: number) => x + 1)
          .to(mapErr, (x: number) => x * 2)
          .get()
        expect(result).toEqual(ok(3))
      })

      it('from Err to Err', () => {
        const result = pass(err(3))
          .to(mapErr, (x: number) => x + 1)
          .to(mapErr, (x: number) => x * 2)
          .get()
        expect(result).toEqual(err((3 + 1) * 2))
      })
    })

    describe('pipe', () => {
      const pipeline = pipe((fn: (x: number) => Result<number, number>, x: number) => fn(x))
        .to(mapErr, (x: number) => x + 1)
        .to(mapErr, (x: number) => x * 2)
        .get

      it('from Ok to Ok', () => {
        expect(pipeline(ok, 3)).toEqual(ok(3))
      })

      it('from Err to Err', () => {
        expect(pipeline(err, 3)).toEqual(err((3 + 1) * 2))
      })
    })
  })
})

describe('mapOrElse', () => {
  describe('standalone', () => {
    const handleErr = (x: string) => `Err "${x}"`
    const handleOk = (x: string) => `Ok "${x}"`

    it('works with Ok', () => {
      expect(mapOrElse(ok('x'), handleErr, handleOk)).toEqual(ok('Ok "x"'))
    })

    it('works with Err', () => {
      expect(mapOrElse(err('x'), handleErr, handleOk)).toEqual(err('Err "x"'))
    })
  })

  describe('@tsfun/pipe', () => {
    describe('pass', () => {
      it('works with Ok', () => {
        const result = pass(ok('x'))
          .to(mapOrElse, (x: string) => `err0 ${x}`, (x: string) => `ok0 ${x}`)
          .to(mapOrElse, (x: string) => `err1 ${x}`, (x: string) => `ok1 ${x}`)
          .get()
        expect(result).toEqual(ok(`ok1 ok0 x`))
      })

      it('works with Err', () => {
        const result = pass(err('x'))
          .to(mapOrElse, (x: string) => `err0 ${x}`, (x: string) => `ok0 ${x}`)
          .to(mapOrElse, (x: string) => `err1 ${x}`, (x: string) => `ok1 ${x}`)
          .get()
        expect(result).toEqual(err(`err1 err0 x`))
      })
    })

    describe('pipe', () => {
      const pipeline = pipe((fn: (x: string) => Result<string, string>, x: string) => fn(x))
        .to(mapOrElse, (x: string) => `err0 ${x}`, (x: string) => `ok0 ${x}`)
        .to(mapOrElse, (x: string) => `err1 ${x}`, (x: string) => `ok1 ${x}`)
        .get

      it('works with Ok', () => {
        expect(pipeline(ok, 'x')).toEqual(ok('ok1 ok0 x'))
      })

      it('works with Err', () => {
        expect(pipeline(err, 'x')).toEqual(err('err1 err0 x'))
      })
    })
  })
})
