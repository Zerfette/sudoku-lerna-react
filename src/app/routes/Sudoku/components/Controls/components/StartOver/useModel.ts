import { RefObject, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { IO } from 'fp-ts/IO'
import { useDisclosure } from '@chakra-ui/react'
import { resetBoard } from '~core/actions'
import { Stopwatch } from '~util/hooks'

type UseModel = (
  stopwatch: Stopwatch
) => {
  cancel: IO<void>
  cancelRef: RefObject<HTMLButtonElement>
  confirm: IO<void>
  isChecked: boolean
  isOpen: boolean
  onChange: IO<void>
  onOpen: IO<void>
}
export const useModel: UseModel = ({
  isRunning,
  resetTimer,
  startTimer,
  stopTimer
}) => {
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(false)
  const [startOnClose, setStartOnClose] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)

  return {
    cancel: () => {
      onClose()
      startOnClose && startTimer()
      setIsChecked(false)
      setStartOnClose(false)
    },
    cancelRef,
    confirm: () => {
      dispatch(resetBoard)
      isChecked && resetTimer()
      startTimer()
      setIsChecked(false)
      setStartOnClose(false)
      onClose()
    },
    isChecked,
    isOpen,
    onChange: () => setIsChecked(prev => !prev),
    onOpen: () => {
      setStartOnClose(isRunning)
      onOpen()
      isRunning && stopTimer()
    }
  }
}
