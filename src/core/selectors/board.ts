import { every, filter, map } from 'fp-ts/Array'
import { flow, not } from 'fp-ts/function'
import { createSelector } from 'reselect'
import { boardLens, selectedLens } from '~core/lenses/board'
import { valueLens } from '~core/lenses/board'
import { Board, State } from '~core/types'
import { equals, length, propEq } from '~util/fns'

/******************* getters *******************/
type GetBoard = (state: State) => Board
export const getBoard: GetBoard = boardLens.get

/******************* computed *******************/
export const getSelectedLength = createSelector(
  [getBoard],
  flow(filter(propEq(selectedLens, true)), length)
)

export const isBoardFilled = createSelector(
  [getBoard],
  flow(map(valueLens.get), every(not(equals(0))))
)
