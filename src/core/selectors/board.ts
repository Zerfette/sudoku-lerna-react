import { filter } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { createSelector } from 'reselect'
import { boardLens, selectedLens } from '~core/lenses/board'
import { Board, State } from '~core/types'
import { length, propEq } from '~util/fns'

/******************* getters *******************/
type GetBoard = (state: State) => Board
export const getBoard: GetBoard = boardLens.get

/******************* computed *******************/
export const getSelectedLength = createSelector([getBoard], board =>
  pipe(board, filter(propEq(selectedLens, true)), length)
)
