import { KeyboardEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pipe } from 'fp-ts/function'
import {
  clearSelection,
  numberSelect,
  selectAll,
  setToggle,
  updateBig,
  updateSmall
} from '~core/actions'
import { cornerLens, middleLens } from '~core/lenses/board'
import { mouseDownLens } from '~core/lenses/toggles'
import { getSelectedLength } from '~core/selectors/board'

type IsValue = (x: string) => boolean
const isValue: IsValue = x => +x >= 0 && +x < 10

type OnKeyDown = (ev: KeyboardEvent<HTMLDivElement>) => void
type UseModel = () => {
  onMouseDown: () => void
  onMouseUp: () => void
  onKeyDown: OnKeyDown
}

export const useModel: UseModel = () => {
  const dispatch = useDispatch()
  const selectedHasLength = !!useSelector(getSelectedLength)

  const onMouseDown = () =>
    pipe({ lens: mouseDownLens, value: true }, setToggle, dispatch)

  const onMouseUp = () =>
    pipe({ lens: mouseDownLens, value: false }, setToggle, dispatch)

  const onKeyDown: OnKeyDown = ev => {
    const { key, altKey, ctrlKey } = ev
    ev.stopPropagation()
    if (isValue(key)) {
      const value = +key
      if (selectedHasLength) {
        if (!altKey && !ctrlKey) pipe({ value }, updateBig, dispatch)
        if (ctrlKey) pipe({ lens: cornerLens, value }, updateSmall, dispatch)
        if (altKey) pipe({ lens: middleLens, value }, updateSmall, dispatch)
      } else {
        pipe({ value }, numberSelect, dispatch)
      }
    } else {
      if (key === 'Enter') pipe(clearSelection, dispatch)
      if (ctrlKey && key === 'a') pipe(selectAll, dispatch)
    }
  }

  return { onMouseDown, onMouseUp, onKeyDown }
}
