import { Lens } from 'monocle-ts'
import { State, Toggles } from '~core/types'

export const togglesLens: Lens<State, Toggles> = Lens.fromProp<State>()(
  'toggles'
)
export const lockedLens: Lens<Toggles, boolean> = Lens.fromProp<Toggles>()(
  'locked'
)
export const mouseDownLens: Lens<Toggles, boolean> = Lens.fromProp<Toggles>()(
  'mouseDown'
)
export const autoSolveLens: Lens<Toggles, boolean> = Lens.fromProp<Toggles>()(
  'autoSolve'
)
