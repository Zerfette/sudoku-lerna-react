import { chainWithIndex, mapWithIndex } from 'fp-ts/Array'
import { flow, pipe } from 'fp-ts/function'
import { concatAll } from 'fp-ts/Monoid'
import { Eq as nEq, MonoidProduct, MonoidSum } from 'fp-ts/number'
import { bimap } from 'fp-ts/Tuple'
import { indLens } from '~core/board/optics'
import { Board, Cell, Puzzle } from '~core/types'
import { concat } from '~util/fns'

type Op = (x: number) => number
const op: Op = x => pipe(x, concat(MonoidProduct)(1 / 3), Math.floor) // Math.floor(x / 3)

type GetRegion = (r: number, c: number) => number
const getRegion: GetRegion = (r, c) =>
  pipe(
    [r, c],
    bimap(op, flow(op, concat(MonoidProduct)(3))),
    concatAll(MonoidSum)
  ) // 3 * op(r) + op(c)

type ToCell = (rowIndex: number) => (colIndex: number, value: number) => Cell
const toCell: ToCell = rowIndex => (colIndex, value) => ({
  ind: 0,
  value,
  row: rowIndex,
  col: colIndex,
  reg: getRegion(rowIndex, colIndex),
  selected: false,
  highlighted: false,
  locked: !nEq.equals(value, 0),
  corner: [],
  middle: []
})

type ToCells = (rowIndex: number, row: number[]) => Cell[]
const toCells: ToCells = (rowIndex, row) => mapWithIndex(toCell(rowIndex))(row)

type SetIndex = (i: number, cell: Cell) => Cell
const setIndex: SetIndex = (i, cell) => indLens.set(i)(cell)

type PuzzleToBoard = (puzzle: Puzzle) => Board
export const puzzleToBoard: PuzzleToBoard = flow(
  chainWithIndex(toCells),
  mapWithIndex(setIndex)
)
