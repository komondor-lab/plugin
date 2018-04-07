import { BaseError } from 'make-error'
import { createSatisfier } from 'satisfier'
import { tersify } from 'tersify'

import { SpecAction, serializeAction } from '.'

export class SimulationMismatch extends BaseError {
  static mismatch(actual: SpecAction, expected: SpecAction) {
    return !createSatisfier(expected).test(serializeAction(actual))
  }
  // istanbul ignore next
  constructor(public specId: string, public expectedAction: Partial<SpecAction>, public receivedAction?: Partial<SpecAction>) {
    super(`Recorded data for '${specId}' doesn't match with simulation. Expecting ${tersify(expectedAction)} but received ${tersify(receivedAction)}`)

    Object.setPrototypeOf(this, new.target.prototype)
  }
}
