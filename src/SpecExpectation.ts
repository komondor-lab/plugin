export function createExpectation(type: string, name: string) {
  return (payload?, meta: { [k: string]: any } = {}) => ({ type, name, meta, payload })
}

export function createScopedCreateExpectation(scope: string) {
  return (subType: string, name: string) => (payload?, meta: { [k: string]: any } = {}) => ({ type: `${scope}/${subType}`, name, payload, meta })
}
