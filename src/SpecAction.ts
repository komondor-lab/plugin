
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
