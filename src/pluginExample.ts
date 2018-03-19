import { PluginUtil, Registrar, ReturnAction, SpecContext, createScopedCreateAction, createScopedCreateExpectation } from '.'

const TYPE = 'jquery'
const createAction = createScopedCreateAction(TYPE)
const createSatisfier = createScopedCreateExpectation(TYPE)
export const ajaxWith = createSatisfier('ajax')

export function activate(registrar: Registrar) {
  registrar.register(
    TYPE,
    (context, subject) => isJQuery(subject) ?
      getJQuerySpy(context, registrar.util, subject) :
      undefined,
    (context, action) => action.meta.returnType === TYPE ?
      getJQueryStub(context, registrar.util, action) :
      undefined)
}

function isJQuery(result) {
  // just for demo purpose.
  // most likely should do a basic shape comparison
  return result === global['$']
}

let counter = 0
function getJQuerySpy(context: SpecContext, util: PluginUtil, jquery) {
  const ajax = jquery.ajax
  jquery.ajax = (...args) => {
    context.add(createAction('ajax', args, { jqueryId: ++counter }))
    return ajax.call(jquery, ...args)
  }
  return jquery
}

function getJQueryStub(context: SpecContext, util: PluginUtil, action: ReturnAction) {
  return new Promise((resolve, reject) => {
    context.on('jquery/ajax', a => {
      if (a.meta.jqueryId === action.meta.jqueryId) {
        // just an example
        return action.payload
      }
    })
  })
}
