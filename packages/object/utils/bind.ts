const protoBind = Function.prototype.bind
export const bindContext = <Fn extends Function>(
  fn: Fn,
  ctx: ThisParameterType<Fn>,
): OmitThisParameter<Fn> => protoBind.call(fn, ctx)
