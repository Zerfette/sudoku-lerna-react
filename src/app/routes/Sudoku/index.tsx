import React, { FC } from 'react'
import { Center, Flex, Stack } from '@chakra-ui/react'
import { ColorModeSwitcher } from '~lib/ColorModeSwitcher'
import { AutoSolveSwitch, Board, Timer } from './components'
import { useModel } from './useModel'
import { useAutoSolve } from './useAutoSolve'

export const Sudoku: FC = () => {
  const { onMouseDown, onMouseUp, onKeyDown } = useModel()
  useAutoSolve()

  return (
    <Flex
      minH={'100vh'}
      minW={'100vw'}
      tabIndex={0}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onKeyDown={onKeyDown}
    >
      <Center flex='1'>
        <Stack>
          <AutoSolveSwitch />
          <Board />
          <Center>
            <Timer />
          </Center>
        </Stack>
      </Center>
      <ColorModeSwitcher />
    </Flex>
  )
}
