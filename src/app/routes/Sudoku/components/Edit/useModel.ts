import { RefObject, useRef, useState } from 'react'
import { IconType } from 'react-icons'
import { FaPlus, FaLock } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useDisclosure } from '@chakra-ui/react'
import { clearBoard, lockBoard } from '~core/actions'

type UseModel = () => {
  cancelRef: RefObject<HTMLButtonElement>
  dispatchAction: () => void
  Icon: IconType
  isOpen: boolean
  label: string
  onClick: () => void
  onClose: () => void
}
export const useModel: UseModel = () => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [locked, setLocked] = useState(true)
  const Icon = locked ? FaPlus : FaLock
  const label = locked ? 'Set a New Puzzle' : 'Lock and Solve'
  const cancelRef = useRef<HTMLButtonElement>(null)

  const onClick = () => {
    locked ? onOpen() : dispatch(lockBoard)
    !locked && setLocked(!locked)
  }

  const dispatchAction = () => {
    dispatch(clearBoard)
    onClose()
    setLocked(!locked)
  }

  return { cancelRef, dispatchAction, Icon, isOpen, label, onClick, onClose }
}
