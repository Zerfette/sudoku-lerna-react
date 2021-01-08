import { difference, lookup, getMonoid, map, modifyAt, sort } from 'fp-ts/Array'
import { fold as boolFold } from 'fp-ts/boolean'
import { eqNumber } from 'fp-ts/Eq'
import { constant, identity, flow, not, pipe } from 'fp-ts/function'
import { fold as optFold } from 'fp-ts/Option'
import { ordNumber } from 'fp-ts/Ord'
import {
  anyPass,
  equals,
  ifElse,
  includes,
  propEq,
  propSatisfies,
  when,
  puzzleToBoard,
  isValidPlacement
} from '~util/fns'
import {
  valueLens,
  rowLens,
  colLens,
  regLens,
  selectedLens,
  colorLens,
  lockedLens,
} from '~core/lenses/board'
import { Board, Cell, Mutation, Puzzle, Smalls } from '~core/types'
import { Lens } from 'monocle-ts'

const { concat } = getMonoid<number>()

/******************* autosolve *******************/
export const autosolve: Mutation<Board, { ind: number; value: number }> = (
  board,
  { ind, value }
) => {
  const { row, col, reg } = pipe(
    board,
    lookup(ind),
    optFold(constant({ row: 0, col: 0, reg: 0 }), identity)
  )

  return pipe(
    board,
    modifyAt(
      ind,
      flow(valueLens.set(value), colorLens.set(true), selectedLens.set(false))
    ),
    optFold(
      () => board,
      board =>
        pipe(
          board,
          map(
            when(
              anyPass([
                propEq(rowLens, row),
                propEq(colLens, col),
                propEq(regLens, reg)
              ]),
              selectedLens.set(false)
            )
          )
        )
    )
  )
}

/******************* clearBoard *******************/
const nine = new Array(9).fill(0)
export const clearBoard: () => Board = constant(
  pipe(nine, map(constant(nine)), puzzleToBoard)
)

/******************* clearSelection *******************/
export const clearSelection: Mutation<Board, {}> = board =>
  pipe(board, map(selectedLens.set(false)))

/******************* lockBoard *******************/
export const lockBoard: Mutation<Board, {}> = board =>
  pipe(
    board,
    map(
      flow(
        selectedLens.set(false),
        when(propSatisfies(valueLens, not(equals(0))), lockedLens.set(true))
      )
    )
  )

/******************* numberSelect *******************/
export const numberSelect: Mutation<Board, { value: number }> = (board, { value }) =>
  pipe(
    board,
    map(
      flow(
        colorLens.set(false),
        selectedLens.set(false),
        when(propEq(valueLens, value), colorLens.set(true)),
        when(isValidPlacement(board)(value), selectedLens.set(true))
      )
    )
  )

/******************* selectCell *******************/
export const selectCell: Mutation<Board, { ind: number; shouldClear: boolean }> = (
  board,
  { ind, shouldClear }
) =>
  pipe(
    board,
    map(
      flow(
        colorLens.set(false),
        when(constant(shouldClear), selectedLens.set(false))
      )
    ),
    modifyAt(ind, selectedLens.set(true)),
    optFold(constant(board), identity)
  )

/******************* setPuzzle *******************/
export const setPuzzle: Mutation<Board, Puzzle> = (_, puzzle) => puzzleToBoard(puzzle)

/******************* updateBig *******************/
export const updateBig: Mutation<Board, { value: number }> = (board, { value }) =>
  pipe(board, map(when(propEq(selectedLens, true), valueLens.set(value))))

/******************* updateSmall *******************/
export const updateSmall: Mutation<Board, {
  lens: Lens<Cell, Smalls>
  value: number
}> = (board, { lens, value }) =>
  pipe(
    board,
    map(
      when(
        propEq(selectedLens, true),
        ifElse(constant(eqNumber.equals(value, 0)), lens.set([]), cell =>
          pipe(
            cell,
            lens.get,
            includes(value),
            boolFold(
              constant(
                lens.set(
                  pipe(concat(lens.get(cell), [value]), sort(ordNumber))
                )(cell)
              ),
              constant(
                lens.set(pipe(lens.get(cell), difference(eqNumber)([value])))(
                  cell
                )
              )
            )
          )
        )
      )
    )
  )
