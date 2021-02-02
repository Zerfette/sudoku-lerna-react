import { RefObject, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useDisclosure } from '@chakra-ui/react'
import { resetBoard } from '~core/actions'

type UseModel = () => {
  cancelRef: RefObject<HTMLButtonElement>
  dispatchAction: () => void
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}
export const useModel: UseModel = () => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)

  const dispatchAction = () => {
    dispatch(resetBoard)
    onClose()
  }

  return { cancelRef, dispatchAction, isOpen, onClose, onOpen }
}
