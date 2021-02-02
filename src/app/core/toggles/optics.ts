import { Lens } from 'monocle-ts'
import { State, Toggles } from '~core/types'

export const togglesLens: Lens<State, Toggles> = Lens.fromProp<State>()(
  'toggles'
)

export const autoSolveLens: Lens<Toggles, boolean> = Lens.fromProp<Toggles>()(
  'autoSolve'
)

export const mouseDownLens: Lens<Toggles, boolean> = Lens.fromProp<Toggles>()(
  'mouseDown'
)

export const timerIsRunningLens: Lens<Toggles, boolean> = Lens.fromProp<Toggles>()(
  'timerIsRunning'
)
