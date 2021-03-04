import { useDispatch, useSelector } from 'react-redux'
import { filter } from 'fp-ts/Array'
import { eqNumber } from 'fp-ts/Eq'
import { IO } from 'fp-ts/IO'
import { isSome } from 'fp-ts/Option'
import { clearSelection } from '~core/actions'
import { regLens } from '~core/board/optics'
import { getBoard, getSelected } from '~core/board/selectors'
import { Cell } from '~core/types'
import { lensEq } from '~util/fns'

type UseModel = IO<{ getRegion: (i: number) => Cell[]; onClickAway: IO<void> }>

export const useModel: UseModel = () => {
  const dispatch = useDispatch()
  const board = useSelector(getBoard)
  const selection = useSelector(getSelected)

  return {
    getRegion: i => filter(lensEq(regLens, i)(eqNumber))(board),
    onClickAway: () => isSome(selection) && dispatch(clearSelection)
  }
}
