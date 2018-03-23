import { PluginUtil, Registrar, ReturnAction, SpecContext, createScopedCreateAction, createScopedCreateExpectation } from '.'

const TYPE = 'jquery'
const createAction = createScopedCreateAction(TYPE)
const createSatisfier = createScopedCreateExpectation(TYPE)
export const ajaxWith = createSatisfier('ajax')

export function activate(registrar: Registrar) {
  registrar.register(
    TYPE,
    {
      getSpy: (context, subject) => {
        return isJQuery(subject) ?
          getJQuerySpy(context, registrar.util, subject) :
          undefined
      },
      getStub: (context, subject, id) => {
        return isJQuery(subject) ?
          getJQueryStub(context, registrar.util, subject, id) :
          undefined
      }
    })
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

function getJQueryStub(context: SpecContext, util: PluginUtil, subject, id) {
  return { ...subject, ajax: (...args) => {
    context.on('jquery/ajax', a => {
      if (a.meta.jqueryId === id) {
        // just an example
        return a.payload
      }
    })
  }}
}
