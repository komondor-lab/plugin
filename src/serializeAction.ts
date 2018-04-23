import { SpecAction } from './interfaces'

export function serializeAction(action: SpecAction): SpecAction {
  const p = {} as SpecAction
  Object.keys(action).forEach(k => {
    if (k === 'payload') {
      if (action.payload instanceof Error) {
        p[k] = { ...action.payload, message: action.payload.message }
      }
      else if (action.payload !== undefined) {
        p[k] = JSON.parse(JSON.stringify(action.payload))
      }
    }
    else {
      p[k] = action[k]
    }
  })
  return p
}
