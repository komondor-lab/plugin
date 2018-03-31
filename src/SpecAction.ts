
export interface SpecAction {
  type: string,
  name: string,
  payload: any,
  meta: any,
  instanceId: number,
  invokeId?: number,
  sourceType?: string,
  sourceInstanceId?: number,
  sourceInvokeId?: number,
  sourcePath?: (string | number)[],
  returnType?: string,
  returnInstanceId?: number
}
