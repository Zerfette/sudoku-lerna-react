import { pipe } from 'fp-ts/function'
import { Lens } from 'monocle-ts'
import { Mutation, Toggles } from '~core/types'
import { not } from '~util/fns'

export const toggle: Mutation<Toggles, { lens: Lens<Toggles, boolean> }> = (
  toggles,
  { lens }
) => pipe(toggles, lens.set(pipe(toggles, lens.get, not)))

export const setToggle: Mutation<
  Toggles,
  {
    lens: Lens<Toggles, boolean>
    value: boolean
  }
> = (toggles, { lens, value }) => pipe(toggles, lens.set(value))
