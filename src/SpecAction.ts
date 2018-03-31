
export interface SpecAction {
  type: string,
  name: string,
  instanceId: number,
  payload: any,
  meta: { [k: string]: any }
}

export interface ReturnAction {
  type: string,
  name: string,
  payload: any,
  instanceId: number,
  meta: { returnType?: string, returnInstanceId?: number } & { [k: string]: any }
}
