import { useSelector } from 'react-redux'
import { filter, isEmpty } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { none, Option, some } from 'fp-ts/Option'
import { Lens } from 'monocle-ts'
import { cornerLens, middleLens } from '~core/board/optics'
import { getBoard } from '~core/board/selectors'
import { Cell, Smalls } from '~core/types'
import { isValidPlacement } from '~util/fns'

type UseModel = (
  cell: Cell
) => { cornerNumbers: Option<number[]>; middleNumbers: Option<number[]> }
export const useModel: UseModel = cell => {
  const board = useSelector(getBoard)
  const isValid = (x: number) => isValidPlacement(board)(x)(cell)
  const getOption = (lens: Lens<Cell, Smalls>) =>
    pipe(cell, lens.get, isEmpty)
      ? none
      : pipe(cell, lens.get, filter(isValid), some)

  return {
    cornerNumbers: getOption(cornerLens),
    middleNumbers: getOption(middleLens)
  }
}
