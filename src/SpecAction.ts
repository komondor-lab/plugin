
export interface SpecAction {
  type: string,
  name: string,
  payload: any,
  meta: { [k: string]: any },
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
