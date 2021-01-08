import { Lens } from 'monocle-ts'
import { Toggles } from '~core/types'

type ToggleLens = Lens<Toggles, boolean>

export const lockedLens: ToggleLens = Lens.fromProp<Toggles>()('locked')
export const mouseDownLens: ToggleLens = Lens.fromProp<Toggles>()('mouseDown')
