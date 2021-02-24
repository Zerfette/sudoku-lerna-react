import { RefObject, useRef, useState } from 'react'
import { IconType } from 'react-icons'
import { FaPlus, FaLock } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { IO } from 'fp-ts/IO'
import { useDisclosure } from '@chakra-ui/react'
import { clearBoard, lockBoard } from '~core/actions'
import { Stopwatch } from '~util/hooks'

type UseModel = (
  stopwatch: Stopwatch
) => {
  cancel: IO<void>
  cancelRef: RefObject<HTMLButtonElement>
  confirm: IO<void>
  Icon: IconType
  isOpen: boolean
  label: string
  onClick: IO<void>
}
export const useModel: UseModel = ({ resetTimer, startTimer, stopTimer }) => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [locked, setLocked] = useState(true)
  const cancelRef = useRef<HTMLButtonElement>(null)

  return {
    cancel: () => {
      onClose()
      startTimer()
    },
    cancelRef,
    confirm: () => {
      dispatch(clearBoard)
      onClose()
      setLocked(!locked)
      resetTimer()
    },
    Icon: locked ? FaPlus : FaLock,
    isOpen,
    label: locked ? 'Set a New Puzzle' : 'Lock and Solve',
    onClick: () => {
      if (locked) {
        onOpen()
        stopTimer()
      } else {
        dispatch(lockBoard)
        setLocked(!locked)
        startTimer()
      }
    }
  }
}
