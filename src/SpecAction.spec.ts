import t from 'assert'

import { createAction, createScopedCreateAction } from '.'

describe('createAction', () => {
  test('meta must be object', () => {
    // following line is type error
    // createAction('type', 'payload', 'a')
    const actual = createAction('type', 'payload', { a: 1 })
    t.deepEqual(actual, { type: 'type', payload: 'payload', meta: { a: 1 } })
  })

  test('meta is optional', () => {
    const actual = createAction('type', 'payload')
    t.deepEqual(actual, { type: 'type', payload: 'payload', meta: {} })
  })
})

describe('createScopedCreateAction', () => {
  test('create with meta', () => {
    const createAction = createScopedCreateAction('xx')
    const actual = createAction('y', 'payload', { a: 1 })
    t.deepEqual(actual, { type: 'xx/y', payload: 'payload', meta: { a: 1 } })
  })
  test('meta is optional', () => {
    const createAction = createScopedCreateAction('xx')
    const actual = createAction('y', 'payload')
    t.deepEqual(actual, { type: 'xx/y', payload: 'payload', meta: {} })
  })
})
