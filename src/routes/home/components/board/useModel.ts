import { useSelector } from 'react-redux'
import { filter } from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import { getBoard } from '~core/selectors/board'
import { regLens } from '~core/lenses/board'
import { Cell } from '~core/types'
import { propEq } from '~util/fns'


type GetRegion = (i: number) => Cell[]

export const useModel: () => { getRegion: GetRegion } = () => {
  const board = useSelector(getBoard)
  const getRegion: GetRegion = i => pipe(board, filter(propEq(regLens, i)))

  return { getRegion }
}
