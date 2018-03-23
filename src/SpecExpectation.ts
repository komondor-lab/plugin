export function createExpectation(type: string, meta: { [k: string]: any } = {}) {
  return payload => ({ type, meta, payload })
}

export function createScopedCreateExpectation(scope: string) {
  return (subType: string, meta: { [k: string]: any } = {}) => payload => ({ type: `${scope}/${subType}`, payload, meta })
}
