import { tersify } from 'tersify'

export class SimulationMismatch extends Error {
  // istanbul ignore next
  constructor(public id: string, public expectedAction: string | { type?: string, payload?: any, meta?: object }, public receivedAction?: { type?: string, payload?: any, meta?: object }) {
    super(`Recorded data for '${id}' doesn't match with simulation. Expecting action type ${tersify(expectedAction)} but received: ${tersify(receivedAction)}`)

    Object.setPrototypeOf(this, new.target.prototype)
  }
}
