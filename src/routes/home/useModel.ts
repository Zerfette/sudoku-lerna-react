import { useDispatch } from 'react-redux'
import { pipe } from 'fp-ts/function'
import { setToggle } from '~core/actions'
import { mouseDownLens } from '~core/lenses/toggles'

type UseModel = () => { onMouseDown: () => void; onMouseUp: () => void }

export const useModel: UseModel = () => {
  const dispatch = useDispatch()
  const onMouseDown = () =>
    pipe({ lens: mouseDownLens, value: true }, setToggle, dispatch)
  const onMouseUp = () =>
    pipe({ lens: mouseDownLens, value: false }, setToggle, dispatch)

  return { onMouseDown, onMouseUp }
}
