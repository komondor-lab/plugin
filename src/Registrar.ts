import { getSpy, getStub, getReturnSpy, getReturnStub } from './interfaces'
import { PluginUtil } from './pluginUtil'

export interface Registrar {
  /**
   * Register getSpy and getStub function to handle a specific subject.
   * @param actionType Action type to be handled by the plugin.
   */
  register<T = any>(actionType: string, getSpy: getSpy<T>, getStub: getStub<T>): void,
  /**
   * Register getReturnSpy and getReturnStub function to handle a specific subject used as return value of a function call.
   * @param actionType Action type to be handled by the plugin.
   */
  registerForReturn(actionType: string, getReturnSpy: getReturnSpy, getReturnStub: getReturnStub): void
  /**
   * Utility for plugin creation.
   */
  util: PluginUtil
}
