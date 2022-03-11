import { KeyboardEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearSelection,
  numberSelect,
  selectAll,
  setToggle,
  updateBig,
  updateSmall
} from 'core/actions'
import { cornerLens, middleLens, mouseDownLens } from 'core/optics'
import { elem } from 'fp-ts/Array'
import { range } from 'fp-ts/NonEmptyArray'
import { Predicate } from 'fp-ts/Predicate'
import { pipe } from 'fp-ts/function'
import { Eq as nEq } from 'fp-ts/number'
import { isSome } from 'fp-ts/Option'
import { getSelected } from '~store/board/selectors'

const isValue: Predicate<string> = x => elem(nEq)(+x)(range(0, 9))

export const useModel = () => {
  const dispatch = useDispatch()
  const selection = useSelector(getSelected)

  return {
    onMouseDown: () =>
      pipe({ lens: mouseDownLens, value: true }, setToggle, dispatch),
    onMouseUp: () =>
      pipe({ lens: mouseDownLens, value: false }, setToggle, dispatch),
    onKeyDown: (ev: KeyboardEvent<HTMLDivElement>) => {
      const { key, altKey, ctrlKey } = ev
      ev.stopPropagation()
      if (key !== 'F12') ev.preventDefault()
      if (isValue(key)) {
        const value = +key
        if (isSome(selection)) {
          if (!altKey && !ctrlKey) pipe({ value }, updateBig, dispatch)
          if (ctrlKey) pipe({ lens: cornerLens, value }, updateSmall, dispatch)
          if (altKey) pipe({ lens: middleLens, value }, updateSmall, dispatch)
        } else {
          pipe({ value }, numberSelect, dispatch)
        }
      } else {
        if (key === 'Enter') pipe(clearSelection, dispatch)
        if (key === 'Delete' || key === 'Backspace')
          pipe({ value: 0 }, updateBig, dispatch)
        if (ctrlKey && key === 'a') pipe(selectAll, dispatch)
      }
    }
  }
}
