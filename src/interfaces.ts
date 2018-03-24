import { SpecAction, ReturnAction } from './SpecAction'

export interface SpecRecorder {
  /**
   * Add an action to the store.
   * Used by spies.
   */
  add(type: string, payload?: any, meta?: object): SpecAction
}

export interface SpecPlayer {
  /**
   * Move to the next action during replay.
   */
  next(): void,
  /**
   * Peep the current action during replay.
   */
  peek<A extends SpecAction>(): A | undefined,
  /**
   * Prune remaining actions during replay
   */
  prune(): void,
  on(actionType: string, callback: (action: SpecAction) => void),
  onAny(callback: (action: SpecAction) => void),
}

export interface SpecContext extends SpecRecorder, SpecPlayer {
  mode: SpecMode,
  specId: string,
  getSpy: getSpy<any>,
  getStub: (context: SpecContext, action: ReturnAction) => any
}

/**
 * Mode of the spec.
 * `live`: making live call and record actions to store.
 * `save`: making live call and save recorded actions.
 * `simulate`: replaying saved calls.
 */
export type SpecMode = 'live' | 'save' | 'simulate'

export type getSpy<T> = (context: SpecContext, subject: T, action: ReturnAction | undefined) => T
export type getStub<T> = (context: SpecContext, subject: T, action: ReturnAction | undefined) => T
