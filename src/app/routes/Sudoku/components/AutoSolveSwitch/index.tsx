import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch } from '@chakra-ui/react'
import { pipe } from 'fp-ts/function'
import { toggle } from '~core/actions'
import { autoSolveLens } from '~core/toggles/optics'
import { getAutoSolve } from '~core/toggles/selectors'

export const AutoSolveSwitch = () => {
  const dispatch = useDispatch()
  const onChange = () => pipe({ lens: autoSolveLens }, toggle, dispatch)
  const isChecked = useSelector(getAutoSolve)

  return <Switch isChecked={isChecked} onChange={onChange} />
}
