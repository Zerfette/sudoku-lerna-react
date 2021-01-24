import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Flex, Switch, Text, useTheme } from '@chakra-ui/react'
import { pipe } from 'fp-ts/function'
import { toggle } from '~core/actions'
import { autoSolveLens } from '~core/toggles/optics'
import { getAutoSolve } from '~core/toggles/selectors'

export const AutoSolveSwitch = () => {
  const { space } = useTheme()
  const dispatch = useDispatch()
  const onChange = () => pipe({ lens: autoSolveLens }, toggle, dispatch)
  const isChecked = useSelector(getAutoSolve)

  return (
    <Flex align='center'>
      <Switch isChecked={isChecked} onChange={onChange} />
      <Text lineHeight='1' ml={space[3]} fontSize='lg'>
        Auto Solve
      </Text>
      <Text fontSize='sm' as='i' color='grey' ml={space[1]}>
        ({isChecked ? 'Enabled' : 'Disabled'})
      </Text>
    </Flex>
  )
}
