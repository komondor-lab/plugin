
export interface SpecAction {
  type: string,
  payload: any,
  meta: { id: number } & { [k: string]: any }
}

export interface ReturnAction {
  type: string,
  payload: any,
  meta: { id: number, returnType?: string, returnId?: number } & { [k: string]: any }
}

export function createAction(type: string, payload, meta: { [k: string]: any } = {}) {
  return { type, payload, meta }
}

export function createScopedCreateAction(scope: string) {
  return (subType: string, payload, meta: { [k: string]: any } = {}) => ({ type: `${scope}/${subType}`, payload, meta })
}
