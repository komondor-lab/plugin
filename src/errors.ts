import { BaseError } from 'make-error'
import { createSatisfier } from 'satisfier'
import { tersify } from 'tersify'

import { SpecAction } from './interfaces'
import { serializeAction } from './serializeAction'

export class SimulationMismatch extends BaseError {
  static mismatch(actual: SpecAction, expected: SpecAction) {
    return !createSatisfier(expected).test(serializeAction(actual))
  }
  // istanbul ignore next
  constructor(public specId: string, public expected: Partial<SpecAction>, public actual?: Partial<SpecAction>) {
    super(`Recorded data for '${specId}' doesn't match with simulation. Expecting ${tersify(expected, { maxLength: Infinity })} but received ${tersify(actual, { maxLength: Infinity })}`)

    Object.setPrototypeOf(this, new.target.prototype)
  }
}
