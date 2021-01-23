import { Lens } from 'monocle-ts'
import { State } from '~core/types'

export const numberSelectedLens: Lens<State, number> = Lens.fromProp<State>()(
  'numberSelected'
)
