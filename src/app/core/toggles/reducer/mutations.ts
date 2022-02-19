import { Lens } from 'monocle-ts'
import { Mutation, Toggles } from '~core/types'

export const toggle: Mutation<Toggles, { lens: Lens<Toggles, boolean> }> = (
  toggles,
  { lens }
) => lens.set(!lens.get(toggles))(toggles)

export const setToggle: Mutation<
  Toggles,
  {
    lens: Lens<Toggles, boolean>
    value: boolean
  }
> = (toggles, { lens, value }) => lens.set(value)(toggles)
