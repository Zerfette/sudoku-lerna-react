import { Mutation } from '~core/types'

export const setNumberSelected: Mutation<number, { value: number }> = (
  _,
  { value }
) => value
