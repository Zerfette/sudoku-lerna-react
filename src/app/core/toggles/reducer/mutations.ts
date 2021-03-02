import { pipe } from 'fp-ts/function'
import { Lens } from 'monocle-ts'
import { Mutation, Toggles } from '~core/types'

export const toggle: Mutation<Toggles, { lens: Lens<Toggles, boolean> }> = (
  toggles,
  { lens }
) => pipe(toggles, lens.set(!pipe(toggles, lens.get)))

export const setToggle: Mutation<
  Toggles,
  {
    lens: Lens<Toggles, boolean>
    value: boolean
  }
> = (toggles, { lens, value }) => pipe(toggles, lens.set(value))
