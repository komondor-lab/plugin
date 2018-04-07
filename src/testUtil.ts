import { SpecAction } from './SpecAction'

export function specAction(action: Partial<SpecAction>) {
  return action as SpecAction
}
