import React, { FC } from 'react'
import { Center, Flex, Stack } from '@chakra-ui/react'
import { ColorModeSwitcher } from '~lib/ColorModeSwitcher'
import { Board, Timer } from './components'
import { useModel } from './useModel'

export const Home: FC = () => {
  const { onMouseDown, onMouseUp, onKeyDown } = useModel()

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
