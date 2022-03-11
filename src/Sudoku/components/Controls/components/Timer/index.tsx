import { FC } from 'react'
import { FaUndo } from 'react-icons/fa'
import { Center, IconButton, Text, Tooltip } from '@chakra-ui/react'
import { Stopwatch } from '../../useStopwatch'
import { useModel } from './useModel'

type Props = { stopwatch: Stopwatch }
export const Timer: FC<Props> = ({ stopwatch }) => {
  const { resetTimer, toggleTimer, text, Icon, iconLabel } = useModel(stopwatch)

  return (
    <Center>
      <Text fontSize='4xl'>{text}</Text>

      <Tooltip label={iconLabel}>
        <IconButton
          ml={3}
          aria-label={iconLabel}
          size='sm'
          onClick={toggleTimer}
          icon={<Icon />}
        />
      </Tooltip>

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
  )
}
