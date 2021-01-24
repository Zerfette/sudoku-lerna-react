import { MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pipe } from 'fp-ts/function'
import { numberSelect, selectCell } from '~core/actions'
import { getMouseDown } from '~core/toggles/selectors'
import { Cell } from '~core/types'

type OnMouseEnter = () => void
type OnMouseDown = (ev: MouseEvent) => void
type UseModel = (
  cell: Cell
) => { onMouseEnter: OnMouseEnter; onMouseDown: OnMouseDown }
export const useModel: UseModel = ({ ind, locked, value }) => {
  const dispatch = useDispatch()
  const mouseDown = useSelector(getMouseDown)
  const onMouseEnter = () => {
    if (mouseDown && !locked)
      pipe({ ind, shouldClear: false }, selectCell, dispatch)
  }

  const onMouseDown = ({ ctrlKey }: MouseEvent) =>
    locked
      ? pipe({ value }, numberSelect, dispatch)
      : pipe({ ind, shouldClear: !ctrlKey }, selectCell, dispatch)

  return { onMouseEnter, onMouseDown }
}
