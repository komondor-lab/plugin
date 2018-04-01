import { BaseError } from 'make-error'

import { tersify } from 'tersify'

import { SpecAction } from '.'

export class SimulationMismatch extends BaseError {
  // istanbul ignore next
  constructor(public specId: string, public expectedAction: Partial<SpecAction>, public receivedAction?: Partial<SpecAction>) {
    super(`Recorded data for '${specId}' doesn't match with simulation. Expecting ${tersify(expectedAction)} but received ${tersify(receivedAction)}`)

    Object.setPrototypeOf(this, new.target.prototype)
  }
}
