import t from 'assert'

import { serializeAction, serializeActions } from '.'
import { specAction } from './testUtil'
import { BaseError } from 'make-error'

test('serialize error', () => {
  const actual = serializeAction(specAction({ payload: new Error('foo') }))
  t.deepEqual(actual.payload, { message: 'foo' })
})

test('serialize custom error', () => {
  class CustomError extends BaseError {
    // istanbul ignore next
    constructor(public value) {
      super(`error with ${value}`)

      Object.setPrototypeOf(this, new.target.prototype)
    }
  }
  const actual = serializeAction(specAction({ payload: new CustomError('cat') }))
  t.deepEqual(actual.payload, { message: 'error with cat', value: 'cat' })
})

test('serialize function to null', () => {
  const actual = serializeActions([specAction({ payload: [1, x => x] })])
  t.deepEqual(actual[0].payload, [1, null])
})