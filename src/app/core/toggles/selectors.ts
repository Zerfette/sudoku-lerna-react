import {
  autoSolveLens,
  mouseDownLens,
  togglesLens
} from './optics'
import { State } from '~core/types'

type GetToggle = (state: State) => boolean

export const getAutoSolve: GetToggle = togglesLens.composeLens(autoSolveLens)
  .get

export const getMouseDown: GetToggle = togglesLens.composeLens(mouseDownLens)
  .get