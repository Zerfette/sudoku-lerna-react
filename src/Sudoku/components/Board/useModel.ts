import { clearSelection } from 'core/actions'
import { boardLens, regLens } from 'core/optics'
import { Cell } from 'core/types'
import { lensEq } from 'fns'
import { useDispatch, useSelector } from 'react-redux'
import { filter, map } from 'fp-ts/Array'
import { range } from 'fp-ts/NonEmptyArray'
import { IO } from 'fp-ts/IO'
import { Eq as nEq } from 'fp-ts/number'
import { isSome } from 'fp-ts/Option'
import { getSelected } from '~store/board/selectors'

type UseModel = IO<{ regions: Array<Cell[]>; onClickAway: IO<void> }>

export const useModel: UseModel = () => {
  const dispatch = useDispatch()
  const board = useSelector(boardLens.get)
  const selection = useSelector(getSelected)
  const getRegion = (i: number) => filter(lensEq(regLens, i)(nEq))(board)

  return {
    regions: map(getRegion)(range(0, 8)),
    onClickAway: () => isSome(selection) && dispatch(clearSelection)
  }
}
