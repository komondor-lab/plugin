import { getSpy, getStub } from './interfaces'

export interface Registrar {
  /**
   * Register plugin.
   * @param actionType Action type to be handled by the plugin.
   * @param support Determine can the plugin support this subject.
   */
  register<T = any>(
    actionType: string,
    support: (subject) => boolean,
    getSpy: getSpy<T>,
    getStub: getStub<T>
  ): void,
}
