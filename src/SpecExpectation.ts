export function createExpectation(type: string, name: string, baseMeta: { [k: string]: any } = {}) {
  return (payload?, meta?: { [k: string]: any }) => ({ type, name, payload, meta: { ...baseMeta, ...meta } })
}

export function createScopedCreateExpectation(scope: string) {
  return (subType: string, name: string, baseMeta: { [k: string]: any } = {}) => (payload?, meta?: { [k: string]: any }) => ({ type: `${scope}/${subType}`, name, payload, meta: { ...baseMeta, ...meta } })
}
