import { useDisclosure } from '@chakra-ui/react'
import { Stopwatch } from '~util/hooks'

type UseModel = (
  stopwatch: Stopwatch
) => {
  isOpen: boolean
  onClick: () => void
  onClose: () => void
}
export const useModel: UseModel = ({ startTimer, stopTimer }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const onClick = () => {
    onOpen()
    stopTimer()
  }

  return {
    isOpen,
    onClick,
    onClose: () => {
      onClose()
      startTimer()
    }
  }
}
