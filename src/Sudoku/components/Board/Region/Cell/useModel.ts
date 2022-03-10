import { MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pipe } from 'fp-ts/function'
import { IO } from 'fp-ts/IO'
import { numberSelect, selectCell } from 'core/actions'
import { getMouseDown } from '~store/toggles/selectors'
import { Cell } from 'core/types'

type UseModel = (
  cell: Cell
) => { onMouseEnter: IO<void>; onMouseDown: (ev: MouseEvent) => void }
export const useModel: UseModel = ({ ind, locked, value }) => {
  const dispatch = useDispatch()
  const mouseDown = useSelector(getMouseDown)

  return {
    onMouseEnter: () => {
      if (mouseDown && !locked)
        pipe({ ind, shouldClear: false }, selectCell, dispatch)
    },
    onMouseDown: ({ ctrlKey }: MouseEvent) =>
      locked
        ? pipe({ value }, numberSelect, dispatch)
        : pipe({ ind, shouldClear: !ctrlKey }, selectCell, dispatch)
  }
}
