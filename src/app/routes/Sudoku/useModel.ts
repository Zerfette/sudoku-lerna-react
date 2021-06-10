import { KeyboardEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { elem, range } from 'fp-ts/Array'
import { pipe, Predicate } from 'fp-ts/function'
import { IO } from 'fp-ts/IO'
import { Eq as nEq } from 'fp-ts/number'
import { isSome } from 'fp-ts/Option'
import {
  clearSelection,
  numberSelect,
  selectAll,
  setToggle,
  updateBig,
  updateSmall
} from '~core/actions'
import { cornerLens, middleLens } from '~core/board/optics'
import { getSelected } from '~core/board/selectors'
import { mouseDownLens } from '~core/toggles/optics'

const isValue: Predicate<string> = x => elem(nEq)(+x)(range(0, 9))

type UseModel = IO<{
  onMouseDown: IO<void>
  onMouseUp: IO<void>
  onKeyDown: (ev: KeyboardEvent<HTMLDivElement>) => void
}>

export const useModel: UseModel = () => {
  const dispatch = useDispatch()
  const selection = useSelector(getSelected)

  return {
    onMouseDown: () =>
      pipe({ lens: mouseDownLens, value: true }, setToggle, dispatch),
    onMouseUp: () =>
      pipe({ lens: mouseDownLens, value: false }, setToggle, dispatch),
    onKeyDown: ev => {
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
