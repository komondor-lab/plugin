
export interface SpecAction {
  type: string,
  name: string,
  payload: any,
  meta?: any,
  // komondor/callback action does not have instanceId
  instanceId?: number,
  invokeId?: number,
  sourceType?: string,
  sourceInstanceId?: number,
  sourceInvokeId?: number,
  sourcePath?: (string | number)[],
  returnType?: string,
  returnInstanceId?: number
}

export interface SpecCallbackAction extends SpecAction {
  sourceType: string,
  sourceInstanceId: number,
  sourceInvokeId: number,
  sourcePath: (string | number)[]
}
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

export function serializeActions(actions: SpecAction[]) {
  return actions.map(serializeAction)
}
