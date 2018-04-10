import { SpecAction } from './SpecAction'

export interface SpecContext {
  specId: string
}

export interface SpyContext extends SpecContext {
  mode: SpecMode,
  newInstance(args?: any[], meta?: any): SpyInstance
}

export interface SpyInstance {
  /**
   * Id of the spy instance.
   * For functions, each subject (different function) should have its own id.
   * For class, each instance (when instantiating a class) should have its own id.
   */
  instanceId: number,
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
  newInstance(args?: any[], meta?: any): StubInstance
}

export interface StubInstance {
  /**
   * Id of the stub instance.
   * For functions, each subject (different function) should have its own id.
   * For class, each instance (when instantiating a class) should have its own id.
   */
  instanceId: number,
  /**
   * Create a new call context for replaying the call.
   */
  newCall(): StubCall
}

export interface StubCall {
  invokeId: number,
  invoked(args: any[], meta?: { [k: string]: any }): void
  waitUntilReturn(callback): void
  blockUntilReturn(): void
  onAny(callback: (action: SpecAction) => void): void
  succeed(meta?: { [k: string]: any }): boolean
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
