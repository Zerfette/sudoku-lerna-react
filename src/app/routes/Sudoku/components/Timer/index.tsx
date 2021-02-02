import React from 'react'
import { FaUndo } from 'react-icons/fa'
import {
  Center,
  Flex,
  IconButton,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { useModel } from './useModel'

export const Timer = () => {
  const { resetTimer, toggleTimer, timerReadout, Icon, iconLabel } = useModel()
  
  return (
    <Flex>
      <Text fontSize='4xl'>{timerReadout}</Text>
      <Center>
        <Tooltip label={iconLabel}>
          <IconButton
            ml={3}
            aria-label={`${iconLabel} Timer`}
            size='sm'
            onClick={toggleTimer}
            icon={<Icon />}
          />
        </Tooltip>
      </Center>
      <Center>
        <Tooltip label='Reset Timer'>
          <IconButton
            ml={3}
            aria-label='Reset Timer'
            size='sm'
            onClick={resetTimer}
            icon={<FaUndo />}
          />
        </Tooltip>
      </Center>
    </Flex>
  )
}
