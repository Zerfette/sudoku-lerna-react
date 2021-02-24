import { useDispatch, useSelector } from 'react-redux'
import { pipe } from 'fp-ts/function'
import { IO } from 'fp-ts/IO'
import { toggle } from '~core/actions'
import { autoSolveLens } from '~core/toggles/optics'
import { getAutoSolve } from '~core/toggles/selectors'

type UseModel = IO<{
  colorScheme: string
  label: string
  onClick: IO<void>
}>

export const useModel: UseModel = () => {
  const dispatch = useDispatch()
  const shouldAutoSolve = useSelector(getAutoSolve)

  return {
    colorScheme: shouldAutoSolve ? 'purple' : 'gray',
    label: shouldAutoSolve ? 'Disable Auto Solve' : 'Enable Auto Solve',
    onClick: () => pipe({ lens: autoSolveLens }, toggle, dispatch)
  }
}
