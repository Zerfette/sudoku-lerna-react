import { filter, map } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { and, anyPass, includes, not, propEq } from './fp'
import { rowLens, colLens, regLens, valueLens } from '~core/lenses/board'
import { Board, Cell } from '~core/types'

type NoConflicts = (board: Board, cell: Cell, possibleValue: number) => boolean
const noConflicts: NoConflicts = (board, {row, col, reg}, possibleValue) =>
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
    includes(possibleValue),
    not
  )

type IsValidPlacement = (
  board: Board
) => (possibleValue: number) => (cell: Cell) => boolean
export const isValidPlacement: IsValidPlacement = board => possibleValue => cell =>
  pipe(cell, propEq(valueLens, 0), and(noConflicts(board, cell, possibleValue)))
