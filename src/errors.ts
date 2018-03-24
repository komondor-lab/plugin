import { tersify } from 'tersify'

import { SpecAction } from './SpecAction'

export class SimulationMismatch extends Error {
  // istanbul ignore next
  constructor(public id: string, public expectedAction: string | Partial<SpecAction>, public receivedAction?: Partial<SpecAction>) {
    super(`Recorded data for '${id}' doesn't match with simulation. Expecting action type ${tersify(expectedAction)} but received: ${tersify(receivedAction)}`)

    Object.setPrototypeOf(this, new.target.prototype)
  }
}
