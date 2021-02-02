import { RefObject, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { pipe } from 'fp-ts/function'
import { useDisclosure } from '@chakra-ui/react'
import { resetBoard, setToggle } from '~core/actions'
import { timerIsRunningLens } from '~core/toggles/optics'

type UseModel = () => {
  cancelRef: RefObject<HTMLButtonElement>
  dispatchAction: () => void
  isOpen: boolean
  onClick: () => void
  onClose: () => void
}
export const useModel: UseModel = () => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)
  const startTimer = () =>
    pipe({ value: true, lens: timerIsRunningLens }, setToggle, dispatch)
  const stopTimer = () =>
    pipe({ value: false, lens: timerIsRunningLens }, setToggle, dispatch)

  const dispatchAction = () => {
    dispatch(resetBoard)
    onClose()
    startTimer()
  }

  const onClick = () => {
    onOpen()
    stopTimer()
  }

  return {
    cancelRef,
    dispatchAction,
    isOpen,
    onClick,
    onClose: () => {
      onClose()
      startTimer()
    }
  }
}