import { MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pipe } from 'fp-ts/function'
import { selectCell } from '~core/actions'
import { getMouseDown } from '~core/selectors/toggles'
import { Cell } from '~core/types'

type OnMouseEnter = () => void
type OnMouseDown = (ev: MouseEvent) => void
type UseModel = (cell: Cell) => {onMouseEnter: OnMouseEnter; onMouseDown: OnMouseDown}
export const useModel: UseModel = ({ ind, locked }) => {
  const dispatch = useDispatch()
  const mouseDown = useSelector(getMouseDown)
  const onMouseEnter = () => {
    mouseDown &&
      !locked &&
      pipe({ ind, shouldClear: false }, selectCell, dispatch)
  }

  const onMouseDown = ({ ctrlKey }: MouseEvent) => {
    !locked && pipe({ ind, shouldClear: !ctrlKey }, selectCell, dispatch)
  }

  return { onMouseEnter, onMouseDown }
}
