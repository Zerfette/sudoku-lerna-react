import { KeyboardEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, pipe } from 'fp-ts/function'
import { setToggle, updateBig, updateSmall } from '~core/actions'
import { cornerLens, middleLens } from '~core/lenses/board'
import { getSelectedLength } from '~core/selectors/board'
import { mouseDownLens } from '~core/lenses/toggles'

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
    const value = +key
    console.log('sdfsdfasdf')
    if (selectedHasLength && value > 0 && value < 10) {
      ev.stopPropagation()
      ev.preventDefault()
      if (!altKey && !ctrlKey) {
        pipe({ value }, updateBig, dispatch)
      } else if (ctrlKey && !altKey) {
        pipe({ lens: cornerLens, value }, updateSmall, dispatch)
      } else if (altKey && !ctrlKey) {
        pipe({ lens: middleLens, value }, updateSmall, dispatch)
      } else {
      }
    }
  }

  return { onMouseDown, onMouseUp, onKeyDown }
}
