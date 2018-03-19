import t from 'assert'

import { createExpectation, createScopedCreateExpectation } from '.'

describe('createExpectation', () => {
  test('create with meta', () => {
    const s = createExpectation('type', { a: 1 })
    const actual = s('payload')
    t.deepEqual(actual, { type: 'type', payload: 'payload', meta: { a: 1 } })
  })
  test('meta is optional', () => {
    const s = createExpectation('type')
    const actual = s('payload')
    t.deepEqual(actual, { type: 'type', payload: 'payload', meta: {} })
  })
})

describe('createScopedCreateExpectation', () => {
  test('create with meta', () => {
    const createSatisfier = createScopedCreateExpectation('x')
    const s = createSatisfier('type', { a: 1 })
    const actual = s('payload')
    t.deepEqual(actual, { type: 'x/type', payload: 'payload', meta: { a: 1 } })
  })
  test('meta is optional', () => {
    const createSatisfier = createScopedCreateExpectation('x')
    const s = createSatisfier('type')
    const actual = s('payload')
    t.deepEqual(actual, { type: 'x/type', payload: 'payload', meta: {} })
  })
})

