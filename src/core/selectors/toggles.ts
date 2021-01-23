import { autoSolveLens, mouseDownLens, togglesLens } from '~core/lenses/toggles'
import { State } from '~core/types'

type GetToggle = (state: State) => boolean
export const getMouseDown: GetToggle = togglesLens.composeLens(mouseDownLens)
  .get

export const getAutoSolve: GetToggle = togglesLens.composeLens(autoSolveLens)
  .get
