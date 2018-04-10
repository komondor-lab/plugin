import t from 'assert'
import a from 'assertron'

import { SimulationMismatch } from '.'
import { specAction } from './testUtil';

const expectedAction = { type: 'function', name: 'invoke', payload: [0, 'a'] }
const actualCallbackAction = { type: 'komondor', name: 'callback', payload: { a: 1 }, meta: { id: 3 } }

test('SimulationMismatch error', () => {
  const err = new SimulationMismatch('some id', expectedAction, actualCallbackAction)
  t.equal(err.specId, 'some id')
  t.equal(err.expected, expectedAction)
  t.equal(err.actual, actualCallbackAction)
  t.equal(err.message, `Recorded data for 'some id' doesn't match with simulation. Expecting { type: 'function', name: 'invoke', payload: [0, 'a'] } but received { type: 'komondor', name: 'callback', payload: { a: 1 }, meta: { id: 3 } }`)
})

test('SimulationMismatch error, received action optional', () => {
  const err = new SimulationMismatch('some id', expectedAction)
  t.equal(err.specId, 'some id')
  t.equal(err.expected, expectedAction)
  t.equal(err.message, `Recorded data for 'some id' doesn't match with simulation. Expecting { type: 'function', name: 'invoke', payload: [0, 'a'] } but received undefined`)
})

describe('SimulationMismatch.mismatch()', () => {
  test('type mismatch returns true', () => {
    t(SimulationMismatch.mismatch(
      specAction({ type: 'x' }),
      specAction({ type: 'function' })
    ))
  })
  test('name mismatch returns true', () => {
    t(SimulationMismatch.mismatch(
      specAction({ name: 'y' }),
      specAction({ name: 'invoke' })
    ))
  })
  test('payload mismatch returns true', () => {
    t(SimulationMismatch.mismatch(
      specAction({ payload: 1 }),
      specAction({ payload: 2 })
    ))
  })
  test('payload matches return false', () => {
    a.false(SimulationMismatch.mismatch(
      specAction({ payload: [1] }),
      specAction({ payload: [1] })
    ))
  })
  test('payload with function matches null', () => {
    a.false(SimulationMismatch.mismatch(
      specAction({ payload: [1, x => x + 1] }),
      specAction({ payload: [1, null] })
    ))
  })
  test('payload is error', () => {
    a.false(SimulationMismatch.mismatch(
      specAction({ payload: new Error('foo') }),
      specAction({ payload: { message: 'foo' } })
    ))
  })
})
