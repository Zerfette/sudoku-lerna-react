import { useDispatch } from 'react-redux'
import { pipe } from 'fp-ts/function'
import { useDisclosure } from '@chakra-ui/react'
import { setToggle } from '~core/actions'
import { timerIsRunningLens } from '~core/toggles/optics'

type UseModel = () => {
  isOpen: boolean
  onClick: () => void
  onClose: () => void
}
export const useModel: UseModel = () => {
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const startTimer = () =>
    pipe({ value: true, lens: timerIsRunningLens }, setToggle, dispatch)
  const stopTimer = () =>
    pipe({ value: false, lens: timerIsRunningLens }, setToggle, dispatch)

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
