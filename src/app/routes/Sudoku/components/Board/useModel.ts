import { useDispatch, useSelector } from 'react-redux'
import { filter, map, range } from 'fp-ts/Array'
import { IO } from 'fp-ts/IO'
import { Eq as nEq } from 'fp-ts/number'
import { isSome } from 'fp-ts/Option'
import { clearSelection } from '~core/actions'
import { regLens } from '~core/board/optics'
import { getBoard, getSelected } from '~core/board/selectors'
import { Cell } from '~core/types'
import { lensEq } from '~util/fns'

type UseModel = IO<{ regions: Array<Cell[]>; onClickAway: IO<void> }>

export const useModel: UseModel = () => {
  const dispatch = useDispatch()
  const board = useSelector(getBoard)
  const selection = useSelector(getSelected)
  const getRegion = (i: number) => filter(lensEq(regLens, i)(nEq))(board)

  return {
    regions: map(getRegion)(range(0, 8)),
    onClickAway: () => isSome(selection) && dispatch(clearSelection)
  }
}
