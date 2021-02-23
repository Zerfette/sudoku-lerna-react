import { useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { Stopwatch } from '~util/hooks'

type UseModel = (
  stopwatch: Stopwatch
) => {
  isOpen: boolean
  onClick: () => void
  onClose: () => void
}
export const useModel: UseModel = ({ isRunning, startTimer, stopTimer }) => {
  const [startOnClose, setStartOnClose] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onClick = () => {
    setStartOnClose(isRunning)
    onOpen()
    isRunning && stopTimer()
  }

  return {
    isOpen,
    onClick,
    onClose: () => {
      onClose()
      startOnClose && startTimer()
      setStartOnClose(false)
    }
  }
}
