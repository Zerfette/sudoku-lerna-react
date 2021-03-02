import { elem, filter, map } from 'fp-ts/Array'
import { eqNumber } from 'fp-ts/Eq'
import { flow, not, pipe } from 'fp-ts/function'
import { allPass, anyPass, equals, lensEq } from './fp'
import { indLens, rowLens, colLens, regLens, valueLens } from '~core/board/optics'
import { Board, Cell } from '~core/types'

type NoConflicts = (board: Board, cell: Cell, possibleValue: number) => boolean
export const noConflicts: NoConflicts = (
  board,
  { ind, row, col, reg },
  possibleValue
) =>
  !pipe(
    board,
    filter(
      allPass([
        anyPass([
          lensEq(rowLens, row)(eqNumber),
          lensEq(colLens, col)(eqNumber),
          lensEq(regLens, reg)(eqNumber)
        ]),
        flow(indLens.get, not(equals(eqNumber)(ind))),
        flow(valueLens.get, not(equals(eqNumber)(0)))
      ])
    ),
    map(valueLens.get),
    elem(eqNumber)(possibleValue),
  )

type IsValidPlacement = (
  board: Board
) => (possibleValue: number) => (cell: Cell) => boolean
export const isValidPlacement: IsValidPlacement = board => possibleValue => cell =>
  pipe(cell, lensEq(valueLens, 0)(eqNumber)) && noConflicts(board, cell, possibleValue)
