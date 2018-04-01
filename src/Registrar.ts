import { getSpy, getStub } from './interfaces'

export interface Registrar {
  /**
   * Register a type handler.
   * @param type The action type handled by the plugin
   * @param support A predicate function to determine can the plugin support the specified subject
   */
  register<T = any>(
    type: string,
    support: (subject) => boolean,
    getSpy: getSpy<T>,
    getStub: getStub<T>
  ): void,
}

export interface Plugin<T> {
  type: string,
  support: (subject) => boolean,
  getSpy: getSpy<T>,
  getStub: getStub<T>,
}
