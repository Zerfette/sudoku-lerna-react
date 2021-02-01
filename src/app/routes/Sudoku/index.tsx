import React, { FC } from 'react'
import { Center, Flex, Spacer, Stack } from '@chakra-ui/react'
import {
  AutoSolve,
  Board,
  DarkTheme,
  Edit,
  Help,
  Timer
} from './components'
import { useModel } from './useModel'
import { useAutoSolve } from './useAutoSolve'

export const Sudoku: FC = () => {
  const { onMouseDown, onMouseUp, onKeyDown } = useModel()
  useAutoSolve()

  return (
    <Center
      minH={'100vh'}
      minW={'100vw'}
      tabIndex={0}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onKeyDown={onKeyDown}
    >
      <Stack>
        <Flex align='center'>
          <Timer />
          <Spacer />
          <Edit />
          <AutoSolve />
          <DarkTheme />
          <Help />
        </Flex>
        <Board />
      </Stack>
    </Center>
  )
}
