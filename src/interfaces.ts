import { SpecAction } from './SpecAction'

export interface SpecContext {
  specId: string
}

export interface SpyCall {
  invokeId: number
  /**
   * Record that the call is being invoked
   * @param args the args that the call is invoked with
   */
  invoke<T extends any[]>(args: T, meta?: { [k: string]: any }): T
  /**
   * Record that the call is returning
   * @param result the return result
   */
  return<T>(result: T, meta?: { [k: string]: any }): T
  /**
   * Record that the call is throwing
   * @param err the error to be thrown.
   */
  throw<T>(err: T, meta?: { [k: string]: any }): T
}

export interface SpyContext extends SpecContext {
  mode: SpecMode,
  instanceId: number,
  /**
   * Create a new call context for recording the call.
   */
  newCall(): SpyCall,
  /**
   * Add an action to the store.
   */
  add(type: string, action: string, payload?: any, meta?: { [k: string]: any }): SpecAction,
}

export interface StubCall {
  invoked(args: any[], meta?: { [k: string]: any }): void
  succeed(meta?: { [k: string]: any }): boolean
  peek(): SpecAction | undefined,
  next(): void
  result(): any
  thrown(): any
}
export interface StubContext extends SpecContext {
  /**
   * instance id of the stub.
   */
  instanceId: number,
  newCall(): StubCall,
  /**
   * Move to the next action
   */
  next(): void,
  /**
   * Peek the current action
   */
  peek(): SpecAction | undefined
}

/**
 * Mode of the spec.
 * `live`: making live call and record actions to store.
 * `save`: making live call and save recorded actions.
 * `simulate`: replaying saved calls.
 */
export type SpecMode = 'live' | 'save' | 'simulate'

// TODO: remove action
export type getSpy<T> = (context: SpyContext, subject: T) => T
export type getStub<T> = (context: StubContext, subject: T) => T
