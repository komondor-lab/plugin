import { getSpy, getStub } from './interfaces'

export interface Registrar {
  /**
   * Register plugin
   * @param name Name of the plugin
   * @param support Determine can the plugin support this subject
   */
  register<T = any>(
    name: string,
    support: (subject) => boolean,
    getSpy: getSpy<T>,
    getStub: getStub<T>
  ): void,
}

export interface Plugin<T> {
  type: string,
  getSpy: getSpy<T>,
  getStub: getStub<T>,
  support: (subject) => boolean
}
