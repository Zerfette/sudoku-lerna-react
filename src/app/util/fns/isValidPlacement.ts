import { elem, filter, map } from 'fp-ts/Array'
import { eqNumber } from 'fp-ts/Eq'
import { pipe } from 'fp-ts/function'
import { and, anyPass, not, propEq } from './fp'
import { rowLens, colLens, regLens, valueLens } from '~core/board/optics'
import { Board, Cell } from '~core/types'

type NoConflicts = (board: Board, cell: Cell, possibleValue: number) => boolean
const noConflicts: NoConflicts = (board, { row, col, reg }, possibleValue) =>
  pipe(
    board,
    filter(
      anyPass([
        propEq(rowLens, row),
        propEq(colLens, col),
        propEq(regLens, reg)
      ])
    ),
    map(valueLens.get),
    elem(eqNumber)(possibleValue),
    not
  )

type IsValidPlacement = (
  board: Board
) => (possibleValue: number) => (cell: Cell) => boolean
export const isValidPlacement: IsValidPlacement = board => possibleValue => cell =>
  pipe(cell, propEq(valueLens, 0), and(noConflicts(board, cell, possibleValue)))
