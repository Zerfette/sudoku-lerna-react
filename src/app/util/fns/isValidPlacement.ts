import { elem, filter, map } from 'fp-ts/Array'
import { eqNumber } from 'fp-ts/Eq'
import { flow, pipe } from 'fp-ts/function'
import { allPass, and, anyPass, equals, not, propEq } from './fp'
import { indLens, rowLens, colLens, regLens, valueLens } from '~core/board/optics'
import { Board, Cell } from '~core/types'

type NoConflicts = (board: Board, cell: Cell, possibleValue: number) => boolean
export const noConflicts: NoConflicts = (
  board,
  { ind, row, col, reg },
  possibleValue
) =>
  pipe(
    board,
    filter(
      allPass([
        anyPass([
          propEq(rowLens, row),
          propEq(colLens, col),
          propEq(regLens, reg)
        ]),
        flow(indLens.get, equals(ind), not),
        flow(valueLens.get, equals(0), not)
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
