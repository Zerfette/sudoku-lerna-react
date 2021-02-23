import { RefObject, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useDisclosure } from '@chakra-ui/react'
import { resetBoard } from '~core/actions'
import { Stopwatch } from '~util/hooks'

type UseModel = (
  stopwatch: Stopwatch
) => {
  cancel: () => void
  cancelRef: RefObject<HTMLButtonElement>
  confirm: () => void
  isChecked: boolean
  isOpen: boolean
  onChange: () => void
  open: () => void
}
export const useModel: UseModel = ({ isRunning, resetTimer, startTimer, stopTimer }) => {
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(false)
  const [startOnClose, setStartOnClose] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)

  const cancel = () => {
    onClose()
    startOnClose && startTimer()
    setIsChecked(false)
    setStartOnClose(false)
  }

  const confirm = () => {
    dispatch(resetBoard)
    isChecked && resetTimer()
    startTimer()
    setIsChecked(false)
    setStartOnClose(false)
    onClose()

  }

  const open = () => {
    setStartOnClose(isRunning)
    onOpen()
    isRunning && stopTimer()
  }

  const onChange = () => setIsChecked(prev => !prev)

  return {
    cancel,
    cancelRef,
    confirm,
    isChecked,
    isOpen,
    onChange,
    open
  }
}
