import React, { FC } from 'react'
import { Flex, Spacer } from '@chakra-ui/react'
import { useStopwatch } from '~util/hooks'
import {
  AutoSolve,
  DarkTheme,
  Edit,
  Help,
  StartOver,
  Timer
} from './components'

export const Controls: FC = () => {
  const stopwatch = useStopwatch()
  return (
    <Flex align='center'>
      <Timer stopwatch={stopwatch} />
      <Spacer />
      <StartOver stopwatch={stopwatch} />
      <Edit stopwatch={stopwatch} />
      <AutoSolve />
      <DarkTheme />
      <Help stopwatch={stopwatch} />
    </Flex>
  )
}
