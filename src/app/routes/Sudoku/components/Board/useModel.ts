import { useDispatch, useSelector } from 'react-redux'
import { filter } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { isSome } from 'fp-ts/Option'
import { clearSelection } from '~core/actions'
import { regLens } from '~core/board/optics'
import { getBoard, getSelected } from '~core/board/selectors'
import { Cell } from '~core/types'
import { propEq } from '~util/fns'

type GetRegion = (i: number) => Cell[]
type UseModel = () => { getRegion: GetRegion; onClickAway: () => void }

export const useModel: UseModel = () => {
  const dispatch = useDispatch()
  const board = useSelector(getBoard)
  const selection = useSelector(getSelected)
  const getRegion: GetRegion = i => pipe(board, filter(propEq(regLens, i)))

  const onClickAway = () => {
    isSome(selection) && pipe(clearSelection, dispatch)
  }
  return { getRegion, onClickAway }
}
