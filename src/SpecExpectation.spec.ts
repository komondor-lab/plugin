import a from 'assertron'

import { createExpectation, createScopedCreateExpectation } from '.'

describe('createExpectation', () => {
  test('create with meta', () => {
    const s = createExpectation('node-fetch', 'invoke', { b: 1 })
    const actual = s('payload', { a: 1 })
    a.satisfy(actual, { type: 'node-fetch', name: 'invoke', payload: 'payload', meta: { a: 1, b: 1 } })
  })
  test('can use expectation with meta', () => {
    const s = createExpectation('node-fetch', 'invoke')
    const actual = s('payload', { a: 1 })
    a.satisfy(actual, { type: 'node-fetch', name: 'invoke', payload: 'payload', meta: { a: 1 } })
  })
  test('can use expectation without meta', () => {
    const s = createExpectation('node-fetch', 'invoke')
    const actual = s('payload')
    a.satisfy(actual, { type: 'node-fetch', name: 'invoke', payload: 'payload' })
  })
})

describe('createScopedCreateExpectation', () => {
  test('create with meta', () => {
    const createSatisfier = createScopedCreateExpectation('x')
    const s = createSatisfier('node-fetch', 'invoke', { b: 1 })
    const actual = s('payload', { a: 1 })
    a.satisfy(actual, { type: 'x/node-fetch', name: 'invoke', payload: 'payload', meta: { a: 1, b: 1 } })
  })
  test('create with meta', () => {
    const createSatisfier = createScopedCreateExpectation('x')
    const s = createSatisfier('node-fetch', 'invoke')
    const actual = s('payload', { a: 1 })
    a.satisfy(actual, { type: 'x/node-fetch', name: 'invoke', payload: 'payload', meta: { a: 1 } })
  })
  test('meta is optional', () => {
    const createSatisfier = createScopedCreateExpectation('x')
    const s = createSatisfier('node-fetch', 'invoke')
    const actual = s('payload')
    a.satisfy(actual, { type: 'x/node-fetch', name: 'invoke', payload: 'payload' })
  })
})

