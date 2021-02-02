import { RefObject, useRef, useState } from 'react'
import { IconType } from 'react-icons'
import { FaPlus, FaLock } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useDisclosure } from '@chakra-ui/react'
import { clearBoard, lockBoard } from '~core/actions'
import { Stopwatch } from '~util/hooks'

type UseModel = (
  stopwatch: Stopwatch
) => {
  cancel: () => void
  cancelRef: RefObject<HTMLButtonElement>
  confirm: () => void
  Icon: IconType
  isOpen: boolean
  label: string
  onClick: () => void
}
export const useModel: UseModel = ({ resetTimer, startTimer, stopTimer }) => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [locked, setLocked] = useState(true)
  const Icon = locked ? FaPlus : FaLock
  const label = locked ? 'Set a New Puzzle' : 'Lock and Solve'
  const cancelRef = useRef<HTMLButtonElement>(null)

  const cancel = () => {
    onClose()
    startTimer()
  }

  const confirm = () => {
    dispatch(clearBoard)
    onClose()
    setLocked(!locked)
    resetTimer()
    stopTimer()
  }

  const onClick = () => {
    if (locked) {
      onOpen()
      stopTimer()
    } else {
      dispatch(lockBoard)
      setLocked(!locked)
      startTimer()
    }
  }

  return { cancel, cancelRef, confirm, Icon, isOpen, label, onClick }
}
