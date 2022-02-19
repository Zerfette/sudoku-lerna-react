import {
  difference,
  elem,
  lookup,
  getMonoid,
  map,
  modifyAt,
  replicate,
  sort
} from 'fp-ts/Array'
import { Eq as bEq, fold as bFold } from 'fp-ts/boolean'
import { constant, identity, flow, not, pipe } from 'fp-ts/function'
import { Eq as nEq, Ord as nOrd } from 'fp-ts/number'
import { fold as optFold } from 'fp-ts/Option'
import { Lens } from 'monocle-ts'
import {
  anyPass,
  ifElse,
  when,
  puzzleToBoard,
  isValidPlacement,
  lensEq,
  mapWhen
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
  middleLens,
} from '~core/board/optics'
import { Board, Cell, Mutation, Puzzle, Smalls } from '~core/types'

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
      mapWhen(
        anyPass([
          lensEq(rowLens, row)(nEq),
          lensEq(colLens, col)(nEq),
          lensEq(regLens, reg)(nEq)
        ]),
        selectedLens.set(false)
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
    when(not(lensEq(valueLens, 0)(nEq)), lockedLens.set(true))
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
      when(lensEq(valueLens, value)(nEq), highlightedLens.set(true)),
      when(isValidPlacement(board)(value), selectedLens.set(true))
    )
  )(board)

/******************* resetBoard *******************/
export const resetBoard: Mutation<Board, {}> = mapWhen(
  lensEq(lockedLens, false)(bEq),
  flow(
    selectedLens.set(false),
    highlightedLens.set(false),
    valueLens.set(0),
    cornerLens.set([]),
    middleLens.set([])
  )
)

/******************* selectAll *******************/
export const selectAll: Mutation<Board, {}> = mapWhen(
  lensEq(lockedLens, false)(bEq),
  selectedLens.set(true)
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
) => mapWhen(lensEq(selectedLens, true)(bEq), valueLens.set(value))(board)

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
    mapWhen(
      lensEq(selectedLens, true)(bEq),
      ifElse(constant(nEq.equals(value, 0)), lens.set([]), cell =>
        pipe(
          cell,
          lens.get,
          elem(nEq)(value),
          bFold(
            constant(
              lens.set(
                pipe(
                  getMonoid<number>().concat(lens.get(cell), [value]),
                  sort(nOrd)
                )
              )(cell)
            ),
            constant(
              lens.set(pipe(lens.get(cell), difference(nEq)([value])))(cell)
            )
          )
        )
      )
    )
  )
