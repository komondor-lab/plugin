import { SpecAction, ReturnAction } from './SpecAction'

export interface SpecContext {
  specId: string
}

export interface CallOptions {
  name?: string,
  [k: string]: any
}
export interface SpyCall {
  invokeId: number
  /**
   * Record that the call is being invoked
   * @param args the args that the call is invoked with
   * @param options.name the name for recording this invoke action. Default to 'invoke'.
   */
  invoke<T extends any[]>(args: T, options?: CallOptions): T
  /**
   * Record that the call is returning
   * @param result the return result
   * @param options.name the name for recording this return action. Default to 'return'.
   */
  return<T>(result: T, options?: CallOptions): T
  /**
   * Record that the call is throwing
   * @param err the error to be thrown.
   * @param options.name the name for recording this throw action. Default to 'throw'.
   */
  throw<T>(err: T, options?: CallOptions): T
}

export interface SpyContext extends SpecContext {
  mode: SpecMode,
  instanceId: number,
  /**
   * Create a new call context for recording the call.
   */
  newCall(): SpyCall,
  addInvokeAction<T extends any[]>(type: string, name: string, args: T, meta?: object): T
  /**
   * Add a return action.
   * The result will be spied if supported.
   * @param type action type
   * @param result return result
   */
  addReturnAction<T>(type: string, name: string, result: T, meta?: object): T
  /**
   * Add an action to the store.
   */
  add(type: string, name: string, payload?: any, meta?: object): SpecAction,
  getSpy<T>(subject: T, key: string | number): T
}

export interface StubCall {
  invoked(args: any[], options?: CallOptions): void
  succeed(options?: CallOptions): boolean
  failed(options?: CallOptions): boolean
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
  /**
   * Indicate should the subject be called.
   */
  invokeSubject: boolean,
  newCall(): StubCall,
  /**
   * Move to the next action during replay.
   */
  next(): void,
  /**
   * Peep the current action during replay.
   */
  peek(): SpecAction | undefined,
  on(actionType: string, actionName: string, callback: (action: SpecAction) => void),
  onAny(callback: (action: SpecAction) => void),
  getStub: (context: StubContext, action: ReturnAction) => any
}

/**
 * Mode of the spec.
 * `live`: making live call and record actions to store.
 * `save`: making live call and save recorded actions.
 * `simulate`: replaying saved calls.
 */
export type SpecMode = 'live' | 'save' | 'simulate'

// TODO: remove action
export type getSpy<T> = (context: SpyContext, subject: T, action: ReturnAction | undefined) => T
export type getStub<T> = (context: StubContext, subject: T, action: ReturnAction | undefined) => T
