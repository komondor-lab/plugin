
export interface SpecAction {
  type: string,
  name: string,
  payload: any,
  meta: { instanceId: number } & { [k: string]: any }
}

export interface ReturnAction {
  type: string,
  name: string,
  payload: any,
  meta: { instanceId: number, returnType?: string, returnInstanceId?: number } & { [k: string]: any }
}
