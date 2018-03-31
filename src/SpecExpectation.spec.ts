import t from 'assert'

import { createExpectation, createScopedCreateExpectation } from '.'

describe('createExpectation', () => {
  test('create with meta', () => {
    const s = createExpectation('type', 'name')
    const actual = s('payload', { a: 1 })
    t.deepEqual(actual, { type: 'type', name: 'name', payload: 'payload', meta: { a: 1 } })
  })
  test('meta is optional', () => {
    const s = createExpectation('type', 'name')
    const actual = s('payload')
    t.deepEqual(actual, { type: 'type', name: 'name', payload: 'payload', meta: {} })
  })
})

describe('createScopedCreateExpectation', () => {
  test('create with meta', () => {
    const createSatisfier = createScopedCreateExpectation('x')
    const s = createSatisfier('type', 'name')
    const actual = s('payload', { a: 1 })
    t.deepEqual(actual, { type: 'x/type', name: 'name', payload: 'payload', meta: { a: 1 } })
  })
  test('meta is optional', () => {
    const createSatisfier = createScopedCreateExpectation('x')
    const s = createSatisfier('type', 'name')
    const actual = s('payload')
    t.deepEqual(actual, { type: 'x/type', name: 'name', payload: 'payload', meta: {} })
  })
})

