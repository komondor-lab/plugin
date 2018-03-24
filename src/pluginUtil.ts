import { SpecContext, getSpy } from './interfaces'
import { ReturnAction } from './SpecAction'

export interface PluginUtil {
  getSpy: getSpy<any>,
  getStub: (context: SpecContext, action: ReturnAction) => any
}
