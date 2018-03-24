import { Registrar, SpecContext, SimulationMismatch } from '.'

export function activate(registrar: Registrar) {
  registrar.register(
    'function',
    subject => typeof subject === 'function',
    (context, subject, action) => {
      return spyFunction(context, subject, action)
    },
    (context, subject, _action) => {
      return stubFunction(context, subject)
    }
  )
}

function spyOnCallback(context: SpecContext, fn, meta) {
  return (...args) => {
    context.add({
      type: 'fn/callback',
      payload: args,
      meta
    })
    fn(...args)
  }
}

let counter = 0

function spyFunction(context: SpecContext, subject, action?) {
  const functionId = ++counter
  if (action) {
    action.meta.functionId = functionId
    action.meta.returnType = 'function'
  }
  return function (...args) {
    context.add({
      type: 'fn/invoke',
      payload: args,
      meta: {
        functionId
      }
    })
    const spiedArgs = args.map((arg, index) => {
      if (typeof arg === 'function') {
        return spyOnCallback(context, arg, { functionId })
      }
      if (typeof arg === 'object') {
        Object.keys(arg).forEach(key => {
          if (typeof arg[key] === 'function') {
            arg[key] = spyOnCallback(context, arg[key], {
              functionId,
              callbackPath: [index, key]
            })
          }
        })
      }
      return arg
    })
    let result
    try {
      result = subject.apply(this, spiedArgs)
    }
    catch (err) {
      context.add({
        type: 'fn/throw',
        payload: err,
        meta: { functionId }
      })
      throw err
    }
    const returnAction = { type: 'fn/return', payload: result, meta: { functionId } }
    context.add(returnAction)

    const out = context.getSpy(context, result, returnAction) || result
    return out
  }
}

function inputMatches(a, b: any[]) {
  // istanbul ignore next
  if (b.length !== a.length)
    return false
  let match = true
  for (let i = 0; i < b.length; i++) {
    const value = b[i]
    const valueType = typeof value
    if (valueType === 'function') continue
    if (valueType === 'object') {
      // istanbul ignore next
      if (typeof a !== 'object') {
        match = false
        break
      }

      const va = a[i]
      match = !Object.keys(value).some(k => {
        if (typeof value[k] === 'function') return false
        return value[k] !== va[k]
      })
      if (!match)
        break;
    }
    else if (b[i] !== a[i]) {
      match = false
      break;
    }
  }
  return match
}

function locateCallback(meta, args) {
  if (!meta.callbackPath) {
    return args.find(arg => typeof arg === 'function')
  }

  return meta.callbackPath.reduce((p, v) => {
    return p[v]
  }, args)
}

function stubFunction(context: SpecContext, _subject) {
  let currentId = 0
  return function (...args) {
    const inputAction = context.peek()
    if (!inputAction || !inputMatches(inputAction.payload, args)) {
      throw new SimulationMismatch(context.id, { type: 'fn/invoke', payload: args, meta: {} }, inputAction)
    }
    currentId = Math.max(currentId, inputAction.meta.functionId)
    context.next()
    const result = processUntilReturn()

    process.nextTick(() => {
      let action = context.peek()
      while (action && action.meta.functionId <= currentId) {
        context.next()
        if (action.type === 'fn/callback') {
          const callback = locateCallback(action.meta, args)
          callback(...action.payload)
        }
        action = context.peek()
      }
    })
    return result
    function processUntilReturn() {
      const action = context.peek()
      if (!action) return undefined
      if (action.meta.functionId > currentId) return undefined

      if (action.type === 'fn/return') {
        const result = action.meta && context.getStub(context, action) || action.payload
        context.next()
        return result
      }

      context.next()
      if (action.type === 'fn/callback') {
        const callback = locateCallback(action.meta, args)
        callback(...action.payload)
      }

      if (action.type === 'fn/throw') {
        throw action.payload
      }
      return processUntilReturn()
    }
  }
}
