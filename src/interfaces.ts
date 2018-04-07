import { SpecAction } from './SpecAction'

export interface SpecContext {
  specId: string
}

export interface SpyContext extends SpecContext {
  mode: SpecMode,
  newInstance(): SpyInstance
}

export interface SpyInstance {
  instanceId: number,
  construct(args: any[], meta?: any): void,
  /**
   * Create a new call context for recording the call.
   */
  newCall(): SpyCall
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

export interface StubContext extends SpecContext {
  newInstance(): StubInstance
  /**
   * Move to the next action
   */
  next(): void,
  /**
   * Peek the current action
   */
  peek(): SpecAction | undefined
}

export interface StubInstance {
  instanceId: number,
  constructed(args: any[], meta?: any): void,
  /**
   * Create a new call context for replaying the call.
   */
  newCall(): StubCall
}

export interface StubCall {
  invoked(args: any[], meta?: { [k: string]: any }): void
  wait(): void
  waitSync(): void
  succeed(meta?: { [k: string]: any }): boolean
  peek(): SpecAction | undefined,
  next(): void
  result(): any
  thrown(): any
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
