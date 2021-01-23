import { numberSelectedLens } from '~core/lenses/numberSelected'
import { State } from '~core/types'

type GetNumberSelected = (state: State) => number
export const getNumberSelected: GetNumberSelected = numberSelectedLens.get
