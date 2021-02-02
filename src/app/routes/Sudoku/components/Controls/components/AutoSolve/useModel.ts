import { useDispatch, useSelector } from 'react-redux'
import { pipe } from 'fp-ts/function'
import { toggle } from '~core/actions'
import { autoSolveLens } from '~core/toggles/optics'
import { getAutoSolve } from '~core/toggles/selectors'

type UseModel = () => {
  colorScheme: string
  label: string
  onClick: () => void
}
export const useModel: UseModel = () => {
  const dispatch = useDispatch()
  const shouldAutoSolve = useSelector(getAutoSolve)
  const onClick = () => pipe({ lens: autoSolveLens }, toggle, dispatch)

  const label = shouldAutoSolve ? 'Disable Auto Solve' : 'Enable Auto Solve'
  const colorScheme = shouldAutoSolve ? 'purple' : 'gray'

  return { colorScheme, label, onClick }
}
