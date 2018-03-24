import { getSpy, getStub } from './interfaces'
import { PluginUtil } from './pluginUtil'

export type PluginRecord<T> = {
  getSpy: getSpy<T>,
  getStub: getStub<T>,
  /**
   * Determine can the plugin support this subject.
   */
  support(subject): boolean
}
export interface Registrar {
  /**
   * Register plugin.
   * @param actionType Action type to be handled by the plugin.
   */
  register<T = any>(actionType: string, pluginRecord: PluginRecord<T>): void,
  /**
   * Utility for plugin creation.
   */
  util: PluginUtil
}
