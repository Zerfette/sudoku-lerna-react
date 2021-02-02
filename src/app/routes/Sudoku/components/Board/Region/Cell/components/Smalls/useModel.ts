import { useSelector } from 'react-redux'
import { filter } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { Lens } from 'monocle-ts'
import { cornerLens, middleLens } from '~core/board/optics'
import { getBoard } from '~core/board/selectors'
import { Cell, Smalls } from '~core/types'
import { isValidPlacement } from '~util/fns'

type UseModel = (cell: Cell) => { cornerNumbers: Smalls; middleNumbers: Smalls }
export const useModel: UseModel = cell => {
  const board = useSelector(getBoard)
  const isValid = (x: number) => isValidPlacement(board)(x)(cell)
  const isValidFilter = (lens: Lens<Cell, Smalls>) =>
    pipe(cell, lens.get, filter(isValid))

  return {
    cornerNumbers: isValidFilter(cornerLens),
    middleNumbers: isValidFilter(middleLens)
  }
}
