import { ReturnAction, SpecAction } from './SpecAction'

export interface SpecRecorder {
  /**
   * Add an action to the store.
   * Used by spies.
   */
  add(action: SpecAction)
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
  /**
   * Prune remaining actions and replace with specified actions.
   */
  graft(...actions: SpecAction[]): void,
  on(actionType: string, callback: Function),
  onAny(callback: Function),
}

export interface SpecContext extends SpecRecorder, SpecPlayer {
  mode: SpecMode,
  id: string
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
