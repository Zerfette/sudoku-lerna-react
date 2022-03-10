import { numberSelectedLens } from 'core/optics'
import { State } from 'core/types'

type GetNumberSelected = (state: State) => number
export const getNumberSelected: GetNumberSelected = numberSelectedLens.get
