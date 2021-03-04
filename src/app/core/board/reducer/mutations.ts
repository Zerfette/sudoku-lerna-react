import {
  difference,
  elem,
  empty,
  lookup,
  getMonoid,
  map,
  modifyAt,
  replicate,
  sort
} from 'fp-ts/Array'
import { fold as boolFold } from 'fp-ts/boolean'
import { eqBoolean, eqNumber } from 'fp-ts/Eq'
import { constant, identity, flow, not, pipe } from 'fp-ts/function'
import { fold as optFold } from 'fp-ts/Option'
import { ordNumber } from 'fp-ts/Ord'
import {
  anyPass,
  ifElse,
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
  highlightedLens,
  lockedLens,
  cornerLens,
  middleLens
} from '~core/board/optics'
import { Board, Cell, Mutation, Puzzle, Smalls } from '~core/types'
import { Lens } from 'monocle-ts'
import { lensEq } from '~util/fns'

const { concat } = getMonoid<number>()

/******************* autoSolve *******************/
export const autoSolve: Mutation<Board, { ind: number; value: number }> = (
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
      flow(
        valueLens.set(value),
        highlightedLens.set(true),
        selectedLens.set(false)
      )
    ),
    optFold(
      constant(board),
      map(
        when(
          anyPass([
            lensEq(rowLens, row)(eqNumber),
            lensEq(colLens, col)(eqNumber),
            lensEq(regLens, reg)(eqNumber)
          ]),
          selectedLens.set(false)
        )
      )
    )
  )
}

/******************* clearBoard *******************/
export const clearBoard: () => Board = constant(
  pipe(replicate(9, 0), map(constant(replicate(9, 0))), puzzleToBoard)
)

/******************* clearSelection *******************/
export const clearSelection: Mutation<Board, {}> = map(
  flow(selectedLens.set(false), highlightedLens.set(false))
)

/******************* lockBoard *******************/
export const lockBoard: Mutation<Board, {}> = map(
  flow(
    selectedLens.set(false),
    when(not(lensEq(valueLens, 0)(eqNumber)), lockedLens.set(true))
  )
)

/******************* numberSelect *******************/
export const numberSelect: Mutation<Board, { value: number }> = (
  board,
  { value }
) =>
  map(
    flow(
      highlightedLens.set(false),
      selectedLens.set(false),
      when(lensEq(valueLens, value)(eqNumber), highlightedLens.set(true)),
      when(isValidPlacement(board)(value), selectedLens.set(true))
    )
  )(board)

/******************* resetBoard *******************/
export const resetBoard: Mutation<Board, {}> = map(
  when(
    lensEq(lockedLens, false)(eqBoolean),
    flow(
      selectedLens.set(false),
      highlightedLens.set(false),
      valueLens.set(0),
      cornerLens.set(empty),
      middleLens.set(empty)
    )
  )
)

/******************* selectAll *******************/
export const selectAll: Mutation<Board, {}> = map(
  when(lensEq(lockedLens, false)(eqBoolean), selectedLens.set(true))
)

/******************* selectCell *******************/
export const selectCell: Mutation<
  Board,
  { ind: number; shouldClear: boolean }
> = (board, { ind, shouldClear }) =>
  pipe(
    board,
    map(
      flow(
        highlightedLens.set(false),
        when(constant(shouldClear), selectedLens.set(false))
      )
    ),
    modifyAt(ind, selectedLens.set(true)),
    optFold(constant(board), identity)
  )

/******************* setPuzzle *******************/
export const setPuzzle: Mutation<Board, { puzzle: Puzzle }> = (_, { puzzle }) =>
  puzzleToBoard(puzzle)

/******************* updateBig *******************/
export const updateBig: Mutation<Board, { value: number }> = (
  board,
  { value }
) =>
  map(when(lensEq(selectedLens, true)(eqBoolean), valueLens.set(value)))(board)

/******************* updateSmall *******************/
export const updateSmall: Mutation<
  Board,
  {
    lens: Lens<Cell, Smalls>
    value: number
  }
> = (board, { lens, value }) =>
  pipe(
    board,
    map(
      when(
        lensEq(selectedLens, true)(eqBoolean),
        ifElse(constant(eqNumber.equals(value, 0)), lens.set(empty), cell =>
          pipe(
            cell,
            lens.get,
            elem(eqNumber)(value),
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
