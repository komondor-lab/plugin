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
 * `production`: making live call without recording.
 * `prod`: alias to `production`
 * `development`: making live call and record actions to store.
 * `dev`: alias of `development`
 * `save`: making live call and save recorded actions.
 * `simulate`: replaying saved calls.
 */
export type SpecMode = 'development' | 'dev' | 'production' | 'prod' | 'save' | 'simulate'

export type getSpy<T> = (context: SpecContext, subject: T) => T
export type getStub<T> = (context: SpecContext, subject: T, id: string) => T
export type getReturnSpy = (context: SpecContext, subject: any, action: ReturnAction) => any
export type getReturnStub = (context: SpecContext, action: ReturnAction) => any
