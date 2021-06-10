import { elem, filter, map } from 'fp-ts/Array'
import { flow, not, pipe, Predicate } from 'fp-ts/function'
import { Eq } from 'fp-ts/number'
import { allPass, anyPass, equals, lensEq } from './fp'
import {
  indLens,
  rowLens,
  colLens,
  regLens,
  valueLens
} from '~core/board/optics'
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
        flow(indLens.get, not(equals(Eq)(ind))),
        flow(valueLens.get, not(equals(Eq)(0))),
        anyPass([
          lensEq(rowLens, row)(Eq),
          lensEq(colLens, col)(Eq),
          lensEq(regLens, reg)(Eq)
        ])
      ])
    ),
    map(valueLens.get),
    elem(Eq)(possibleValue)
  )

type IsValidPlacement = (
  board: Board
) => (possibleValue: number) => Predicate<Cell>
export const isValidPlacement: IsValidPlacement = board => possibleValue => cell =>
  lensEq(valueLens, 0)(Eq)(cell) && noConflicts(board, cell, possibleValue)
