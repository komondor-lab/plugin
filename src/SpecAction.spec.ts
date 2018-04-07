import t from 'assert'

import { serializeAction, serializeActions } from '.'
import { specAction } from './testUtil'

test('serialize error', () => {
  const actual = serializeAction(specAction({ payload: new Error('foo') }))
  t.deepEqual(actual.payload, { message: 'foo' })
})

test('serialize function to null', () => {
  const actual = serializeActions([specAction({ payload: [1, x => x] })])
  t.deepEqual(actual[0].payload, [1, null])
})
