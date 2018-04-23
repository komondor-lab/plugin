import { SpecAction } from './interfaces'

export function specAction(action: Partial<SpecAction>) {
  return action as SpecAction
}
