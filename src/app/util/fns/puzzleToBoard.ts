import { mapWithIndex, flatten } from 'fp-ts/Array'
import { eqNumber } from 'fp-ts/Eq'
import { pipe } from 'fp-ts/function'
import { fold, monoidSum } from 'fp-ts/Monoid'
import { bimap } from 'fp-ts/Tuple'
import { indLens } from '~core/board/optics'
import { Board, Cell, Puzzle } from '~core/types'
import { times } from '~util/fns'

type ToTuple = (r: number, c: number) => [number, number]
const toTuple: ToTuple = (r, c) => [r, c]

type Op = (x: number) => number
const op: Op = x => pipe(x, times(1 / 3), Math.floor) // Math.floor(x / 3)

type GetRegion = (r: number, c: number) => number
const getRegion: GetRegion = (r, c) =>
  pipe(toTuple(r, c), bimap(op, op), bimap(times(1), times(3)), fold(monoidSum)) // 3 * op(r) + op(c)

type ToCell = (rowIndex: number) => (colIndex: number, value: number) => Cell
const toCell: ToCell = rowIndex => (colIndex, value) => ({
  ind: 0,
  value: value,
  row: rowIndex,
  col: colIndex,
  reg: getRegion(rowIndex, colIndex),
  selected: false,
  highlighted: false,
  locked: !eqNumber.equals(value, 0),
  corner: [],
  middle: []
})

type ToCells = (rowIndex: number, row: number[]) => Cell[]
const toCells: ToCells = (rowIndex, row) =>
  pipe(row, mapWithIndex(toCell(rowIndex)))

type SetIndex = (i: number, cell: Cell) => Cell
const setIndex: SetIndex = (i, cell) => indLens.set(i)(cell)

type PuzzleToBoard = (puzzle: Puzzle) => Board
export const puzzleToBoard: PuzzleToBoard = puzzle =>
  pipe(puzzle, mapWithIndex(toCells), flatten, mapWithIndex(setIndex))
