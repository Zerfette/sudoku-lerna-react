import { useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { IO } from 'fp-ts/IO'
import { Stopwatch } from '../../useStopwatch'

type UseModel = (
  stopwatch: Stopwatch
) => {
  isOpen: boolean
  onClick: IO<void>
  onClose: IO<void>
}
export const useModel: UseModel = ({ isRunning, startTimer, stopTimer }) => {
  const [startOnClose, setStartOnClose] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return {
    isOpen,
    onClick: () => {
      setStartOnClose(isRunning)
      onOpen()
      isRunning && stopTimer()
    },
    onClose: () => {
      onClose()
      startOnClose && startTimer()
      setStartOnClose(false)
    }
  }
}
