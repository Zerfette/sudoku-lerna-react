import {
  elem,
  empty,
  every,
  filter,
  isEmpty,
  map,
  range,
  uniq
} from 'fp-ts/Array'
import { eqNumber } from 'fp-ts/Eq'
import { flow, not, pipe } from 'fp-ts/function'
import { fold, none, Option, some } from 'fp-ts/Option'
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
  isValidPlacement,
  length,
  not as booleanNot,
  propEq
} from '~util/fns'

/******************* getters *******************/
type GetBoard = (state: State) => Board
export const getBoard: GetBoard = boardLens.get

/******************* helpers *******************/
type GetSelectedOption = (board: Board) => Option<Cell[]>
const getSelectedOption: GetSelectedOption = board =>
  pipe(board, filter(propEq(selectedLens, true)), isEmpty)
    ? none
    : pipe(board, filter(propEq(selectedLens, true)), some)

/******************* computed *******************/
export const getSelected = createSelector([getBoard], getSelectedOption)

export const isBoardFilled = createSelector(
  [getBoard],
  flow(map(valueLens.get), every(not(equals(0))))
)

export const getAvailables = createSelector([getBoard], board =>
  pipe(
    board,
    getSelectedOption,
    fold(
      () => ({ row: empty, col: empty, reg: empty, cell: empty }),
      selection => {
        const singleSelected = pipe(selection, length, equals(1))
        const [head] = selection
        const isValid = (x: number) => isValidPlacement(board)(x)(head)

        const shouldCalcAvailables = (lens: Lens<Cell, number>) =>
          pipe(selection, map(lens.get), uniq(eqNumber), length, equals(1))

        const section = (lens: Lens<Cell, number>) =>
          pipe(board, filter(propEq(lens, lens.get(head))), map(valueLens.get))

        const conflicts = (lens: Lens<Cell, number>) => (x: number) =>
          pipe(section(lens), elem(eqNumber)(x), booleanNot)

        const calcAvailables = (lens: Lens<Cell, number>) =>
          shouldCalcAvailables(lens)
            ? pipe(range(1, 9), filter(conflicts(lens)))
            : empty

        return {
          cell: singleSelected ? pipe(range(1, 9), filter(isValid)) : empty,
          row: calcAvailables(rowLens),
          col: calcAvailables(colLens),
          reg: calcAvailables(regLens)
        }
      }
    )
  )
)
