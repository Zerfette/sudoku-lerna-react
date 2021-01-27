import { useSelector } from 'react-redux'
import { filter } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { cornerLens, middleLens } from '~core/board/optics'
import { getBoard } from '~core/board/selectors'
import { Cell, Smalls } from '~core/types'
import { isValidPlacement } from '~util/fns'

type UseModel = (cell: Cell) => {cornerNumbers: Smalls; middleNumbers: Smalls}
export const useModel: UseModel = cell => {
  const board = useSelector(getBoard)
  const isValid = (x: number) => isValidPlacement(board)(x)(cell)
  const cornerNumbers = pipe(cell, cornerLens.get, filter(isValid))
  const middleNumbers = pipe(cell, middleLens.get, filter(isValid))

  return { cornerNumbers, middleNumbers }
}
