import { elem, filter, isEmpty, map, range, uniq } from 'fp-ts/Array'
import { Eq as bEq } from 'fp-ts/boolean'
import { pipe } from 'fp-ts/function'
import { Eq as nEq } from 'fp-ts/number'
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
import { isValidPlacement, lengthIs, lensEq } from '~util/fns'

/******************* getters *******************/
type GetBoard = (state: State) => Board
export const getBoard: GetBoard = boardLens.get

/******************* helpers *******************/
type GetSelectedOption = (board: Board) => Option<Cell[]>
const getSelectedOption: GetSelectedOption = board =>
  pipe(board, filter(lensEq(selectedLens, true)(bEq)), isEmpty)
    ? none
    : pipe(board, filter(lensEq(selectedLens, true)(bEq)), some)

/******************* computed *******************/
export const getSelected = createSelector([getBoard], getSelectedOption)

export const getAvailables = createSelector([getBoard], board =>
  pipe(
    board,
    getSelectedOption,
    fold(
      () => ({ row: [], col: [], reg: [], cell: [] }),
      selection => {
        const singleSelected = lengthIs(1)(selection)
        const [head] = selection
        const isValid = (x: number) => isValidPlacement(board)(x)(head)

        const shouldCalcAvailables = (lens: Lens<Cell, number>) =>
          pipe(selection, map(lens.get), uniq(nEq), lengthIs(1))

        const section = (lens: Lens<Cell, number>) =>
          pipe(
            board,
            filter(lensEq(lens, lens.get(head))(nEq)),
            map(valueLens.get)
          )

        const conflicts = (lens: Lens<Cell, number>) => (x: number) =>
          !pipe(section(lens), elem(nEq)(x))

        const calcAvailables = (lens: Lens<Cell, number>) =>
          shouldCalcAvailables(lens)
            ? pipe(range(1, 9), filter(conflicts(lens)))
            : []

        return {
          cell: singleSelected ? pipe(range(1, 9), filter(isValid)) : [],
          row: calcAvailables(rowLens),
          col: calcAvailables(colLens),
          reg: calcAvailables(regLens)
        }
      }
    )
  )
)
