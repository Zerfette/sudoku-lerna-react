import { useDispatch, useSelector } from 'react-redux'
import { filter } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { clearSelection } from '~core/actions'
import { getBoard, getSelectedLength } from '~core/selectors/board'
import { regLens } from '~core/lenses/board'
import { Cell } from '~core/types'
import { propEq } from '~util/fns'

type GetRegion = (i: number) => Cell[]
type UseModel = () => { getRegion: GetRegion; onClickAway: () => void }

export const useModel: UseModel = () => {
  const dispatch = useDispatch()
  const board = useSelector(getBoard)
  const someSelected = !!useSelector(getSelectedLength)
  const getRegion: GetRegion = i => pipe(board, filter(propEq(regLens, i)))

  const onClickAway = () => {
    someSelected && pipe(clearSelection, dispatch)
  }
  return { getRegion, onClickAway }
}
