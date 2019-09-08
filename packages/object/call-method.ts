import { FunctionKeys } from 'utility-types'
import { MaybeParam, MaybeReturn } from './utils/types'
import { bindContext } from './utils/bind'

/**
 * Execute a method
 * @param object Object that has the method
 * @param name Name of the method
 * @param args Arguments to pass to the method
 * @returns Returning value of the method
 */
export const applyMethod = <
  Object extends object,
  MethodName extends FunctionKeys<Object>,
  Method extends Object[MethodName]
> (
  object: Object,
  name: MethodName,
  args: Readonly<MaybeParam<Method>>
): MaybeReturn<Method> => (object[name] as any)(...args as any)

/**
 * Execute a method
 * @param object Object that has the method
 * @param name Name of the method
 * @param args Arguments to pass to the method
 * @returns Returning value of the method
 */
export const callMethod = <
  Object extends object,
  MethodName extends FunctionKeys<Object>,
  Method extends Object[MethodName]
> (
  object: Object,
  name: MethodName,
  ...args: MaybeParam<Method>
): MaybeReturn<Method> => (object[name] as any)(...args)

/**
 * Get a method from and bind it to an object
 * @param object Object to get method from
 * @param name Name of the method
 * @returns Bound method
 */
export const getMethod = <
  Object extends object,
  MethodName extends FunctionKeys<Object>,
  Method extends Object[MethodName]
> (
  object: Object,
  name: MethodName
): OmitThisParameter<Method> => bindContext(object[name] as any, object as any)

/**
 * Create a function that get methods of an object
 * @param object Object to get methods from
 * @returns A function that get object method
 */
export const methodGetter = <Object extends object> (object: Object) =>
  <
    MethodName extends FunctionKeys<Object>,
    Method extends Object[MethodName]
  > (name: MethodName): OmitThisParameter<Method> => getMethod(object as any, name as any)
