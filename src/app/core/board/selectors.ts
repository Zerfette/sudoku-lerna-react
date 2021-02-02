import { every, filter, head, isEmpty, map, range, uniq } from 'fp-ts/Array'
import { eqNumber } from 'fp-ts/Eq'
import { constant, flow, not, pipe } from 'fp-ts/function'
import { getOrElse } from 'fp-ts/Option'
import { Lens } from 'monocle-ts'
import { createSelector } from 'reselect'
import {
  boardLens,
  valueLens,
  selectedLens,
  rowLens,
  colLens,
  regLens
} from './optics'
import { Board, Cell, State } from '~core/types'
import {
  equals,
  includes,
  isValidPlacement,
  length,
  not as booleanNot,
  propEq
} from '~util/fns'

const emptyCell = {
  ind: 0,
  value: 0,
  row: 0,
  col: 0,
  reg: 0,
  selected: false,
  locked: false,
  highlighted: false,
  corner: [0],
  middle: [0]
}

/******************* getters *******************/
type GetBoard = (state: State) => Board
export const getBoard: GetBoard = boardLens.get

/******************* computed *******************/
export const getSelected = createSelector(
  [getBoard],
  flow(filter(propEq(selectedLens, true)))
)

export const getSelectedLength = createSelector([getSelected], length)

export const isBoardFilled = createSelector(
  [getBoard],
  flow(map(valueLens.get), every(not(equals(0))))
)

export const getAvailables = createSelector([getBoard], board => {
  const selection = pipe(board, filter(propEq(selectedLens, true)))
  const singleSelected = pipe(selection, length, equals(1))
  const selectionHead = pipe(selection, head, getOrElse(constant(emptyCell)))
  const isValid = (x: number) => isValidPlacement(board)(x)(selectionHead)
  const shouldCalcAvailables = (lens: Lens<Cell, number>) =>
    pipe(selection, map(lens.get), uniq(eqNumber), length, equals(1))
  const section = (lens: Lens<Cell, number>) =>
    pipe(
      board,
      filter(propEq(lens, lens.get(selectionHead))),
      map(valueLens.get)
    )
  const conflicts = (lens: Lens<Cell, number>) => (x: number) =>
    pipe(section(lens), includes(x), booleanNot)
  const calcAvailables = (lens: Lens<Cell, number>) =>
    shouldCalcAvailables(lens) ? pipe(range(1, 9), filter(conflicts(lens))) : []

  return isEmpty(selection)
    ? { row: [], col: [], reg: [], cell: [] }
    : {
        cell: singleSelected ? pipe(range(1, 9), filter(isValid)) : [],
        row: calcAvailables(rowLens),
        col: calcAvailables(colLens),
        reg: calcAvailables(regLens)
      }
})
